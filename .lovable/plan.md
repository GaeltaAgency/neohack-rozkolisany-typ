## QA scan results

I scanned the e‑book at three viewports (1920×1080, 768×1024, 375×812) and the rest of the page is solid: typography rhythm reads cleanly, product cards now have matching image/text height on desktop, the cards stack nicely on mobile with the image flush on top, the TOC, deficit grid, and protocol blocks all reflow correctly, and the footer + final CTA hold up.

Three issues are worth fixing for a true "final" version. Everything else is intentional and can stay.

## What to fix

### 1. Hero feels off‑center on wide desktops (highest impact)
On 1440 px and 1920 px the entire content column is locked at `max-width:720px` and centered, but the hero typography ("Rozptýlený typ.") is so large it visually hugs the left edge of that column. The result is a big empty band on the right of the screen and the page reads as misaligned.

Fix: keep the 720 px reading column for body copy, but let the hero stretch a bit wider (≈ 880–940 px) and re‑center it so the H1 sits balanced under the navbar. Also widen the TOC card slightly so it doesn't look like a narrow ribbon on 1920 px.

### 2. Mobile nav loses all section links with no replacement
At ≤ 720 px the rule `.eb-nav-links{display:none}` hides Obsah / Profil / Deficit / Reset / Protokol entirely, leaving only the logo and the "Stiahnuť PDF" button. There is no hamburger or alternative way to jump between sections on a phone.

Fix: add a small compact anchor row (icon‑less, single line, horizontally scrollable if needed) that appears below the logo on mobile only — same five anchors, smaller font, subtle separator. No JS hamburger needed; this keeps it lightweight and matches the editorial style.

### 3. Product card image is slightly oversized on tablet (768 px)
At tablet width the card is still in two‑column mode with a 240 px image, which leaves the right column cramped (≈ 380 px for heading + paragraph + CTA). The image dominates.

Fix: between 600 px and 900 px, drop the image column to 180 px so the text gets more breathing room. Keep desktop at 240 px and mobile stacked as today.

## Out of scope (intentionally not changing)

- PDF export layout — already verified clean over 14 A4 pages
- Color system, typography, gradients, accent purple — final
- TOC anchor smooth scroll — works on desktop; the in‑preview "scroll didn't move" I saw during QA is a sandbox iframe quirk, not a real bug (clicking the TOC link inside the page jumped correctly)
- Footer, final CTA, deficit grid, blood panel — all reading well across breakpoints

## Technical notes

File touched: `public/neohack.html` only (single‑file project, no React components involved).

CSS changes, roughly:

```text
.eb-wrap                 → keep max-width:720px (body copy)
.eb-hero, .eb-toc-wrap   → new wider wrapper, max-width:920px, margin:0 auto
.eb-nav-links-mobile     → new element, shown only @media (max-width:720px)
.eb-product              → @media (min-width:601px) and (max-width:900px) {
                              grid-template-columns: 180px 1fr;
                            }
```

HTML changes: wrap the hero block + TOC in a wider container div; add a second `<div class="eb-nav-links-mobile">` inside the navbar with the same five anchors. No content edits, no copy changes.

After implementation I will re‑screenshot all three viewports to confirm.
