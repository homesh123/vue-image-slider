# Pathfinder — Find Your Purpose

A free, private, 10-minute life purpose test. One question per screen: tap an answer and the next appears.
People leave with a **personal purpose statement**, an **Ikigai map**, a **"When…, I will…" first step** and a **30-day plan** adapted to their life stage.

Live (after enabling GitHub Pages): https://homesh123.github.io/Purposefinder/

## How it works

| Part | What it asks | Basis |
|---|---|---|
| 1. Your life right now | 9 statements | Ikigai-9 (Imai et al., 2012; English validation Fido et al., 2020) |
| 2. What you enjoy | 24 quick activity reactions | Holland's RIASEC model (Holland, 1997); original items, not the official O*NET profiler |
| 3–5. Strengths, values, causes | Pick from short lists | Reflection prompts |
| 6. Life stage | One choice | Tailors the plan |
| 7. In your own words | Optional open questions | Personalizes results |

The purpose statement follows the research definition of purpose (Damon, Menon & Bronk, 2003). The plan uses strengths-use (Seligman et al., 2005), implementation intentions (Gollwitzer & Sheeran, 2006) and job crafting (Wrzesniewski & Dutton, 2001).
Full sources, limitations and the honest caveats are in [`methodology.html`](methodology.html).

## UX principles

Follows Apple Human Interface Guidelines ideas: system fonts, automatic light/dark appearance, 44pt minimum touch targets, one task per screen, reduced-motion support, and full keyboard and VoiceOver support (radio groups, focus moves to each new question, 1–5 shortcut keys). Checked with axe-core (WCAG 2.1 AA): no violations.

## SEO / AEO / GEO

- Titles, descriptions, canonical URLs, Open Graph/Twitter cards with `og-image.png`
- JSON-LD: `WebSite`, `WebApplication`, `WebPage` with citations, `FAQPage`, `Article` and `BreadcrumbList`
- Answer-first FAQ and cited statistics on the page (helps AI answer engines quote and cite it)
- `sitemap.xml`, `robots.txt` (allows search and AI crawlers), `llms.txt`, web app manifest and icons

Note: crawlers only read `robots.txt` and `llms.txt` at the domain root. On a GitHub Pages project site (`/Purposefinder/`) they take effect only if you add a custom domain; until then, submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Privacy

Everything runs in the browser. Answers are saved in `localStorage` on the user's device only; nothing is sent anywhere.

## Run locally

```sh
python3 -m http.server
# open http://localhost:8000
```
