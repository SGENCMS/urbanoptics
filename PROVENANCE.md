# PROVENANCE

A **redesign** of `https://www.urbanopticsok.com/` — all 209 pages — then modified
for public hosting. Because it was modified, **this tree is not the handoff
deliverable** and must not be cited as one. Machine-readable counts are in
`PROVENANCE.json`. Every deviation is listed below.

## Capture

| | |
| --- | --- |
| Content source | `https://www.urbanopticsok.com/` — 209 pages (sitemap + same-origin BFS crawl, robots honoured) |
| Structure source | `https://eyetrendsclearlake.com/` — **navigation model only**. No content, image, asset or word from that site appears here. |
| Captured | 2026-09-21 |
| Method | `site-reforge` pipeline (crawl → extract → assets → capture → tokens → motion → plan → build), plus a Chrome DevTools Protocol bridge for the browser stages |
| Platform of origin | WordPress + Beaver Builder + the EyeCarePro theme. Removed entirely. |
| Design baseline | computed style measured in a real browser at 390 / 768 / 1024 / 1440 px — not read from source CSS |

### Nineteen pages came from a rendered DOM, not the static fetch

The WordPress `/tag/`, `/category/` and `/author/` archives plus `/payment/`,
`/thank-you/`, `/the-staff/` and two brand pages build their listings **client
side**. The static capture held 63–87 characters where a browser ends up with about
1,400 — measured, 6–8% vocabulary coverage. Those 19 pages are generated from a
headless-Chrome DOM capture. The untouched static capture is retained separately as
the evidence record and was not edited.

## What the redesign changed, and what it preserved

| | |
| --- | --- |
| **Preserved** | every word (100.0% token recall across 209/209 pages), all 209 URLs unchanged, titles, meta descriptions, canonicals, both patient forms complete with all ~200 labels and 8 section legends, contact details, hours |
| **Replaced** | the home page's opening section. The live `<h1>` is literally `****NOTICE****`; the rebuild leads with the practice's own tagline. The notice content itself is preserved on the page. |
| **Added** | a practice-facts block (address, phone, fax, e-mail, hours — every value quoted from the live footer) and a client-side site search, because every source page carried a WordPress search form and a form that posts nowhere is worse than none |
| **Removed** | nothing. Zero REMOVE decisions across 557 change-control rows. |

Two defects found by measurement and fixed in the rebuild: the source writes
`required="false"` on optional fields (a boolean attribute — its presence is what
makes a field required, so copying it verbatim would have made every optional field
on the patient intake form mandatory), and 206 pages carried multiple `<h1>`s.

## Deviations applied for public hosting

"Rendered" = whether the change can affect what is painted.

| # | Change | Pages | Rendered? |
| --- | --- | --- | --- |
| 1 | `robots` → `noindex, nofollow, noarchive, nosnippet`. The build shipped `index, follow`. | 211 | No |
| 2 | `<meta name="referrer" content="no-referrer">` inserted | 211 | No |
| 3 | `<title>` prefixed `UNOFFICIAL PREVIEW — ` | 211 | Tab title only |
| 4 | `og:title` prefixed; `og:url` repointed at this preview; `og:description` replaced with the disclosure; `og:image` / `twitter:image` removed | 210 | No |
| 5 | `schema.org` JSON-LD removed — it asserted `Optometric` / `MedicalWebPage` with the real address, telephone and opening hours | 210 | No |
| 6 | Every `<form>` marked `data-preview="inert"`; the two patient forms given `action=""` and `onsubmit="return false"` | 425 forms | No |
| 7 | Rendered disclosure banner inserted as the first child of `<body>`, with its own stylesheet | 211 | **Yes** |
| 8 | `robots.txt` replaced with `Disallow: /` | — | No |
| 9 | `sitemap.xml` and `llms.txt` deleted — both advertise the client's real URLs | — | No |
| 10 | `404.html` added for GitHub Pages. It answers for any missing path at any depth, so it is the one page that uses absolute references | 1 | Yes |
| 11 | `.nojekyll` added | — | No |

## Deliberately NOT changed

| | Why |
| --- | --- |
| `<link rel="canonical">` → the client's own URL, on every page | Correct for a duplicate, and deliberately different from `og:url`, which drives unfurl cards |
| The 39 dead internal links | They are the source's own link rot. 3 point at URLs the live site itself returns 404 for; 36 at pages that never existed on it. Repointing them would invent destinations the client never had. |
| The EyeCarePro attribution on `/disclaimer/` | The client's own legal copy, preserved verbatim. It credits the previous web vendor with having created the graphical template — which is **not** true of this redesign. Flagged to the client in the handoff `CHANGE-LOG.md` and `DEPLOY.md` rather than silently rewritten: it is their legal text, not ours. It is the only occurrence in the build. |
| Outbound links to `booking.adit.com` and `yourstore.wewillship.com` | The practice's real booking and contact-lens services. Navigation is not blocked; `no-referrer` covers the leak. |
| `site.css`, `tokens.css`, `motion.css` | Byte-identical to the handoff build. The banner's styles live in a separate `preview-banner.css` so the deliverable's stylesheets are not touched. |

## Not published here

The `audit/` tree — the raw capture of the client's site, computed-style captures,
screenshots and reports — is **not** in this repository. It is bulky, it carries
absolute build paths from the capture machine, and republishing a full raw copy of
the client's site serves no purpose a preview needs.

## Verification after modification

Every figure below was re-read from the shipped bytes in this tree, not from the
tool that wrote them — an earlier hardening run *reported* success while leaving all
210 pages carrying `robots: index, follow`, because it counted an intent instead of
an outcome.

- **Hardening**: 211/211 pages — noindex present and containing `noindex`, referrer
  set, title prefixed, no JSON-LD, banner present, canonical still the client's,
  `og:url` no longer the client's domain, every form inert.
- **Rendering at this preview's subpath** (6 pages, one per template, full document
  height): 0 unsatisfied requests, 0 broken images, 0 root-relative references.
- **Reference audit**: 40,277 local references resolved against the page that
  carries each one — 0 escape the site root.
- **Tree**: `robots.txt` disallows all, `.nojekyll` present, `sitemap.xml` and
  `llms.txt` absent.

## Refinement pass — 2026-09-22

A design pass over the shipped preview: close one large measured gap, take out
what the page said twice, and repair alt text that named the wrong thing. No copy
was written, no claim added. Everything removed is listed here with its reason, so
the cut is on the record rather than inferred from a diff.

### The gap under the Paradigm banner

Measured at 253 px on desktop (163 px at 768 and below) between the banner and the
`Visit Urban Optics` card. It was three spacers stacked: the last section's
`margin-bottom` (51.2 px), `.layout-read`'s `padding-bottom` (100.8 px) and the
enclosing `.band`'s `padding-bottom` (100.8 px).

`.layout-read` sits directly under `<main>` on 209 pages, where that padding is the
only spacer and has to stay; the home page is the one page that also wraps it in a
`.band`, so only there did the two stack. The band now pays it once. A fourth 35 px
came from `.prose img.prose-banner` (0,2,1) out-specifying `.ed-wide > :last-child`
(0,2,0), so a section ending on a banner kept its trailing margin.

Result: **101 px desktop, 56 px at 768 and below** — one `--band`, the same figure
`/insurance/` and `/eye-care-services/eye-exams/` already measured.

### Removed as duplicate — site-wide, all 210 pages

| Removed | Why |
| --- | --- |
| The footer's `Hours` column | The identical seven-row table sits ~100 px above it inside the `.facts` card, on every page. One table per page now. |
| The mini search form in the `.facts` *Book* column | Search is not a booking action, and the footer carries a dedicated Search column. |
| The legal bar's `Search` link | Third route to the same page on a page that already has the footer's search field. |

### Removed as duplicate — home page

| Removed | Why |
| --- | --- |
| `ul.tile-grid` — ten pills | `<span>`s, not links: no destination, and the labels restate the eight-card services band directly above. |
| `p.c-tag` in the connect strip | The hero `<h1>` states the same line ~440 px above, and the footer states it again. Shown twice now instead of three times. |
| `a.c-cta` in the connect strip | Fourth `Request an Appointment` on one page. The three that remain each do a distinct job — sticky header, hero, and the conversion panel. The strip now does one thing: follow and review. |
| `p.prose-mark` | Two dash images used as a divider, duplicating the `.ed-eyebrow` device every section already carries. |
| `p > strong > ___` | A literal `___` rendering on the page between the banner and *Trendy Frames*. |
| Empty `p.lede` in the hero | No content, no purpose. |

Their rules — `.tile-grid`, `.prose-mark`, `.c-tag`, `.c-cta` — were deleted from
`styles/site.css` in the same pass; nothing else referenced them.

### Structure and alt text

- The welcome section was the only `.ed-wide` with an eyebrow and no heading, its
  title carried by a `<p><strong>`. It is now an `<h2>` inside the `.ed-bar`, like
  its siblings.
- *3 Things That Make Urban Optics Unique* was also a `<p><strong>`. It now heads
  its own `.ed-wide` section with a real `<h2>`.
- Four decorative dash rules carried `alt="Dash blk"` / `alt="Dash white"`; they are
  now `alt=""`.
- Three brand cards named the **wrong brand** in their alt text — the Penguin card
  said *lamb*, the OWP card said *Kate Spade*, the Ray-Ban card said *Lacoste*. The
  Paradigm banner used its filename, `paradigm1500`. Each alt now describes the
  photograph; the `<figcaption>` still carries the brand.

### Verified after the pass

- **Gap**: 253 → 101 px desktop, 163 → 56 px at 768 and 375, re-read from the
  rendered page, not from the stylesheet.
- **All 210 pages loaded** in a browser: exactly one hours table, one search form,
  one `.facts` card, one footer and one `<h1>` each; no empty footer column; **0
  console errors and 0 responses ≥ 400**.
- **Home page height**: 6,159 → 5,677 px desktop, 11,805 → 10,059 px at 375.
- **Removed**: 2,102 lines of duplicated markup across 210 pages (212 inserted),
  and 36 lines of now-dead CSS.
- No horizontal overflow at 390 px.
