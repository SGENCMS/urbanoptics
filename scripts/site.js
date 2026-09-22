/* site.js — progressive enhancement only. Every page is complete without it. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');

  // mobile menu
  var burger = document.querySelector('.burger');
  var mnav = document.getElementById('m-nav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mnav.hidden = open;
    });
  }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // reveal on scroll — marked up here rather than in the HTML so a page with no
  // JavaScript never ships elements that start invisible.
  // .rail is NAVIGATION and it is sticky. Starting it at opacity 0 and waiting
  // for an observer means a blank column whenever that observer is late or does
  // not fire. Reveal decoration, never wayfinding.
  var targets = document.querySelectorAll('.card, .facts, .prose > h2, .hero .lede');
  if (reduced || !('IntersectionObserver' in window)) {
    // nothing to do: without the attribute the elements were never hidden
  } else {
    Array.prototype.forEach.call(targets, function (el) { el.setAttribute('data-reveal', ''); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        e.target.style.animationDelay = Math.min(i * 60, 240) + 'ms';
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  // search page: filter the index the page already contains
  var q = document.getElementById('q');
  var results = document.getElementById('results');
  if (q && results) {
    var items = results.querySelectorAll('li');
    var apply = function (term) {
      term = term.trim().toLowerCase();
      Array.prototype.forEach.call(items, function (li) {
        li.hidden = term ? li.getAttribute('data-t').indexOf(term) === -1 : false;
      });
    };
    var pre = new URLSearchParams(location.search).get('q');
    if (pre) { q.value = pre; apply(pre); }
    q.addEventListener('input', function () { apply(q.value); });
    q.form.addEventListener('submit', function (ev) { ev.preventDefault(); apply(q.value); });
  }

  // ── the office-hours notice ─────────────────────────────────────────────
  // The source modal, verbatim, for the record: div#ecp-lightbox on
  // www.urbanopticsok.com, opened by magnificPopup and gated on a session
  // cookie named 'ecp-lightbox'. It carried the logo bitmap, an <hr>, an <h1>
  // reading "****NOTICE****", and four paragraphs —
  //   "New Office Hours" / "Effective Tuesday, 9/8/26:" /
  //   "Monday - Thursday: 9am - 5:30pm" / "Friday: 9am - 1pm"
  // — plus a close "x" titled "Close (Esc)".
  //
  // Every factual claim above survives here character for character, including
  // the trailing colon and the hyphen-minus in the times. The four asterisks do
  // not: they are a plaintext-era emphasis hack, and the emphasis they were
  // reaching for is exactly what .kicker is for. To put them back literally,
  // edit LABEL below — it is the only place the word appears.
  //
  // Built here rather than pasted into 211 files: it is an enhancement, one
  // source cannot drift out of sync across the tree, and with JavaScript off
  // the page is exactly as it was — the same hours still sit in the .facts card
  // on every page, and no overlay can be left stranded.
  //
  // Shows once per browsing session, matching the source's session cookie.
  // Bump KEY after editing the copy and every visitor sees it again.
  var KEY = 'uo-notice-2026-09-08';
  var LABEL = 'NOTICE';

  // The one URL this component needs is the logo, and these 211 pages sit at
  // six different depths. Rather than hardcode a path that is wrong on 209 of
  // them, take the prefix from a file the page has ALREADY resolved correctly:
  // its own link to site.css. '../../styles/site.css' yields '../../'. Falls
  // back to no prefix, which is right for a page at the root.
  var assetBase = (function () {
    var l = document.querySelector('link[rel="stylesheet"][href*="styles/site.css"]');
    var h = l && l.getAttribute('href');
    return h ? h.replace(/styles\/site\.css.*$/, '') : '';
  })();
  var LOGO = assetBase + 'assets/img/urban-optics-logo-unboxed.png';

  var canDialog = typeof HTMLDialogElement === 'function' &&
    HTMLDialogElement.prototype && typeof HTMLDialogElement.prototype.showModal === 'function';

  var seen = function () {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  };
  var stamp = function () {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* private mode: show once per page, never break */ }
  };

  if (canDialog && !seen()) {
    var dlg = document.createElement('dialog');
    dlg.className = 'notice';
    dlg.setAttribute('aria-labelledby', 'notice-t');
    dlg.setAttribute('aria-describedby', 'notice-d');
    // one <form method="dialog"> around the whole card: every dismiss control is
    // a submit button, so the x, "Got it" and Esc still close the dialog through
    // the platform even if this script throws after the modal is open.
    dlg.innerHTML =
      '<form method="dialog" class="notice-card">' +
        '<div class="notice-top">' +
          // decorative: the dialog is already labelled by its <h2>
          '<img class="brand-logo" src="' + LOGO + '" alt="" width="373" height="183" decoding="async">' +
          '<button class="c-ico notice-x" type="submit" title="Close (Esc)">' +
            '<svg viewBox="0 0 24 24" data-outline stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
              '<path d="M6 6 18 18M18 6 6 18"/>' +
            '</svg>' +
            '<span class="sr-only">Close</span>' +
          '</button>' +
        '</div>' +
        '<p class="kicker">' + LABEL + '</p>' +
        '<h2 id="notice-t">New Office Hours</h2>' +
        // the dateline and the hours are ONE described region, so the date is
        // announced as part of the payload instead of as an orphan line
        '<div id="notice-d">' +
          '<p class="notice-when">Effective <time datetime="2026-09-08">Tuesday, 9/8/26</time>:</p>' +
          '<dl class="hours">' +
            '<div><dt>Monday - Thursday</dt><dd>9am - 5:30pm</dd></div>' +
            '<div><dt>Friday</dt><dd>9am - 1pm</dd></div>' +
          '</dl>' +
        '</div>' +
        '<div class="notice-act"><button class="btn btn-solid" type="submit">Got it</button></div>' +
      '</form>';
    document.body.appendChild(dlg);

    var returnTo = document.activeElement;
    var card = dlg.querySelector('.notice-card');
    var closing = false;

    // Scroll containment.
    //
    // The obvious lock is `html { overflow: hidden }`. It works, and it breaks
    // the page: setting overflow on the root destroys the viewport scroll
    // container, and every position:sticky descendant silently falls back to its
    // static position. Measured — entering at /#facts-h, which scrolls to 4307,
    // the sticky .site-head dropped 4268px out of view for as long as the modal
    // was open and popped back on dismissal. .rail does the same.
    //
    // Blocking the INPUT instead leaves the root a scroll container, so the
    // header and the rail stay pinned. It also means no scrollbar is removed,
    // so there is no layout shift to compensate for and no padding to restore.
    var scrollableHere = function (t) {
      return card.contains(t) && card.scrollHeight > card.clientHeight + 1;
    };
    var blockWheel = function (ev) { if (!scrollableHere(ev.target)) ev.preventDefault(); };
    // Space is deliberately absent: it activates the focused button, and focus
    // is always on a control inside a modal dialog.
    var SCROLL_KEYS = { ArrowUp: 1, ArrowDown: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1 };
    var blockKeys = function (ev) {
      if (SCROLL_KEYS[ev.key] && !scrollableHere(ev.target)) ev.preventDefault();
    };
    var hold = function (on) {
      var fn = on ? 'addEventListener' : 'removeEventListener';
      window[fn]('wheel', blockWheel, { passive: false });
      window[fn]('touchmove', blockWheel, { passive: false });
      window[fn]('keydown', blockKeys);
    };

    // Released from the dialog's own close event, not from a JS path a native
    // close could bypass — a page left unable to scroll with no overlay on
    // screen is the one way this component could genuinely break something.
    dlg.addEventListener('close', function () {
      hold(false);
      dlg.classList.remove('is-closing');
      stamp();
      if (returnTo && returnTo !== document.body && document.contains(returnTo)) {
        try { returnTo.focus(); } catch (e) { /* element went away */ }
      }
    });

    var dismiss = function () {
      if (closing) return;
      closing = true;
      // Closed on a timer, never on animationend: a reduced-motion visitor gets
      // no animationend at all, so waiting for one would strand the dialog open.
      dlg.classList.add('is-closing');
      window.setTimeout(function () { if (dlg.open) dlg.close(); }, reduced ? 0 : 170);
    };

    // Esc fires cancel; take it over so the exit is animated, and let the
    // timeout above guarantee the close either way.
    dlg.addEventListener('cancel', function (ev) { ev.preventDefault(); dismiss(); });

    // A submit inside the form would close instantly; route it through dismiss()
    // so the exit animates, and let <form method="dialog"> remain the fallback.
    dlg.addEventListener('submit', function (ev) { ev.preventDefault(); dismiss(); });

    // Light dismiss.
    //
    // Testing the click alone is not enough. A click's target is the nearest
    // common ancestor of the press and the release, so pressing on the hours to
    // select them and releasing past the card edge retargets the click to the
    // DIALOG, with the release coordinates outside the card — and the modal
    // would vanish mid-drag. Selecting the opening times is the single most
    // likely thing anyone does with this notice. Aborting a button press by
    // dragging off it had the same effect.
    //
    // So the gesture has to START on the backdrop too. All padding sits on
    // .notice-card, so a press whose target is the dialog itself already means
    // "backdrop"; the rect test stays as a second opinion for engines that
    // retarget differently.
    var downOnBackdrop = false;
    dlg.addEventListener('mousedown', function (ev) { downOnBackdrop = (ev.target === dlg); });
    dlg.addEventListener('click', function (ev) {
      if (ev.target !== dlg || !downOnBackdrop) return;
      var r = dlg.getBoundingClientRect();
      var inside = ev.clientX >= r.left && ev.clientX <= r.right &&
                   ev.clientY >= r.top && ev.clientY <= r.bottom;
      if (!inside) dismiss();
    });

    try {
      dlg.showModal();
      // held only after showModal() has actually succeeded
      hold(true);
      // stamped on OPEN as well as on close: a visitor who clicks a nav link
      // with the card still up would otherwise meet it again on the next page.
      stamp();
      var ok = dlg.querySelector('.notice-act .btn');
      if (ok) ok.focus();
    } catch (e) {
      // removeChild on an open modal does not fire close, so release the hold
      // here too rather than trusting the close handler to run.
      hold(false);
      dlg.parentNode && dlg.parentNode.removeChild(dlg);
    }
  }
})();
