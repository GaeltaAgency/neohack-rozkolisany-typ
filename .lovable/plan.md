# NEOHACK ebook — UI & PDF export refresh

Edits are scoped to a single file: `public/neohack.html`. No app/business logic changes.

## 1. Replace text logo with NEOHACK image

In the top nav (line 444), replace the `NEOHACK.SK` text mark with an `<img>` using:
`https://neohack.sk/cdn/shop/files/NEOHACK-C-SemiNeg-RGB.png`

- Wrap in the existing `<a href="#cover" class="eb-logo">` so it stays clickable.
- Set `height: ~28px`, `width: auto`, `display: block`, `alt="NEOHACK"`.
- Add `crossorigin="anonymous"` so html2canvas can include it in the PDF.
- Remove the `.dot` span styling usage (logo is now an image). Keep the `.eb-logo` class for layout but drop the text-specific font rules.

## 2. Simplify the toolbar (remove "Tlačiť" and "A4 náhľad")

In the nav (lines 446–448), keep only the **Stiahnuť PDF** button:

- Delete the `#a4Toggle` button.
- Delete the `onclick="window.print()"` button.
- Add a small download icon inside `#dlPdf` (inline SVG, currentColor, 14×14, sits left of the label via the existing flex gap).
- In the JS (lines 797–804) remove the entire A4 toggle handler block.
- In the PDF handler (lines 813, 825) remove the `wasA4` toggling — instead always render against the current dark theme (see step 3).
- Update the `@media print` rule on line 436: drop `#a4Toggle` selector (button no longer exists).

## 3. Make the downloaded PDF look like the dark site

Currently the export forces the `a4-preview` class (which converts everything to a light/white print layout) and uses `backgroundColor: '#ffffff'`. Change to dark output:

- Remove the `a4-preview` class manipulation in the download handler.
- In `html2canvas` options change `backgroundColor: '#ffffff'` → `'#0a0a0a'` (matches `--bg`).
- Add a temporary body class `pdf-export` while generating, removed in `finally`. Use it to:
  - Hide nav, diagnostics button/panel, and the floating download button during capture (`.pdf-export .eb-nav, .pdf-export .eb-diag, .pdf-export .eb-diag-toggle { display:none !important }`).
  - Force `background: #0a0a0a` on `html, body, main, section` so each rasterised page is dark edge-to-edge.
  - Add `break-inside: avoid` to cards (`.eb-item, .eb-step, .eb-product, .eb-deficit > div, .eb-blood > div, .eb-quote, .eb-callout`) so they don't get split mid-card across A4 pages.
- Keep `pagebreak: { mode: ['css','legacy'], before: 'section' }` so each section starts on a new page.
- Ensure all referenced product images already use `crossorigin="anonymous"` (add where missing) — required for `useCORS:true` to embed them in the dark PDF.

## 4. Replace final CTA with "Stiahnuť PDF"

On line 768, replace:
```
<a class="eb-final-cta" href="https://neohack.sk" target="_blank">Začni na neohack.sk</a>
```
with a button that triggers the same PDF download as the nav button:
```
<button class="eb-final-cta" type="button" id="dlPdfFinal">[icon] Stiahnuť PDF</button>
```
- Reuse the same download-icon SVG.
- In the JS, attach the same handler used for `#dlPdf` to `#dlPdfFinal` (extract handler into a named function `downloadPdf` and bind it to both buttons).
- Keep `.eb-final-cta` styling; add minor button-reset rules (border:none cursor:pointer) so the existing anchor styles render correctly on a `<button>`.

## 5. Light visual polish (inspired by the uploaded v4/FINAL files)

Only safe, additive tweaks — no structural change to sections or copy:

- Add a subtle radial accent glow behind the cover hero: `body::before` with `radial-gradient(60% 50% at 50% 0%, rgba(168,85,247,.18), transparent 70%)`, fixed, `z-index:-1`, `pointer-events:none`. Hidden during `pdf-export` to keep page bg solid.
- Slightly stronger top accent line on `.eb-item`, `.eb-product`, `.eb-step` (use `--ag` gradient at full opacity; current is fine but bump height to `2px`).
- Add a soft inner border-glow on hover for `.eb-product` (`box-shadow: 0 0 0 1px var(--acc30), 0 12px 40px -12px var(--acc30)`).

These are CSS-only, do not affect any data, copy, or product images.

## Out of scope

- Product image URLs (already correct from previous turn).
- Section copy and structure.
- Any React/route changes — file remains `public/neohack.html`, served via the existing `Index.tsx` redirect.

## Verification

After changes I will:
1. Read back the modified `public/neohack.html` regions to confirm edits.
2. Visit `/neohack.html` in the preview to confirm logo loads, only one toolbar button is present, final CTA reads "Stiahnuť PDF".
3. Note that PDF download cannot be triggered headlessly from the agent; the user should test the download once and confirm it is dark-themed.
