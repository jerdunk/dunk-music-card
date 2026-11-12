import { svg } from "lit";
const paths = {
  play: "M8 5L19 12L8 19Z",
  pause: "M7 5H10V19H7ZM14 5H17V19H14Z",
  previous: "M6 5V19M18 5L8 12L18 19Z",
  next: "M18 5V19M6 5L16 12L6 19Z",
  shuffle:
    "M3 6H5C10 6 14 18 19 18H21M17 14L21 18L17 22M3 18H5C7 18 8 16 9 14M14 9C16 6 17 6 21 6M17 2L21 6L17 10",
  devices: "M3 4H17V14H3ZM8 14V18M5 18H11M16 10H22V21H16Z",
  queue: "M3 6H21M3 12H15M3 18H11M18 15L22 18L18 21Z",
};
export function icon(name: keyof typeof paths) {
  return svg`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d=${paths[name]} /></svg>`;
}
