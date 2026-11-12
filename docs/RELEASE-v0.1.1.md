# Dunk Music v0.1.1

- Eén lijst **Alle apparaten**: Spotify Connect plus de geconfigureerde Music Assistant-kamers, met status en koppeling per apparaat.
- Je actieve Spotify-sessie op de iPhone blijft zichtbaar als je Music Assistant kiest terwijl daar geen muziek speelt.
- Music Assistant vindt een spelende kamer buiten de standaardkamer. Een expliciete doelkamer blijft geselecteerd.
- Als Spotify-apparaten ophalen mislukt, blijven lokale kamers beschikbaar.

## Bijwerken vanaf v0.1.0

Download `dunk-music.js` en vervang uitsluitend `/config/www/dunk-music/dunk-music.js`. Bewerk de bestaande JavaScript-module-resource naar `/local/dunk-music/dunk-music.js?v=0.1.1` en herlaad de browser volledig. Je dashboard-YAML, integraties en Liquid Glass hoeven niet te worden gewijzigd.

Apparaatkeuze verplaatst geen Spotify-muziek naar Music Assistant. Een MA-kamer kiezen stelt de doelkamer/bibliotheek in; zolang daar niets speelt, blijft de actieve iPhone-sessie zichtbaar. Als beide koppelingen muziek spelen, kun je de bediende sessie kiezen. De Spotify- en MA-status blijven afkomstig van Home Assistant.

Assets: standalone JS, installatiearchief, volledig bronarchief en SHA-256-controlesommen. Release is voorbereid als draft. Live verificatie op de gebruikersinstallatie is nog nodig; zie docs/TESTING.md.
