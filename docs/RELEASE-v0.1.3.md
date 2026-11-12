# Dunk Music v0.1.3

Herstelt de fout `not a valid option at shuffle` bij het starten van Spotify en radio via Music Assistant.

- Optionele shuffle-parameters worden alleen verstuurd als de geïnstalleerde afspeelactie ze aanbiedt; radio krijgt dit veld nooit.
- Expliciet shuffle-afspelen gebruikt waar nodig de ondersteunde standaardspeleractie.
- Home Assistant-fouten tonen hun echte tekst in plaats van `[object Object]`.

## Bijwerken via HACS

Download v0.1.3 en herlaad Home Assistant volledig. Controleer de zichtbare versie in Dunk Music. Bij een oude versie: houd precies één JavaScript-module-resource over: `/hacsfiles/dunk-music-card/dunk-music.js?v=0.1.3`. Verwijder de oude handmatige `/local/dunk-music/dunk-music.js...`-resource.

Dashboard-YAML en Liquid Glass hoeven niet aangepast te worden. 44 unit/API-tests en 60 lokale Chromium-scenario’s slagen; GitHub Actions controleert ook Firefox en WebKit (100 browserscenario’s). De wijziging is met strikte serviceschema’s getest, maar nog niet op de echte Home Assistant-installatie afgespeeld. Zie docs/TESTING.md.
