import { css } from "lit";
export const styles = css`
  :host {
    display: block;
    container-type: inline-size;
    color: #fff;
    font:
      14px/1.5 system-ui,
      -apple-system,
      sans-serif;
    --accent: #1ed760;
    background: #121212;
    color-scheme: dark;
    border-radius: 12px;
    overflow: hidden;
  }
  .version {
    font-size: 11px;
    font-weight: 400;
    margin-left: 8px;
  }
  svg {
    vertical-align: middle;
  }
  * {
    box-sizing: border-box;
  }
  button,
  input,
  select {
    font: inherit;
    color: inherit;
  }
  button,
  select {
    min-height: 44px;
    border: 0;
    border-radius: 8px;
    background: #242424;
    padding: 8px 12px;
    cursor: pointer;
  }
  button:hover {
    background: #343434;
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  button.active,
  .accent {
    background: var(--accent);
    color: #08190d;
  }
  input {
    min-width: 0;
    min-height: 44px;
    background: #242424;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
  }
  input[type="range"] {
    padding: 0;
    min-height: 28px;
    accent-color: var(--accent);
  }
  h1,
  h2,
  p {
    margin: 0 0 12px;
  }
  h1 {
    font-size: clamp(24px, 4cqi, 42px);
    line-height: 1.15;
  }
  h2 {
    font-size: 18px;
  }
  .app {
    height: var(--height, calc(100dvh - 72px));
    min-height: 380px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    background: #121212;
    position: relative;
  }
  header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-bottom: 1px solid #292929;
    flex-wrap: wrap;
  }
  header strong {
    margin-right: auto;
    font-size: 19px;
    letter-spacing: -0.7px;
  }
  .device-picker {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
  }
  .device-picker span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .workspace {
    display: grid;
    min-height: 0;
    grid-template-columns: minmax(0, 1fr);
  }
  aside {
    display: none;
    background: #181818;
    padding: 16px;
    overflow: auto;
  }
  .nav button {
    display: block;
    width: 100%;
    text-align: left;
    margin-bottom: 6px;
  }
  main {
    overflow: auto;
    padding: 16px;
    min-width: 0;
    overscroll-behavior: contain;
  }
  .toolbar {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .toolbar input {
    flex: 1;
    min-width: 120px;
  }
  .muted,
  small {
    color: #b3b3b3;
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .tile {
    display: flex;
    align-items: center;
    text-align: left;
    gap: 10px;
    padding: 8px;
    min-width: 0;
  }
  .tile span,
  .metadata {
    min-width: 0;
    flex: 1;
  }
  .tile b,
  .metadata b,
  .metadata small {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img,
  .art {
    width: 44px;
    height: 44px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 5px;
    background: #242424;
  }
  .art {
    display: inline-grid;
    place-items: center;
    font-size: 24px;
    color: #888;
  }
  .hero {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 12px 0 20px;
  }
  .hero img,
  .hero .art {
    width: 100px;
    height: 100px;
  }
  .tracks {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .track {
    display: grid;
    grid-template-columns: 26px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #252525;
  }
  .track .play {
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    min-width: 0;
    background: transparent;
    padding: 8px 0;
  }
  .album,
  .duration {
    display: none;
  }
  .position {
    color: #b3b3b3;
    text-align: center;
  }
  .player {
    background: #181818;
    border-top: 1px solid #343434;
    padding: 10px max(12px, env(safe-area-inset-right)) 8px
      max(12px, env(safe-area-inset-left));
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
    align-items: center;
  }
  .now {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    text-align: left;
    background: transparent;
    padding: 0;
  }
  .progress {
    grid-column: 1/-1;
    height: 3px;
    background: #444;
  }
  .progress div {
    height: 100%;
    background: var(--accent);
  }
  .desktop-controls,
  .volume {
    display: none;
  }
  .bottom {
    display: flex;
    padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
    background: #181818;
    justify-content: space-around;
    gap: 4px;
  }
  .bottom button {
    background: transparent;
    padding: 8px;
    font-size: 12px;
  }
  .bottom button.active {
    color: var(--accent);
  }
  .error {
    background: #4a2020;
    border: 1px solid #a44;
    padding: 12px;
    border-radius: 8px;
    overflow-wrap: anywhere;
    margin-bottom: 12px;
  }
  .note {
    padding: 12px;
    background: #242424;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  .skeleton {
    height: 64px;
    border-radius: 8px;
    background: linear-gradient(90deg, #242424, #333, #242424);
    margin: 8px 0;
    animation: pulse 1.4s ease-in-out infinite;
  }
  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: #000a;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .sheet {
    background: #181818;
    border: 1px solid #444;
    border-radius: 16px 16px 0 0;
    padding: 20px max(20px, env(safe-area-inset-right))
      calc(20px + env(safe-area-inset-bottom));
    max-height: 100%;
    overflow: auto;
    width: 100%;
    max-width: 600px;
  }
  .sheet .large {
    display: block;
    width: min(65cqi, 280px);
    height: min(65cqi, 280px);
    margin: 20px auto;
  }
  .sheet .controls {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .device {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
  }
  .device > button:first-child {
    flex: 1 1 160px;
    min-width: 0;
    overflow-wrap: anywhere;
    text-align: left;
  }
  .device.active {
    color: var(--accent);
  }
  .sheet .close {
    float: right;
  }
  .right-art {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
  .full-progress {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 12px 0;
  }
  .full-progress input {
    flex: 1;
  }
  label {
    display: block;
    margin: 8px 0;
  }
  .settings {
    overflow-wrap: anywhere;
  }
  .settings code {
    color: var(--accent);
  }
  .more {
    margin-top: 16px;
    width: 100%;
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
  .roomy .player {
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .roomy .now img,
  .roomy .now .art {
    width: 56px;
    height: 56px;
  }
  @container (min-width:700px) {
    .workspace {
      grid-template-columns: 180px minmax(0, 1fr);
    }
    .left {
      display: block;
    }
    .bottom {
      display: none;
    }
    .tiles {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    .album,
    .duration {
      display: block;
      color: #b3b3b3;
    }
    .track {
      grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) 50px auto;
    }
    .album {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .player {
      grid-template-columns: minmax(0, 1fr) minmax(200px, 1.3fr) auto;
    }
    .desktop-controls {
      display: block;
      text-align: center;
    }
    .desktop-controls .controls {
      display: flex;
      gap: 4px;
      justify-content: center;
    }
    .mobile-toggle {
      display: none;
    }
    .volume {
      display: block;
      max-width: 120px;
    }
    .player > .progress {
      display: none;
    }
    .sheet {
      border-radius: 16px;
      margin: 24px;
    }
    .overlay {
      align-items: center;
    }
  }
  @container (min-width:1100px) {
    .workspace {
      grid-template-columns: 200px minmax(0, 1fr) 240px;
    }
    .right {
      display: block;
    }
    .workspace.no-right {
      grid-template-columns: 200px minmax(0, 1fr);
    }
    .player {
      grid-template-columns: minmax(0, 1fr) minmax(300px, 1.2fr) auto auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }
`;
