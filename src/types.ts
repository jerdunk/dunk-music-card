export type Source = "spotify" | "music_assistant" | "radio";
export type Data = Record<string, any>;
export interface Entity {
  state: string;
  attributes: Data;
}
export interface Hass {
  states: Record<string, Entity>;
  services: Record<string, Record<string, Data>>;
  callWS<T = Data>(message: Data): Promise<T>;
  callService(
    domain: string,
    service: string,
    data?: Data,
    target?: Data,
  ): Promise<unknown>;
}
export interface Config {
  type: string;
  spotify_entity: string;
  ma_players: Array<{ entity: string; name?: string }>;
  ma_config_entry_id?: string;
  default_source?: Source;
  default_player?: string;
  excluded_devices?: string[];
  accent_color?: string;
  navigation?: string[];
  radio_stations?: Array<{ name: string; uri?: string; image?: string }>;
  height?: string;
  mobile_compact?: boolean;
  desktop_now_playing?: boolean;
  storage_key?: string;
}
export interface Item {
  id: string;
  uri: string;
  title: string;
  artist: string;
  album: string;
  image: string;
  duration: number;
  kind: string;
  position: number;
  playable: boolean;
  browsable: boolean;
}
export interface Page {
  items: Item[];
  more: boolean;
  total?: number;
  next?: string | number;
  note?: string;
}
export interface Device {
  id: string;
  name: string;
  active: boolean;
  available: boolean;
  entity?: string;
}
export const NAV = [
  "Home",
  "Zoeken",
  "Bibliotheek",
  "Afspeellijsten",
  "Favorieten",
  "Recent afgespeeld",
  "Radio",
  "Wachtrij",
  "Instellingen",
];
export const RADIOS = [
  "Qmusic",
  "Qmusic 90s & 00s",
  "Radio 538",
  "Radio Veronica",
  "Sky Radio",
  "NPO Radio 2",
];
export function excluded(
  id: string,
  name: string,
  rules: string[] = [],
): boolean {
  return ["metz", ...rules].some(
    (x) =>
      x.trim() &&
      `${id} ${name}`
        .toLocaleLowerCase()
        .includes(x.toLocaleLowerCase().trim()),
  );
}
export function safeImage(value: unknown): string {
  return typeof value === "string" &&
    (/^https?:\/\//i.test(value) || /^\/(?!\/)/.test(value))
    ? value
    : "";
}
export function normalize(input: Data | null, position = 0): Item {
  const raw = input ?? {};
  const r =
    raw.track ??
    raw.show ??
    raw.episode ??
    raw.media_item ??
    (!raw.uri && !raw.media_content_id && raw.album ? raw.album : raw);
  return {
    id: r.id ?? r.item_id ?? r.uri ?? r.media_content_id ?? "",
    uri: r.uri ?? r.media_content_id ?? "",
    title: r.name ?? r.title ?? "Onbekend",
    artist: Array.isArray(r.artists)
      ? r.artists
          .map((a: any) => (typeof a === "string" ? a : a.name))
          .join(", ")
      : (r.artist ?? ""),
    album: typeof r.album === "string" ? r.album : (r.album?.name ?? ""),
    image: safeImage(
      r.image ??
        r.image_url ??
        r.thumbnail ??
        r.images?.[0]?.url ??
        r.album?.images?.[0]?.url,
    ),
    duration: r.duration_ms ? r.duration_ms / 1000 : (r.duration ?? 0),
    kind: r.type ?? r.media_type ?? r.media_content_type ?? "track",
    position,
    playable:
      !!(r.uri ?? r.media_content_id) &&
      r.available !== false &&
      r.is_playable !== false &&
      !r.is_local &&
      r.can_play !== false,
    browsable:
      r.can_expand ??
      ["playlist", "album", "artist", "show", "podcast"].includes(
        r.type ?? r.media_type,
      ),
  };
}
export function time(seconds: number): string {
  const s = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
export function position(entity?: Entity): number {
  const a = entity?.attributes ?? {};
  const elapsed =
    entity?.state === "playing" && a.media_position_updated_at
      ? Math.max(
          0,
          (Date.now() - Date.parse(a.media_position_updated_at)) / 1000,
        )
      : 0;
  return Math.min(
    a.media_duration || Infinity,
    Math.max(
      0,
      (a.media_position || 0) + (Number.isFinite(elapsed) ? elapsed : 0),
    ),
  );
}
