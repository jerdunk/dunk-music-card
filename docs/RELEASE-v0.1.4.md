# Dunk Music v0.1.4

Een gekozen Spotify-nummer start met een expliciete track-URI, ook op de eerste rij. Dit voorkomt dat SpotifyPlus positie 0 weglaat of bij bestaande shuffle een willekeurige startpositie gebruikt. Op oudere services schakelt de kaart actieve shuffle vóór normaal afspelen uit via de ondersteunde speleractie. Mislukt dat, dan verschijnt de echte fout zonder playback opnieuw te proberen.

De dropdowns bovenaan zijn vervangen door één apparaatknop, bijvoorbeeld iPhone. Hiermee open je de gezamenlijke apparatenlijst. De bibliotheekbron staat onder Instellingen; Radio heeft zijn eigen tab. Terugkeren vanuit Radio herstelt je bibliotheekbron, ook na herladen.

## Bijwerken

Werk Dunk Music Card bij naar v0.1.4 via HACS en herlaad volledig. Controleer v0.1.4 bovenaan. Blijft een oude versie zichtbaar, gebruik precies één JavaScript-module-resource: `/hacsfiles/dunk-music-card/dunk-music.js?v=0.1.4`. Bestaande YAML en Liquid Glass hoeven niet gewijzigd te worden.

Validatie: 51 unit/API-tests en 115 browserscenario’s in GitHub Actions. Tests gebruiken mocks, inclusief de relevante SpotifyPlus offset-/shufflelogica. Afspelen op de eigen Home Assistant en fysieke apparaten moet nog live worden bevestigd. Test de eerste rij, een later/gefilterd nummer en expliciet Shuffle afspelen.
