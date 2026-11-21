# CCerenity's website

A fast, simple website for CCerenity's, a home bakery in Fort Wayne, IN. Built with [Eleventy](https://www.11ty.dev/).

## Pages

| Page | URL | What's on it |
|---|---|---|
| Home | `/` | Tagline, Order and Menu buttons, how ordering works, favorites, custom orders, story teaser, Instagram |
| Menu | `/menu/` | Category jump-bar, item cards (photo, price, allergen tags), "hide items containing…" filter |
| Order | `/order/` | Order-request form (Netlify Forms), with earliest pickup set 72 hours out |
| About | `/about/` | Story timeline, values |
| Pickup & Contact | `/contact/` | Pickup area and times, payment, delivery, contact buttons, FAQ |
| Thank you | `/order/thanks/` | Shown after the form is sent |

## Run it on your computer

```bash
npm install          # first time only
npm start            # opens a live preview at http://localhost:8080
```

## Edit the content

Everything you'd change lives in **`src/_data/`**. You never need to touch the page templates.

| File | What's in it |
|---|---|
| `site.json` | Name, email, phone, pickup area and times, payment, delivery, logo |
| `menu.json` | Categories, items, prices, allergen tags, featured items, custom-order info |
| `story.json` | About page: headline, intro, timeline, values |
| `faq.json` | Questions on the Pickup & Contact page |

**Photos and logo:** put image files in `src/assets/img/` and point to them, e.g. `"photo": "/assets/img/choc-chip.jpg"` in `menu.json`, or `"logo": "/assets/img/logo.png"` in `site.json`. Square photos work best. Keep each one under ~300 KB (export at about 1200px wide).

**Placeholders:** anything in `[[DOUBLE BRACKETS]]` still needs real content. To see what's left:

```bash
npm run build:check
```

It lists every placeholder and the page it's on, and flags dead `#` links, `example.com` addresses and broken internal links. It prints **READY TO LAUNCH ✓** when everything is filled in.

**Allergens:** the allergen tags in `menu.json` are guesses for layout only. Check each one, then set `"allergensConfirmed": true` in `site.json` to remove the yellow warning on the Menu page.

## Go live on Netlify (free)

1. Put this folder on GitHub (or drag-and-drop the built `_site` folder into Netlify).
2. In Netlify: **Add new site → Import an existing project →** choose the repo. Build settings come from `netlify.toml`.
3. **Turn on the order form:** Site configuration → Forms → *Enable form detection*, then redeploy. Under Forms → Form notifications, add an **email notification** so each order request goes to your inbox.
4. Optional: add your own domain under Domain management.

The form doesn't send anything when you're previewing on your computer. It only works on the live Netlify site.

## Design notes

- Colors come from the CCerenity's logo (blush, coral, cocoa). Text colors meet WCAG AA contrast.
- Fonts (Fraunces, Nunito) are self-hosted. No Google Fonts, trackers, or third-party scripts.
- Every page works without JavaScript. JS only adds the allergen filter, the earliest-pickup date, and form checks.
- Original design and copy, informed by research in `research/bakery-site-findings.md`.
