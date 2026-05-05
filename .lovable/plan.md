## Plán úprav

1. **Odstrániť biely pruh na poslednej PDF strane**
   - Upravím `body.pdf-export .eb-final`, aby záverečná sekcia pri exporte vyplnila celú poslednú A4 stranu tmavým pozadím.
   - Zruším kolidujúce duplicitné pravidlá pre `.eb-final`, kde sa najprv nastavuje väčší padding a hneď potom sa prepíše na `14px`, čo necháva prázdnu/bielu časť pri rasterizácii.
   - Nastavím finálnej sekcii stabilnú A4 výšku v PDF režime a vertikálne centrovanie obsahu tak, aby text ostal hore esteticky podobne, ale pozadie išlo až po spodok stránky.

2. **Opraviť malý vizuálny presah v sekcii produktov**
   - Podľa screenshotu je cez produktový card viditeľný horizontálny tmavý pruh/prechod medzi stránkami alebo sekciami.
   - Skontrolujem PDF pravidlá pre `page-break-inside`, produktové karty a sekciu `#s9`; upravím rozdeľovanie tak, aby sa karta nezačínala pod prekrytou hranou a aby sa jej horný okraj/rám neorezal.
   - Ak treba, mierne zmenším PDF rozmery produktovej karty (`image column`, `gap`, `padding`, `margin`) len v `pdf-export` režime, aby sa jednotlivé produktové bloky lepšie zmestili na A4.

3. **Zachovať aktuálny web vzhľad**
   - Úpravy budú obmedzené na PDF/export CSS a prípadne export nastavenia, aby bežný web/preview nebol vizuálne zmenený.

4. **Overenie**
   - Vygenerujem nový PDF export.
   - Skontrolujem počet strán a najmä poslednú stranu: tmavé pozadie musí siahať až na spodok bez bieleho pruhu.
   - Skontrolujem produktovú časť zo screenshotu, či sa karta/rám neorezáva a cez ňu nejde horizontálny pruh.