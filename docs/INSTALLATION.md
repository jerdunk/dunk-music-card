# Installatie en configuratie

## 1. Bestaande omgeving behouden

Maak eerst een Home Assistant-back-up. Bewaar je bestaande muziekdashboard als fallback. Deze repository vervangt geen `configuration.yaml`, bestaande thema's, integraties of dashboards. Er worden tijdens installatie geen afspeelacties uitgevoerd. SpotifyPlus blijft met de bestaande accountkoppeling werken; er is geen nieuwe Spotify OAuth-app nodig.

Vereist: Home Assistant met service responses via WebSocket, recente SpotifyPlus-integratie en voor MA-functies de officiële Music Assistant-integratie met Music Assistant Server. De kaart controleert beschikbare acties via `hass.services`. API-onderzoek is gebaseerd op upstream-bronnen op 12 november 2026, niet op een uitgelezen gebruikersinstallatie. De exacte compatibiliteit moet daarom live bevestigd worden. Containers, `dvh` en Shadow DOM vereisen een recente browser/Companion App-webview.

## 2. Kaart installeren

### Handmatig, ook vóór de eerste publieke release

1. Pak het meegeleverde installatiearchief uit. Kopieer `dist/dunk-music.js` naar `/config/www/dunk-music/dunk-music.js`. Maak de map indien nodig.
2. Activeer geavanceerde modus in je profiel. Open Instellingen → Dashboards → Resources (soms onder het menu rechtsboven).
3. Voeg `/local/dunk-music/dunk-music.js?v=0.1.3` toe, type **JavaScript-module**. `examples/resource.yaml` bevat de equivalente resource.
4. Registreer niet tegelijk de handmatige en HACS-resource.

### HACS

Na plaatsing op de default branch of publicatie van een release: HACS → menu → Custom repositories → `https://github.com/jerdunk/dunk-music-card` → categorie **Dashboard** (in oudere HACS: Lovelace). Download Dunk Music Card. Controleer dat `/hacsfiles/dunk-music-card/dunk-music.js` als module is toegevoegd. Voeg de resource alleen handmatig toe als HACS dat niet heeft gedaan.

HACS beheert de kaart. Het thema en het dashboard installeer je afzonderlijk. De repository is HACS-compatibel ingericht; opname in de standaardcatalogus is niet aangevraagd. Draft releases zijn niet downloadbaar via HACS.

## 3. Apart thema toevoegen

Kopieer `themes/dunk-music-dark.yaml` als **nieuw bestand** naar de bestaande themamap, meestal `/config/themes/`. Is `frontend: themes: !include_dir_merge_named themes` al geconfigureerd, wijzig daar niets aan. Gebruik de actie `frontend.reload_themes`.

Als thema's nog niet via een map worden geladen, voeg het thema toe volgens jouw bestaande structuur. Maak nooit een tweede `frontend:`-sleutel en vervang nooit een bestaande theme-include zonder deze samen te voegen. Het thema is optioneel: de kaart heeft zelf ondoorzichtige, geïsoleerde kleuren en typografie.

**Selecteer Dunk Music Dark niet als globaal profielthema en gebruik geen globale set_theme-actie.** De voorbeeldview gebruikt `theme: Dunk Music Dark` uitsluitend voor de muziekview. Liquid Glass blijft op andere dashboards actief.

## 4. Nieuw dashboard maken

1. Instellingen → Dashboards → Dashboard toevoegen → nieuw leeg dashboard `Dunk Music Test`.
2. Open dit nieuwe dashboard, neem indien nodig de besturing over, open de raw configuration editor.
3. Plak `examples/dashboard.yaml`. Dit is een volledig dashboard, niet één losse kaart.
4. De panel-view bevat precies één `custom:dunk-music-card` en benut de volle breedte.
5. Controleer de entiteiten in Ontwikkelaarstools → Statussen. Voor Google TV moet je bij de entiteit controleren dat deze bij **Music Assistant** hoort. Gebruik `media_player.nest_tv_woonkamer_2` als dat de daadwerkelijke MA-speler is. Die keuze kon niet op afstand worden vastgesteld.
6. De Metz TV wordt altijd op `metz` gefilterd, naast je configureerbare uitsluitingen. Vermijd ook een afwijkende alias die geen Metz-identificatie bevat.

## Configuratie

| Sleutel | Standaard / betekenis |
| --- | --- |
| `spotify_entity` | Verplicht, bestaande SpotifyPlus media_player |
| `ma_players` | Lijst `{entity, name?}`; uitsluitend eigen Music Assistant-spelers |
| `ma_config_entry_id` | Optioneel; afgeleid via HA-entiteitenregister. Stel expliciet in als jouw gebruiker dat register niet mag lezen |
| `default_source` | `spotify`, `music_assistant` of `radio` |
| `default_player` | MA-entiteit; anders eerste toegestane speler |
| `excluded_devices` | Hoofdletterongevoelige deelstrings in naam of ID; Metz blijft uitgesloten |
| `accent_color` | Hexkleur `#1ED760` |
| `height` | `calc(100dvh - 72px)`; pas aan voor kiosk/header of bijv. `700px` |
| `mobile_compact` | `true`; `false` geeft de minispeler meer ruimte |
| `desktop_now_playing` | `true`; rechterkolom bij minimaal 1100px kaartbreedte |
| `navigation` | Lijst zichtbare onderdelen, zie voorbeeld |
| `radio_stations` | `{name, uri?, image?}`; zonder URI zoekt de knop het echte station via MA |
| `storage_key` | Optionele eigen opslagnaam voor meerdere onafhankelijke kaarten |

Bron, navigatie en geselecteerde MA-speler worden lokaal per browser opgeslagen en hebben na herladen voorrang op defaults. Verwijder de localStorage-sleutel `dunk-music:<spotify_entity>` (of de eigen `storage_key`) om defaults opnieuw toe te passen. Er worden geen geheimen opgeslagen.

## Gebruik

Bronselectie bepaalt alleen de bibliotheek. De minispeler blijft de actieve sessie tonen, ook als je een andere bibliotheek of een niet-spelende doelkamer kiest. Speelt alleen Spotify op je iPhone, dan blijven de iPhone en het nummer zichtbaar bij het kiezen van Music Assistant. De keuzelijst **Speler** kiest tussen sessies wanneer beide daadwerkelijk spelen. Bij gelijktijdige Spotify- en MA-muziek kies je expliciet. Wisselen van bron start of stopt geen muziek.

Klik een collectie om deze te openen; klik een nummer om af te spelen. Bij Spotify blijft de oorspronkelijke positie in de afspeellijst behouden, ook na lokaal filteren of pagineren. Bij MA-playlists wordt `start_item` gebruikt. Alle afspeelacties zijn expliciet. Een geopende collectie of account-wissel start nooit automatisch muziek.

Op Radio kies je eerst de doelkamer. De zes standaardzenders hebben gecontroleerde directe stream-URL’s en meegeleverde logo’s. Een klik speelt het station op de gekozen Music Assistant-kamer. Favorieten vooraf opslaan is niet nodig. Een gelijknamig station uit de MA-bibliotheek krijgt voorrang op de standaardstream. Zoeken gebruikt MA en vindt ook de meegeleverde stations. Bestaande radio_stations-configuratie met alleen de standaardnamen krijgt automatisch streams en logo’s. Eigen URI’s/afbeeldingen blijven geldig.

Apparaten: **Alle apparaten** combineert Spotify Connect en Music Assistant-kamers in één lijst, met een label per koppeling. Gelijke namen worden niet samengevoegd omdat het verschillende afspeelroutes kunnen zijn. Een storing in één koppeling verbergt de andere lijst niet. Spotify Connect combineert de online Spotify-lijst met get_spotify_connect_devices van SpotifyPlus. Daardoor kunnen lokaal ontdekte Google Cast/Nest- en Zeroconf-apparaten verschijnen voordat ze in Spotify’s online lijst staan. De kaart spreekt lokale apparaten niet rechtstreeks aan; SpotifyPlus verzorgt de activering en overdracht. Voor lokale detectie moet SpotifyPlus de apparaten op het netwerk kunnen ontdekken (mDNS/multicast). Telefoon/laptop/auto verschijnt alleen wanneer Spotify ze beschikbaar maakt. MA toont de geconfigureerde kamers inclusief onbeschikbare status. Een kamer selecteren start geen muziek. **Overzetten** draagt expliciet de wachtrij over. **Groeperen** gebruikt HA `media_player.join` alleen bij geadverteerde groepsondersteuning; daadwerkelijke protocolcompatibiliteit wordt door MA gecontroleerd en fouten worden getoond. Gebruik Instellingen voor volume per kamer.

## Bijwerken en herstellen

Vervang bij handmatige updates alleen het kaartbestand. Verhoog de resourcequery naar de nieuwe versie. Doe een harde herlaadactie (`Ctrl+Shift+R` / `Cmd+Shift+R`) of sluit/heropen de Companion App en wis zo nodig de frontendcache via de app-instellingen. Bij HACS: download update en herlaad resources/browser.

`Custom element doesn't exist`: controleer resourcepad, module-type, HTTP 200 en browserconsole. `Actie ... ontbreekt`: controleer de integratieversie en beschikbare acties in Ontwikkelaarstools; de kaart verzint geen alternatieve service. Onvoldoende Spotify-rechten/Premium/beperkte apparaten worden door SpotifyPlus afgewezen en als fout getoond. Bij rate limiting wacht de kaart minimaal een minuut na herkenbare 429-fouten; er is geen automatisch herhaald afspeelcommando.

Rollback: open het oorspronkelijke muziekdashboard. Verwijder eventueel alleen de nieuwe Dunk Music-resource en het nieuwe testdashboard. Verwijder geen SpotifyPlus-/MA-integratie of Liquid Glass-bestand.

## Controle na update vanuit HACS

Als in de kaart nog v0.1.0 staat, is de nieuwe module niet geladen. Download de nieuwste versie via HACS (zo nodig via het kaartmenu opnieuw downloaden). In Instellingen → Dashboards → Resources mag slechts één Dunk Music-resource staan: `/hacsfiles/dunk-music-card/dunk-music.js?v=0.1.3`, type JavaScript-module. Verwijder de oude `/local/dunk-music/dunk-music.js...`-vermelding. Laat het bestaande dashboard en de thema’s staan. Herlaad de browser volledig of de frontendcache van de Companion App. Controleer de zichtbare versietekst bovenaan de kaart.

Ontbreken lokale apparaten daarna nog? Controleer in Ontwikkelaarstools of `spotifyplus.get_spotify_connect_devices` beschikbaar is en apparaten retourneert; dit is een leesactie. Controleer de SpotifyPlus-instellingen voor lokale apparaatdetectie en netwerkbereikbaarheid. Apparaten die de backend niet ontdekt, kan de kaart niet verzinnen. Radio vereist een beschikbare Music Assistant-doelspeler en `music_assistant.play_media`; een ontbrekende zoek-/bibliotheekactie blokkeert de standaardzenders niet meer.
