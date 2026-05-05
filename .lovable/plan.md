## Cieľ
Spojiť záverečnú sekciu („Fokus nie je talent…") na predchádzajúcu stranu s bonusovými produktmi (HydroFuel / Omega3Fuel / MineralFuel). PDF tak bude mať 12 strán namiesto 13 a zmizne aj prázdny biely pruh dole na poslednej strane.

## Zmeny v `public/neohack.html`

### 1. PDF override pre `.eb-final` (riadky 492–493)
Odstrániť `page-break-before:always` a `min-height:1080px`, aby sekcia plynule nadviazala za bonusovú sekciu na tej istej strane. Ponechať tmavé pozadie a centrovanie obsahu.

Nový blok:
```css
body.pdf-export .eb-final{
  padding:24px 0 40px!important;
  background:#0a0a0a!important;
  page-break-before:avoid!important;
  break-before:avoid!important;
  page-break-inside:avoid!important;
  break-inside:avoid!important;
}
body.pdf-export .eb-final .eb-final-inner{padding:0!important;width:100%!important}
```

### 2. Generický `section` page-break (riadok 494)
Selektor `body.pdf-export section{page-break-before:always…}` aktuálne zabezpečí, že každá `<section>` (vrátane `.eb-final`) začne novú stranu. Pridať výnimku pre `.eb-final`:
```css
body.pdf-export section:not(.eb-final){
  page-break-before:always!important;break-before:page!important;
  …ostatné pravidlá ostávajú…
}
```

### 3. Nič iné sa nemení
- Žiadne zmeny v obsahu (text, nadpisy, produkty).
- Žiadne zmeny vo webovej verzii (mimo `body.pdf-export`).
- Cover, ostatné sekcie a stránkovanie zostanú nedotknuté.

## QA cyklus
1. Vyrenderovať PDF, `pdftoppm -jpeg -r 120 export.pdf qa`.
2. Overiť, že:
   - PDF má 12 strán.
   - Bonusy + záverečný citát sú spolu na poslednej strane.
   - Žiadny biely pruh na spodku poslednej strany (celé tmavé pozadie až po koniec A4).
   - Predchádzajúce strany sú nezmenené.
3. V prípade potreby doladiť `padding` v bode 1 (napr. zväčšiť `padding-top` ak je medzi MineralFuel kartou a citátom príliš málo miesta).
