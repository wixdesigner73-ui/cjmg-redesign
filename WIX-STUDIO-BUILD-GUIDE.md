# Building the CJMG redesign in Wix Studio

`site/` is a working, fully responsive HTML prototype of every page, built from the audited CJMG content. Wix Studio can't import HTML, so it is the pixel/behavior spec. Rebuild each section natively using the values below.

Preview it: `node serve.mjs` → http://localhost:4173. Regenerate after editing `src/`: `node src/build.mjs`.

## 1. Site setup
- **Breakpoints:** Desktop 1280 (design at 1440, content max-width 1240), Laptop 1024, Tablet 768, Mobile 390. In the prototype: below 900px the process cards stack and the nav becomes a menu.
- **Color variables (Site Styles):** Black `#080808`, White `#FFFFFF`, Soft Gray `#F4F4F4`, Silver `#EAEAEA`, Muted `#777777`, Border `#DDDDDD`. Add `#2C2C2C` for dark-card borders.
- **Fonts:** headings **General Sans** 600 (Fontshare, free commercial license: upload via Wix Studio *Fonts → Upload*), body **Manrope** 400/500, labels **DM Sans** 500, handwritten note **Caveat** 500 (only "Ready to launch!").
- **Type scale (desktop → mobile):** Display 92 → 46px, uppercase, tracking −3.5%, line-height 0.98. H2 54 → 30. H3 30 → 22. Body 16–18. Label 13.
- **Header (Studio header container, sticky):** 3 columns. Logo left · centered menu · black pill "Contact Us" with circular arrow. On scroll: white 86% + blur, 1px bottom line. Hide on scroll-down / show on scroll-up (Studio *Scroll* effect, or the custom code in §6). Hover state for menu links: color `#777` → `#080808`.
- **Services menu:** dropdown with Website Design, SEO, Logo Design & Branding, Client Consultation.
- **Footer:** 4 columns (logo + one-line description · Menu · Services · Contact), bottom row with © and Privacy Policy. Mirror it as a Studio *Footer* so it appears on all pages.

## 2. Reusable components (create once, reuse everywhere)
| Component | Spec |
|---|---|
| **Pill button** | Black fill, white DM Sans 15px, padding 8/8/8/24, radius 99. Right: 36px white circle with ↗ icon. Hover: bg `#262626`, icon slides out top-right and a second icon slides in from bottom-left (Studio *Hover* → Icon animation), slight magnetic nudge (§6). Variants: Light (white fill, black circle), Ghost (1px black outline). |
| **Outline label** | Pill, 1px `#CFCFCF`, DM Sans 13px, 9×16 padding, transparent/white 70%. |
| **Starburst / scribble** | Export from `src/build.mjs` (`STAR`, `SCRIB`) as SVG, upload as vector art. Starburst: continuous rotation 18s linear (Studio *Looping → Spin*). |
| **Contour pattern** | `CONTOURS()` SVG (30–36 concentric curves, white 32% opacity, 1px). Use inside black cards and the CTA band; CTA band: slow looping drift (18s, ±2%). |
| **Project card** | CMS *Dynamic item* card: image (fill, grayscale 100%), logo badge (white 14px-radius tile, bottom-left), ↗ circle (top-right), title, category + goals line. Hover: image scale 1.07 + grayscale 20%, title shifts 8px, arrow swaps. |
| **FAQ accordion** | Studio *Accordion*: 24px General Sans questions, +/× icon, 1px dividers. |
| **Numbered list** | Repeater, 26px rows with `01`, `02` counters, 1px dividers, hover: row shifts 12px. |

## 3. CMS
**Collection `Projects`** (25 items, source of truth: `src/data.mjs`):
`title` (text) · `slug` (text) · `category` (text, original label e.g. "Real Estate Photography") · `filterGroup` (reference: Health & Care / Beauty / Food / Home & Trade / Creative & Events / Business & Community) · `goals` (multi-reference: Branding, Website Development) · `photo` (image) · `logo` (image, optional) · `liveUrl` (URL, optional) · `featured` (boolean, 6 true: Fleur De Photo, Speaking Gold, Mind Over Matter, Zantha, Grandbaby, LASH LAB PDX) · `order` (number).

**Dynamic page `/projects/{slug}`:** hero (label = category, H1 = title, one-line summary, "Visit live site" button hidden when `liveUrl` empty, photo right) → 3-column definition row (Client / Industry / Project goals) → gallery (logo tile or photo) → previous/next (Studio *Dynamic item navigation*) → 3 related projects → CTA band.

**Portfolio page:** Studio *Repeater/Grid* connected to `Projects`, one filter per `filterGroup` plus "All". Editorial sizes: in a 12-col grid, cycle spans 7 / 5 / 5 / 7 (aspect 1.55 / .9 / .9 / 1.55), the 2nd card dropped 70px, the 4th lifted 30px. Mobile: single column, aspect 1.25.

Image paths from the old site are in `src/data.mjs`; import them from the Wix Media Manager (they already live in this site's media library, so reuse rather than re-upload).

## 4. Page-by-page spec

### Home
1. **Hero** (white, faint 56px grid fading at the edges): label "Welcome to CJMG Creative" · H1 "YOUR BRAND. / YOUR WAY." (2 lines, mask-reveal line by line, 0.12s stagger) · supporting text = Agency Agenda lead sentence · "Let's Talk" + ghost "See our work". Right: portrait photo in a 36px-radius frame, grayscale, with a white notch card top-left ("Migration. Revamps. Custom Designs. / Website Services & SEO") and a black pill straddling the bottom edge ("Website Design · SEO · Branding", white 9px ring). Entrance: image slides up 60px / 1.3s; cursor tilt ±5° (§6).
2. **Client strip:** marquee of the 25 project logos/names separated by "+" (slow, pause on hover). Where a project has no logo file, its name is set in 22px General Sans.
3. **About** (gray): label "About us" · H2 · Agenda paragraph · "More about CJMG". Right: large grayscale photo. Below a 1.55fr/1fr mosaic: black card with contour pattern, "Migration. Revamps. Custom Designs." and 7 rotated white tags (Website Design, Search Engine Optimization, Logo Design, Branding, Local SEO, Technical SEO, Website Management); adjacent photo card with a gray notch corner.
4. **How we work:** stage 1080 × 1296. Cards 37% wide at (53%, 2%) +5°, (10%, 22%) −9°, (56%, 46%) +7°, (9%, 68%) −7°; gray `#F4F4F4`, radius 30, shadow `0 30px 50px -22px rgba(0,0,0,.28)`, black "pin" dot at top center. Dotted S-curve behind the cards (stroke `#9a9a9a`, dash 3/9). Scroll-in: each card rises 90px, 1s, 0.15s stagger. Hover: rotation reduced 75%, lift 8px, scale 1.03, deeper shadow. Mobile: vertical stack, no overlap, ±0° rotation.
5. **Services** (black): H2 "We design meaningful digital experiences." 3×2 grid of cards (radius 24, 1px `#2C2C2C`, icon tile, title, text, ↗ circle). Hover: border `#8A8A8A`, spotlight glow following the cursor, icon tilts, arrow circle inverts. 6 cards: Website Design, SEO, Logo Design & Branding, Website Revamps, Website Migration, Website Management & Updates.
6. **Featured projects:** horizontal scroller (snap), cards 400px wide with every second card dropped 56px, prev/next circle buttons, "View All Projects".
7. **Testimonials:** arch frame (radius 200/200/28/28) showing the client logo, black quote badge; quote 36px; dots (active = 30px pill). Three real quotes, 7s auto-advance, pauses on hover.
8. **CTA band:** black, radius 36, contour pattern, "BECOME AN ENVISIONED BRAND", verbatim paragraph, white pill "Free Consultation".

### About, Services, Website Design, SEO, Logo Design
Section recipes are in `src/build.mjs` (`add('/about'…)`, etc.). Pattern: oversized uppercase hero (no image) → gray two-column intro → numbered list / chip list → black section with FAQ → CTA band. Each page uses a different composition (numbered rows on Services, 5-card grid on SEO, logo galleries on Logo Design).

### Contact
Hero H1 "LET'S BUILD SOMETHING POWERFUL." + contact list (email, phone, hours) · gray form panel. **Use Wix Forms** with fields First Name, Last Name, Email, Phone (all required), Select Service (dropdown); success message "Thank you. We've got your message."; connect to CRM + email notification to `info@thecjmg.com`. `/client-consultation` uses the long form (fields listed in `src/build.mjs`): enable file upload and signature field.

## 5. SEO
Unique titles/descriptions are generated per page (see `<title>` in the prototype; copy into Studio *Page SEO*). One H1 per page (checked). Add: Organization/ProfessionalService JSON-LD (in each page head of the prototype), Service + FAQPage on service pages, BreadcrumbList on project pages. Image alt text patterns: `{Project} — {category} website and branding project by CJMG Creative`; `{Project} logo`. Alt text for client logos on the Logo page: group name + number — replace with real client names when known.

Redirects (Wix *SEO → URL Redirect Manager*): `/copy-of-website-design → /seo-services`, `/logodesign → /logo-design`. Decide on `/services` (see CONTENT-AUDIT.md). Keep `/contact`, `/policy`, `/client-consultation`.

## 6. Custom code (Wix Studio → Dev Mode / Custom Code, optional)
Native Studio effects cover most motion. These parts of `src/assets/main.js` are worth porting only if needed:
- **Hide header on scroll down** (`onScroll`).
- **Magnetic buttons** and **hero cursor tilt** (pointer-fine devices only).
- **Service-card spotlight** (`--mx/--my` CSS variables on `pointermove`).
- **Filter reflow** of editorial card sizes (Studio filters don't reassign spans).
Always wrap motion in `prefers-reduced-motion` and disable on touch.

## 7. QA checklist
- Mobile 390: no horizontal scroll (verified in prototype on all 35 pages), process cards stacked, menu opens full-screen, 44px+ tap targets.
- Reduced motion: no reveal, no marquee, no looping.
- Contrast: body `#555` on white = 7.5:1; muted `#777` only for ≥14px secondary text.
- Image weights: ≤ 250 KB per card image, hero ≤ 400 KB; lazy-load below the fold.
