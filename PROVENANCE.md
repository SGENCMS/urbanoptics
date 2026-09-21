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
