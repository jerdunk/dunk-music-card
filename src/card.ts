import { live } from "lit/directives/live.js";
import { LitElement, html, nothing, type PropertyValues } from "lit";
import { icon } from "./icons";
import { API } from "./api";
import { styles } from "./styles";
import {
  type Hass,
  type Config,
  type Source,
  type Item,
  type Page,
  type ListedDevice,
  type Data,
  NAV,
  excluded,
  position,
  time,
  safeImage,
} from "./types";
export class DunkMusicCard extends LitElement {
  static styles = styles;
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    source: { state: true },
    session: { state: true },
    view: { state: true },
    kind: { state: true },
    query: { state: true },
    filter: { state: true },
    page: { state: true },
    parent: { state: true },
    loading: { state: true },
    busy: { state: true },
    error: { state: true },
    sheet: { state: true },
    devices: { state: true },
    player: { state: true },
    tick: { state: true },
    menuItem: { state: true },
  };
  declare hass: Hass;
  declare config: Config;
  source: Source = "spotify";
  session: Source = "spotify";
  view = "Home";
  kind = "playlist";
  query = "";
  filter = "";
  page: Page = { items: [], more: false };
  parent?: Item;
  loading = false;
  busy = false;
  error = "";
  sheet = "";
  devices: ListedDevice[] = [];
  player = "";
  tick = 0;
  menuItem?: Item;
  private api?: API;
  private requestId = 0;
  private cursor: number | string = 0;
  private timer?: ReturnType<typeof setInterval>;
  private searchTimer?: ReturnType<typeof setTimeout>;
  private initialized = false;
  private manualSession = false;
  private manualPlayer = false;
  private opener?: HTMLElement;
  setConfig(config: Config) {
    if (!config.spotify_entity?.startsWith("media_player."))
      throw new Error("spotify_entity moet een media_player-entiteit zijn.");
    if (
      config.ma_players &&
      (!Array.isArray(config.ma_players) ||
        config.ma_players.some((p) => !p.entity?.startsWith("media_player.")))
    )
      throw new Error(
        "ma_players moet een lijst met entity en optioneel name zijn.",
      );
    if (
      config.default_source &&
      !["spotify", "music_assistant", "radio"].includes(config.default_source)
    )
      throw new Error("Ongeldige default_source.");
    this.config = {
      ...config,
      ma_players: (config.ma_players ?? []).filter(
        (p) => !excluded(p.entity, p.name ?? "", config.excluded_devices),
      ),
    };
    this.source = config.default_source ?? "spotify";
    this.player =
      config.default_player ?? this.config.ma_players[0]?.entity ?? "";
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey) ?? "{}");
      if (["spotify", "music_assistant", "radio"].includes(saved.source))
        this.source = saved.source;
      if (NAV.includes(saved.view)) this.view = saved.view;
      if (this.config.ma_players.some((p) => p.entity === saved.player))
        this.player = saved.player;
    } catch {
      /* storage can be disabled */
    }
    if (!this.config.ma_players.some((p) => p.entity === this.player))
      this.player = this.config.ma_players[0]?.entity ?? "";
    this.session = this.source;
    this.manualSession = false;
    this.manualPlayer = false;
    this.initialized = false;
    this.api = undefined;
    this.requestId++;
  }
  static getStubConfig() {
    return {
      spotify_entity: "media_player.woonkamer_spotifyplus_jeroen_dunk",
      ma_players: [],
    };
  }
  getCardSize() {
    return 12;
  }
  private get storageKey() {
    return `dunk-music:${this.config.storage_key ?? this.config.spotify_entity}`;
  }
  private save() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          source: this.source,
          view: this.view,
          player: this.player,
        }),
      );
    } catch {
      /* optional persistence */
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.requestUpdate();
    this.timer = setInterval(() => this.tick++, 1000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.timer);
    clearTimeout(this.searchTimer);
    this.requestId++;
    this.initialized = false;
  }
  protected updated(changed: PropertyValues) {
    if (this.hass && this.config) {
      if (!this.api) this.api = new API(this.hass, this.config);
      else this.api.hass = this.hass;
      if (!this.initialized) {
        if (!this.players.some((p) => p.entity === this.player))
          this.player = this.players[0]?.entity ?? "";
        this.initialized = true;
        this.detectSession();
        void this.load();
      } else if (changed.has("hass")) this.detectSession();
    }
  }
  private detectSession() {
    if (
      !this.manualPlayer &&
      this.hass.states[this.player]?.state !== "playing"
    ) {
      const playing = this.players.find(
        (p) => this.hass.states[p.entity]?.state === "playing",
      );
      if (playing) {
        this.player = playing.entity;
        this.save();
      }
    }
    const sp = this.hass.states[this.config.spotify_entity];
    const ma = this.hass.states[this.player];
    // A library/target choice must not hide music playing on another route.
    // When both routes play, retain the explicitly chosen session.
    if (
      this.manualSession &&
      sp?.state === "playing" &&
      ma?.state === "playing"
    )
      return;
    if (sp?.state === "playing" && ma?.state !== "playing")
      this.session = "spotify";
    else if (ma?.state === "playing" && sp?.state !== "playing")
      this.session = "music_assistant";
  }
  private get players() {
    return this.config.ma_players.filter(
      (p) =>
        !excluded(
          p.entity,
          this.hass?.states[p.entity]?.attributes.friendly_name ?? p.name ?? "",
          this.config.excluded_devices,
        ),
    );
  }
  private get entity() {
    return this.session === "spotify"
      ? this.config.spotify_entity
      : this.player;
  }
  private get state() {
    return this.hass?.states[this.entity];
  }
  private get available() {
    return (
      !!this.state && !["unknown", "unavailable"].includes(this.state.state)
    );
  }
  private supports(bit: number) {
    return (
      this.available &&
      ((this.state?.attributes.supported_features ?? 0) & bit) !== 0
    );
  }
  private async action(fn: () => Promise<unknown>) {
    if (this.busy) return;
    this.busy = true;
    this.error = "";
    try {
      await fn();
    } catch (e) {
      this.error = e instanceof Error ? e.message : String(e);
    } finally {
      this.busy = false;
    }
  }
  private get radioView() {
    return (
      this.source === "radio" &&
      ["Radio", "Home", "Zoeken"].includes(this.view) &&
      !this.parent
    );
  }
  private async load(append = false) {
    if (!this.api || this.view === "Instellingen") return;
    const id = ++this.requestId;
    this.loading = true;
    this.error = "";
    if (!append) {
      this.cursor = 0;
      this.page = { items: [], more: false };
    }
    try {
      const p =
        this.source === "spotify"
          ? await this.api.spotify(
              this.view,
              this.kind,
              this.query,
              this.cursor,
              this.parent,
            )
          : this.radioView
            ? await this.api.radio(this.query, Number(this.cursor), this.player)
            : await this.api.ma(
                this.view,
                this.kind,
                this.query,
                Number(this.cursor),
                this.player,
                this.parent,
              );
      if (id !== this.requestId) return;
      this.page = {
        ...p,
        items: append ? [...this.page.items, ...p.items] : p.items,
      };
      this.cursor = p.next ?? Number(this.cursor) + p.items.length;
    } catch (e) {
      if (id === this.requestId)
        this.error = e instanceof Error ? e.message : String(e);
    } finally {
      if (id === this.requestId) this.loading = false;
    }
  }
  private navigate(view: string) {
    clearTimeout(this.searchTimer);
    this.requestId++;
    this.loading = false;
    this.view = view;
    this.parent = undefined;
    this.query = "";
    this.filter = "";
    if (view === "Radio") this.source = "radio";
    if (view === "Afspeellijsten" || view === "Home") this.kind = "playlist";
    if (view === "Favorieten" || view === "Recent afgespeeld")
      this.kind = "track";
    this.save();
    void this.load();
  }
  private changeSource(source: Source) {
    this.source = source;
    this.navigate(source === "radio" ? "Radio" : "Home");
  }
  private open(item: Item) {
    this.parent = item;
    this.filter = "";
    this.query = "";
    void this.load();
  }
  private play(item: Item, shuffle = false) {
    void this.action(async () => {
      if (this.source !== "spotify" && !this.player)
        throw new Error("Selecteer eerst een Music Assistant-luidspreker.");
      await this.api!.play(
        this.source === "spotify",
        this.player,
        item,
        this.parent,
        shuffle,
      );
      this.session = this.source;
      this.manualSession = true;
    });
  }
  private control(service: string, data: Data = {}) {
    void this.action(() =>
      this.api!.call("media_player", service, {
        entity_id: this.entity,
        ...data,
      }),
    );
  }
  private modal(name: string) {
    this.opener = this.shadowRoot?.activeElement as HTMLElement;
    this.sheet = name;
    void this.updateComplete.then(() =>
      this.shadowRoot?.querySelector<HTMLElement>(".sheet .close")?.focus(),
    );
  }
  private close() {
    this.sheet = "";
    void this.updateComplete.then(() => this.opener?.focus());
  }
  private trap(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      this.close();
    }
    if (e.key === "Tab") {
      const nodes = [
        ...this.shadowRoot!.querySelectorAll<HTMLElement>(
          ".sheet button:not(:disabled),.sheet input:not(:disabled),.sheet select:not(:disabled)",
        ),
      ];
      const first = nodes[0],
        last = nodes.at(-1);
      if (e.shiftKey && this.shadowRoot!.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && this.shadowRoot!.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
  private async refreshDevices() {
    const result = await this.api!.allDevices(this.player, this.session);
    this.devices = result.devices;
    this.error = result.warnings.join(" · ");
  }
  private showDevices() {
    this.devices = [];
    this.modal("devices");
    void this.action(() => this.refreshDevices());
  }
  private selectDevice(d: ListedDevice, transfer = false) {
    if (!d.available) return;
    void this.action(async () => {
      if (d.provider === "spotify") {
        await this.api!.sp("player_transfer_playback", {
          device_id: d.transferId ?? d.id,
          play:
            this.hass.states[this.config.spotify_entity]?.state === "playing",
        });
        this.session = "spotify";
      } else {
        if (transfer) {
          if (
            this.session === "spotify" ||
            !this.player ||
            d.id === this.player
          )
            throw new Error(
              "Overzetten is alleen beschikbaar tussen Music Assistant-kamers.",
            );
          await this.api!.call(
            "music_assistant",
            "transfer_queue",
            {
              source_player: this.player,
              auto_play: this.state?.state === "playing",
            },
            false,
            { entity_id: d.id },
          );
        }
        this.player = d.id;
        this.manualPlayer = true;
        this.session = "music_assistant";
      }
      this.manualSession = true;
      this.detectSession();
      // Choosing a route also selects the matching library; never starts playback.
      if (d.provider === "spotify" && this.source !== "spotify")
        this.changeSource("spotify");
      else if (d.provider === "music_assistant" && this.source === "spotify")
        this.changeSource("music_assistant");
      this.save();
      this.api!.cache.clear();
      await this.refreshDevices();
    });
  }
  private art(image: string, title = "", cls = "") {
    return image
      ? html`<img
          class=${cls}
          src=${safeImage(image)}
          alt=${title}
          loading="lazy"
          @error=${(e: Event) => {
            (e.target as HTMLImageElement).style.visibility = "hidden";
          }}
        />`
      : html`<span class=${`art ${cls}`} aria-hidden="true">♪</span>`;
  }
  private controls(extra = false) {
    const a = this.state?.attributes ?? {};
    return html`<div class="controls">
      <button
        title="Shuffle"
        aria-label="Shuffle"
        aria-pressed=${!!a.shuffle}
        class=${a.shuffle ? "active" : ""}
        ?disabled=${!this.supports(32768) || this.busy}
        @click=${() => this.control("shuffle_set", { shuffle: !a.shuffle })}
      >
        ${icon("shuffle")}</button
      ><button
        aria-label="Vorig nummer"
        ?disabled=${!this.supports(16) || this.busy}
        @click=${() => this.control("media_previous_track")}
      >
        ${icon("previous")}</button
      >${this.toggle()}<button
        aria-label="Volgend nummer"
        ?disabled=${!this.supports(32) || this.busy}
        @click=${() => this.control("media_next_track")}
      >
        ${icon("next")}</button
      ><button
        aria-label=${`Herhalen: ${a.repeat ?? "off"}`}
        class=${a.repeat && a.repeat !== "off" ? "active" : ""}
        ?disabled=${!this.supports(262144) || this.busy}
        @click=${() => this.control("repeat_set", { repeat: a.repeat === "off" ? "all" : a.repeat === "all" ? "one" : "off" })}
      >
        ↻${a.repeat === "one" ? "1" : ""}
      </button>
      ${
        extra
          ? html`<button
              aria-label="Wachtrij openen"
              @click=${() => {
                this.source = this.session;
                this.navigate("Wachtrij");
              }}
            >
              ${icon("queue")}
            </button>`
          : nothing
      }
      ${
        extra &&
        this.session === "spotify" &&
        a.media_content_id?.startsWith("spotify:track:")
          ? html`<button
              aria-label="Favorieten huidig nummer"
              @click=${() => {
                this.menuItem = {
                  id: a.media_content_id.split(":").at(-1),
                  uri: a.media_content_id,
                  title: a.media_title,
                  kind: "track",
                  playable: true,
                } as Item;
                this.modal("options");
              }}
            >
              ♡
            </button>`
          : nothing
      }
    </div>`;
  }
  private toggle() {
    return html`<button
      class="accent"
      aria-label=${this.state?.state === "playing" ? "Pauzeren" : "Afspelen"}
      ?disabled=${this.busy || !this.supports(this.state?.state === "playing" ? 1 : 16384)}
      @click=${() => this.control(this.state?.state === "playing" ? "media_pause" : "media_play")}
    >
      ${icon(this.state?.state === "playing" ? "pause" : "play")}
    </button>`;
  }
  private seek() {
    const duration = this.state?.attributes.media_duration ?? 0;
    return html`<div class="full-progress">
      <small>${time(position(this.state))}</small
      ><input
        aria-label="Afspeelpositie"
        type="range"
        min="0"
        max=${duration || 1}
        .value=${String(position(this.state))}
        ?disabled=${!duration || !this.supports(2) || this.busy}
        @change=${(e: Event) => this.control("media_seek", { seek_position: Number((e.target as HTMLInputElement).value) })}
      /><small>−${time(duration - position(this.state))}</small>
    </div>`;
  }
  private volume() {
    return html`<input
      type="range"
      aria-label="Volume"
      min="0"
      max="1"
      step="0.01"
      .value=${String(this.state?.attributes.volume_level ?? 0)}
      ?disabled=${!this.supports(4) || this.busy}
      @change=${(e: Event) => this.control("volume_set", { volume_level: Number((e.target as HTMLInputElement).value) })}
    />`;
  }
  private track(item: Item) {
    return html`<div class="track" role="listitem">
      <span class="position">${item.position + 1}</span
      ><button
        class="play"
        ?disabled=${!item.playable || this.busy}
        @click=${() => this.play(item)}
      >
        ${this.art(item.image)}<span class="metadata"
          ><b>${item.title}</b><small>${item.artist}</small></span
        ></button
      ><span class="album">${item.album}</span
      ><span class="duration">${item.duration ? time(item.duration) : "—"}</span
      ><button
        aria-label=${`Opties voor ${item.title}`}
        @click=${() => {
          this.menuItem = item;
          this.modal("options");
        }}
      >
        •••
      </button>
    </div>`;
  }
  private content() {
    if (this.view === "Instellingen") return this.settings();
    const items = this.page.items.filter((i) =>
      `${i.title} ${i.artist} ${i.album}`
        .toLowerCase()
        .includes(this.filter.toLowerCase()),
    );
    const collections = items.filter((i) => i.browsable);
    const tracks = items.filter((i) => !i.browsable);
    return html`${
        this.parent
          ? html`<button
                @click=${() => {
                  this.parent = undefined;
                  this.filter = "";
                  void this.load();
                }}
              >
                ← Terug
              </button>
              <div class="hero">
                ${this.art(this.parent.image)}
                <div>
                  <h1>${this.parent.title}</h1>
                  <p class="muted">
                    ${this.page.total ?? this.page.items.length}${this.page.more && this.page.total == null ? "+" : ""}
                    nummers
                  </p>
                  <button
                    class="accent"
                    ?disabled=${this.busy || !this.parent.playable}
                    @click=${() => this.play(this.parent!)}
                  >
                    Alles afspelen
                  </button>
                  <button
                    ?disabled=${this.busy || !this.parent.playable}
                    @click=${() => this.play(this.parent!, true)}
                  >
                    Shuffle afspelen
                  </button>
                </div>
              </div>
              <input
                aria-label="Zoeken binnen afspeellijst"
                placeholder="Zoek in geladen nummers"
                .value=${this.filter}
                @input=${(e: Event) => (this.filter = (e.target as HTMLInputElement).value)}
              />`
          : html`<h1>${this.view}</h1>
              <div class="toolbar">
                ${
                  ["Bibliotheek", "Home", "Zoeken"].includes(this.view)
                    ? html`<select
                        aria-label="Bibliotheektype"
                        .value=${this.kind}
                        @change=${(e: Event) => {
                          this.kind = (e.target as HTMLSelectElement).value;
                          void this.load();
                        }}
                      >
                        ${[
                          ["playlist", "Afspeellijsten"],
                          ["track", "Nummers"],
                          ["album", "Albums"],
                          ["artist", "Artiesten"],
                          [
                            this.source === "spotify" ? "show" : "podcast",
                            "Podcasts",
                          ],
                        ].map(
                          ([v, n]) => html`<option value=${v}>${n}</option>`,
                        )}
                      </select>`
                    : nothing
                }<input
                  aria-label="Muziek zoeken"
                  placeholder="Wat wil je luisteren?"
                  .value=${this.query}
                  @input=${(e: Event) => {
                    this.query = (e.target as HTMLInputElement).value;
                    clearTimeout(this.searchTimer);
                    this.requestId++;
                    this.searchTimer = setTimeout(() => void this.load(), 400);
                  }}
                /><button
                  aria-label="Vernieuwen"
                  ?disabled=${this.loading}
                  @click=${() => {
                    this.api?.cache.clear();
                    void this.load();
                  }}
                >
                  ↻
                </button>
              </div>`
      }
      ${
        this.radioView
          ? html`<p class="muted">
                Kies bovenaan een doelkamer en klik een zender om radio af te
                spelen. De standaardzenders werken ook zonder opgeslagen
                radiofavorieten.
              </p>
              <div class="tiles radio-tiles">
                ${items
                  .filter((i) => i.kind === "radio")
                  .map(
                    (i) =>
                      html`<button
                        class="tile"
                        aria-label=${`Speel ${i.title}`}
                        ?disabled=${this.busy || (!this.api?.has("music_assistant", "play_media") && !!i.uri)}
                        @click=${() => {
                          if (i.uri) this.play(i);
                          else {
                            this.query = i.title;
                            void this.load();
                          }
                        }}
                      >
                        ${this.art(i.image, i.title)}<span
                          ><b>${i.title}</b
                          ><small
                            >${i.uri ? "Afspelen" : "Zoeken in Music Assistant"}</small
                          ></span
                        >
                      </button>`,
                  )}
              </div>
              <br />`
          : nothing
      }
      ${this.page.note ? html`<p class="note">${this.page.note}</p>` : nothing}
      <div class="tiles">
        ${collections.map(
          (i) =>
            html`<button class="tile" @click=${() => this.open(i)}>
              ${this.art(i.image)}<span
                ><b>${i.title}</b><small>${i.artist || i.kind}</small></span
              >
            </button>`,
        )}
      </div>
      <div class="tracks" role="list" aria-label="Nummers">
        ${tracks.filter((i) => !this.radioView || i.kind !== "radio").map((i) => this.track(i))}
      </div>
      ${
        this.loading
          ? html`<div role="status" aria-label="Laden">
              <div class="skeleton"></div>
              <div class="skeleton"></div>
              <div class="skeleton"></div>
            </div>`
          : !items.length && !this.error
            ? html`<p class="note">
                Geen resultaten. Kies een andere collectie of zoekopdracht.
              </p>`
            : nothing
      }${this.page.more ? html`<button class="more" ?disabled=${this.loading} @click=${() => void this.load(true)}>Meer laden</button>` : nothing}`;
  }
  private settings() {
    return html`<div class="settings">
      <h1>Instellingen</h1>
      <p>Dunk Music 0.1.2</p>
      <p>Configuratie via kaart-YAML. Geen tokens of wachtwoorden nodig.</p>
      <p>
        Spotify: <code>${this.config.spotify_entity}</code> —
        ${this.hass.states[this.config.spotify_entity]?.state ?? "ontbreekt"}
      </p>
      <h2>Music Assistant-kamers</h2>
      ${this.players.map((p) => {
        const s = this.hass.states[p.entity];
        return html`<label
          >${p.name ?? p.entity} · ${s?.state ?? "ontbreekt"}<input
            aria-label=${`Volume ${p.name ?? p.entity}`}
            type="range"
            min="0"
            max="1"
            step="0.01"
            .value=${String(s?.attributes.volume_level ?? 0)}
            ?disabled=${!s || s.state === "unavailable" || !(s.attributes.supported_features & 4) || this.busy}
            @change=${(e: Event) => void this.action(() => this.api!.call("media_player", "volume_set", { entity_id: p.entity, volume_level: Number((e.target as HTMLInputElement).value) }))}
        /></label>`;
      })}
      <h2>Beschikbare koppelingen</h2>
      ${["spotifyplus", "music_assistant"].map((d) => html`<p>${d}: ${Object.keys(this.hass.services[d] ?? {}).length} acties</p>`)}
      <p>
        Niet ondersteunde acties tonen een foutmelding; er wordt geen
        alternatieve of fictieve actie verstuurd. Google TV: controleer in
        Ontwikkelaarstools welke entiteit de Music Assistant-speler is en pas
        ma_players aan.
      </p>
      <button
        @click=${() => {
          this.session = "music_assistant";
          this.showDevices();
        }}
      >
        Kamers en groepen
      </button>
    </div>`;
  }
  private favorite(remove: boolean) {
    const item = this.menuItem;
    if (!item) return;
    void this.action(async () => {
      await this.api!.sp(
        remove ? "remove_track_favorites" : "save_track_favorites",
        { ids: item.id },
      );
      this.api!.cache.clear();
      this.close();
      if (this.view === "Favorieten") await this.load();
    });
  }
  private sheetContent() {
    if (this.sheet === "devices")
      return html`<h2 id="dialog-title">Alle apparaten</h2>
        <p class="muted">
          Spotify Connect en Music Assistant in één lijst. Een Music
          Assistant-kamer kiezen start geen muziek. Spotify Connect verplaatst
          alleen de Spotify-sessie.
        </p>
        ${this.busy && !this.devices.length ? html`<p role="status">Apparaten laden…</p>` : nothing}
        ${this.devices.map(
          (d) =>
            html`<div
              class=${`device ${d.active || d.selected ? "active" : ""}`}
            >
              <button
                ?disabled=${!d.available || this.busy}
                @click=${() => this.selectDevice(d)}
              >
                ${d.name} ·
                ${d.provider === "spotify" ? (d.cast ? "Spotify Connect · Google Cast" : d.local ? "Spotify Connect · Lokaal" : "Spotify Connect") : "Music Assistant"}
                ·
                ${!d.available ? "Niet beschikbaar" : d.active ? (d.provider === "spotify" ? "Actief" : "Speelt") : d.selected ? "Geselecteerd" : "Beschikbaar"}
              </button>
              ${
                d.provider === "music_assistant" &&
                this.session !== "spotify" &&
                d.id !== this.player
                  ? html`
                      <button
                        ?disabled=${!d.available || this.busy || !this.api?.has("music_assistant", "transfer_queue")}
                        @click=${() => this.selectDevice(d, true)}
                      >
                        Overzetten
                      </button>
                      ${this.supports(524288) ? html`<button ?disabled=${!d.available || this.busy || !((this.hass.states[d.id]?.attributes.supported_features ?? 0) & 524288)} @click=${() => void this.action(() => this.api!.call("media_player", "join", { entity_id: this.player, group_members: [d.id] }))}>Groeperen</button>` : nothing}
                    `
                  : nothing
              }
            </div>`,
        )}
        ${!this.busy && !this.devices.length ? html`<p>Geen apparaten beschikbaar.</p>` : nothing}
        ${this.session !== "spotify" && this.supports(524288) ? html`<button ?disabled=${this.busy} @click=${() => this.control("unjoin")}>Groep verlaten</button>` : nothing}`;
    if (this.sheet === "options")
      return html`<h2 id="dialog-title">${this.menuItem?.title}</h2>
        <div class="controls">
          ${this.source === "spotify" && this.menuItem?.kind === "track" ? html`<button ?disabled=${this.busy || !this.api?.has("spotifyplus", "save_track_favorites")} @click=${() => this.favorite(false)}>♡ Favoriet toevoegen</button><button ?disabled=${this.busy || !this.api?.has("spotifyplus", "remove_track_favorites")} @click=${() => this.favorite(true)}>Favoriet verwijderen</button>` : html`<p>Favorieten beheren voor dit type doe je in de bronapp.</p>`}<button
            ?disabled=${this.busy || !this.menuItem?.playable}
            @click=${() =>
              void this.action(async () => {
                if (this.source === "spotify")
                  await this.api!.sp("add_player_queue_items", {
                    uris: this.menuItem!.uri,
                  });
                else
                  await this.api!.call(
                    "music_assistant",
                    "play_media",
                    {
                      media_id: this.menuItem!.uri,
                      media_type: this.menuItem!.kind,
                      enqueue: "add",
                    },
                    false,
                    { entity_id: this.player },
                  );
                this.close();
              })}
          >
            Aan wachtrij toevoegen
          </button>
        </div>`;
    const a = this.state?.attributes ?? {};
    return html`<h2 id="dialog-title">
        Nu afgespeeld ·
        ${this.session === "spotify" ? "Spotify Connect" : "Music Assistant"}
      </h2>
      ${this.art(a.entity_picture ?? "", a.media_title, "large")}
      <h2>${a.media_title ?? "Geen actieve muziek"}</h2>
      <p>${a.media_artist ?? ""}</p>
      ${this.seek()}${this.controls()}<label>Volume${this.volume()}</label
      ><button @click=${() => this.showDevices()}>
        ${a.source ?? a.friendly_name ?? "Apparaat kiezen"}</button
      ><button
        @click=${() => {
          this.source = this.session;
          this.close();
          this.navigate("Wachtrij");
        }}
      >
        Wachtrij</button
      >${
        this.session === "spotify" &&
        a.media_content_id?.startsWith("spotify:track:")
          ? html`<button
              @click=${() => {
                this.menuItem = {
                  id: a.media_content_id.split(":").at(-1),
                  uri: a.media_content_id,
                  title: a.media_title,
                  kind: "track",
                } as Item;
                this.sheet = "options";
              }}
            >
              ♡ Favorieten
            </button>`
          : nothing
      }`;
  }
  render() {
    if (!this.config || !this.hass) return html`<p>Home Assistant laden…</p>`;
    const a = this.state?.attributes ?? {};
    const nav = (this.config.navigation ?? NAV).filter((n) => NAV.includes(n));
    const accent = /^#[\da-f]{6}$/i.test(this.config.accent_color ?? "")
      ? this.config.accent_color
      : "#1ed760";
    const height = /^(\d+(px|vh|dvh)|calc\([\d\s()+*/.\-a-z]+\))$/.test(
      this.config.height ?? "",
    )
      ? this.config.height
      : "calc(100dvh - 72px)";
    return html`<div
      class=${this.config.mobile_compact === false ? "app roomy" : "app"}
      style=${`--accent:${accent};--height:${height}`}
    >
      <header ?inert=${!!this.sheet}>
        <strong>Dunk Music<small class="version"> v0.1.2</small></strong
        ><select
          aria-label="Muziekbron"
          .value=${this.source}
          @change=${(e: Event) => this.changeSource((e.target as HTMLSelectElement).value as Source)}
        >
          <option value="spotify">Spotify</option>
          <option value="music_assistant">Music Assistant</option>
          <option value="radio">Radio</option></select
        >${
          this.source !== "spotify"
            ? html`<select
                aria-label="Doelkamer"
                .value=${this.player}
                @change=${(e: Event) => {
                  this.player = (e.target as HTMLSelectElement).value;
                  this.manualPlayer = true;
                  this.save();
                  void this.load();
                }}
              >
                ${this.players.map((p) => html`<option value=${p.entity} ?disabled=${!this.hass.states[p.entity] || ["unknown", "unavailable"].includes(this.hass.states[p.entity]?.state)}>${p.name ?? this.hass.states[p.entity]?.attributes.friendly_name ?? p.entity}</option>`)}
              </select>`
            : nothing
        }<select
          aria-label="Bedien afspeelsessie"
          .value=${live(this.session === "spotify" ? "spotify" : "music_assistant")}
          @change=${(e: Event) => {
            this.session = (e.target as HTMLSelectElement).value as Source;
            this.manualSession = true;
            this.manualPlayer = false;
            this.detectSession();
          }}
        >
          <option value="spotify">Speler: Spotify</option>
          <option value="music_assistant">Speler: Music Assistant</option>
        </select>
      </header>
      <div
        ?inert=${!!this.sheet}
        class=${`workspace ${this.config.desktop_now_playing === false ? "no-right" : ""}`}
      >
        <aside class="left nav" aria-label="Hoofdnavigatie">
          ${nav.map((n) => html`<button class=${this.view === n ? "active" : ""} @click=${() => this.navigate(n)}>${n}</button>`)}
        </aside>
        <main>
          ${this.error ? html`<div class="error" role="alert">${this.error}</div>` : nothing}${this.content()}
        </main>
        ${
          this.config.desktop_now_playing !== false
            ? html`<aside class="right">
                <h2>Nu afgespeeld</h2>
                ${this.art(a.entity_picture ?? "", a.media_title, "right-art")}
                <h2>${a.media_title ?? "Geen muziek"}</h2>
                <p class="muted">${a.media_artist}</p>
                <p>
                  ${this.session === "spotify" ? "Spotify Connect" : "Music Assistant"}
                </p>
                <button @click=${() => this.modal("now")}>
                  Volledige speler
                </button>
              </aside>`
            : nothing
        }
      </div>
      <footer
        ?inert=${!!this.sheet}
        class="player"
        aria-label="Permanente muziekspeler"
      >
        <button class="now" @click=${() => this.modal("now")}>
          ${this.art(a.entity_picture ?? "")}<span class="metadata"
            ><b>${a.media_title ?? "Geen actieve muziek"}</b
            ><small
              >${a.media_artist ?? ""} ·
              ${a.source ?? a.friendly_name ?? "Geen apparaat"}</small
            ></span
          >
        </button>
        <div class="desktop-controls">${this.controls(true)}${this.seek()}</div>
        <span class="mobile-toggle">${this.toggle()}</span
        ><button aria-label="Apparaten" @click=${() => this.showDevices()}>
          ${icon("devices")}
        </button>
        <div class="volume">${this.volume()}</div>
        <div class="progress" aria-hidden="true">
          <div
            style=${`width:${Math.min(100, (100 * position(this.state)) / (a.media_duration || 1))}%`}
          ></div>
        </div>
      </footer>
      <nav ?inert=${!!this.sheet} class="bottom" aria-label="Mobiele navigatie">
        ${nav.filter((n) => ["Home", "Zoeken", "Bibliotheek"].includes(n)).map((n) => html`<button class=${this.view === n ? "active" : ""} @click=${() => this.navigate(n)}>${n}</button>`)}<button
          @click=${() => this.modal("nav")}
        >
          Meer
        </button>
      </nav>
      ${
        this.sheet
          ? html`<div
              class="overlay"
              @click=${(e: Event) => {
                if (e.target === e.currentTarget) this.close();
              }}
            >
              <section
                class="sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                @keydown=${this.trap}
              >
                <button
                  class="close"
                  aria-label="Sluiten"
                  @click=${() => this.close()}
                >
                  ✕</button
                >${this.error ? html`<p class="error" role="alert">${this.error}</p>` : nothing}${
                  this.sheet === "nav"
                    ? html`<h2 id="dialog-title">Navigatie</h2>
                        <div class="nav">
                          ${nav.map(
                            (n) =>
                              html`<button
                                @click=${() => {
                                  this.close();
                                  this.navigate(n);
                                }}
                              >
                                ${n}
                              </button>`,
                          )}
                        </div>`
                    : this.sheetContent()
                }
              </section>
            </div>`
          : nothing
      }
    </div>`;
  }
}
if (!customElements.get("dunk-music-card"))
  customElements.define("dunk-music-card", DunkMusicCard);
const w = window as unknown as { customCards: Data[] };
w.customCards = w.customCards ?? [];
if (!w.customCards.some((c) => c.type === "dunk-music-card"))
  w.customCards.push({
    type: "dunk-music-card",
    name: "Dunk Music",
    description: "SpotifyPlus en Music Assistant in één muziekdashboard",
    preview: false,
  });
