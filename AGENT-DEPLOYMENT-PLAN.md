# AllAboutCreatine — Agent Deployment Plan

## Goal
Publish **≥1 article/day** with minimal human intervention. Human only reviews flagged content (QA score < 0.85).

---

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Research Agent  │────▶│   Writer Agent    │────▶│    QA Agent       │
│  (weekly/daily)  │     │  (drafts MDX)     │     │  (score 0-1)     │
└─────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                         │
                                          ┌──────────────┼──────────────┐
                                          │              │              │
                                          ▼              ▼              ▼
                                   score ≥ 0.85    0.70-0.84       < 0.70
                                   auto-publish    daily digest    hold + alert
```

---

## Agent Definitions

### 1. Research Agent
**Schedule:** Daily at 6 AM (cron)  
**Inputs:** `last30days` skill, web_search, web_extract  
**Outputs:** `content/ideas/YYYY-MM-DD.json`

```json
{
  "date": "2026-06-29",
  "ideas": [
    {
      "type": "comparison",
      "slug": "creatine-for-women",
      "title": "Best Creatine for Women: Safety, Dosage & Benefits",
      "priority": "high",
      "source_signals": ["reddit: r/xxfitness", "quora: creatine women", "amazon: bestseller shift"]
    }
  ],
  "product_updates": [
    {"name": "Thorne Creatine", "old_price": "$35.99", "new_price": "$37.99", "amazon_url": "..."}
  ],
  "keyword_shifts": ["creatine loading phase", "creatine hair loss"]
}
```

**Tool calls per run:**
- `last30days` skill: fetch trending supplement topics
- `web_search`: 3-5 queries (new creatine studies, Amazon bestsellers, Reddit threads)
- `web_extract`: Amazon/iHerb product pages for price data

**Output location:** `~/projects/all-about-creatine/content/ideas/`

---

### 2. Writer Agent
**Trigger:** When `ideas/YYYY-MM-DD.json` exists  
**Outputs:** `content/best/*.mdx`, `content/guides/*.mdx`, `content/faqs/*.mdx`

**Prompt template (core rules):**
- Match existing site tone: evidence-based, no bro-science, cite sources
- Follow Velite schema exactly for the collection
- Include affiliate links: pick highest-commission available per brand
- Add `draft: false` only after self-checking for placeholder text
- Never invent clinical trial results
- Always include FAQ section at end

**New article types + schedule:**

| Day | Type | Example |
|-----|------|---------|
| Mon | Comparison | Creatine Monohydrate vs HCl |
| Tue | Buyer's Guide | Best Creatine for Women |
| Wed | FAQ expansion | "Does creatine cause hair loss?" |
| Thu | Ranking update | Best Creatine 2027 (refresh) |
| Fri | How-to guide | Creatine Loading Phase Explained |
| Sat | Niche deep-dive | Creatine for Endurance Athletes |
| Sun | Review | Individual product review (rotate brands) |

**Tool calls per article:**
- `read_file`: existing articles for tone matching
- `web_search`: 2-3 queries for current data
- `web_extract`: product pages, PubMed abstracts
- `write_file`: output the `.mdx`

---

### 3. QA Agent
**Trigger:** After every Writer Agent output  
**Method:** Run `node scripts/qa-check.mjs <file>`

**Score breakdown:**
- Schema valid: 25%
- Price format OK: 15%
- URLs present: 20%
- Not draft: 20%
- Internal consistency: 20%

**Actions:**
- ≥ 0.85: commit + push (Deploy Agent takes over)
- 0.70-0.84: flag for human, post to Discord digest
- < 0.70: block, fix via Writer Agent re-run

**Future enhancement:** Add actual HTTP reachability check for affiliate URLs (HEAD request with 10s timeout).

---

### 4. Deploy Agent
**Trigger:** QA score ≥ 0.85  
**Actions:**
```bash
cd ~/projects/all-about-creatine
git add content/<new-file>.mdx
git commit -m "Add: <article title>"
git push origin main
```
Vercel auto-deploys from `main`.

**Post-deploy:** Ping Discord channel with:
- Article title + URL
- QA score
- Affiliate links included
- Any warnings

---

### 5. Digest Agent (you)
**Schedule:** Daily at 8 PM (cron)  
**Content:**
- Articles published today (with links)
- Articles flagged for review (with 1-line reason)
- Price changes detected by Research Agent
- Keyword trends to watch

**If nothing published:** "No new content today. All clear."

---

## Cron Schedule

| Job | Schedule | Agent | Action |
|-----|----------|-------|--------|
| Research | Daily 6:00 AM | Research | Generate ideas.json |
| Digest | Daily 8:00 PM | Digest | Send daily summary to Discord |
| Weekly Refresh | Sunday 10:00 AM | Research + QA | Re-scrape all prices, update frontmatter |

---

## Human Checklist (you — one-time setup)

### Week 1
- [ ] **Sign up for affiliate programs**
  - Amazon Associates (if not already)
  - iHerb
  - Impact / ShareASale (for GNC, Vitamin Shoppe, Transparent Labs, Thorne)
  - Direct: Thorne, Transparent Labs, CON-CRET, Klean Athlete
- [ ] **Create content/ideas directory** in repo
- [ ] **Review the first drafted article** (creatine monohydrate vs HCl) for tone/accuracy
- [ ] **Set up Discord webhook** for agent notifications (optional — or use Hermes cron → Discord)

### Week 2
- [ ] **Approve the comparison article format** — does the table layout, tone, and linking match your vision?
- [ ] **Seed first 5 articles manually** to establish the content library before going fully automatic
  - Creatine Monohydrate vs HCl (done)
  - Best Creatine for Women
  - Creatine Loading Phase Guide
  - Is Creatine Safe Long-Term?
  - Best Creatine for Athletes

### Week 3+
- [ ] **Weekly review:** 10-minute scan of the daily digest
- [ ] **Monthly:** verify affiliate payouts, adjust brand priorities

---

## Content Library Target (first 30 days)

| Week | Articles to publish | Cumulative |
|-------|---------------------|------------|
| 1 | 5 (seeded) | 5 |
| 2 | 7 (1/day) | 12 |
| 3 | 7 | 19 |
| 4 | 7 | 26 |

**Target: 1 article/day after seeding week.**

---

## Technical Setup Checklist

- [x] Clone repo to `~/projects/all-about-creatine`
- [x] Patch Velite schemas (`iherbUrl`, `brandUrl`, `impactUrl`)
- [x] Create `scripts/qa-check.mjs`
- [x] Draft first comparison article
- [ ] Add `content/ideas/` directory to repo
- [ ] Configure Hermes cron jobs for Research (daily 6AM) + Digest (daily 8PM)
- [ ] Test full pipeline: Research → Write → QA → Commit → Vercel deploy
- [ ] Add Vercel webhook notification to Discord on deploy

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Medical claim liability | QA Agent blocks unverified health claims; human approves all new health assertions |
| Affiliate link rot | Weekly re-scrape of all URLs in published articles |
| Content duplication vs competitors | Research Agent checks top 5 Google results before drafting |
| Price mismatch after publish | Weekly price-refresh cron updates frontmatter + commits |
| Google penalty for thin AI content | Minimum 800 words per article, include original analysis/examples |

---

## Success Metrics (check after 30 days)

- Articles published: ≥ 25
- Organic traffic change: +10% (Google Search Console)
- Affiliate CTR: > 2%
- Revenue: track via affiliate dashboard
- Human intervention rate: < 10% of articles (i.e., 90% auto-published)

