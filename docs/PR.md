Fixes missing local Spotify devices and empty radio results in Dunk Music v0.1.2.

Spotify device selection previously queried only the Spotify web-device list. It now reads SpotifyPlus's local directory as well, parses its real PascalCase fields, retains dormant Cast devices, merges activated-ID aliases, and transfers through SpotifyPlus's supported directory ID. A failed discovery source does not hide the other sources. Metz exclusions remain enforced.

Radio previously depended on user-saved MA stations and name-only search shortcuts. Six broadcaster streams and unmodified broadcaster logos are now included. Existing name-only YAML automatically inherits these defaults. Matching MA library stations take precedence, while unavailable search/library services no longer block preset playback. MA config-entry discovery prioritizes the selected valid player. Logos are bundled; arbitrary embedded data/SVG is not accepted.

Validation: 31 unit/API tests, 51 local Chromium scenarios, strict build, zero npm-audit vulnerabilities, and HTTP audio/image checks for all six station sources. CI also runs Firefox/WebKit (85 browser scenarios). No playback or network discovery was performed on the user's real HA installation. They confirmed still seeing v0.1.0; installation notes explain removing the obsolete manual resource and checking the visible v0.1.2 version.

The release workflow publishes a versioned HACS asset only from main, after tests and upload checks; published versions are never overwritten. Existing HA configuration and Liquid Glass are unchanged. Logo provenance and remaining live checks are documented.
