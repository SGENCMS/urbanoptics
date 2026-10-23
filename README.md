# urbanoptics

A **total redesign** of **urbanopticsok.com** (Urban Optics — Oklahoma City, OK;
Dr Reuben Thomas, OD) — all 209 pages — built by the `site-reforge` pipeline and
hardened for public hosting.

**Preview: https://sgencms.github.io/urbanoptics/**

Pure static. No build step, no dependencies, no backend, no runtime request leaves
the page. Serve the folder, or use the preview link above.

> This is an **unofficial development copy** published for build review. It is not
> operated by, affiliated with, or endorsed by Urban Optics. The real site is
> https://www.urbanopticsok.com/.

## What this is, and what it is not

Unlike the `client-*` preview mirrors in this org, this is **not** a pixel-faithful
clone. It is a commissioned redesign:

| | |
| --- | --- |
| **Content, imagery, branding, contact details, URLs** | Urban Optics' own, from `urbanopticsok.com`. Nothing was invented. |
| **Navigation model** | modelled on `eyetrendsclearlake.com` — a flat, two-level service-cluster menu, replacing a five-level WordPress tree. **No content or asset came from that site.** |
| **Visual design** | new — minimalist editorial with glass surfaces. |
| **Platform** | removed. No WordPress, no Beaver Builder, no trackers. |

Because it is a redesign rather than a clone, there is no pixel gate — which is why
this preview can carry a **rendered disclosure banner** on every page, something the
clone mirrors in this org list as a residual risk they cannot address.

## Verification

Measured by the pipeline, not by eye. Full detail in the handoff docs.

| Check | Result |
| --- | --- |
| Content recall vs the live source, all 209 pages | **100.0%** (floor 95%) |
| Pages mapped | **209 / 209**, 0 missing |
| Platform decontamination | **CLEAN** — 0 blocker, 0 major, 0 minor across 230 files |
| Responsive + a11y sweep, 390 / 768 / 1024 / 1440 px | **0 blockers, 0 majors introduced** |
| Reference audit — every local href/src/url() resolved against its own page | **0 escape the site root** |
| Rendering at this preview's subpath, 6 pages × full document | **0 unsatisfied requests, 0 broken images** |
| Preview hardening, re-read from the shipped bytes | **211 / 211 pages** |
| Gate (`sr-gate.mjs`) | 23 PASS · 6 FAIL · 0 UNPROVEN — every red explained in the handoff `CHANGE-LOG.md` |

The six red gate checks are deliberate and documented; the headline ones are that
pixel-diff measures fidelity to the design the brief asked to *replace* (89.4%
drift **is** the deliverable), and that the section-to-preset matcher was not
force-answered because the layout-signature measurement contradicts a match.

## Hardening applied to this public copy

Every change is counted in `PROVENANCE.json`. Summary:

1. `noindex, nofollow, noarchive, nosnippet` on all 211 pages, and `robots.txt`
   disallows everything. A public duplicate must not compete with the client's site.
   Note: on a GitHub Pages **project** site crawlers only read the origin's
   `sgencms.github.io/robots.txt` (which does not exist), never `/urbanoptics/robots.txt`,
   so the meta `noindex` on every page is the control that actually applies.
2. `og:url` repointed at this preview, `og:description` replaced with the disclosure,
   and `og:image` is a **disclosure card** (`assets/img/og-preview.png`: "Unofficial
   redesign preview — not affiliated with Urban Optics"). `noindex` does **not** stop
   link-unfurl crawlers, so without this a pasted link rendered a card
   indistinguishable from the official practice.
3. **JSON-LD business-identity blocks removed** (they asserted `Optometric` with the
   real address, telephone and opening hours). Each page now carries only a
   `WebPage` + `BreadcrumbList` block built from its own title, description and
   breadcrumb — no organization, address, phone or hours.
4. **Both patient forms made inert** — `action=""`, `data-preview="inert"`, and the
   default submit button is `disabled`, which blocks both clicking it and Enter-key
   submission **without JavaScript** (`site.js` adds a `preventDefault` listener as a
   second layer). The earlier `onsubmit="return false"` guard was removed on
   2026-10-23: inline handlers do not run with scripting disabled, and measured, the
   original contact form POSTed when JavaScript was off. The registration form collects PHI (name, date of birth,
   last four of SSN, medical history, insurance identifiers); on a public URL it must
   be impossible for a visitor to believe they submitted it.
5. `<meta name="referrer" content="no-referrer">` so outbound clicks do not reveal
   this URL to the client's analytics.
6. A **rendered disclosure banner** on every page.
7. `sitemap.xml` and `llms.txt` removed — both advertise the client's real URLs and
   invite crawlers.
8. `<link rel="canonical">` points at **this preview's own URL** (same as `og:url`).
   It used to point at the client's real page, but combined with `noindex` that sent
   search engines two contradicting signals ("drop me" vs "consolidate onto that
   URL"); with `noindex` kept, a self-canonical is the consistent pair.

## Known limits

- **The two patient forms do not submit.** Deliberate — see 4 above. On the real
  handoff build they ship complete but unwired, for the client to point at a
  HIPAA-eligible endpoint.
- **Internal links: 0 dead.** The source's inherited link rot (links the live site
  itself 404s, breadcrumbs to `/author`, `/category`, `/tag`, `/team`, `/location`
  hubs that never existed, "watch a video" links to videos that exist nowhere) was
  repointed to the real page or unlinked in the 2026-10-23 Site QA pass. Verified by
  resolving all 43,280 local `href`/`src` references against the tree.
- **Outbound links** to the practice's real booking provider (`booking.adit.com`) and
  contact-lens store (`yourstore.wewillship.com`) still go to those live services.
- **Nine images could not be fetched** (404/504 at the client's WordPress CDN, one
  403 hard refusal). They are already broken on the live site; the references were
  dropped rather than shipped pointing at dead files.
- **Commit metadata is public**, including the committer email.

## Licence / ownership

All site content, imagery, trademarks and branding belong to Urban Optics. This
repository is an unaffiliated development artifact and asserts no rights over them.
The typefaces are Lato (SIL Open Font License 1.1) and Fraunces (SIL OFL 1.1), both
self-hosted.
