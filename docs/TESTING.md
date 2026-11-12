# Testverslag en live acceptatie

Datum: 12 november 2026. Alle geautomatiseerde afspeelacties gebruiken mocks. Geen actie is naar een echte Spotify-sessie of luidspreker verstuurd.

## Uitgevoerd in de ontwikkelomgeving

| Controle | Resultaat |
| --- | --- |
| TypeScript strict + productiebuild | Geslaagd |
| Vitest API-/datatests | 44 geslaagd |
| Chromium mobiel 390 × 844 | 20 geslaagd |
| Chromium tablet 820 × 1180 | 20 geslaagd |
| Chromium desktop 1440 × 1000 | 20 geslaagd |
| Kaartbreedte 320px binnen groter browservenster | Geen horizontale overflow, mobiele containerindeling |
| Visuele inspectie mobiel en desktop | Uitgevoerd met testdata; iconen vervangen door consistente SVG's |
| npm audit, alle afhankelijkheden | 0 kwetsbaarheden |
| YAML/JSON-installatiebestanden | Geparseerd en gecontroleerd |
| Firefox lokaal | Browser start niet: `Could not find profile folder`, ook met alternatieve tijdelijke map; geen productasserties uitgevoerd |
| WebKit lokaal | Browser start niet door ontbrekende systeemlibraries; geen productasserties uitgevoerd |

GitHub Actions bevat naast de 60 Chromium-scenario's ook 20 Firefox- en 20 WebKit-scenario's, met installatie van de vereiste OS-dependencies. De daadwerkelijke CI-uitkomst staat bij de pull request; lokaal geblokkeerde browsers tellen niet als geslaagde tests.

### Gedekte regressies

- Response-protocol `return_response`, Spotify `result`, MA entity-keyed queue en afbeeldingsvelden.
- Platte MA `limit`/`offset`-parameters: YAML UI-secties zijn geen geneste servicevelden.
- Afspeellijst openen zonder muziekactie; verticale rijen; afspelen op oorspronkelijke positie 3 en 83 na pagineren/filteren.
- MA-playlist `start_item`, play-all zonder ongeldige start-URI, onbeschikbare doelen blokkeren.
- Bronwissel en openen van Radio zonder playback; externe Spotify-state zichtbaar houden.
- Veilige afbeeldings-URL's, Metz-uitsluiting, beperkte apparaten, expliciete Connect-overdracht.
- Cache/deduplicatie, 429-backoff, zoek-debounce en verouderde responses negeren.
- Permanente minispeler, volledig spelersvenster, Escape, containerqueries, globale themastijlen en hass-updates zonder verlies van zoektekst.

## Nog live te testen

Geen toegang tot de Home Assistant-installatie, Spotify-account of MA-server was beschikbaar. Dit is geen verklaring dat onderstaande punten live geverifieerd zijn.

1. Installeer op het **nieuwe testdashboard** en controleer browserconsole en resource/module.
2. Controleer welke geïnstalleerde SpotifyPlus-/MA-versies en acties aanwezig zijn. Bevestig permissies voor service responses en het entiteitenregister.
3. Open eigen echte playlists (ook meer dan 50 nummers), albums, artiesten, favoriete nummers en podcasts. Test een individueel nummer en doorspelen binnen de playlist.
4. Start zelf een Spotify-sessie buiten HA en controleer status/hoes/titel/voortgang. Test play/pause, skip, seek, shuffle, repeat, favorieten en queue op een bewust gekozen apparaat.
5. Controleer Connect-status en expliciete overdracht naar telefoon, laptop en een beschikbare luidspreker. **Gebruik de auto alleen wanneer je dat zelf bewust wilt; bronwissel stopt de auto niet.**
6. Bevestig dat Metz onder geen enkele alias in apparaatselectie of MA-kamerkeuze verschijnt.
7. Bevestig voor Google TV de echte MA-entiteit: met of zonder `_2`. Dit is niet automatisch geraden.
8. Test MA zoeken, collectie-inhoud, playlist-start, radioresultaten, kamervolume, wachtrijoverdracht en groeperen van werkelijk compatibele apparaten. Controleer foutafhandeling van een ongeschikte combinatie.
9. Test de zes radiozenders op een beschikbare MA-kamer. Standaardstreams en logo’s zijn meegeleverd; controleer ook eigen zenders.
10. Controleer echte iPhone/Android safe areas, Companion App, rotatie, scroll en touch-sliders. Browseremulatie is geen test op fysieke telefoons.
11. Controleer dat Liquid Glass en het bestaande muziekdashboard ongewijzigd blijven.
12. Test HACS custom-repository-installatie na merge/publicatie, een update/cacheverversing en rollback naar het oude dashboard.

## Bewuste API-grenzen in v0.1.0

- MA-volledige queue/reorder/delete en MA-favorieten schrijven: niet aangeboden door de gebruikte standaard HA-services. De UI legt de queuegrens uit; favorieten beheren via MA.
- MA-collecties via browse_media hebben geen generieke paginering en kunnen minder metadata leveren. Ontbrekende speelduur is `—`; er worden geen gegevens verzonnen.
- Geen virtual scrolling; Spotify- en MA-bibliotheken gebruiken pagina's van 50. Playlistfilter zoekt in reeds geladen nummers, expliciet zo gelabeld.
- Podcasts/markttoegang en Connect-apparaten zijn afhankelijk van Spotify en de geïnstalleerde integraties.
- De runtime controleert servicenaam en media-playerfeatures; backendvalidatie blijft doorslaggevend voor versieverschillen en groepscompatibiliteit.

## Zelf reproduceren

```sh
npm ci
npm test
npm run build
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
npm audit --audit-level=moderate
```

Alleen Chromium op een beperkte host: `npx playwright test --project=mobile --project=tablet --project=desktop`. De fixture staat uitsluitend onder `tests/`; de productiekaart bevat geen voorbeeldmuziek of fake apparaten.

## Update v0.1.1

Nieuwe regressies: gecombineerde apparaatlijst, bronstoringen onafhankelijk afhandelen, MA-apparaten niet als Spotify-ID gebruiken, actieve iPhone behouden bij MA-keuze, actieve MA-kamer vinden en expliciete doelkamer niet overschrijven. Deze wijzigingen zijn met mocks getest; controle op de eigen Home Assistant blijft nodig.

## v0.1.2

Lokale SpotifyPlus-directory getest met het daadwerkelijke PascalCase-responsecontract, een Cast-apparaat zonder online-listvermelding, activated-ID-deduplicatie, Metz-filtering, falende lokale detectie en correct doorgeven van de transfer-ID. Radio getest zonder zoek-/bibliotheekservices, met naam-only YAML, werkelijk gedecodeerde gebundelde logo’s en afspelen van de gekozen stream via het juiste MA-target. De zes HTTP-streams gaven vanuit de ontwikkelomgeving 200/206 audio/mpeg. De gebruiker meldde nog v0.1.0 te gebruiken; nieuwe lokale detectie en radio zijn nog niet op diens HA-installatie getest.

## v0.1.3

De gebruiker bevestigde `not a valid option at shuffle` bij radio en Spotify. Regressies dekken oudere MA- en SpotifyPlus-schema’s die dit veld afwijzen, native optionele veldondersteuning, standaard shuffle_set bij expliciet shuffle-afspelen, geen automatische playback-retry en leesbare gewone/geneste WebSocket-foutobjecten. 44 unit/API-tests en 60 lokale Chromium-scenario’s geslaagd; CI voert 100 browserscenario’s uit. De reparatie is nog niet op de echte Home Assistant-installatie afgespeeld. Controleer daar radio, Spotify-tracks/playlists en expliciet shuffle-afspelen na de update.
