# Dunk Music v0.1.0 — releasevoorbereiding

Installeerbare eerste versie voor SpotifyPlus en Music Assistant, inclusief responsive dashboard, verticale playlistinhoud, minispeler, Connect-apparaatselectie, radio en apart donker thema.

## Assets

- `dunk-music.js`: standalone ES-module, te kopiëren naar `/config/www/dunk-music/dunk-music.js`.
- `dunk-music-v0.1.0.zip`: kaart, thema, voorbeeld-dashboard en documentatie.
- De volledige broncode en lockfile staan in de repository / het bronarchief.

## Publicatiestappen

1. Review de implementatie-PR en controleer groene GitHub Actions.
2. Voer de live checklist in `docs/TESTING.md` uit op het nieuwe testdashboard.
3. Merge na review. Start de workflow **Prepare draft release** op de gewenste commit.
4. Controleer het draft en de assets. Publiceer v0.1.0 pas na de live test of vermeld expliciet de nog niet uitgevoerde checks.

De workflow maakt uitsluitend een draft. Deze ontwikkeling wijzigt geen echte HA-installatie en voert geen muziekactie uit op echte apparaten.

## Grenzen

Geen live test met Spotify-account, auto, luidsprekers, MA-server of HACS uitgevoerd. Google TV-entity met/zonder `_2` moet lokaal worden bevestigd. Volledige MA-queue en mutatie van MA-favorieten zijn niet beschikbaar via de gebruikte HA-services; hiervoor blijft de MA-app de fallback. Zie `docs/API.md`.
