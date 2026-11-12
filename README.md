# Dunk Music Card · v0.1.1

Een installeerbare Home Assistant custom card voor SpotifyPlus, Music Assistant en radio. TypeScript + Lit, één lokaal JavaScript-bestand, Shadow DOM, geen extra OAuth-app, API-sleutels of externe server.

- Collecties openen zonder afspelen; verticale nummerlijsten met originele playlistpositie, zoeken in geladen nummers en paginering.
- Spotify-bibliotheek, favorieten, albums, artiesten, podcasts, recent afgespeeld, zoeken, wachtrij en Connect-apparaten via SpotifyPlus.
- Music Assistant-bibliotheek, zoeken, radio, kamerselectie, volumes, expliciete wachtrijoverdracht en groeperen indien ondersteund.
- Permanente minispeler, volledige speler, containerafhankelijke mobiele/tablet/desktopindeling en veilige scheiding tussen browsen en afspelen.
- Apart view-thema **Dunk Music Dark**. Bestaande dashboards, integraties en Liquid Glass blijven behouden.

**Status:** installeerbare eerste versie met automatische API- en browsertests. Er is nog geen live acceptatietest uitgevoerd op de Home Assistant-installatie van Jeroen. Zie [testverslag en beperkingen](docs/TESTING.md). Music Assistant biedt via de HA-queue-API alleen huidig/volgend item; favorieten bewerken voor MA gebeurt in de MA-app.

## Installatie

Zie [de volledige Nederlandstalige installatiehandleiding](docs/INSTALLATION.md).

Handmatig: kopieer `dist/dunk-music.js` naar `/config/www/dunk-music/dunk-music.js`, registreer `/local/dunk-music/dunk-music.js?v=0.1.1` als JavaScript-module en gebruik [examples/dashboard.yaml](examples/dashboard.yaml) in een **nieuw** testdashboard.

HACS: voeg `https://github.com/jerdunk/dunk-music-card` toe als custom repository, categorie Dashboard. Het bestand staat in `dist/`; een release bevat ook `dunk-music.js` als losse asset. HACS-installatie is beschikbaar zodra de implementatie op de default branch staat of een zichtbare release beschikbaar is. Een draft release is niet zichtbaar voor HACS.

## Ontwikkelen

Node.js 22.18+ en npm:

```sh
npm ci
npm test
npm run build
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
npm audit --audit-level=moderate
```

`dist/dunk-music.js` wordt meegeleverd en reproduceerbaar gecontroleerd in GitHub Actions. Tests gebruiken uitsluitend mocks; de testfixture maakt nooit verbinding met echte muziekspelers.

[API-contracten](docs/API.md) · [Configuratie](docs/INSTALLATION.md#configuratie) · [Changelog](CHANGELOG.md) · [Releasevoorbereiding](docs/RELEASE-v0.1.1.md)
