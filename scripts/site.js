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
})();
