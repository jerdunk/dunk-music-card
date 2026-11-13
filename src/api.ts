import { errorMessage } from "./errors";
import { configuredRadios, radioKey } from "./radios";
import {
  type Hass,
  type Config,
  type Data,
  type Page,
  type Item,
  type Device,
  type ListedDevice,
  normalize,
  excluded,
} from "./types";
/** Uses only the authenticated HA connection; never calls Spotify or MA directly. */
export class API {
  private cooldown = 0;
  private deviceWarnings: string[] = [];
  cache = new Map<string, { until: number; value: Promise<Data> }>();
  constructor(
    public hass: Hass,
    public config: Config,
  ) {}
  has(domain: string, service: string) {
    return !!this.hass.services[domain]?.[service];
  }
  hasField(domain: string, service: string, field: string): boolean {
    const visit = (fields: Data | undefined): boolean =>
      !!fields &&
      (Object.hasOwn(fields, field) ||
        Object.values(fields).some(
          (value) => value && typeof value === "object" && visit(value.fields),
        ));
    return visit(this.hass.services[domain]?.[service]?.fields);
  }
  async call(
    domain: string,
    service: string,
    data: Data = {},
    response = false,
    target?: Data,
  ): Promise<Data> {
    if (Date.now() < this.cooldown)
      throw new Error(
        "API-limiet bereikt. Wacht een minuut voordat je opnieuw probeert.",
      );
    if (!this.has(domain, service))
      throw new Error(
        `Actie ${domain}.${service} ontbreekt in jouw installatie. Werk de integratie bij of gebruik de oorspronkelijke integratiekaart.`,
      );
    if (response) {
      const result = await this.hass.callWS({
        type: "call_service",
        domain,
        service,
        service_data: data,
        ...(target ? { target } : {}),
        return_response: true,
      });
      return result.response ?? {};
    }
    await this.hass.callService(domain, service, data, target);
    return {};
  }
  async read(domain: string, service: string, data: Data = {}, target?: Data) {
    const key = JSON.stringify([domain, service, data, target]);
    const old = this.cache.get(key);
    if (old && old.until > Date.now()) return old.value;
    const value = this.call(domain, service, data, true, target).catch((e) => {
      if (/429|rate.?limit|too many/i.test(errorMessage(e)))
        this.cooldown = Date.now() + 60000;
      throw e;
    });
    this.cache.set(key, { until: Date.now() + 30000, value });
    if (this.cache.size > 100)
      this.cache.delete(this.cache.keys().next().value!);
    try {
      return await value;
    } catch (e) {
      this.cache.delete(key);
      throw e;
    }
  }
  sp(service: string, data: Data = {}, read = false) {
    return read
      ? this.read("spotifyplus", service, {
          entity_id: this.config.spotify_entity,
          ...data,
        })
      : this.call("spotifyplus", service, {
          entity_id: this.config.spotify_entity,
          ...data,
        });
  }
  async spotify(
    view: string,
    kind: string,
    query: string,
    cursor: number | string = 0,
    parent?: Item,
  ): Promise<Page> {
    let service = "get_playlist_favorites";
    let args: Data = { limit: 50, offset: Number(cursor) || 0 };
    if (parent) {
      const types: Data = {
        playlist: ["get_playlist_items", "playlist_id"],
        album: ["get_album_tracks", "album_id"],
        artist: ["get_artist_top_tracks", "artist_id"],
        show: ["get_show_episodes", "show_id"],
      };
      const spec = types[parent.kind];
      if (!spec)
        throw new Error(
          "Deze collectie kan niet via SpotifyPlus worden geopend.",
        );
      service = spec[0];
      args[spec[1]] = parent.id;
      if (parent.kind === "artist") args = { artist_id: parent.id };
    } else if (query) {
      service = "search_all";
      args = {
        criteria: query,
        criteria_type: "album,artist,playlist,track,show,episode",
        limit_total: 50,
      };
    } else if (view === "Wachtrij") {
      service = "get_player_queue_info";
      args = {};
    } else if (view === "Recent afgespeeld") {
      service = "get_player_recent_tracks";
      args = { limit: 50, ...(cursor ? { before: Number(cursor) } : {}) };
    } else if (kind === "track" || view === "Favorieten")
      service = "get_track_favorites";
    else if (kind === "album") service = "get_album_favorites";
    else if (kind === "artist") {
      service = "get_artists_followed";
      args = { limit: 50, ...(cursor ? { after: cursor } : {}) };
    } else if (kind === "show") service = "get_show_favorites";
    const envelope = await this.sp(service, args, true);
    const r = envelope.result;
    if (r == null)
      throw new Error(
        "Onbekend SpotifyPlus-responseformaat: result ontbreekt.",
      );
    let rows: Data[] = [];
    if (query) {
      for (const key of [
        "albums",
        "artists",
        "playlists",
        "tracks",
        "shows",
        "episodes",
      ])
        rows.push(...(r[key]?.items ?? []));
    } else
      rows = Array.isArray(r)
        ? r
        : (r.items ?? r.artists?.items ?? r.queue ?? []);
    const page = r.artists ?? r;
    const next =
      page.cursors?.after ??
      (view === "Recent afgespeeld" ? page.cursors?.before : undefined);
    return {
      items: rows.map((x, i) =>
        normalize(
          x,
          (view === "Recent afgespeeld" ? 0 : Number(cursor) || 0) + i,
        ),
      ),
      more:
        !query &&
        view !== "Wachtrij" &&
        parent?.kind !== "artist" &&
        (!!page.next || (!!next && rows.length === 50)),
      total: page.total,
      next,
    };
  }
  async maEntry(entity?: string): Promise<string> {
    if (this.config.ma_config_entry_id) return this.config.ma_config_entry_id;
    const rows = await this.hass.callWS<Data[]>({
      type: "config/entity_registry/list",
    });
    const configured = new Set(this.config.ma_players.map((p) => p.entity));
    const row =
      rows.find(
        (x) => x.entity_id === entity && x.platform === "music_assistant",
      ) ??
      rows.find(
        (x) => configured.has(x.entity_id) && x.platform === "music_assistant",
      );
    if (!row?.config_entry_id)
      throw new Error(
        "Stel ma_config_entry_id in voor Music Assistant zoeken en bibliotheek.",
      );
    return row.config_entry_id;
  }
  async ma(
    view: string,
    kind: string,
    query: string,
    offset: number,
    entity: string,
    parent?: Item,
  ): Promise<Page> {
    if (parent) {
      const r = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: entity,
        media_content_id: parent.uri,
        media_content_type: parent.kind,
      });
      return {
        items: (r.children ?? []).map((x: Data, i: number) => normalize(x, i)),
        more: false,
      };
    }
    if (view === "Wachtrij") {
      const response = await this.read(
        "music_assistant",
        "get_queue",
        {},
        { entity_id: entity },
      );
      const r = response[entity] ?? response;
      return {
        items: [r.current_item, r.next_item].filter(Boolean).map(normalize),
        more: false,
        note: `${r.items ?? 0} items. De HA-API geeft alleen het huidige en volgende item terug; de volledige wachtrij staat in Music Assistant.`,
      };
    }
    const config_entry_id = await this.maEntry(entity);
    let r: Data;
    if (query)
      r = await this.read("music_assistant", "search", {
        config_entry_id,
        name: query,
        media_type:
          view === "Radio"
            ? ["radio"]
            : ["track", "album", "artist", "playlist", "radio"],
        limit: 50,
      });
    else
      r = await this.read("music_assistant", "get_library", {
        config_entry_id,
        media_type: view === "Radio" ? "radio" : kind,
        ...(view === "Favorieten" ? { favorite: true } : {}),
        ...(view === "Recent afgespeeld"
          ? { order_by: "last_played_desc" }
          : {}),
        limit: 50,
        offset,
      });
    const rows = query
      ? Object.values(r).filter(Array.isArray).flat()
      : (r.items ?? []);
    return {
      items: rows.map((x: Data, i: number) => normalize(x, offset + i)),
      more: !query && rows.length === 50,
    };
  }
  async radio(query: string, offset: number, entity: string): Promise<Page> {
    const presets = offset
      ? []
      : configuredRadios(this.config).filter((i) =>
          radioKey(i.title).includes(radioKey(query)),
        );
    let remote: Page = { items: [], more: false };
    let note = "";
    try {
      remote = await this.ma("Radio", "radio", query, offset, entity);
    } catch (e) {
      note = `Music Assistant-radiozoekfunctie/bibliotheek niet geladen: ${errorMessage(e)} De meegeleverde zenders blijven beschikbaar via Music Assistant-afspelen.`;
    }
    const items = presets.map((p) => {
      const match = remote.items.find(
        (i) =>
          i.uri &&
          i.kind === "radio" &&
          radioKey(i.title) === radioKey(p.title),
      );
      return match ? { ...match, image: match.image || p.image } : p;
    });
    for (const item of remote.items) {
      if (
        !items.some(
          (i) =>
            i.uri === item.uri || radioKey(i.title) === radioKey(item.title),
        )
      )
        items.push(item);
    }
    return { items, more: remote.more, note: note || undefined };
  }
  async devices(spotify: boolean, entity: string): Promise<Device[]> {
    if (spotify) {
      this.deviceWarnings = [];
      const services = ["get_player_devices"];
      if (this.has("spotifyplus", "get_spotify_connect_devices"))
        services.push("get_spotify_connect_devices");
      else
        this.deviceWarnings.push(
          "Lokale SpotifyPlus-detectie ontbreekt: get_spotify_connect_devices is niet beschikbaar.",
        );
      const results = await Promise.allSettled(
        services.map((service) => this.sp(service, { refresh: true }, true)),
      );
      const devices = new Map<string, Device>();
      let succeeded = false;
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          this.deviceWarnings.push(
            `${services[index]}: ${errorMessage(result.reason)}`,
          );
          return;
        }
        const r = result.value.result;
        const rows =
          index === 0 ? (Array.isArray(r) ? r : r?.devices) : r?.Items;
        if (!Array.isArray(rows)) {
          this.deviceWarnings.push(
            `${services[index]}: onbekend responseformaat.`,
          );
          return;
        }
        succeeded = true;
        for (const d of rows) {
          if (index === 0) {
            if (!d.id) continue;
            devices.set(d.id, {
              id: d.id,
              name: d.name,
              active: !!d.is_active,
              available: !d.is_restricted,
            });
          } else {
            const local =
              d.DiscoveryResult?.IsDynamicDevice === false ||
              d.IsChromeCast === true;
            const id = d.Id || (d.Name ? `local:${d.Name}` : "");
            if (!id) continue;
            const alias = d.DeviceIdActivated;
            const old =
              devices.get(id) ?? (alias ? devices.get(alias) : undefined);
            if (alias && alias !== id) devices.delete(alias);
            const nameUnique =
              rows.filter((x) => x.Name === d.Name).length === 1;
            devices.set(id, {
              id,
              name: d.Name ?? old?.name ?? id,
              active: !!d.IsActiveDevice || !!old?.active,
              available:
                !!(d.Id || (d.Name && nameUnique)) &&
                (!d.IsRestricted || !!d.IsChromeCast || !!d.IsSonos),
              local,
              cast: !!d.IsChromeCast,
              transferId: d.Id || d.Name,
            });
          }
        }
      });
      if (!succeeded) throw new Error(this.deviceWarnings.join(" · "));
      return [...devices.values()].filter(
        (d) => !excluded(d.id, d.name, this.config.excluded_devices),
      );
    }
    return this.config.ma_players
      .map((p) => {
        const s = this.hass.states[p.entity];
        return {
          id: p.entity,
          entity: p.entity,
          name: p.name ?? s?.attributes.friendly_name ?? p.entity,
          active: p.entity === entity,
          available: !!s && !["unavailable", "unknown"].includes(s.state),
        };
      })
      .filter((d) => !excluded(d.id, d.name, this.config.excluded_devices));
  }
  async allDevices(
    entity: string,
    session: string,
  ): Promise<{ devices: ListedDevice[]; warnings: string[] }> {
    const results = await Promise.allSettled([
      this.devices(true, entity),
      this.devices(false, entity),
    ]);
    const devices: ListedDevice[] = [];
    const warnings: string[] = [];
    results.forEach((result, index) => {
      const provider = index === 0 ? "spotify" : "music_assistant";
      if (result.status === "rejected") {
        warnings.push(
          `${index === 0 ? "Spotify Connect" : "Music Assistant"}: ${errorMessage(result.reason)}`,
        );
        return;
      }
      for (const d of result.value) {
        // Preserve separate routes: identical names do not imply identical device IDs.
        if (
          excluded(
            d.id,
            this.hass.states[d.entity ?? ""]?.attributes.friendly_name ??
              d.name,
            this.config.excluded_devices,
          )
        )
          continue;
        devices.push({
          ...d,
          provider,
          active:
            provider === "spotify"
              ? d.active
              : this.hass.states[d.id]?.state === "playing",
          selected:
            provider === "spotify"
              ? session === "spotify" && d.active
              : d.id === entity,
        });
      }
    });
    return {
      devices,
      warnings: [...new Set([...warnings, ...this.deviceWarnings])],
    };
  }
  async play(
    spotify: boolean,
    entity: string,
    item: Item,
    parent?: Item,
    shuffle = false,
  ) {
    if (!spotify) {
      const state = this.hass.states[entity];
      if (
        !this.config.ma_players.some((p) => p.entity === entity) ||
        !state ||
        ["unknown", "unavailable"].includes(state.state) ||
        excluded(
          entity,
          state.attributes.friendly_name ?? "",
          this.config.excluded_devices,
        )
      )
        throw new Error(
          "De gekozen Music Assistant-kamer is niet beschikbaar.",
        );
    }
    if (!item.uri || !item.playable)
      throw new Error("Dit item is niet afspeelbaar.");
    if (spotify) {
      let service = "player_media_play_tracks";
      let data: Data = { uris: item.uri };
      if (
        parent &&
        ["playlist", "album"].includes(parent.kind) &&
        ["track", "episode"].includes(item.kind)
      ) {
        service = "player_media_play_context";
        // SpotifyPlus drops position zero and can randomize positions with shuffle.
        // URI takes precedence in its Web API path; position also supports local players.
        data = {
          context_uri: parent.uri,
          offset_uri: item.uri,
          offset_position: item.position,
        };
      } else if (["playlist", "album", "artist", "show"].includes(item.kind)) {
        service = "player_media_play_context";
        data = { context_uri: item.uri };
      }
      return this.playback(
        "spotifyplus",
        service,
        { entity_id: this.config.spotify_entity, ...data },
        this.config.spotify_entity,
        shuffle,
        true,
      );
    }
    return this.playback(
      "music_assistant",
      "play_media",
      {
        media_id: parent?.kind === "playlist" ? parent.uri : item.uri,
        media_type: parent?.kind === "playlist" ? "playlist" : item.kind,
        ...(parent?.kind === "playlist" && item.uri !== parent.uri
          ? { start_item: item.uri }
          : {}),
        enqueue: "replace",
      },
      entity,
      shuffle,
      item.kind !== "radio",
      { entity_id: entity },
    );
  }
  private async playback(
    domain: string,
    service: string,
    data: Data,
    entity: string,
    shuffle: boolean,
    allowShuffle: boolean,
    target?: Data,
  ) {
    // Both integrations have older versions that reject even shuffle:false.
    const nativeShuffle =
      allowShuffle && this.hasField(domain, service, "shuffle");
    const legacyShuffle =
      allowShuffle &&
      !nativeShuffle &&
      (shuffle || this.hass.states[entity]?.attributes.shuffle === true);
    if (
      legacyShuffle &&
      (!this.has("media_player", "shuffle_set") ||
        !(
          (this.hass.states[entity]?.attributes.supported_features ?? 0) & 32768
        ))
    ) {
      throw new Error(
        shuffle
          ? "Shuffle afspelen wordt niet ondersteund door deze speler. Gebruik Alles afspelen."
          : "Schakel shuffle uit in de bronapp om vanaf het gekozen nummer af te spelen.",
      );
    }
    // Disable an existing shuffle session before starting an explicitly chosen track.
    if (legacyShuffle && !shuffle)
      await this.call("media_player", "shuffle_set", {
        entity_id: entity,
        shuffle: false,
      });
    const result = await this.call(
      domain,
      service,
      { ...data, ...(nativeShuffle ? { shuffle } : {}) },
      false,
      target,
    );
    if (legacyShuffle && shuffle)
      await this.call("media_player", "shuffle_set", {
        entity_id: entity,
        shuffle: true,
      });
    return result;
  }
}
