# Editorial Compact Polish — neohack.html

Goal: tighter, more book-like rhythm with strong readability. Cover (hero + Obsah) fits on a single A4 page. Same compact rules apply globally.

## Typography scale (new)

- Body: `15px / 1.6`, letter-spacing `0`
- H1 (chapter): `clamp(24px, 3vw, 32px)`, line-height `1.25`, weight 700
- H2: `clamp(19px, 2.2vw, 23px)`, line-height `1.3`
- H3: `16px`, line-height `1.35`, weight 600, uppercase tracking `.04em`
- Hero title (cover): `clamp(36px, 6.5vw, 64px)`, line-height `1.05`
- Small / meta / chips: `12.5px`, line-height `1.4`
- Keep `padding-bottom: .15em` trick on gradient text to prevent descender clipping

## Spacing rhythm (new)

- Section vertical padding: `48px` desktop / `32px` mobile (was ~80/56)
- Wrap max-width unified: `720px`
- Block stack gap (paragraphs, items): `14px`
- Card/item internal padding: `18px 20px` (was ~24/28)
- Heading margin-bottom: `10px`; margin-top: `28px`
- Quote padding: `16px 20px`
- TOC row height: `32px`, gap `4px`

## Cover page — fit on one A4

Reduce so hero + full Obsah render inside one 210×297mm page in PDF:

- Cover top padding: `28mm` print / `48px` screen
- Hero title scale capped at `52px` in print
- Subtitle: `15px`, single line where possible
- Hero description: max `2 short lines`, `14px / 1.5`
- Drop hero CTA chips on print (keep on screen) OR shrink to `11px`
- Obsah: 9 rows × `28px` = ~252px; numerals `13px`, title `14px`, dotted leader thinner (`1px`)
- Remove decorative spacer between hero and Obsah on print
- Add `body.pdf-export #cover { padding: 18mm 16mm; }` and `page-break-after: always`

## Print rules (A4)

```css
@page { size: A4; margin: 14mm 14mm 16mm; }
body.pdf-export { font-size: 14px; line-height: 1.55; }
body.pdf-export section { padding: 10mm 0 !important; page-break-before: always; }
body.pdf-export #cover { page-break-before: avoid; }
body.pdf-export .eb-item,
body.pdf-export .eb-quote,
body.pdf-export .eb-product,
body.pdf-export .eb-toc { break-inside: avoid; }
body.pdf-export .eb-back { display: none; }
```

## Visual consistency pass

- Unify all border colors to a single token (`rgba(168,85,247,.18)`) and width `1px`
- Unify all card radii to `10px`
- Unify accent gradient stops in one CSS variable, reuse everywhere
- Replace inconsistent margin values (24/28/32/40) with a 4-step scale: `8 / 14 / 24 / 40`
- Chips: same height `26px`, padding `0 10px`, font `12px`

## Validation

1. Open `/neohack.html` in preview, check screen rendering at desktop + 390px
2. Trigger PDF export, count pages, verify cover is single page
3. Convert PDF to images with `pdftoppm -r 150` and inspect each page for clipping, orphaned headings, broken cards
4. Iterate on any page that breaks awkwardly

## Files touched

- `public/neohack.html` only (CSS + minor markup tweaks for cover)
