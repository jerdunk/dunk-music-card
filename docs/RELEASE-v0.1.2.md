# Dunk Music v0.1.2

Lokale Google-apparaten en radio hersteld:

- SpotifyPlus’ lokale apparaatdirectory wordt gecombineerd met de online Spotify Connect-lijst. Hierdoor kunnen lokaal ontdekte Nest/Google Cast-apparaten verschijnen voordat Spotify ze online toont.
- De zes standaardradiozenders hebben gecontroleerde directe streams en meegeleverde omroeplogo’s. Je hoeft ze niet eerst als favoriet in Music Assistant op te slaan.
- Bestaande YAML met alleen zendernamen krijgt de standaardstreams en logo’s. Eigen URI’s blijven behouden.
- De versie staat zichtbaar bovenaan de kaart. De actieve iPhone-sessie blijft zoals in v0.1.1 behouden bij een lege MA-doelkamer.

## Bijwerken via HACS

Download v0.1.2. Controleer in Dashboard Resources dat alleen `/hacsfiles/dunk-music-card/dunk-music.js?v=0.1.2` als JavaScript-module geregistreerd is; verwijder de oude `/local/dunk-music/dunk-music.js...`-resource. Herlaad volledig en controleer dat de kaart v0.1.2 toont. Dashboard-YAML en Liquid Glass blijven behouden.

Lokale detectie blijft afhankelijk van SpotifyPlus en netwerk/mDNS-bereikbaarheid. Radio-afspelen vereist een beschikbare Music Assistant-kamer. Nieuwe playback- en discoveryfuncties zijn met mocks getest; daadwerkelijke hardware-overdracht en radio in het thuisnetwerk moeten nog live worden bevestigd. Zie docs/TESTING.md en docs/RADIO-SOURCES.md.
