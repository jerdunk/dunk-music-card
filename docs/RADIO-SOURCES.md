# Radio: bronnen en verificatie

De logo’s zijn ongewijzigde afbeeldingen van de omroepen, meegeleverd voor zenderherkenning. Merken en beeldrechten blijven bij de betreffende omroep; ze vallen niet onder de MIT-licentie van de applicatiecode. Geen officiële samenwerking geïmpliceerd.

Geraadpleegd en HTTP gecontroleerd op 2026-11-12:

- qmusic: https://qmusic.nl/assets/qmusic-a1d81a5f88375b3c5507cbc0b064ce1fc8778a076a245bddfd4f2a3e2417c330.png
- q90: https://cdn-radio.dpgmedia.net/2/72/3d/09/109/Site-logo-_220x220_2.png
- radio538: https://www.538.nl/icons/radio538/apple-icon-144x144.png
- sky: https://www.skyradio.nl/icons/skyradio/apple-icon-144x144.png
- veronica: https://api.mediahuisradio.nl/media/q0yn3snu/veronica_logo_online_1920x1080.jpg?width=220&format=webp
- npo: https://www.nporadio2.nl/apple-touch-icon.png

De zes streamadressen in src/radios.ts zijn gecontroleerd op een HTTP 200/206-audiorespons. Dat bewijst bereikbaarheid vanuit de ontwikkelomgeving, niet afspelen vanuit het thuisnetwerk. Er is niet afgespeeld op apparaten van de gebruiker. De kaart gebruikt geen Radio Browser-server tijdens gebruik; Music Assistant verzorgt het afspelen.
