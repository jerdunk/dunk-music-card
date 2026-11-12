Levert Dunk Music v0.1.1 als installeerbare Home Assistant custom card met SpotifyPlus, Music Assistant, radio, verticale afspeellijsten en een permanente minispeler.

De apparaatkeuze toont Spotify Connect en geconfigureerde Music Assistant-kamers in één lijst. Routes zijn expliciet gelabeld en lokale kamers blijven beschikbaar bij een Spotify-storing. Bij het kiezen van een niet-spelende Music Assistant-kamer blijft de actieve Spotify/iPhone-sessie zichtbaar. Bronkeuze en doelkamerkeuze starten of stoppen geen muziek. Als beide routes spelen, kan de gebruiker expliciet kiezen welke sessie wordt bediend.

Inbegrepen: TypeScript/Lit-broncode, gebouwde JS-module, HACS-configuratie, afzonderlijk Dunk Music Dark-thema, panel-dashboard, Nederlandse installatie-/updatehandleiding, tests en draft-releaseworkflow. Bestaande Home Assistant-configuratie en Liquid Glass zijn niet gewijzigd.

Validatie: 23 API-tests en 45 lokale Chromium-scenario's geslaagd; CI voert daarnaast Firefox en WebKit uit (75 browserscenario's in totaal). TypeScript/build en npm audit zijn geslaagd. De gebruikersinstallatie is niet toegankelijk voor live playbacktests. De resterende live checks en API-grenzen staan in docs/TESTING.md.

De PR blijft open. v0.1.0 blijft als eerder draft behouden; v0.1.1 wordt apart als draft met installatie- en bronarchief voorbereid.
