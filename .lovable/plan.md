## Diagnóza z PDF (NEOHACK-Rozptyleny-typ-2.pdf)

Prešiel som celých 15 strán exportu a všetky majú **rovnakú vážnu chybu**: text zaberá len ľavú polovicu A4 strany, pravá polovica je čierna a prázdna. Konkrétne:

- **Strana 1 (cover)**: titulok aj produktový obrázok sú stlačené vľavo, pravá tretina prázdna.
- **Strany 2–14 (obsah)**: každý odsek aj karta sú orezané v pravej polovici — slová končia v polovici stránky (`...vlastného tela`, `...nervová kapacita pre`, `...nepretrhovanú prácu`). Chýbajúce písmená nie sú zalomené, sú orezané mimo viditeľnej oblasti.
- **Strana 15 (záver)**: prakticky celá prázdna, len malý citát v ľavom dolnom rohu.
- **Bonus**: spodok posledných strán je už správne tmavý (predošlá oprava drží), ale samotný layout je nepoužiteľný.

### Príčina

V `public/neohack.html` na riadku 485:
```css
body.pdf-export main{width:794px!important;max-width:794px!important;margin:0 auto!important}
```

794 px = plná šírka A4 pri 96 dpi (210 mm). Keďže `@page` má `margin:14mm`, reálna potlačiteľná plocha je len **~600 px**. Puppeteer renderuje `main` na 794 px, vycentruje ho v 600 px viewporte → pravá strana sa vyreže. Karta produktu na cover je `240px` široká + padding, takže končí ďaleko vpravo a je tiež orezaná.

## Plán opravy (jeden súbor: `public/neohack.html`)

### 1. Zarovnať šírku PDF kontentu s potlačiteľnou plochou
- Zmeniť `body.pdf-export main` z `794px` na **`600px`** (zodpovedá 210 mm − 2×14 mm).
- Resetnúť `padding-left/right` na 0, aby horizontálne medzery riadil výhradne `@page margin`.
- To isté aplikovať aj na `.eb-wrap` a `.eb-wrap-wide` v PDF móde — odstrániť ich vlastný `max-width` a `padding`, nech dedia šírku po `main`.

### 2. Cover (strana 1) — využiť celú šírku
- Aktuálne sa cover obrázok aj titulok držia vľavo. Po oprave šírky si sadnú na stred. Navyše v `body.pdf-export #cover` zariadiť `width:100%` pre `.eb-wrap-wide` a vycentrovať obrázok pod text (alebo nechať vedľa, ale v rámci 600 px).
- Skontrolovať že `.eb-hero-title` neostáva mikro (po zmene šírky možno zväčšiť z 42 px späť na ~48 px).

### 3. Posledná strana (strana 15) — vyplniť obsahom
- `eb-final` sekcia má prázdne miesto vďaka `page-break-before:always`. Po oprave šírky bude citát aspoň čitateľný cez celú šírku. Pridať trochu vertikálneho centrovania (`min-height` alebo `padding-top`) aby citát nebol pri spodku.

### 4. Produktové karty v PDF
- Pri 600 px šírke je 240 px obrázok + text tesné. Pre PDF mód prepnúť `.eb-product` na `grid-template-columns: 200px 1fr` aby zostal komfortný priestor.

### 5. QA cyklus (povinné)
Po úprave:
1. Vyrenderovať PDF (sandbox má rovnaký Puppeteer endpoint ako export).
2. `pdftoppm -jpeg -r 120 export.pdf qa` a vizuálne skontrolovať **každú** stranu.
3. Hľadať: orezaný text vpravo, prázdne pásy, zalamovanie cez fialový pás, prázdne strany, posledná strana s bielym pozadím.
4. Iterovať kým všetkých 14–15 strán nie je čistých.

## Čo sa NEMENÍ
- Webová verzia (desktop/tablet/mobile) — minulé QA potvrdilo, že je v poriadku.
- Farby, typografia, obsah, poradie sekcií.
- Mobilná navigácia, TOC, deficit grid.

## Technická poznámka
Všetky zmeny sú v rozsahu `body.pdf-export …` selektorov v `public/neohack.html` (riadky ~440–505) plus jeden tweak `.eb-product` v PDF mód. Žiadne zásahy do React kódu, žiadne nové súbory.
