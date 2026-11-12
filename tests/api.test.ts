import { errorMessage } from "../src/errors";
import { describe, it, expect, vi } from "vitest";
import { API } from "../src/api";
import {
  normalize,
  excluded,
  position,
  safeImage,
  type Hass,
  type Config,
} from "../src/types";
const config: Config = {
  type: "custom:dunk-music-card",
  spotify_entity: "media_player.spotify",
  ma_players: [{ entity: "media_player.room" }],
};
const track = {
  id: "t1",
  uri: "spotify:track:t1",
  name: "Song",
  type: "track",
  artists: [{ name: "Artist" }],
  album: { name: "Album", images: [{ url: "https://example.com/art.jpg" }] },
  duration_ms: 180000,
};
function setup(
  result: any,
  domain = "spotifyplus",
  service = "get_playlist_items",
) {
  const hass: Hass = {
    states: {
      "media_player.room": {
        state: "idle",
        attributes: { friendly_name: "Room" },
      },
    },
    services: { [domain]: { [service]: {} } },
    callWS: vi.fn().mockResolvedValue({ response: result }),
    callService: vi.fn().mockResolvedValue({}),
  };
  return { hass, api: new API(hass, config) };
}
describe("normalization and isolation", () => {
  it("retains track identity instead of replacing it with its album", () => {
    expect(normalize(track)).toMatchObject({
      id: "t1",
      title: "Song",
      album: "Album",
      artist: "Artist",
      duration: 180,
      image: "https://example.com/art.jpg",
    });
  });
  it("unwraps Spotify wrappers and MA queue items", () => {
    expect(normalize({ track })).toEqual(normalize(track));
    expect(
      normalize({
        media_item: {
          uri: "library://track/1",
          name: "MA",
          media_type: "track",
          image: "/api/image",
        },
      }),
    ).toMatchObject({ title: "MA", image: "/api/image" });
  });
  it("handles unavailable tracks without playable URIs", () => {
    expect(normalize({ track: null }).playable).toBe(false);
    expect(normalize({ ...track, is_local: true }).playable).toBe(false);
  });
  it("excludes Metz by name or id regardless of case", () => {
    expect(excluded("id", "Metz TV Slaapkamer")).toBe(true);
    expect(excluded("media_player.metz", "TV")).toBe(true);
    expect(excluded("id", "Auto", ["auto"])).toBe(true);
    expect(excluded("id", "Marshall")).toBe(false);
  });
  it("rejects unsafe image schemes", () => {
    expect(safeImage("javascript:alert(1)")).toBe("");
    expect(safeImage("//evil")).toBe("");
  });
  it("extrapolates playing position and clamps to duration", () => {
    expect(
      position({
        state: "playing",
        attributes: {
          media_position: 9,
          media_duration: 10,
          media_position_updated_at: new Date(Date.now() - 4000).toISOString(),
        },
      }),
    ).toBe(10);
  });
});
describe("supported API contracts", () => {
  it("uses HA websocket response protocol and preserves original track indices", async () => {
    const { hass, api } = setup({
      result: { items: [{ track }], total: 51, next: "next" },
    });
    const p = await api.spotify(
      "Afspeellijsten",
      "playlist",
      "",
      50,
      normalize({ id: "p", uri: "spotify:playlist:p", type: "playlist" }),
    );
    expect(p.items[0].position).toBe(50);
    expect(p.more).toBe(true);
    expect(hass.callWS).toHaveBeenCalledWith({
      type: "call_service",
      domain: "spotifyplus",
      service: "get_playlist_items",
      service_data: {
        entity_id: config.spotify_entity,
        playlist_id: "p",
        limit: 50,
        offset: 50,
      },
      return_response: true,
    });
    expect(hass.callService).not.toHaveBeenCalled();
  });
  it("plays selected track at its original playlist position", async () => {
    const { hass, api } = setup({}, "spotifyplus", "player_media_play_context");
    await api.play(
      true,
      "",
      normalize(track, 23),
      normalize({ uri: "spotify:playlist:p", type: "playlist" }),
    );
    expect(hass.callService).toHaveBeenCalledWith(
      "spotifyplus",
      "player_media_play_context",
      {
        entity_id: config.spotify_entity,
        context_uri: "spotify:playlist:p",
        offset_position: 23,
        offset_uri: track.uri,
      },
      undefined,
    );
  });
  it("deduplicates cached requests", async () => {
    const { hass, api } = setup(
      { result: { items: [] } },
      "spotifyplus",
      "get_playlist_favorites",
    );
    await Promise.all([
      api.spotify("Home", "playlist", ""),
      api.spotify("Home", "playlist", ""),
    ]);
    expect(hass.callWS).toHaveBeenCalledTimes(1);
  });
  it("fails safely for missing services", async () => {
    const { hass, api } = setup({});
    await expect(api.sp("invented_action")).rejects.toThrow("ontbreekt");
    expect(hass.callService).not.toHaveBeenCalled();
  });
  it("does not cache failed responses and enforces rate-limit backoff", async () => {
    const { hass, api } = setup({});
    vi.mocked(hass.callWS).mockRejectedValueOnce(
      new Error("429 Too many requests"),
    );
    await expect(api.sp("get_playlist_items", {}, true)).rejects.toThrow("429");
    await expect(api.sp("get_playlist_items", {}, true)).rejects.toThrow(
      "API-limiet",
    );
    expect(hass.callWS).toHaveBeenCalledTimes(1);
  });
  it("filters real Spotify devices and marks restricted devices unavailable", async () => {
    const { api } = setup(
      {
        result: [
          { id: "1", name: "Metz TV Slaapkamer" },
          { id: "2", name: "Phone", is_active: true },
          { id: "3", name: "Offline", is_restricted: true },
        ],
      },
      "spotifyplus",
      "get_player_devices",
    );
    expect(await api.devices(true, "")).toEqual([
      { id: "2", name: "Phone", active: true, available: true },
      { id: "3", name: "Offline", active: false, available: false },
    ]);
  });
  it("uses MA entity target and start_item for playlist playback", async () => {
    const { api, hass } = setup({}, "music_assistant", "play_media");
    await api.play(
      false,
      "media_player.room",
      normalize({ uri: "library://track/1", media_type: "track" }),
      normalize({ uri: "library://playlist/2", media_type: "playlist" }),
    );
    expect(hass.callService).toHaveBeenCalledWith(
      "music_assistant",
      "play_media",
      {
        media_id: "library://playlist/2",
        media_type: "playlist",
        start_item: "library://track/1",
        enqueue: "replace",
      },
      { entity_id: "media_player.room" },
    );
  });
  it("does not pass playlist URI as start_item for play all", async () => {
    const { api, hass } = setup({}, "music_assistant", "play_media");
    const p = normalize({
      uri: "library://playlist/2",
      media_type: "playlist",
    });
    await api.play(false, "media_player.room", p, p);
    expect(vi.mocked(hass.callService).mock.calls[0][2]).not.toHaveProperty(
      "start_item",
    );
  });
  it("unwraps entity-keyed MA queue responses without inventing the remaining queue", async () => {
    const { api } = setup(
      {
        "media_player.room": {
          items: 8,
          current_item: {
            media_item: {
              uri: "library://track/1",
              name: "Current",
              media_type: "track",
            },
          },
          next_item: null,
        },
      },
      "music_assistant",
      "get_queue",
    );
    const p = await api.ma("Wachtrij", "track", "", 0, "media_player.room");
    expect(p.items[0].title).toBe("Current");
    expect(p.note).toContain("8 items");
    expect(p.more).toBe(false);
  });
});
describe("MA Python registration schemas (UI field groups must be flattened)", () => {
  it("sends flat library pagination fields", async () => {
    const { hass, api } = setup(
      { items: [] },
      "music_assistant",
      "get_library",
    );
    api.config = { ...config, ma_config_entry_id: "entry" };
    await api.ma("Bibliotheek", "playlist", "", 50, "media_player.room");
    expect(hass.callWS).toHaveBeenCalledWith({
      type: "call_service",
      domain: "music_assistant",
      service: "get_library",
      return_response: true,
      service_data: {
        config_entry_id: "entry",
        media_type: "playlist",
        limit: 50,
        offset: 50,
      },
    });
  });
  it("sends flat search limit", async () => {
    const { hass, api } = setup({ radio: [] }, "music_assistant", "search");
    api.config = { ...config, ma_config_entry_id: "entry" };
    await api.ma("Radio", "radio", "Qmusic", 0, "media_player.room");
    expect(hass.callWS).toHaveBeenCalledWith({
      type: "call_service",
      domain: "music_assistant",
      service: "search",
      return_response: true,
      service_data: {
        config_entry_id: "entry",
        name: "Qmusic",
        media_type: ["radio"],
        limit: 50,
      },
    });
  });
  it("rejects unavailable MA targets before sending playback", async () => {
    const { api, hass } = setup({}, "music_assistant", "play_media");
    hass.states["media_player.room"].state = "unavailable";
    await expect(
      api.play(false, "media_player.room", normalize(track)),
    ).rejects.toThrow("niet beschikbaar");
    expect(hass.callService).not.toHaveBeenCalled();
  });
});
describe("Spotify saved podcast and removed-item contracts", () => {
  it("unwraps saved shows without confusing a containing album with a track", () => {
    expect(
      normalize({
        added_at: "2026-01-01",
        show: {
          id: "show1",
          uri: "spotify:show:show1",
          name: "Podcast",
          type: "show",
        },
      }),
    ).toMatchObject({ id: "show1", title: "Podcast", browsable: true });
  });
  it("keeps null playlist entries non-playable while preserving their position", () => {
    expect(normalize(null, 7)).toMatchObject({ position: 7, playable: false });
  });
});
describe("combined device list", () => {
  it("returns both playback routes, including separate devices with identical names", async () => {
    const { hass, api } = setup(
      { result: [{ id: "cast", name: "Room", is_active: true }] },
      "spotifyplus",
      "get_player_devices",
    );
    hass.states["media_player.room"].state = "playing";
    const result = await api.allDevices("media_player.room", "spotify");
    expect(result.devices).toHaveLength(2);
    expect(result.devices.map((d) => d.provider)).toEqual([
      "spotify",
      "music_assistant",
    ]);
    expect(result.devices[1]).toMatchObject({ active: true, selected: true });
  });
  it("keeps MA devices when Spotify is unavailable and reports the failed source", async () => {
    const { api } = setup({});
    const result = await api.allDevices("media_player.room", "music_assistant");
    expect(result.devices).toHaveLength(1);
    expect(result.devices[0]).toMatchObject({
      provider: "music_assistant",
      active: false,
      selected: true,
    });
    expect(result.warnings[0]).toContain("Spotify Connect");
  });
  it("excludes a Metz device even if its configured alias hides the real name", async () => {
    const { api, hass } = setup(
      { result: [] },
      "spotifyplus",
      "get_player_devices",
    );
    api.config = {
      ...config,
      ma_players: [{ entity: "media_player.room", name: "Bedroom" }],
    };
    hass.states["media_player.room"].attributes.friendly_name =
      "Metz TV Slaapkamer";
    expect(
      (await api.allDevices("media_player.room", "spotify")).devices,
    ).toEqual([]);
  });
});
describe("local SpotifyPlus directory", () => {
  it("includes dormant Google Cast devices absent from the web API, merges activated aliases, and excludes Metz", async () => {
    const { api, hass } = setup({}, "spotifyplus", "get_player_devices");
    hass.services.spotifyplus.get_spotify_connect_devices = {};
    vi.mocked(hass.callWS).mockImplementation(
      async (m: any) =>
        ({
          response: {
            result:
              m.service === "get_player_devices"
                ? [
                    { id: "cast-active-id", name: "Nest", is_active: true },
                    { id: "phone", name: "iPhone" },
                  ]
                : {
                    Items: [
                      {
                        Id: "cast-directory-id",
                        DeviceIdActivated: "cast-active-id",
                        Name: "Nest",
                        IsChromeCast: true,
                        IsInDeviceList: false,
                        IsRestricted: true,
                        DiscoveryResult: { IsDynamicDevice: false },
                      },
                      {
                        Id: "local-2",
                        Name: "Boven",
                        IsChromeCast: true,
                        IsInDeviceList: false,
                      },
                      {
                        Id: "metz",
                        Name: "Metz TV Slaapkamer",
                        IsChromeCast: true,
                      },
                    ],
                  },
          },
        }) as any,
    );
    const result = await api.allDevices("media_player.room", "spotify");
    expect(result.devices.filter((d) => d.provider === "spotify")).toHaveLength(
      3,
    );
    expect(result.devices.find((d) => d.name === "Nest")).toMatchObject({
      id: "cast-directory-id",
      transferId: "cast-directory-id",
      active: true,
      available: true,
      local: true,
      cast: true,
    });
    expect(result.devices.some((d) => d.id === "cast-active-id")).toBe(false);
    expect(result.devices.find((d) => d.name === "Boven")).toMatchObject({
      available: true,
    });
  });
  it("preserves online and MA devices with a visible diagnostic when local discovery fails", async () => {
    const { api, hass } = setup(
      { result: [{ id: "phone", name: "iPhone" }] },
      "spotifyplus",
      "get_player_devices",
    );
    hass.services.spotifyplus.get_spotify_connect_devices = {};
    vi.mocked(hass.callWS).mockImplementation(async (m: any) => {
      if (m.service === "get_spotify_connect_devices")
        throw new Error("mDNS unavailable");
      return { response: { result: [{ id: "phone", name: "iPhone" }] } } as any;
    });
    const result = await api.allDevices("media_player.room", "spotify");
    expect(result.devices).toHaveLength(2);
    expect(result.warnings.join(" ")).toContain("mDNS unavailable");
  });
  it("does not disable a local device simply because it is not in the Spotify web list", async () => {
    const { api, hass } = setup(
      {
        result: {
          Items: [
            {
              Id: "sleeping-cast",
              Name: "Nest Mini",
              IsChromeCast: true,
              IsInDeviceList: false,
              IsActiveDevice: false,
            },
          ],
        },
      },
      "spotifyplus",
      "get_spotify_connect_devices",
    );
    const result = await api.devices(true, "");
    expect(result[0]).toMatchObject({
      id: "sleeping-cast",
      available: true,
      active: false,
    });
  });
});
describe("working radio presets", () => {
  it("shows six playable stations with bundled logos even without MA search/library services", async () => {
    const { api } = setup({});
    const page = await api.radio("", 0, "media_player.room");
    expect(page.items).toHaveLength(6);
    expect(
      page.items.every(
        (i) =>
          i.playable &&
          i.uri.startsWith("https://") &&
          i.image.startsWith("data:image/"),
      ),
    ).toBe(true);
    expect(page.note).toBeTruthy();
  });
  it("fills stream and logo defaults for existing name-only radio YAML", async () => {
    const { api } = setup({});
    api.config = { ...config, radio_stations: [{ name: "Qmusic" }] };
    const page = await api.radio("", 0, "media_player.room");
    expect(page.items[0]).toMatchObject({
      uri: "https://stream.qmusic.nl/qmusic/mp3",
      playable: true,
    });
    expect(page.items[0].image).toContain("base64,");
  });
  it("uses matching MA station URI but preserves a logo if MA has none", async () => {
    const { api } = setup(
      {
        items: [
          {
            name: "NPO Radio 2",
            uri: "library://radio/42",
            media_type: "radio",
          },
        ],
      },
      "music_assistant",
      "get_library",
    );
    api.config = { ...config, ma_config_entry_id: "entry" };
    const page = await api.radio("", 0, "media_player.room");
    const npo = page.items.filter((i) => i.title === "NPO Radio 2");
    expect(npo).toHaveLength(1);
    expect(npo[0].uri).toBe("library://radio/42");
    expect(npo[0].image).toContain("base64,");
  });
  it("resolves MA config entry using selected player instead of an invalid first configured entity", async () => {
    const { api, hass } = setup({});
    api.config = {
      ...config,
      ma_players: [{ entity: "media_player.wrong" }, ...config.ma_players],
    };
    vi.mocked(hass.callWS).mockResolvedValue([
      {
        entity_id: "media_player.room",
        platform: "music_assistant",
        config_entry_id: "entry",
      },
    ] as any);
    expect(await api.maEntry("media_player.room")).toBe("entry");
  });
  it("never accepts arbitrary embedded SVG/HTML as metadata artwork", () => {
    expect(safeImage('data:image/svg+xml,<svg onload="alert(1)"></svg>')).toBe(
      "",
    );
    expect(safeImage("data:text/html,hello")).toBe("");
  });
});
describe("MA shuffle compatibility", () => {
  it.each([false, true])(
    "never sends shuffle for radio (service advertises shuffle=%s)",
    async (advertised) => {
      const { api, hass } = setup({}, "music_assistant", "play_media");
      hass.services.music_assistant.play_media = {
        fields: advertised ? { shuffle: {} } : {},
      };
      await api.play(
        false,
        "media_player.room",
        normalize({
          uri: "https://stream.qmusic.nl/qmusic/mp3",
          media_type: "radio",
        }),
      );
      expect(vi.mocked(hass.callService).mock.calls[0][2]).not.toHaveProperty(
        "shuffle",
      );
      expect(hass.callService).toHaveBeenCalledTimes(1);
    },
  );
  it("passes native shuffle only when installed service metadata advertises it", async () => {
    const { api, hass } = setup({}, "music_assistant", "play_media");
    hass.services.music_assistant.play_media = {
      fields: { options: { fields: { shuffle: {} } } },
    };
    await api.play(
      false,
      "media_player.room",
      normalize({ uri: "library://playlist/1", media_type: "playlist" }),
      undefined,
      true,
    );
    expect(vi.mocked(hass.callService).mock.calls[0][2]).toMatchObject({
      shuffle: true,
    });
  });
  it("uses standard shuffle_set after playback on older MA when player supports it", async () => {
    const { api, hass } = setup({}, "music_assistant", "play_media");
    hass.states["media_player.room"].attributes.supported_features = 32768;
    hass.services.media_player = { shuffle_set: {} };
    await api.play(
      false,
      "media_player.room",
      normalize({ uri: "library://playlist/1", media_type: "playlist" }),
      undefined,
      true,
    );
    const calls = vi.mocked(hass.callService).mock.calls;
    expect(calls.map((c) => c[1])).toEqual(["play_media", "shuffle_set"]);
    expect(calls[0][2]).not.toHaveProperty("shuffle");
    expect(calls[1][2]).toEqual({
      entity_id: "media_player.room",
      shuffle: true,
    });
  });
  it("refuses unsupported explicit shuffle before starting any music", async () => {
    const { api, hass } = setup({}, "music_assistant", "play_media");
    await expect(
      api.play(
        false,
        "media_player.room",
        normalize({ uri: "library://playlist/1", media_type: "playlist" }),
        undefined,
        true,
      ),
    ).rejects.toThrow("Shuffle afspelen");
    expect(hass.callService).not.toHaveBeenCalled();
  });
});
describe("HA error messages", () => {
  it.each([
    [
      { code: "voluptuous", message: "not a valid option at 'shuffle'" },
      "not a valid option at 'shuffle'",
    ],
    [
      {
        error: {
          code: "service_validation_error",
          message: "Speler onbereikbaar",
        },
      },
      "Speler onbereikbaar",
    ],
    [new Error("Verbinding verbroken"), "Verbinding verbroken"],
    [{ code: "unknown_error" }, "Home Assistant-fout: unknown_error"],
  ])("extracts a useful message from %j", (error, message) =>
    expect(errorMessage(error)).toBe(message),
  );
  it("handles cyclic unknown objects without stringifying their contents", () => {
    const e: any = {};
    e.error = e;
    expect(errorMessage(e)).toContain("Onbekende Home Assistant-fout");
    expect(errorMessage(e)).not.toContain("[object Object]");
  });
});
describe("Spotify playback optional fields", () => {
  it("does not send shuffle when SpotifyPlus play-context lacks the field", async () => {
    const { api, hass } = setup({}, "spotifyplus", "player_media_play_context");
    await api.play(
      true,
      "",
      normalize({ uri: "spotify:playlist:p", type: "playlist" }),
    );
    expect(vi.mocked(hass.callService).mock.calls[0][2]).toEqual({
      entity_id: config.spotify_entity,
      context_uri: "spotify:playlist:p",
    });
  });
  it("does not send shuffle to older track playback either", async () => {
    const { api, hass } = setup({}, "spotifyplus", "player_media_play_tracks");
    await api.play(true, "", normalize(track));
    expect(vi.mocked(hass.callService).mock.calls[0][2]).toEqual({
      entity_id: config.spotify_entity,
      uris: track.uri,
    });
  });
  it("uses advertised SpotifyPlus shuffle support", async () => {
    const { api, hass } = setup({}, "spotifyplus", "player_media_play_context");
    hass.services.spotifyplus.player_media_play_context = {
      fields: { shuffle: {} },
    };
    await api.play(
      true,
      "",
      normalize({ uri: "spotify:playlist:p", type: "playlist" }),
      undefined,
      true,
    );
    expect(vi.mocked(hass.callService).mock.calls[0][2]).toMatchObject({
      shuffle: true,
    });
  });
});

describe("exact Spotify track selection", () => {
  it.each([0, 23, 83])(
    "sends URI and original position %s, including the first row",
    async (position) => {
      const { api, hass } = setup(
        {},
        "spotifyplus",
        "player_media_play_context",
      );
      await api.play(
        true,
        "",
        normalize(track, position),
        normalize({ uri: "spotify:playlist:p", type: "playlist" }),
      );
      expect(vi.mocked(hass.callService).mock.calls[0][2]).toMatchObject({
        offset_uri: track.uri,
        offset_position: position,
        context_uri: "spotify:playlist:p",
      });
    },
  );
  it("does not use the playlist itself as a track offset for play-all", async () => {
    const { api, hass } = setup({}, "spotifyplus", "player_media_play_context");
    const playlist = normalize({ uri: "spotify:playlist:p", type: "playlist" });
    await api.play(true, "", playlist, playlist);
    expect(vi.mocked(hass.callService).mock.calls[0][2]).toEqual({
      entity_id: config.spotify_entity,
      context_uri: playlist.uri,
    });
  });
  it.each([true, false])(
    "disables existing shuffle BEFORE playback on legacy provider spotify=%s",
    async (spotify) => {
      const { api, hass } = setup(
        {},
        spotify ? "spotifyplus" : "music_assistant",
        spotify ? "player_media_play_context" : "play_media",
      );
      const entity = spotify ? config.spotify_entity : "media_player.room";
      hass.states[entity] = {
        state: "playing",
        attributes: { shuffle: true, supported_features: 32768 },
      };
      hass.services.media_player = { shuffle_set: {} };
      await api.play(
        spotify,
        entity,
        normalize(track),
        normalize({ uri: "spotify:playlist:p", type: "playlist" }),
      );
      const calls = vi.mocked(hass.callService).mock.calls;
      expect(calls[0]).toEqual([
        "media_player",
        "shuffle_set",
        { entity_id: entity, shuffle: false },
        undefined,
      ]);
      expect(calls[1][1]).toBe(
        spotify ? "player_media_play_context" : "play_media",
      );
      expect(calls[1][2]).not.toHaveProperty("shuffle");
    },
  );
  it("does not start a different song if disabling shuffle fails", async () => {
    const { api, hass } = setup({}, "spotifyplus", "player_media_play_context");
    hass.states[config.spotify_entity] = {
      state: "playing",
      attributes: { shuffle: true, supported_features: 32768 },
    };
    hass.services.media_player = { shuffle_set: {} };
    vi.mocked(hass.callService).mockRejectedValue({
      message: "Shuffle wijzigen mislukt",
    });
    await expect(
      api.play(
        true,
        "",
        normalize(track),
        normalize({ uri: "spotify:playlist:p", type: "playlist" }),
      ),
    ).rejects.toMatchObject({ message: "Shuffle wijzigen mislukt" });
    expect(hass.callService).toHaveBeenCalledTimes(1);
    expect(vi.mocked(hass.callService).mock.calls[0][1]).toBe("shuffle_set");
  });
});
