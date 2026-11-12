# API-contracten en grenzen

Geraadpleegd op 2026-11-12. Geïnstalleerde versies zijn niet bereikbaar in de ontwikkelomgeving. De kaart gebruikt `hass.services` als runtime service-register, `hass.states` voor actieve sessies en alleen `hass.callService`/`hass.callWS` voor communicatie.

Bronnen:

- [SpotifyPlus services.yaml](https://github.com/thlucas1/homeassistantcomponent_spotifyplus/blob/master/custom_components/spotifyplus/services.yaml)
- [SpotifyPlus service-implementaties](https://github.com/thlucas1/homeassistantcomponent_spotifyplus/blob/master/custom_components/spotifyplus/media_player.py)
- [Spotify SDK response-modellen](https://github.com/thlucas1/SpotifyWebApiPython/tree/master/spotifywebapipython/models)
- [HA Music Assistant services](https://github.com/home-assistant/core/blob/dev/homeassistant/components/music_assistant/services.yaml)
- [MA response-schema's](https://github.com/home-assistant/core/blob/dev/homeassistant/components/music_assistant/schemas.py)
- [MA browse_media](https://github.com/home-assistant/core/blob/dev/homeassistant/components/music_assistant/media_browser.py)
- [HA WebSocket API](https://developers.home-assistant.io/docs/api/websocket/)

## Service responses

```json
{"type":"call_service","domain":"spotifyplus","service":"get_playlist_items","service_data":{"entity_id":"media_player.spotifyplus","playlist_id":"ID","limit":50,"offset":0},"return_response":true}
```

`hass.callWS` levert het WS-resultaat zonder buitenste transport-envelope. De kaart leest `response`; SpotifyPlus retourneert daarbinnen `result` plus `user_profile`. MA `get_library` geeft `items`; `search` geeft type-arrays; entity-services zoals `get_queue` zijn op entity_id geïndexeerd. De code bevat geen tokens, Spotify API-calls of MA-servercredentials.

## SpotifyPlus

| Functie | Actie / gegevens |
| --- | --- |
| Afspeellijsten | `get_playlist_favorites`, limit/offset |
| Playlistinhoud | `get_playlist_items`, playlist_id, limit/offset |
| Albums / inhoud | `get_album_favorites`, `get_album_tracks` |
| Artiesten / inhoud | `get_artists_followed` met after-cursor, `get_artist_top_tracks` |
| Favorieten | `get_track_favorites`, `save_track_favorites`, `remove_track_favorites`, ids |
| Podcasts | `get_show_favorites`, `get_show_episodes`; beschikbaarheid/accountregio door Spotify bepaald |
| Recent | `get_player_recent_tracks` met before-cursor |
| Zoeken | `search_all`, criteria, criteria_type, maximaal 50 per type |
| Afspelen | `player_media_play_context`, context_uri, offset_position; losse tracks via `player_media_play_tracks`, uris |
| Apparaten | `get_player_devices` plus `get_spotify_connect_devices`, refresh; `player_transfer_playback`, device_id, play |
| Wachtrij | `get_player_queue_info`, `add_player_queue_items` |

Een track zonder URI, lokaal item of expliciet onbeschikbaar item krijgt geen werkende afspeelknop. Lege/afgeschermde playlists kunnen door Spotify beperkt worden. Spotify bepaalt welke inactieve Connect-apparaten zichtbaar zijn; de kaart verzint geen offline telefoons/auto's. De oude SpotifyPlus Card blijft de fallback voor niet aangeboden specialistische functies.

## Music Assistant

- `get_library`: config_entry_id, media_type, limit:50, offset, optioneel favorite/order_by.
- `search`: config_entry_id, name, media_type, limit:50.
- `media_player/browse_media`: entity_id, media_content_id, media_content_type voor collectie-inhoud.
- `play_media`: entity target, media_id, media_type, enqueue; playlist-start via start_item.
- `get_queue`: huidige en volgende item + totaal. **Geen API voor het volledig uitlezen/verwijderen/herordenen van queue-items via deze standaardservice.**
- `transfer_queue`: doel als entity target, source_player en auto_play. Geen automatische overdracht bij bron- of kamerselectie.
- `media_player.join`/`unjoin`: alleen bij GROUPING-feature; MA controleert compatibiliteit.
- Favorieten lezen is beschikbaar. MA-favorieten wijzigen: gebruik de MA-app; geen fictieve actie.
- HA browse-responses geven niet altijd artiest/album/speelduur voor MA-tracks. Ontbrekende metadata wordt leeg/`—` weergegeven. De MA-collectie-inhoud kent via HA geen generieke pagina-API; Spotify en MA-bibliotheek worden wel per 50 geladen. Geen virtual scrolling in v0.1.0.
- Podcasts kunnen in de bibliotheek staan maar bladeren wordt niet door alle MA-versies ondersteund; de fout blijft zichtbaar met de bronapp als fallback.

De algemene media_player-acties voor play/pause, skip, volume, seek, shuffle en repeat worden begrensd door `supported_features`. Niet aanwezige services falen zichtbaar. Ontwikkeltests gebruiken expliciet gedocumenteerde fixtures; deze bewijzen niet de actuele backendversie of autorisaties van de gebruiker.

Let op: `pagination` en `search_options` zijn UI-secties in services.yaml, geen geneste serviceparameters. De Python-registratieschema’s verwachten platte `limit`/`offset`/`library_only`-velden. Dit is met regressietests vastgelegd.

## Performance en veiligheid

30 seconden lees-cache, deduplicatie van parallelle identieke aanvragen, maximaal 100 cachesleutels, 400 ms zoek-debounce, stale-response bescherming, geen automatische playback-retries. Een herkenbare 429 zet een backoff van 60 seconden. Minispelerpositie wordt lokaal per seconde bijgewerkt, zonder API-polling. Lit werkt bestaande DOM bij; Shadow DOM en expliciete basiskleuren blokkeren globale glaseffecten in de kaart. Afbeeldingen accepteren HTTP(S), same-origin paden en de exact meegeleverde radiologo’s; metadata wordt als tekst gerenderd.

## v0.1.2: lokale detectie en radio

SpotifyPlus’ lokale directory retourneert `result.Items` met hoofdlettergevoelige velden `Id`, `Name`, `IsActiveDevice`, `IsChromeCast`, `IsInDeviceList`, `IsRestricted`, `DeviceIdActivated` en `DiscoveryResult.IsDynamicDevice`. Dit is een ander contract dan de kleine letters in de online device-array. Beide bronnen worden onafhankelijk gelezen. Bekende ID/activated-ID-overlap wordt samengevoegd; namen alleen zijn geen identiteit. Niet-online lokale Cast-apparaten worden niet onterecht uitgefilterd. Overdracht gebruikt `player_transfer_playback` met de directory-ID of, bij een unieke naam zonder ID, de ondersteunde naam.

Bronnen: [SpotifyConnectDevices](https://github.com/thlucas1/SpotifyWebApiPython/blob/master/spotifywebapipython/models/spotifyconnectdevices.py), [SpotifyConnectDevice](https://github.com/thlucas1/SpotifyWebApiPython/blob/master/spotifywebapipython/models/spotifyconnectdevice.py).

Radio: presets met gecontroleerde HTTP-audiostreams en gebundelde omroeplogo’s. MA-bibliotheekresultaten krijgen waar mogelijk voorrang; ontbrekende/lege radiozoekfunctie blokkeert presets niet. `music_assistant.play_media` accepteert URL’s als media_id; radio speelt op een expliciete MA-doelkamer. Het config_entry_id wordt eerst aan de geselecteerde, daarna andere geconfigureerde MA-spelers ontleend. Logoherkomst: docs/RADIO-SOURCES.md. Alleen de exacte gebundelde data-URL’s zijn toegestaan; willekeurige data/SVG/HTML blijft geblokkeerd.

## v0.1.3: afspeelcompatibiliteit

`shuffle` wordt alleen aan SpotifyPlus- of MA-afspeelacties toegevoegd als het runtime serviceregister dit veld aanbiedt (ook binnen UI-veldgroepen). Radio krijgt het veld nooit. Gewoon afspelen behoudt bij oudere services de bestaande shufflemodus. Expliciet shuffle-afspelen gebruikt anders `media_player.shuffle_set` na succesvolle playback, uitsluitend als service en spelerfeature beschikbaar zijn; ontbrekende ondersteuning blokkeert de actie vooraf met uitleg. Playback wordt niet automatisch opnieuw geprobeerd. Gewone en geneste Home Assistant-foutobjecten worden naar een leesbare melding vertaald.
