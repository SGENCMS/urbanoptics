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
| 3 | ~~`<title>` prefixed `UNOFFICIAL PREVIEW — `~~ — **withdrawn 2026-09-22** at the operator's request. Titles now read as the build produced them. See *Notice modal and tab titles* below for what still carries the disclosure. | 211 | Tab title only |
| 4 | ~~`og:title` prefixed~~ — **withdrawn 2026-09-22** with #3, so `<title>`, `og:title` and `twitter:title` agree again. Still in force: `og:url` repointed at this preview; `og:description` replaced with the disclosure; `og:image` / `twitter:image` removed | 210 | No |
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
| ~~`site.css`, `tokens.css`, `motion.css` byte-identical to the handoff build~~ | **No longer true as of 2026-09-22.** `motion.css` is still untouched, but `site.css` and `tokens.css` now carry the refinement pass and the notice modal — see the two sections below. The banner's styles remain in their own `preview-banner.css`. |

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
  set, ~~title prefixed~~ (withdrawn 2026-09-22, deviation #3), no JSON-LD, banner
  present, canonical still the client's, `og:url` no longer the client's domain,
  every form inert.
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

## Notice modal and tab titles — 2026-09-22

### The tab titles

Deviations #3 and #4 are withdrawn. `UNOFFICIAL PREVIEW — ` is gone from all 211
`<title>` elements and all 210 `og:title` values, so those now agree with
`twitter:title`, which never carried the prefix. The prefix was removed by
matching a string read out of a shipped file rather than retyped, so a mismatched
dash could not have caused a silent no-op — it is U+2014, confirmed by codepoint.

**The disclosure is unaffected.** What marks this tree as an unofficial preview is
unchanged and still verified: the rendered banner on every page (#7), `noindex,
nofollow, noarchive, nosnippet` (#1), `robots.txt` `Disallow: /` (#8), the
repointed `og:url` and the `og:description` disclosure (#4), no JSON-LD (#5), no
sitemap (#9), and every form inert (#6).

### The notice modal

The source site opens a modal on first visit — `div#ecp-lightbox`, driven by
magnificPopup and gated on a session cookie named `ecp-lightbox`, on every page,
not just the home page. **The rebuild dropped it entirely**; `scripts/site.js`
never contained modal code. It is restored here, redesigned into this system.

Recovered from the live source and preserved character for character, including
the trailing colon and the hyphen-minus in every time range:

> New Office Hours · Effective Tuesday, 9/8/26: · Monday - Thursday: 9am - 5:30pm
> · Friday: 9am - 1pm

**Two deliberate re-typesettings, both of punctuation, neither of fact:**

1. The source heading read `****NOTICE****`. The asterisks are a plaintext-era
   emphasis hack, not content — they assert nothing — and the emphasis they were
   reaching for is what `.kicker` already does in this system. The word ships as
   `NOTICE` in the client's own capitalisation, the verbatim source sits in a
   comment directly above the code, and `LABEL` in `scripts/site.js` is the
   single place to restore the asterisks.
2. The source set each line as `Monday - Thursday: 9am - 5:30pm`. The rebuild
   renders the pair through `<dl class="hours">` — the component the `.facts`
   card and the footer already use — so the colon is carried by the term/value
   structure instead of by a glyph, exactly as every other hours table on this
   site renders. Both strings survive character for character on either side of
   it, hyphen-minus included; only the separator changed form.

**What it is.** A native `<dialog>` opened with `showModal()`, built in
`scripts/site.js` rather than pasted into 211 files. The top layer clears the
preview banner (`z-index: 200`) and the sticky header (`50`) without the
component owning a `z-index` at all, and focus containment comes from the
platform. It references no URL, so it is byte-identical at every directory depth.
It reuses `.kicker`, `.c-ico`, `<dl class="hours">`, `.btn` and the bare `h2`
element rule; only the deviations are declared.

**Deviations that were deliberate, with their evidence:**

- The panel takes `.menu`'s opaque `--menu-bg`, not the glass fill — the same
  decision already recorded against `.menu`, where a translucent fill over live
  page type measured unreadable.
- `.kicker` is overridden to `--accent-ink`. Measured this turn against `--paper`:
  `--accent` is **4.45:1** and misses AA for 12px bold by 0.05; `--accent-ink` is
  **9.12:1**. The hours and dateline take `--ink-body` (9.13:1) rather than
  `.hours`' own `--ink-mute` (**4.42:1**, fails AA).
- The primary button pins `min-height: 44px`, because `.btn` is given that only
  inside the `≤834px` block and computes under 44px on desktop.
- The exit animation has its own keyframe name. Re-parameterising a finished
  animation does not restart it, so reusing the entry name would land the exit
  instantly in its filled after-phase and never fire `animationend`. The script
  does not wait on `animationend` either — it closes on a timer — so neither half
  can strand a modal open, invisible, with focus trapped and scroll locked.
- Scroll containment blocks the **input** (`wheel`, `touchmove` and the six
  scroll keys) rather than setting `html { overflow: hidden }`. Setting overflow
  on the root destroys the viewport scroll container and unpins every
  `position: sticky` element — see the defects below. It is held only after
  `showModal()` returns and released from the dialog's own `close` event, not
  from a JS path a native close could bypass. Because no scrollbar is removed,
  there is no layout shift and no padding compensation to restore.
- `.notice-card` carries `overscroll-behavior: contain`, so a wheel gesture that
  reaches the end of a scrolling card on a short viewport does not chain to the
  document behind it.
- The session flag is stamped on **open** as well as on close, so leaving the
  page with the card still up does not show it again on the next of 211 pages.
- `<time datetime="2026-09-08">` disambiguates `9/8/26`, which is Sept 8 in the US
  and Aug 9 nearly everywhere else. Checked: **2026-09-08 is a Tuesday** and
  2026-08-09 is a Sunday, so the client's own "Effective Tuesday" confirms the US
  reading. The visible string is untouched; the attribute removes an ambiguity
  rather than adding a claim.
- No call to action was added. The source notice contains none, and adding one
  would turn a factual hours announcement into a conversion surface.

**Not done, deliberately:** no auto-expiry. An expiry constant would silently
retire the modal on a date nobody remembers setting. The notice is instead
reported as stale — see below.

### Verified

52 browser assertions, all passing:

- Opens on the first page of a session, at any directory depth, with zero URL
  references in its markup; does not reappear on the next page, or on a third,
  or after the visitor navigates away with it still open.
- Dismisses by **Esc, the ×, "Got it" and a backdrop click** — and in all four
  cases the dialog closes, the scroll lock is released and the `<html>` padding
  compensation is restored. A click **inside** the card does not dismiss.
- Focus lands on the primary control; the close control is a real
  `<button type="submit">` with an accessible name and a 44×44 target; the
  primary button is ≥44px tall.
- `aria-describedby` covers the dateline **and** the hours, so the payload is
  announced, not just the date.
- Reduced motion: opens, is fully opaque, animation nulled, and Esc still closes
  it — no dependency on an `animationend` that never fires.
- JavaScript off: no dialog in the document and no scroll-lock class anywhere.
- The modal is the topmost layer at its own coordinates while owning no
  `z-index`.
- All 210 pages re-swept: one page-level hours table and one search form each,
  one `<h1>`, no empty footer column, no stranded scroll lock or padding, no
  title prefix, **0 console errors and 0 responses ≥ 400**.

### One thing only the client can fix

**The notice is stale on the client's own live site.** It announces "Effective
Tuesday, 9/8/26", which was 14 days before this build, and the hours it announces
are already stated in the `.facts` card on every page. Nothing here rewrites the
client's words. The recommendation to hand back: either drop the effective date
now that it has done its job, or retire the modal entirely.

### Three defects an adversarial review found after the first build

The first implementation passed 52 browser assertions and still shipped two
major defects, because every one of those assertions opened the modal at scroll
offset 0 and tested a *click* rather than a *gesture*. All three were reproduced
independently before being fixed, and each now has a regression test.

| Defect | How it presented | Fix |
| --- | --- | --- |
| **Light dismiss fired on a drag that began inside the card.** A `click`'s target is the nearest common ancestor of the press and the release, so pressing on the hours and releasing past the card edge retargeted the click to the `<dialog>` with coordinates outside it. | Selecting the opening times to copy them — the single most likely thing anyone does with this notice — closed the modal mid-drag. Aborting a button press by dragging off it did the same. | The gesture must now *start* on the backdrop too: a `mousedown` handler records whether the press landed on the dialog, and the click handler requires both ends. |
| **`html { overflow: hidden }` unpinned every `position: sticky` element.** Setting overflow on the root destroys the viewport scroll container. | Entering at `/#facts-h`, which scrolls to 4308, the sticky header sat **4268px out of view** for as long as the modal was open, then popped back on dismissal. At `/#main` the shift was 71px. Invisible at scroll offset 0, which is why the original tests missed it. | The CSS lock is gone. `scripts/site.js` blocks `wheel`, `touchmove` and the six scroll keys instead, leaving the root a scroll container. Space is deliberately not blocked — it activates the focused button. |
| **Wheel chaining past the end of a scrolling card.** Found by the regression test written for the fix above, not by the review. | On a 380×360 viewport the card scrolls; once it hit its end, the wheel drove the document behind it 260px. | `overscroll-behavior: contain` on `.notice-card`. |

The review filed 9 findings; 7 were dismissed under three-way adversarial
refutation. One of those seven — a claim that the brand mark's `inset: 9px` was
a magic number whose "proportional" comment was false — was dismissed on **zero**
valid votes because all three refuters died on API errors, so it was reviewed by
hand instead: the comment overstated its precision and has been reworded, and
the value is kept as the nearest whole pixel to the ratio.

**One dimension never ran.** The accessibility reviewer failed with an API error
on both attempts, so no independent a11y review of this component exists. What
is claimed about accessibility above rests on the direct assertions listed here
— semantics, focus, target sizes, measured contrast, keyboard routes and reduced
motion — and not on a second opinion.

### Test totals

- **53** behavioural assertions (Chromium)
- **12** core assertions on **each of Chromium, Firefox and WebKit** — `<dialog>`,
  `::backdrop` and top-layer behaviour are exactly where engines diverge. An
  earlier run of this suite reported "all engines pass" while silently *skipping*
  Firefox and WebKit on a version mismatch; the matching builds were installed
  and it was re-run rather than left as a false green.
- **5** regression assertions for the two major defects, each failing before the
  fix and passing after
- **8** assertions for keyboard activation, focus containment, internal card
  scrolling and touch
- **210** pages swept: 0 console errors, 0 responses ≥ 400, no stranded lock or
  padding, no unpinned sticky header, no title prefix

## The brand logo — 2026-09-22

The operator supplied the Urban Optics logo and asked for it in the header, the
notice modal, and the site generally. It replaces the drawn `.brand-mark` — a
red ring with an ink dot, invented by the rebuild — and the set `.brand-name`
wordmark, on all 210 pages that carry the chrome.

### Which file, and why not the one supplied

The supplied file and `assets/img/urban-optics-logo-unboxed.png` are **the same
artwork**, measured: ink-box aspect 2.070 vs 2.075, and normalised to a common
height of 200px their widths come out 414 vs 415. Nothing is cropped or
different between them.

They are not the same *file*:

| | supplied | shipped |
| --- | --- | --- |
| canvas | 196 × 127 | 373 × 183 |
| actual ink | 145 × 70 | 371 × 179 |
| background | opaque `rgb(253,253,252)` | **transparent** |

At the header's 36–44px the supplied file would be scaled from 70px of ink
rather than 179px, and its opaque near-white background would paint a visible
box over the glass header, the modal's `--menu-bg` panel and the dark footer.
So the shipped copy of the same drawing is used instead. The highest resolution
that exists anywhere is 410 × 226 — the client's own CDN original, which is the
*boxed* version with a black frame burnt in; `urban-optics-logo-unboxed.png` is
already derived from it.

Nothing was invented or redrawn. No new asset was added.

### Where it goes

| Place | Treatment |
| --- | --- |
| Header, 210 pages | `height: clamp(36px, 3.2vw, 44px)`. This is a **stacked** lockup, so it needs height to stay legible, but the header's height is set by the CTA button at 44.8px — 44px is the most it can take without making the bar taller. Measured: the header stays 72px from 390 to 1440. |
| Notice modal | 52px. The card has the width to carry the lockup at a legible size, level with the 44px close control. |
| Footer, 210 pages | `filter: invert(1)` at `opacity: .94`. The artwork is pure black on transparency and the footer is `--deep`; inverted it matches `--on-deep`. |
| `.connect` strip | Already used this same file. Unchanged. |

### Two things worth knowing

**The header no longer says "Oklahoma City".** The old lockup set *Urban Optics*
beside the mark with *Oklahoma City* under it. The logo already carries the
name, so keeping it would have been the same word twice — but the locality is
real content, so it was not dropped silently. It was tested: with the locality
kept as a divider-separated tag, the brand block goes from 90px to 222px and at
1024px the nav wraps and the header grows from 72px to **87px**. Logo-only holds
72px at every width. The locality remains on every page in the `.facts` card
address and the footer address.

**The modal builds one URL now.** It previously referenced none by design, since
these 211 pages sit at six different depths. Rather than hardcode a path wrong on
209 of them, it takes the prefix from a file the page has already resolved
correctly — its own `<link>` to `site.css` — so `../../styles/site.css` yields
`../../`. In the static pages the prefix comes from that page's own
`<a class="brand" href>`, and every generated `src` was resolved against the
filesystem before anything was written.

### Verified

- **55** modal assertions (up from 53: the logo loads, is decorative, renders at
  52px), plus **12** on each of Chromium, Firefox and WebKit.
- **210 pages swept**: exactly 2 page-level brand logos each, **0 broken images
  of any kind**, 0 console errors, 0 responses ≥ 400.
- The header link keeps an accessible name — "Urban Optics Eyecare", from the
  `alt`, checked at three different directory depths. The footer and modal
  instances are `alt=""`, decorative, as the mark they replaced was.
- No horizontal overflow at 390 or 768; header 72px at every width tested.
