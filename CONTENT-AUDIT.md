# CJMG content audit

Source: https://www.thecjmg.com, audited 2026-10-27 (all 7 URLs in `pages-sitemap.xml`, raw HTML + rendered text).

## Existing site map → new site map

| Existing URL | Content | New URL | Redirect |
|---|---|---|---|
| `/` | Home | `/` | – |
| `/services` | Website Design + 21 projects + FAQs | `/website-design` (+ `/portfolio`) | `/services` URL is reused for the new overview (see decision below) |
| `/copy-of-website-design` | SEO | `/seo-services` | 301 |
| `/logodesign` | Logo Design | `/logo-design` | 301 |
| `/client-consultation` | Project consultation form | `/client-consultation` | – (kept) |
| `/contact` | Contact | `/contact` | – (kept) |
| `/policy` | Privacy Policy | `/policy` | – (kept) |
| – | – | `/about`, `/services`, `/portfolio`, `/projects/{slug}` ×25 | new |

Decision for you: the live `/services` URL is the Website Design page. I used it for the new Services overview and moved Website Design to `/website-design`. If search rankings for `/services` matter most, swap them.

`store-products-sitemap.xml` and `store-categories-sitemap.xml` exist (Wix Stores is enabled) but list no pages. Nothing to migrate.

## Verified content used verbatim
Agency Agenda, hero tagline ("Your brand, your way." / "Migration.Revamps.Custom Designs."), Website Design and SEO inclusions, all FAQs (3 design, 3 SEO), "What's included in the website process", 8 logo-branding details, logo tagline, 3 testimonials, CTA ("Become an Envisioned Brand" + paragraph), contact details, hours (9–6 CST, USA), privacy policy (last modified 9/20/24), all 25 projects with category, goals and live link.

## Differences from the brief — please review
1. **There are 25 unique projects.** Home lists 4 (Fleur De Photo, Speaking Gold, Mind Over Matter, Zantha); `/services` lists 22 rows. Row 8 repeats the heading "Rapid Repair Ranger" with RLM Excavation's link and image. I treated it as a copy error and de-duplicated it (21 unique + 4).
2. **Mind Over Matter's real domain is `mindovermattermattercounseling.com`** (double "matter"). Kept as is.
3. **Educate U has no live link** on the site; its page omits the "Visit live site" button.
4. **No social links exist** on the site, so the footer has none. Add them when available.
5. **Website Revamps, Website Migration, Website Management** have no dedicated pages or descriptions on the live site. They are only mentioned in the hero tagline ("Migration. Revamps. Custom Designs."), the contact copy ("website profile management and updates") and the consultation form (monthly maintenance). The service cards and one `#revamps` section use that wording plus light connective text. **Confirm scope before publishing.** Marked `// DERIVED` / `// CONFIRM` in `src/data.mjs`.
6. **Process steps (Discover / Design / Develop / Launch)** come from your brief. The text under each reuses facts from the site (consultation form, "map & menu structure", "stock images & forms", "domain 1 year, hosting 1 month", client takes control + management guidance). No timelines or promises added.
7. **"Select Service" dropdown options** are not in the rendered HTML (placeholder "Services" only). I used: Website Design, SEO, Logo Design & Branding, Website Revamp / Migration, Website Management & Updates. Replace with your real list.
8. **Project pages are intentionally thin.** The site holds only a photo, a logo, a category, two goals and a link per project. Each page shows exactly that, with no invented case study.
9. **Testimonials:** "Mr. Morrison — Owner" is attributed on the page to "Fantom Clothing" only through the image alt text; I show "Owner, Fantom Clothing". Quotes are verbatim.
10. **Agency Credentials:** four "Wix Partner" badge images (Editor X, Icon, Legend) on the live home page; used on the About page in full color.
11. **Unsplash was not used.** Every image comes from the live site (hero, About photos, project photos, logos), in full color. Project cards show the project's own photo and logo from the existing site, not browser screenshots, because the original site contains none.
12. **Brand:** colors and font sampled from thecjmg.com: black `#000`, white, red `#FC0000` (theme red `#ED1C24`), Poppins. The original CJMG logo is white + red on transparent, so it is only used on black. Several client logos (Lakeside Subs, Rapid Repair Ranger, Highly Affordable Roofing, Alyzion Medical, Fantom Clothing and some gallery logos) are light artwork on transparent; they are placed on black tiles (measured per image in `src/tones.json`).
13. Not copied from Creatwise: name, people, "250+ clients", "40% growth", copy.

## Not done / needs the owner
- Business address (none published), Google Business Profile link, and social URLs.
- Form destination: the prototype validates and shows a success state but does not send. Use Wix Forms (see build guide).
- Rights to the Creatwise-derived layout are the site owner's call; only the layout language was reproduced.
