import { RADIO_LOGOS } from "./radio-logos";
import { normalize, type Config, type Item } from "./types";
export const DEFAULT_RADIOS = [
  {
    name: "Qmusic",
    uri: "https://stream.qmusic.nl/qmusic/mp3",
    image: RADIO_LOGOS.qmusic,
  },
  {
    name: "Qmusic 90s & 00s",
    uri: "https://stream.qmusic.nl/90s-00s/mp3",
    image: RADIO_LOGOS.q90,
  },
  {
    name: "Radio 538",
    uri: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO538.mp3",
    image: RADIO_LOGOS.radio538,
  },
  {
    name: "Radio Veronica",
    uri: "https://playerservices.streamtheworld.com/api/livestream-redirect/VERONICA.mp3",
    image: RADIO_LOGOS.veronica,
  },
  {
    name: "Sky Radio",
    uri: "https://playerservices.streamtheworld.com/api/livestream-redirect/SKYRADIO.mp3",
    image: RADIO_LOGOS.sky,
  },
  {
    name: "NPO Radio 2",
    uri: "https://icecast.omroep.nl/radio2-bb-mp3",
    image: RADIO_LOGOS.npo,
  },
];
export function radioKey(name: string) {
  return name.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
}
export function configuredRadios(config: Config): Item[] {
  return (config.radio_stations ?? DEFAULT_RADIOS).map((station, index) => {
    const preset = DEFAULT_RADIOS.find(
      (x) => radioKey(x.name) === radioKey(station.name),
    );
    return normalize(
      {
        ...preset,
        ...station,
        name: station.name,
        uri: station.uri || preset?.uri,
        image: station.image || preset?.image,
        media_type: "radio",
      },
      index,
    );
  });
}
