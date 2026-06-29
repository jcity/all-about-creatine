# AGENTS.md — All About Creatine

Rules for any agent (or human) working on this repo. Keep changes consistent with the **health-authority** design system. Full detail lives in `redesign/REDESIGN_SPEC.md` and the approved mockups — this file is the always-on summary. **When a change would weaken a guardrail, flag it instead of doing it.**

## What this site is
An evidence-based creatine resource monetized through affiliate links (product reviews/comparisons → retailer clicks). The look is **clean, clinical, medical-authority** — *not* a SaaS marketing template. Trust is the product; trust drives the clicks.

## Stack
**Next.js `16.2.9`** (App Router, Turbopack) · React 19 · Tailwind v4 · Velite (MDX content) · deployed on Vercel. Fonts: Source Serif 4 (headings) + Inter (body) via `next/font/google`. **Stay on the latest stable Next.js** — check [nextjs.org](https://nextjs.org/docs) before bumping (`npm install next@latest eslint-config-next@latest`), and update this version line whenever you do so every agent references the current version.

## Guardrails (never violate)
- **G1 — Trust is visible.** Every monetized or health-claim page shows a medically-reviewed byline, a "last updated/verified" date, and (for health claims) cited sources.
- **G2 — Affiliate honesty.** Plain-language affiliate disclosure near the top of any page with affiliate links **and** in the footer. Never hide it. State that commissions don't influence rankings.
- **G3 — Amber = money.** The amber CTA color (`#f2a414`) is used **only** for affiliate "Check price"/"Buy" buttons. Never for nav, newsletter, or generic buttons.
- **G4 — Evidence over hype.** No superlatives without backing. Health claims link to peer-reviewed research or major bodies (ISSN, NIH, AAD). Flag single/weak studies honestly.
- **G5 — Calm & clinical.** Generous white space, restrained color. Gradients only as image placeholders.
- **G6 — Accessibility is part of done.** Semantic HTML, WCAG AA contrast, keyboard nav, visible focus, alt text, honor `prefers-reduced-motion`.
- **G7 — Not medical advice.** Educational framing; "not medical advice" line in footer; sensitive claims point readers to a professional.

## Design tokens (single source of truth — no off-palette hex in components)
| Token | Value | Role |
|---|---|---|
| `--navy` | `#0e2a47` | Brand / headers / footer / authority |
| `--navy-2` | `#163a5f` | Navy hover / gradient partner |
| `--ink` | `#1b2733` | Body text |
| `--slate` | `#54657a` | Secondary text |
| `--muted` | `#7b8a9c` | Meta / captions |
| `--teal` | `#0d8f8f` | Primary accent, links, primary buttons |
| `--teal-dark` | `#0a7373` | Teal hover |
| `--mint` | `#e7f4f3` | Badges, icon chips, soft fills |
| `--mint-2` | `#f2f9f8` | Lightest fill, callouts |
| `--gold` | `#f5b301` | Star ratings, awards, #1 rank |
| `--amber` | `#f2a414` | **Affiliate CTA only (G3)** |
| `--amber-dark` | `#d98c00` | Amber CTA hover |
| `--line` | `#e4eaf0` | Borders / dividers |
| `--line-2` | `#eef2f6` | Subtle inner dividers |
| `--bg` | `#ffffff` | Page background |
| `--bg-soft` | `#f6f9fb` | Section bg, table headers |

- **Type:** `Source Serif 4` for headings (editorial authority), `Inter` for body/UI. Load via `next/font/google`. Headings `letter-spacing:-.02em`, line-height ~1.1; body 1.65–1.75.
- **Shape:** radius 8–10px controls, 12–16px cards, 18–20px hero panels. Shadows soft and navy-tinted.
- **Layout:** max width 1140px; reading column ~760–820px; listicle/review/article use `1fr / 280px` with sticky sidebar, collapsing ≤980px.

## Decision log (the *why* — reproduce intent, not just pixels)
- **D1** Serif headings + sans body = medical/editorial authority. Don't "modernize" headings to sans — that's the SaaS look we removed.
- **D2** Navy + teal = clinical credibility. Keep saturation restrained; no warm consumer-marketing brand colors.
- **D3** One reserved "money color" (amber) lifts CTR and keeps the buy action honest. Spreading amber across the UI destroys the signal. (=G3)
- **D4** Credibility signals (bylines, dates, methodology, citations) are structural, not decorative. Never drop them to tidy a layout. (=G1)
- **D5** Disclosure is prominent and repeated — required for trust and FTC. Never hide it to look sleeker. (=G2)
- **D6** Newsletter is a *secondary* capture, never the hero CTA. Primary path is content → trust → affiliate.
- **D7** Comparison/review pages balance data density (tables, scores, pros/cons, breakdown bars) with white space — useful, not a spec dump.
- **D8** Articles lead with key takeaways and resolve claims against the full body of evidence, citing sources. This is the brand's differentiator vs. hype sites. (=G4)
- **D9** Gradient/SVG art, illustrative citations, and the reviewer name are placeholders — production needs real photos, a real named reviewer, and real source URLs.
- **D10** Tokens are law: one palette, one type system, reused components. Extend the token set deliberately; never bypass it.

## Before every PR
Uses only the tokens above · serif/sans pairing intact · amber only on affiliate CTAs · byline + date + top & footer disclosure on monetized/health pages · health claims cited · "not medical advice" in footer · responsive (360/768/1140) with sidebar collapse + mobile sticky CTA · WCAG AA + keyboard + focus + reduced-motion · valid JSON-LD (Article/Review/ItemList/FAQPage) · components reused, not duplicated.

## Reference
- `redesign/REDESIGN_SPEC.md` — full spec, component list, page specs, implementation prompt.
- Approved mockups: `index-home.html`, `best-creatine.html`, `product-review.html`, `article-hair-loss.html` (visual source of truth).
