# Changelog

## 0.1.4

- Gekozen Spotify-track krijgt een expliciete offset-URI, ook voor de eerste rij (positie 0) en gefilterde/gepagineerde lijsten.
- Schakelt bestaande shuffle bij oudere services vóór normaal afspelen uit, met zichtbare fout als dit niet lukt.
- Vervangt de dropdowns bovenaan door één apparaatknop. Bibliotheekbron staat onder Instellingen; Radio houdt een eigen tab.
- Onthoudt de bibliotheekbron bij Radio en herladen; bestaande configuratie blijft bruikbaar.

## 0.1.3

- Verhelpt afgewezen `shuffle`-parameters bij SpotifyPlus en Music Assistant: alleen verzenden als de actie het veld aanbiedt; nooit bij radio.
- Expliciet shuffle-afspelen gebruikt waar nodig de ondersteunde standaardspeleractie.
- Toont echte Home Assistant-foutmeldingen in plaats van `[object Object]`.
- Regressietests met strikte oudere serviceschema’s voor beide koppelingen.

## 0.1.2

- Combineert online Spotify-apparaten met de lokale SpotifyPlus-directory, inclusief slapende Google Cast-apparaten.
- Houdt apparaten beschikbaar als een van de detectiebronnen faalt en toont de fout.
- Zes radiozenders met gecontroleerde directe streams en meegeleverde omroeplogo’s; bestaande naamconfiguratie blijft werken.
- Radio werkt ook bij lege of ontbrekende MA-radiozoekfunctie; afspelen blijft via MA.
- Bepaalt de MA-configuratie vanuit de geselecteerde geldige speler.
- Zichtbare versietekst en instructies om een oude handmatige resource na HACS-installatie te verwijderen.

## 0.1.1 — voorbereid

- Eén apparaatlijst voor Spotify Connect en alle geconfigureerde Music Assistant-kamers, met aparte route- en statuslabels.
- Lokale kamers blijven zichtbaar als Spotify-apparaten ophalen mislukt.
- De actieve iPhone/Spotify-sessie blijft zichtbaar bij het kiezen van een niet-spelende Music Assistant-kamer.
- Automatische detectie van spelende Music Assistant-kamers; expliciet gekozen doelkamer blijft behouden.
- Veilige selectie zonder onbedoeld afspelen of overdracht tussen Spotify en MA.

## 0.1.0 — voorbereid

- Eerste installeerbare Lit/TypeScript Lovelace-kaart met meegeleverde ES-module.
- SpotifyPlus-bibliotheek, verticale playlistnummers, contextafspelen, zoekfunctie, favorieten en Connect.
- Music Assistant-bibliotheek, radio, kamerbediening, volume, expliciete overdracht en conditionele groepen.
- Responsieve containerqueries, permanente minispeler, volledige speler, toegankelijke modale dialogs.
- Los Dunk Music Dark-thema, veilig nieuw panel-dashboard, Nederlandse installatiehandleiding.
- Unit- en browsertests, CI en draft-releaseworkflow.
- Live HA-validatie en API-beperkingen expliciet gedocumenteerd.
