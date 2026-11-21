# Bakery Website Research — Findings for CCerenity's

_Research date: 2026-11-21. Method: REA browser captures (fresh Chromium profile, no login, no form submissions, no cart actions, public pages only). Pages were loaded at a phone viewport (390×844), and each homepage was also loaded at desktop (1280×720). Findings come from each page's accessibility tree (structure, text, links), viewport screenshots, and network activity. Request counts and load times come from two separate runs on one connection and varied between runs, so treat them as rough comparisons, not benchmarks._

## Sites studied

| Site | Platform (observed) | Pages captured |
|---|---|---|
| Leviathan Bakehouse (Indianapolis) | Squarespace | Home (desktop + mobile), Menu, Contact |
| Rise'n Roll (16 locations, **2 in Fort Wayne**) | WordPress + WooCommerce | Home (desktop + mobile), Locations, Our History |
| Amelia's (Indianapolis, 3 locations) | WordPress | Home (desktop + mobile), The Staples (menu), Online Grocery, Locations |
| Toast: Leviathan ordering page | Toast | **Blocked**: Cloudflare bot check |
| Toast: 4 Birds Garage ordering page | Toast | **Blocked**: Cloudflare bot check |

> **Gap:** Both Toast pages returned a Cloudflare "Performing security verification" screen to the automated browser, on two separate attempts. I did not try to get past it. The Toast notes below come only from how the bakery sites link into Toast. I did not observe the ordering flow itself.

> **Local competitor note:** Rise'n Roll has stores in Northern and Southwest Fort Wayne, so it's a direct local comparison for CCerenity's.

---

## 1. Leviathan Bakehouse

**Structure / nav:** Four items: Home · Order · Menu · Contact, plus a separate "Order Online" button in the header. The homepage is just a hero image, one long mission sentence set as a heading, and a footer. **On mobile** the nav collapses to an "Open Menu" hamburger and the header Order button is gone. The first phone screen shows only the logo, storefront photo, and mission text: nothing to order, no menu link, no hours.

**Menu:** A single `/menu` page with **13 tabs** (Bread, All-Day Breakfast, Second Breakfast, Viennoiserie, Cookies, Cakes, Bakes, Pastries, Coffee, Teas, Beverages, 21+, Retail). Each item shows price, name, a "daily" tag, and a rich description that names ingredients and their sources (farms, mills). The menu has **no item photos** and **no allergen or dietary labels**; "naturally vegan" appears only inside one description. On a phone, the first screen of the menu page is a full-height hero image plus Order and Special Orders buttons, and no menu items show until you scroll. Daily specials are pushed to an Instagram carousel ("See our menu boards on social media").

**Ordering:** Links out to Toast, and the links aren't consistent: the nav uses `toasttab.com/leviathanbakehouse/` while the header uses `order.toasttab.com/online/leviathanbakehouse`. Rewards and e-gift cards also go to Toast. Special orders go to a long contact form and require 72 hours' notice.

**Hours / location / contact:** Hours and address are in the **footer of every page** ("Tue–Sun 8–3, Closed Monday"), which works well. The contact page has a Google Maps link, phone number, embedded map, and many sub-links (special orders, jobs, stages, wholesale, vendor billing, receipt help).

**Performance:** Three pages made ~220–230 requests, ~155 of them scripts (Squarespace framework). Page loads ranged from about 0.6 s to 3.7 s across runs.

**Clunky / missing:**
- **Bug:** the "hello@…" email link on the Contact page actually points to `http://placeholder@example.com`, a leftover placeholder.
- Phone number is plain text, not a tap-to-call link.
- 13 tabs is a lot to scroll sideways through on a phone, and the hero pushes the menu below the fold.
- No photos on the menu; specials live only on Instagram, so people without Instagram can't easily see them.
- The homepage gives no hint of what they sell (no featured items).

## 2. Rise'n Roll

**Structure / nav:** Products · Our History · Locations · Join Now (rewards) · Contact. **"Products" and "Contact" both link to `#`**, so they're either dropdown toggles or dead links. There's a WooCommerce cart ("No products in the cart") in the header even though ordering isn't the main flow.

**Homepage:** Slogan hero ("Award Winning Amish Donuts") → rewards sign-up/sign-in → origin story → "favorites" → "Since 2001" → stats counters → testimonial carousel. On a phone, the first screen is the slogan plus **Sign In / Join Reward Program** buttons. It puts loyalty sign-ups ahead of menu, hours, or location.

**Menu:** Hidden behind the "Products" dropdown; there's no single menu page. The Locations page warns that "daily offerings differ by location."

**Our History:** A **year-by-year timeline** (2001 front-porch start → 2004 first shop → 2009 new owners → Now) with a photo for each step. It's an easy-to-scan way to tell a story, and a good format for our About page.

**Locations:** A store-locator page with ZIP search, a Google Map, 16 location pins, and a directions widget. The footer shows only the Middlebury HQ address and a tap-to-call phone link.

**Performance:** The heaviest site by far: ~220 requests **per page**, including ~145 stylesheets per page (435 across three pages), plus trackers from Google Ads/DoubleClick, Facebook, Google Analytics, and WordPress stats. Pages took about 1.7–3.2 s to load.

**Clunky / missing:**
- **Bug:** the homepage stats show **"0 Locations"** because the animated counter didn't run.
- The testimonial carousel shows duplicate slides to screen readers (3 reviews repeated as 5 groups).
- **No hours anywhere on the homepage or in the footer.**
- "Contact" isn't a real page.
- A heavy page full of trackers.

## 3. Amelia's

**Structure / nav:** About · The Staples · Online Grocery · Orders · Gift Certificates · Contact Us · Locations, separated by "|" characters. "Orders" links to `#`. On mobile it becomes the logo, a **map-pin icon link with no text label**, and a hamburger. The homepage has the tagline ("By hand / From scratch"), a mission paragraph, a big "CLICK HERE TO ENTER ONLINE STORE" link, an embedded map, and a social feed.

**Menu ("The Staples", `/the-goods/`):** The best menu of the three. It has a jump-bar (Breads | Pastries | Daily Specials) and stacked items, each with a **square photo, name, full ingredient list or description, and price**, including half and whole sizes ("$4.00/$8.00"). It reads well on a phone. A note explains that items sell out daily and sends people to Toast for the full menu. It has ingredient lists, but no allergen or dietary tags.

**Ordering:** `/online-grocery/` is a **plain-language pickup instructions page**: where to park, what number to call, how to find your order number, that the store only takes orders during open hours. There's a separate "Begin Order" Toast link for each location. Explaining pickup this clearly is a good idea worth borrowing.

**Hours / location / contact:** The footer lists 3 addresses and one shared "Open 7 days a week 8am–8pm" line, plus a phone number that isn't a tap-to-call link. The Locations page shows a photo and address for each shop, but no per-location hours and no directions links.

**Performance:** The lightest site: ~65–80 requests on the homepage (most of them Google Maps), and 28–35 on inner pages. Pages took about 1.0–2.7 s to load.

**Clunky / missing:**
- **Bug:** the embedded map shows **"This page can't load Google Maps correctly"** (API key/billing error).
- **Bug:** the Instagram feed shows **"Please check your feed, the data was entered incorrectly."**
- Shouting link text ("CLICK HERE…"), an icon-only nav link with no label, and a dead "Orders" link.
- Addresses aren't linked to maps or directions.

## 4. Toast online ordering (inferred, not observed)

All three bakeries hand ordering, rewards, and gift cards to Toast rather than building checkout themselves. That's the right choice for a small shop: Toast handles payments, taxes, kitchen tickets, and order-ready texts. The catch is that the ordering page sits on Toast's domain and is styled like Toast, not like the bakery, and as we saw it can show a bot-check screen. **I could not see the Toast pages themselves.** If you want them reviewed, open the two links in your own Chrome and I can describe what you see, or we can skip it.

---

## What works well (ideas to borrow)

1. **Hours + address in every page footer** (Leviathan). Visitors never hunt for them.
2. **Menu with a photo, ingredients, and price for each item, plus a category jump-bar** (Amelia's).
3. **Ingredient-forward descriptions** that tell a sourcing story (Leviathan).
4. **A plain-language "How pickup works" page** (Amelia's).
5. **Hand off checkout to a POS ordering platform** (all three) instead of building one.
6. **Tap-to-call phone link** (Rise'n Roll footer).
7. **Story told as a short photo timeline** (Rise'n Roll "Our History").

## What to avoid

1. **Broken embeds** (Amelia's map and Instagram feed). Use a static map image or "Get directions" link instead of a live Maps embed, and a simple "Follow us" link instead of a feed widget that can break.
2. **Leftover placeholders and dead links** (Leviathan's email; Rise'n Roll's and Amelia's `#` links; "0 Locations"). We'll use obvious, searchable placeholders and check every link before launch.
3. **Heavy page-builder bloat and ad trackers** (~220 requests per page on Rise'n Roll). A small static site can load in well under a second.
4. **A first phone screen that doesn't answer "what, when, where, how do I order"** (Leviathan's home and menu, Rise'n Roll's rewards-first hero). Keep Order and Menu visible on phones.
5. **Menus that exist only on Instagram or only inside Toast.** The menu should live on our own site so Google can index it and people can browse before ordering.
6. **No allergen or dietary tags** (all three; Amelia's comes closest with ingredient lists). An easy way for us to stand out.
7. **Phone and email as plain text**, and **addresses without directions links.** Make all of them tappable.
8. **Too many sideways tabs on a phone.** Use a short category jump-bar and stacked sections instead.

---

## Recommended pages for CCerenity's

| Page | Purpose | Key content (all placeholders until you supply the real content) |
|---|---|---|
| **Home** | Answer "what, where, when, how do I order" in one phone screen | Hero photo, one-line tagline, **Open now / Closed** badge from hours, Order + Menu buttons, 3–6 featured items, short story teaser, location card |
| **Menu** | Browsable menu on our own site | Category jump-bar → stacked sections; each item: photo (optional), name, price (supports sizes), short description, **dietary/allergen tags** (GF, V, contains nuts/dairy/egg/wheat), "seasonal/daily" badge, "may sell out" note |
| **Order** | One clear handoff to ordering | "How pickup works" steps, lead time, Order Online button (link to Toast/Square/etc., to be decided), phone fallback |
| **Custom & Special Orders** | Cakes, catering, bulk | What's offered, lead time (e.g., "__ days' notice"), price ranges, contact method. _Per your rules, the build will use a mailto/phone link or a form service you choose. I won't wire up a live form submission without your OK._ |
| **About / Our Story** | Owner story, values, photos | Placeholder story as a short photo timeline or story blocks |
| **Visit / Contact** | Hours, address, parking, contact | Weekly hours table (today highlighted), address with "Get directions" link, static map image, tap-to-call, tap-to-email, socials |

**Site-wide:** sticky header with an **Order** button that stays visible on mobile; footer with hours, address (linked to directions), phone, and socials on every page.

## Recommended features

- **Single data file** (e.g., `content/site.json` or `menu.json`) holding the menu, hours, address, and phone, so you update one place and every page stays in sync.
- **"Open now" indicator** computed from the hours (Fort Wayne / Eastern Time), with holiday-closure override.
- **Allergen and dietary legend** with filter chips on the Menu page.
- **LocalBusiness/Bakery structured data** (schema.org JSON-LD) for Google hours and maps.
- **Fast, accessible static build:** no page builder, no trackers by default, optimized images, labelled links (no icon-only links), good color contrast, works without JavaScript.
- **Clear placeholders** like `[[MENU ITEM NAME]]`, `[[HOURS]]`, `[[ADDRESS]]`, `[[PHOTO: storefront]]`, plus a checklist of every placeholder that needs real content before launch.
- **Pre-launch link check** so no `#` links or example.com addresses ship.

## Open decisions for you

1. **Ordering platform:** Does CCerenity's already use a POS (Toast, Square, Clover)? This decides where the Order button points.
2. **Custom orders:** Phone/email only, or a form (needs a form service)?
3. **Hosting:** Any preference (GitHub Pages, Netlify, Cloudflare Pages)? All are free for a static site.
4. **Brand:** Existing logo, colors, or fonts? If none, I'll propose an original palette.
