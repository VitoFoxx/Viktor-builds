import { portalGeometry } from './portalTimeline.js'

/**
 * The placeholders of ADAPT. Each one starts on an element of the metalwork
 * study and ends on one of the restaurant. `from` / `to` are selector lists,
 * the first rendered match wins (mobile hides some elements).
 *   line   nav items, labels: a thin bar, like the mock in Scene 02
 *   block  headline lines, text, menu
 *   image  photos become plain fields
 * The photo field splits in two: the full-bleed room and the cook.
 */
export const BLOCKS = [
  { id: 'logo', kind: 'line', from: ['.site-nav__logo'], to: ['.r-nav__logo'] },
  { id: 'menu', kind: 'line', from: ['.site-nav__links', '.site-nav__contact'], to: ['.r-nav__menu'] },
  { id: 'action', kind: 'line', from: ['.site-nav__contact', '.site-nav__links'], to: ['.r-nav__reserve'] },
  { id: 'eyebrow', kind: 'line', from: ['.site-eyebrow'], to: ['.r-eyebrow'] },
  { id: 'title-1', kind: 'block', from: ['.site-hero__title .site-line:nth-child(1)'], to: ['.r-hero__title .site-line:nth-child(1)'] },
  { id: 'title-2', kind: 'block', from: ['.site-hero__title .site-line:nth-child(2)'], to: ['.r-hero__title .site-line:nth-child(2)'] },
  { id: 'photo', kind: 'image', from: ['.site-hero__media'], to: ['.r-hero__media'] },
  { id: 'detail', kind: 'image', from: ['.site-hero__media'], to: ['.r-chef'] },
  { id: 'text', kind: 'block', from: ['.site-hero__text'], to: ['.r-menu'] },
  { id: 'today', kind: 'block', from: ['.site-facts', '.site-hero__actions'], to: ['.r-today'] },
  { id: 'reserve', kind: 'block', from: ['.site-hero__actions'], to: ['.r-reserve'] },
]

// Untransformed box of `el` inside `root` (offsets ignore transforms, so this
// is safe to measure while both layers are scaled into the frame).
function boxIn(el, root) {
  let x = 0
  let y = 0
  for (let node = el; node && node !== root; node = node.offsetParent) {
    x += node.offsetLeft
    y += node.offsetTop
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

/**
 * Scene 05: Adapt, prototype Metallbau → Restaurant. Appended to the master
 * timeline at `handoff`, where Scene 04 left the study in the frame at
 * --exit-scale. No morph: the page is taken apart, re-planned and rebuilt.
 *
 * Labels (timeline seconds, continuing experienceTimeline.js; desktop):
 *   adapt      17.8  the restaurant layer is laid over the frame, nothing moves yet
 *   takeApart  18.55 contents fall back into grey placeholders, photo → field
 *                    ("DIFFERENT BUSINESS")
 *   replan     19.25 the placeholders move into the new layout, its grid shows
 *   rebuild    20.2  warm paper, photo, headline from masks, menu, reservation last;
 *                    counter → WEBSITE 02 ("→ DIFFERENT WEBSITE." once it stands)
 *   end        ~22.5 short hold on the restaurant
 */
export function addAdapt(tl, stage, q, { isDesktop }) {
  const metalRoot = q('.scene--site .portal__content')[0]
  const root = q('.adapt__content')[0]
  const { clipAt, contentAt } = portalGeometry(stage, q)
  const S = parseFloat(getComputedStyle(stage).getPropertyValue('--exit-scale')) || 0.75

  const first = (scope, selectors) => {
    for (const selector of selectors) {
      const el = scope.querySelector(selector)
      if (el?.offsetParent) return el
    }
    return null
  }
  // Transform of a 100 × 100 placeholder onto an element's box.
  const place = (scope, rootEl, selectors, kind) => () => {
    const el = first(scope, selectors)
    if (!el) return { x: 0, y: 0, scaleX: 0, scaleY: 0 }
    let { x, y, w, h } = boxIn(el, rootEl)
    if (kind === 'line') {
      const bar = Math.max(4, h * 0.36)
      y += (h - bar) / 2
      h = bar
    }
    return { x, y, scaleX: w / 100, scaleY: h / 100 }
  }
  const prop = (fn, key) => () => fn()[key]
  const transformOf = (fn) => ({
    x: prop(fn, 'x'),
    y: prop(fn, 'y'),
    scaleX: prop(fn, 'scaleX'),
    scaleY: prop(fn, 'scaleY'),
  })

  const blocks = q('.adapt__block')
  const site = q('.r-site')[0]

  /* ── adapt: lay the restaurant layer over the frame ───── */
  tl.addLabel('adapt', 'handoff')
    .set(q('.scene--adapt'), { autoAlpha: 1 }, 'adapt')
    .set(q('.adapt__clip'), { clipPath: clipAt(S) }, 'adapt')
    .set(root, { ...contentAt(S), transformOrigin: '0 0' }, 'adapt')

  /* ── take apart ───────────────────────────────────────── */
  tl.addLabel('takeApart', 'adapt+=0.75')
  BLOCKS.forEach((block, i) => {
    const from = place(metalRoot, metalRoot, block.from, block.kind)
    const to = place(site, root, block.to, block.kind)
    tl.fromTo(
      blocks[i],
      { autoAlpha: 0, ...transformOf(from) },
      { autoAlpha: 1, duration: 0.35, ease: 'power1.out' },
      `takeApart+=${(i * 0.03).toFixed(2)}`,
    )
      /* ── re-plan: every placeholder to its new place ─── */
      .to(
        blocks[i],
        { ...transformOf(to), duration: 0.95, ease: 'power3.inOut' },
        `takeApart+=${(0.7 + i * 0.025).toFixed(3)}`,
      )
  })
  tl.to(
    q('.scene--site .site-nav, .scene--site .site-hero__copy > *, .scene--site .site-facts__item'),
    { autoAlpha: 0, duration: 0.3, stagger: 0.025, ease: 'power1.in' },
    'takeApart+=0.1',
  )
    // Under its opaque field by now.
    .to(q('.scene--site .site-hero__media'), { autoAlpha: 0, duration: 0.2 }, 'takeApart+=0.35')
    .fromTo(
      q('.adapt__message-a'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      'takeApart',
    )

  tl.addLabel('replan', 'takeApart+=0.7')
  if (isDesktop) {
    tl.fromTo(
      q('.adapt__guide--h'),
      { autoAlpha: 0, scaleX: 0 },
      { autoAlpha: 1, scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
      'replan+=0.1',
    )
      .fromTo(
        q('.adapt__guide--v'),
        { autoAlpha: 0, scaleY: 0 },
        { autoAlpha: 1, scaleY: 1, duration: 0.6, stagger: 0.05, ease: 'power2.inOut' },
        'replan+=0.15',
      )
      .to(q('.adapt__guide'), { autoAlpha: 0, duration: 0.4, ease: 'power1.out' }, 'replan+=1.1')
  }

  /* ── rebuild ──────────────────────────────────────────── */
  tl.addLabel('rebuild', 'replan+=0.95')
    .fromTo(q('.adapt__bg'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.inOut' }, 'rebuild')
    // The placeholders hand over to the real content.
    .to(blocks, { autoAlpha: 0, duration: 0.35, stagger: 0.04, ease: 'power1.inOut' }, 'rebuild+=0.2')
    .fromTo(
      q('.r-hero__media'),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, ease: 'power1.inOut' },
      'rebuild+=0.15',
    )
    .fromTo(q('.r-hero__img'), { scale: 1.08 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, 'rebuild+=0.15')
    .fromTo(
      q('.r-chef'),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut' },
      'rebuild+=0.4',
    )
    .fromTo(
      q('.r-site [data-reveal]:not(.r-reserve)'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
      'rebuild+=0.3',
    )
    .fromTo(
      q('.r-hero__title .site-line__inner'),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      'rebuild+=0.35',
    )
    // The reservation last: the one action this page is built around.
    .fromTo(
      q('.r-reserve'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      'rebuild+=0.85',
    )
    // Viktor's context line counts on.
    .to(q('.context__item:not(.context__item--next)'), { yPercent: -110, duration: 0.5, ease: 'power2.in' }, 'rebuild+=0.1')
    .fromTo(
      q('.context__item--next'),
      { autoAlpha: 1, yPercent: 110 },
      { yPercent: 0, duration: 0.5, ease: 'power2.out' },
      'rebuild+=0.45',
    )
    .fromTo(
      q('.adapt__message-b'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      'rebuild+=1.05',
    )
    // Hold the finished restaurant.
    .to({}, { duration: 1.2 })
}
