# All About Creatine — Redesign Specification & Agent Prompt

**Status:** Ready for implementation
**Source of truth:** The four approved HTML mockups (`index-home.html`, `best-creatine.html`, `product-review.html`, `article-hair-loss.html`). When this document and the mockups disagree on a visual detail, the mockups win — but the *principles* and *decision log* below override any new ad-hoc choices.
**Audience:** An LLM coding agent implementing the redesign in the existing Next.js codebase, plus every future agent that touches the site.

---

## 0. How to use this document

1. Read **Section 1 (Mission & guardrails)** and **Section 7 (Decision log)** first — they explain *why*, which is what keeps future changes consistent.
2. Use **Section 2 (Design tokens)** and **Section 3 (Component spec)** as the build contract.
3. Use **Section 4 (Page specs)** for per-page structure.
4. Copy **Section 8 (The implementation prompt)** directly into your coding agent to kick off the work.
5. Before opening a PR, run **Section 6 (Acceptance checklist)**.

---

## 1. Mission & guardrails

### Mission
Transform the site from a generic **SaaS-marketing-template** look into a calm, clinical **health-authority** experience that reads like a trustworthy medical resource (reference points: Examine.com's rigor, Healthline's polish). The redesign must increase reader trust, because trust is what drives the affiliate clicks the site monetizes.

### What we are moving away from (the "SaaS look")
The current Next.js build has: a big gradient hero with two generic CTA buttons, three equal rounded "feature" cards, a prominent "Stay in the Loop" newsletter block, and a link-list footer. It has whitespace but **no credibility signals** — no medical reviewer, no author authority, no visible citations, no "last updated" dates, no testing methodology, no trust strip. It could be selling project-management software.

### Non-negotiable guardrails (apply to every page, forever)
- **G1 — Earn trust visibly.** Every monetized or health-claim page must carry credibility signals: a medically-reviewed byline, a "last updated/verified" date, and (for health claims) cited sources.
- **G2 — Affiliate honesty.** A plain-language affiliate disclosure appears near the top of any page with affiliate links *and* in the footer. Disclosures never hide. Commissions never influence rankings, and the copy must say so.
- **G3 — Amber means money.** The amber/gold CTA color is reserved **exclusively** for affiliate "Check price" / "Buy" actions. Never use amber for navigation, newsletter, or generic buttons. This trains the eye that amber = the revenue action.
- **G4 — Evidence over hype.** No superlatives without backing. Health claims link to peer-reviewed research or major bodies (ISSN, NIH, AAD). Prefer "the evidence shows" to "scientists agree."
- **G5 — Calm and clinical.** Generous white space, restrained color, no decorative gradients competing with content. Gradients are allowed only as image placeholders.
- **G6 — Accessibility is part of done.** Semantic HTML, WCAG AA contrast, keyboard-navigable, visible focus states, alt text on real images, `prefers-reduced-motion` respected.
- **G7 — Not medical advice.** Educational framing; a "not medical advice" line in the footer; sensitive claims point readers to a professional.

---

## 2. Design tokens

Implement these as the single source of truth (CSS custom properties and/or Tailwind theme extension). Do not introduce off-palette colors.

### Color
| Token | Value | Role |
|---|---|---|
| `--navy` | `#0e2a47` | Primary brand / headers / footer / authority |
| `--navy-2` | `#163a5f` | Navy hover / gradient partner |
| `--ink` | `#1b2733` | Body text on light |
| `--slate` | `#54657a` | Secondary text |
| `--muted` | `#7b8a9c` | Tertiary text, captions, meta |
| `--teal` | `#0d8f8f` | Primary clinical accent, links, primary buttons |
| `--teal-dark` | `#0a7373` | Teal hover |
| `--mint` | `#e7f4f3` | Soft accent fills, badges, icon chips |
| `--mint-2` | `#f2f9f8` | Lightest fill, callouts |
| `--gold` | `#f5b301` | Star ratings, award badges, #1 rank |
| `--amber` | `#f2a414` | **Affiliate CTA buttons only** (see G3) |
| `--amber-dark` | `#d98c00` | Amber CTA hover |
| `--line` | `#e4eaf0` | Borders / dividers |
| `--line-2` | `#eef2f6` | Subtle inner dividers |
| `--bg` | `#ffffff` | Page background |
| `--bg-soft` | `#f6f9fb` | Section backgrounds, table headers |

Shadows: `--shadow: 0 1px 2px rgba(16,40,64,.05), 0 8px 24px rgba(16,40,64,.06)` and `--shadow-lg: 0 12px 40px rgba(16,40,64,.10)`. Radius scale: 8–10px (controls), 12–16px (cards), 18–20px (hero panels).

### Typography
- **Headings:** `Source Serif 4` (weights 400/600/700) — editorial, journal-like authority.
- **Body & UI:** `Inter` (weights 400/500/600/700).
- Load via `next/font` (Google) — no render-blocking `<link>` in production.
- Scale (desktop → mobile): H1 44–54 → 31–34; H2 28–38 → 23–30; H3 20–21; body 16.5–17.5 (articles) / 15–16 (UI); meta 12–13.5. Headings use `letter-spacing:-.02em`; line-height ~1.1 for headings, 1.65–1.75 for body.

### Layout
- Max content width `1140px`; article reading column ~`760–820px`.
- Standard page gutter `24px`.
- Article/listicle/review pages use a `1fr / 280px` two-column grid with a sticky right sidebar (TOC + top-pick card); collapses to single column below 980px.

---

## 3. Component spec

Build these as reusable Next.js/React components. Each must be responsive and accessible.

1. **TrustBar** — thin navy strip above the header. 2–3 items with gold icons (e.g. "Reviewed by registered dietitians", "1,200+ studies cited", "No sponsored rankings"). Content configurable.
2. **SiteHeader** — sticky, translucent-on-scroll, blur backdrop, 1px bottom border. Brand lockup (gradient logo tile + name + uppercase tagline), nav links (Guides / Reviews / Best Creatine / FAQ), one teal `nav-cta` ("Top Picks 2026"), hamburger below 640px.
3. **MedicallyReviewedByline** — avatar/initials + author + a teal "Medically reviewed by Dr. ___, RD" line with shield-check icon + published/updated dates. Used on guides, reviews, and listicles.
4. **AffiliateDisclosure** — mint callout with left teal border + info icon: "We earn a commission if you buy through links on this page, at no extra cost to you. This never affects our scores." Links to full disclosure. (Also a condensed footer version.)
5. **ComparisonTable** — columns: rank chip, product (thumb + name + sub + "best for" badge), best-for (hideable on mobile), star rating + numeric score, price + price/serving, amber "Check price" CTA. #1 row gets a subtle highlight; rank 1 chip is gold.
6. **ProductReviewCard** (listicle detail) — rank tile, product image, "Best X" label, name, score pill + stars, price; body copy; **Pros/Cons** two-column block; "Who it's for" highlight; footer with spec line + amber CTA.
7. **StarRating** — accessible (aria-label with numeric value), gold stars, half-star support.
8. **RatingBreakdown** — labeled horizontal bars (Purity / Testing / Mixability / Value) with teal fills + numeric scores. Review hero only.
9. **VerdictBox** — navy panel, gold star icon, "The verdict" heading, score badge, 2–3 sentence summary. Review pages.
10. **ProsConsGrid** — green-tinted "What we liked" vs amber-tinted "What to consider", check/x icons.
11. **SpecTable** — two-column key/value table (form, dose, servings, certification, etc.).
12. **KeyTakeaways** — mint box with checkmarks; 3–5 bullets at the top of articles.
13. **Callout** — `note` (teal) and `warn` (amber) variants with icon + title + body. For "in plain terms" and medical/safety notes.
14. **CitationRef** — superscript link to a numbered **References** list (`<sup><a href="#refs">n</a></sup>` + ordered list with source + outbound link).
15. **InlineAffiliateCTA** — in-article product strip (thumb, "Editor's choice" label, name, stars, amber CTA) + a small italic per-instance disclosure.
16. **AuthorBio / ReviewerCard** — avatar, name, credentials, short bio; states that the team independently tests and manufacturers have no input on scores.
17. **StickyMobileCTA** — fixed bottom bar on mobile (product name + price + amber "Check price"). Listicle + review pages.
18. **TableOfContents** — sticky sidebar; smooth-scroll anchors; active-section highlight optional.
19. **SiteFooter** — navy; brand + description, Learn/Products/Site link columns, full affiliate disclosure box, "not medical advice" line.
20. **NewsletterBlock** — demoted from hero status; mint panel, single email field + teal button, privacy reassurance. Secondary, never the page's main CTA.

---

## 4. Page specs

Each page already exists as an approved mockup; match its structure and apply the components above.

### 4.1 Homepage (`index-home.html`)
TrustBar → Header → Hero (serif headline, sub, **teal** primary CTA to comparison + ghost CTA to guide, credibility stats row, and a live "Best Creatine 2026" ranking card) → three content pillars (Guides / Rankings / FAQ, reframed around trust) → **Authority band** ("Why you can trust us" checklist + ReviewerCard) → popular guides grid → navy CTA band → NewsletterBlock → Footer. No amber on this page except inside the ranking card's price context if a CTA is shown.

### 4.2 Best Creatine listicle (`best-creatine.html`)
Breadcrumb → kicker + serif H1 + dek → MedicallyReviewedByline → **AffiliateDisclosure (top)** → **ComparisonTable** → "Prices last verified" line → **"How we tested" methodology** block → ProductReviewCards (scored, pros/cons, who-it's-for, amber CTAs) → FAQ → **References** → sidebar (top-pick card + TOC) → **StickyMobileCTA**.

### 4.3 Single product review (`product-review.html`)
Breadcrumb → two-column review hero (image gallery + buy box: overall score, **RatingBreakdown** bars, price/serving, amber CTA, "price last verified" + commission note) → MedicallyReviewedByline → AffiliateDisclosure → **VerdictBox** → ProsConsGrid → sectioned body ("How it performed", with cited claims) → **SpecTable** → "Who should buy it" → References → AuthorBio → sidebar ("Compare alternatives" + TOC) → StickyMobileCTA.

### 4.4 Article / blog (`article-hair-loss.html`)
Breadcrumb → category tag + serif H1 + dek → article meta (author, **medically-reviewed**, read time, share) → hero image (with caption) → **KeyTakeaways** → lead paragraph → sectioned body with **CitationRefs**, **Callouts** (note/warn), a claim-vs-evidence **data table**, and a pull quote → **InlineAffiliateCTA** (placed naturally where a recommendation is relevant) → "bottom line" → References → AuthorBio → related reading → sidebar (TOC + top-pick card).

---

## 5. Technical implementation notes
- Stack: existing **Next.js**. Keep the current routes/IA (Guides, Reviews, Best Creatine, FAQ). Reviews index is currently empty — wire it to list review pages.
- Centralize tokens once (CSS variables in a global stylesheet and/or `tailwind.config` theme). All components consume tokens; no hard-coded hex outside the token file.
- Icons: inline SVG (stroke-based, ~1.5–2px). Keep an icon set/component; don't paste raw SVG ad hoc.
- Fonts via `next/font/google` (Source Serif 4 + Inter).
- Affiliate links: route through whatever affiliate/redirect mechanism exists; add `rel="sponsored nofollow"` and `target` per policy. Add `aria-label` describing the destination.
- Structured data: add `Article`/`Review`/`ItemList`/`FAQPage` JSON-LD where applicable (the credibility signals map naturally to schema.org). Include `author`, `reviewedBy`, `datePublished`, `dateModified`.
- Performance: lazy-load below-the-fold images, set explicit dimensions, ship the sticky CTA without layout shift.
- Replace all gradient/SVG placeholders with real product photography before launch.

---

## 6. Acceptance checklist (run before every PR)
- [ ] Uses only Section 2 tokens; no off-palette colors; no hard-coded hex in components.
- [ ] Source Serif 4 headings + Inter body, loaded via `next/font`.
- [ ] Amber appears **only** on affiliate CTAs (G3).
- [ ] Every monetized/health page has: medically-reviewed byline, last-updated date, top affiliate disclosure, footer disclosure (G1, G2).
- [ ] Health claims carry citations linking to a References list (G4).
- [ ] Footer includes "not medical advice" line (G7).
- [ ] Responsive at 360 / 768 / 1140px; sidebar collapses ≤980px; mobile sticky CTA present on listicle + review.
- [ ] WCAG AA contrast; keyboard nav; visible focus; alt text; `prefers-reduced-motion` honored (G6).
- [ ] JSON-LD present and valid for the page type.
- [ ] No new dependency added without need; tokens/components reused, not duplicated.

---

## 7. Decision log (the "why" — read before changing anything)
Each entry is a rule + its reason so future agents reproduce the intent, not just the pixels.

- **D1 — Serif headings + sans body.** Serif signals editorial/medical authority; sans keeps UI clean and legible. *Don't* switch headings to a sans "for modernity" — that's the SaaS look we removed.
- **D2 — Navy + teal palette.** Cool, clinical tones read as medical credibility; warm/bright brand colors read as consumer-marketing. Keep saturation restrained.
- **D3 — Amber reserved for affiliate CTAs.** A single, consistent "money color" lifts click-through and signals honesty (the buy action is never disguised as content). Diluting amber across the UI destroys this signal. (= G3)
- **D4 — Credibility signals are structural, not decorative.** Reviewer bylines, dates, methodology, and citations exist because they convert *and* because they're ethically required for health content. Never drop them to "clean up" a layout. (= G1)
- **D5 — Disclosure is prominent and repeated.** Trust (and FTC expectations) require it. Hiding disclosure to look sleeker is forbidden. (= G2)
- **D6 — Newsletter is demoted.** On the old site it competed for primary attention; here the primary path is content → trust → affiliate. Newsletter is a secondary capture, never the hero CTA.
- **D7 — Comparison/review density with breathing room.** Tables, scores, pros/cons, and breakdown bars give the at-a-glance utility affiliate readers want; white space keeps it from feeling like a spec dump. Balance both.
- **D8 — Evidence framing.** Articles lead with key takeaways and resolve claims against the *body* of evidence, citing sources and flagging single/weak studies honestly. This is the brand's differentiator vs. hype sites. (= G4)
- **D9 — Placeholders are temporary.** Gradient/SVG art and illustrative citations/reviewer names are scaffolding; production needs real photography, a real named reviewer, and real source URLs.
- **D10 — Tokens are law.** One palette, one type system, reused components. New visual decisions extend the token set deliberately — they don't bypass it.

---

## 8. The implementation prompt (paste this into your coding agent)

> **Task:** Redesign the All About Creatine website (existing Next.js app) from its current generic SaaS-template appearance into a clean, clinical, evidence-based **health-authority** design, exactly matching the four approved HTML mockups and the specification in `REDESIGN_SPEC.md`.
>
> **Before coding:** Read `REDESIGN_SPEC.md` in full, especially Section 1 (mission & guardrails), Section 7 (decision log), and the four mockups it references. Treat the mockups as the visual source of truth and the guardrails/decision log as the rules that govern all future choices.
>
> **Do this:**
> 1. Create a single design-token source (CSS custom properties + Tailwind theme extension) from Section 2. No hard-coded colors anywhere else.
> 2. Load Source Serif 4 (headings) and Inter (body) via `next/font/google`.
> 3. Build the reusable components in Section 3 (TrustBar, SiteHeader, MedicallyReviewedByline, AffiliateDisclosure, ComparisonTable, ProductReviewCard, StarRating, RatingBreakdown, VerdictBox, ProsConsGrid, SpecTable, KeyTakeaways, Callout, CitationRef, InlineAffiliateCTA, AuthorBio, StickyMobileCTA, TableOfContents, SiteFooter, NewsletterBlock).
> 4. Rebuild the four page types per Section 4: Homepage, Best Creatine listicle, single Product Review, and educational Article. Preserve existing routes and content; migrate the real copy from the current pages.
> 5. Add JSON-LD (Article/Review/ItemList/FAQPage) with author, reviewedBy, datePublished, dateModified.
> 6. Keep affiliate links routed through the existing mechanism with `rel="sponsored nofollow"` and descriptive aria-labels.
>
> **Hard rules (do not violate):**
> - Amber (`#f2a414`) is used **only** for affiliate "Check price"/"Buy" buttons.
> - Every monetized or health-claim page must show a medically-reviewed byline, a last-updated date, a top-of-page affiliate disclosure, and a footer disclosure.
> - Health claims must link to citations in a References section.
> - Use only the Section 2 tokens; reuse components rather than duplicating styles.
> - Meet WCAG AA, keyboard navigation, visible focus, and `prefers-reduced-motion`.
>
> **Definition of done:** Every item in Section 6 (Acceptance checklist) passes. Leave gradient/SVG placeholders where real product photos will go, and keep the reviewer name and citation URLs as clearly-marked placeholders for the content team to fill.
>
> **When in doubt:** Follow the decision log (Section 7). If a requested change would weaken a credibility signal, demote a disclosure, or spread the amber CTA color, flag it instead of doing it.

---

*Keep this file in the repo (e.g. `/docs/REDESIGN_SPEC.md`). Update the token table and decision log here whenever the design evolves so every future agent inherits the same decisions.*
