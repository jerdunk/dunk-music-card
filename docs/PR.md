Fixes playback rejected with `not a valid option at shuffle` on SpotifyPlus and Music Assistant, confirmed by the user for both sources.

Playback sends optional shuffle only when advertised by the runtime service schema; radio never sends it. Explicit shuffle uses the supported standard player action when necessary and fails before playback if unsupported. Plain/nested Home Assistant errors now show their actual message instead of `[object Object]`. Playback is never automatically retried.

Validation: 44 unit/API tests, 60 local Chromium scenarios, strict TypeScript and production build. CI runs 100 browser scenarios across Chromium, Firefox and WebKit. Tests reject unknown service fields, covering the reported regression. Live playback on the user's Home Assistant remains untested. Release v0.1.3 includes rebuilt HACS assets and update instructions; existing dashboard configuration and Liquid Glass are unchanged.
