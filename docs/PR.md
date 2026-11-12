Implementeert de eerste installeerbare Dunk Music custom card voor een nieuw Home Assistant-muziekdashboard. Afspeellijsten openen zonder playback; individuele tracks spelen vanuit hun oorspronkelijke positie. SpotifyPlus, Music Assistant en radio delen een permanente speler met expliciete sessie- en apparaatkeuze.

Inbegrepen: TypeScript/Lit-broncode en gebouwde ES-module, responsive interface, Connect, MA-kamerbediening, uitgesloten Metz-apparaten, afzonderlijk Dunk Music Dark-thema, HACS-configuratie, volledig panel-dashboard, Nederlandse handleiding, tests en draft-releaseworkflow voor v0.1.0. Bestaande Liquid Glass-configuratie en HA-integraties zijn niet gewijzigd.

Validatie: 18 API-/unit-tests en 30 Chromium-browsertests geslaagd; TypeScript/build geslaagd; npm audit zonder kwetsbaarheden. CI voegt Firefox en WebKit toe. Lokale browserstartbeperkingen en alle niet live geteste HA-/Spotify-/MA-functies staan expliciet in docs/TESTING.md.

API-grenzen: MA get_queue geeft alleen huidig/volgend item; MA-favorietenmutaties gaan via de bronapp. Google TV-entity met/zonder _2 en compatibele luidsprekergroepen moeten live bevestigd worden. Er zijn geen tests op echte afspeelapparaten uitgevoerd.
