## Cieľ
Zjednotiť šírku všetkých sekcií e-booku na jednu spoločnú hodnotu **820 px**, aby pôsobil vizuálne konzistentne (žiadne striedanie úzkych a širokých blokov).

## Zmeny v `public/neohack.html`

1. **Riadok 93–94** — zjednotiť oba wrappery na rovnakú šírku:
   ```css
   .eb-wrap{max-width:820px;margin:0 auto;padding:0 24px}
   .eb-wrap-wide{max-width:820px;margin:0 auto;padding:0 24px}
   ```
   Triedy ponecháme obe, aby sa nemusel meniť HTML markup.

2. **Skontrolovať gridy** v sekciách, ktoré dnes používajú `.eb-wrap-wide` (deficit, reset protokol, produkty, architektúra dňa). Pri 820 px môžu niektoré 3‑stĺpcové gridy pôsobiť tesne — ak treba, znížim `gap` alebo upravím `grid-template-columns` (napr. z 3 stĺpcov na 2 pre konkrétny grid). Posúdim po prvom rendri.

3. **PDF export ostáva nedotknutý** — riadok 490 už dnes prepisuje obe triedy na 100 % šírky stránky, takže export sa nezmení.

## QA
- Pozriem preview vo viewporte a skontrolujem všetky sekcie (cover, 01–08, deficit, reset, produkty, final).
- Vyrenderujem PDF cez existujúci export a overím, že všetkých 12 strán vyzerá rovnako ako predtým (žiadny regres v PDF).
