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
        shuffle: false,
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
        shuffle: false,
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
