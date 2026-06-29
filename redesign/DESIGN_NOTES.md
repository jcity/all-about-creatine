# All About Creatine — Redesign Notes

A redesign of allaboutcreatine.com from a generic SaaS-template look to a clean, clinical **health-authority** aesthetic built to earn reader trust and drive affiliate clicks.

## How to review

Open `index.html` for the gallery linking all four mockups, or open any file directly:

- `index-home.html` — Homepage
- `best-creatine.html` — "Best Creatine of 2026" comparison / listicle
- `product-review.html` — Single product review (Thorne Creatine)
- `article-hair-loss.html` — Educational article ("Does creatine cause hair loss?")

Every file is self-contained and responsive (inline CSS, Google Fonts only — no other dependencies). The four pages are cross-linked, so you can click through the nav, breadcrumbs, and CTAs.

---

## (a) What the old site looked like

The current site is a Next.js build with a generic **SaaS marketing-template** feel. From inspecting the live pages:

- **Structure / nav:** Logo + Guides · Reviews · Best Creatine · FAQ. Hero with two buttons, three stacked "feature" sections (Guides / Product Rankings / FAQ), a newsletter capture, and a link-list footer.
- **Content already there (and genuinely good):** a solid "What Is Creatine" guide, a "Best Creatine Supplements of 2026" ranked list with a comparison table and 5 detailed reviews (Thorne, Optimum Nutrition, Transparent Labs, Nutricost, CON-CRET), and an affiliate disclosure. The Reviews index is empty ("Reviews coming soon").

### Why it "looks like a SaaS site"
- A big gradient hero with two generic CTA buttons — the default startup landing-page pattern.
- Three equal rounded "feature cards," the universal SaaS "three benefits" row.
- A newsletter "Stay in the Loop" block as a primary element.
- Plenty of whitespace but **no credibility signals** — no medical reviewer, no author authority, no visible citations, no "last updated," no testing methodology, no trust strip. It looks like it could be selling project-management software, not dispensing health guidance.
- Product placeholders (`placeholder.svg`) and thin visual hierarchy in the comparison table.

---

## (b) The new design direction

A calm, evidence-based look modeled on credible health publishers (think Examine.com / Healthline discipline), not a startup landing page.

### Color
| Role | Color |
|---|---|
| Authority / structure | Navy `#0e2a47` |
| Primary accent (clinical) | Teal `#0d8f8f` |
| Soft fills / highlights | Mint `#e7f4f3`, off-white `#f6f9fb` |
| Affiliate CTA buttons | Amber `#f2a414` |
| Ratings / awards | Gold `#f5b301` |

Navy + teal carry medical credibility; amber is reserved exclusively for "Check price" affiliate buttons so the revenue actions are obvious but never cheapen the page. Lots of white space.

### Typography
- **Source Serif 4** for headings — an editorial, journal-like authority.
- **Inter** for body and UI — clean, legible, modern.

### Trust & conversion components (new)
- **Navy trust strip** above the header (dietitian-reviewed · studies cited · no paid rankings).
- **"Medically reviewed by Dr. Sarah Reyes, RD, PhD"** bylines + reviewer cards.
- **Cited claims** with superscript links to a **References** section.
- **Affiliate disclosure** shown clearly near the top of monetized pages *and* in the footer.
- **Scored comparison tables, star ratings, rating-breakdown bars, pros/cons, verdict boxes.**
- **Amber affiliate CTAs** plus a **mobile sticky "Check price" bar**.
- **"Last updated / verified" dates** and a **"How we tested"** methodology block.

The placeholder product names, prices, and ratings are carried over from the live site so the mockups read realistically.

---

## (c) What each mockup shows

**01 · Homepage (`index-home.html`)** — Trust strip; authoritative serif hero with credibility stats and a live "Best Creatine 2026" ranking card; three content pillars (Guides / Rankings / FAQ) reframed around trust; a "why you can trust us" standards band featuring the medical reviewer; popular guides; a navy CTA band; refined newsletter; detailed footer with disclosure.

**02 · Best Creatine comparison (`best-creatine.html`)** — Breadcrumb, kicker, medically-reviewed byline, top affiliate disclosure; an at-a-glance **comparison table** (rank, product, best-for, star rating, price/serving, amber CTA); a **"How we tested"** methodology grid; **detailed scored review cards** with pros/cons and "who it's for"; FAQ; **References**; sticky sidebar with the #1 pick + table of contents; **mobile sticky CTA**.

**03 · Single product review (`product-review.html`)** — Two-column product hero (gallery + buy box) with an overall score, **per-criteria rating bars**, price, and amber CTA; **verdict box**; pros/cons; **specifications table**; cited body copy; medical-reviewer author bio; "compare alternatives" sidebar; mobile sticky CTA.

**04 · Article / blog (`article-hair-loss.html`)** — "Does creatine cause hair loss?" with category tag, medically-reviewed byline, share row, hero image; a **key-takeaways** box; cited claims with superscripts; **note / warning callouts**; a **data table** (claim vs. evidence); pull quote; an **inline affiliate CTA** placed naturally mid-article; References; author bio; related reading; sticky TOC + top-pick sidebar.

---

## Notes & next steps
- All imagery is CSS gradients / inline SVG placeholders — swap in real product photography for production.
- Reviewer name, citations, and links are illustrative placeholders; wire to a real reviewer and real source URLs before publishing.
- The system is consistent across files and would map cleanly onto the existing Next.js component structure.
