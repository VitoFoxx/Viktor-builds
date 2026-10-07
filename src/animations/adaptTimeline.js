import { portalGeometry } from './portalTimeline.js'

/**
 * The placeholders of ADAPT. Each one starts on an element of the metalwork
 * study and ends on one of the restaurant. `from` / `to` are selector lists,
 * the first rendered match wins (mobile hides some elements).
 *   line   nav items, labels: a thin bar, like the mock in Scene 02
 *   block  headline lines, text, menu
 *   image  photos become plain fields
 * The photo field splits in two: the kitchen and the cook.
 *   out    order in which the metalwork page is taken apart: details
 *          first, the structure (nav, photo) last
 *   in     order in which the fields move into the new plan: structure
 *          first (photos, nav), then type and content
 */
export const BLOCKS = [
  { id: 'logo', kind: 'line', from: ['.site-nav__logo'], to: ['.r-nav__logo'], out: 7, in: 2 },
  { id: 'menu', kind: 'line', from: ['.site-nav__links', '.site-nav__contact'], to: ['.r-nav__menu'], out: 8, in: 3 },
  { id: 'action', kind: 'line', from: ['.site-nav__contact', '.site-nav__links'], to: ['.r-nav__reserve'], out: 8, in: 4 },
  { id: 'eyebrow', kind: 'line', from: ['.site-eyebrow'], to: ['.r-eyebrow'], out: 4, in: 5 },
  { id: 'title-1', kind: 'block', from: ['.site-hero__title .site-line:nth-child(1)'], to: ['.r-hero__title .site-line:nth-child(1)'], out: 6, in: 6 },
  { id: 'title-2', kind: 'block', from: ['.site-hero__title .site-line:nth-child(2)'], to: ['.r-hero__title .site-line:nth-child(2)'], out: 5, in: 7 },
  { id: 'photo', kind: 'image', from: ['.site-hero__media'], to: ['.r-hero__media'], out: 9, in: 0 },
  { id: 'detail', kind: 'image', from: ['.site-hero__media'], to: ['.r-chef'], out: 9, in: 1 },
  { id: 'text', kind: 'block', from: ['.site-hero__text'], to: ['.r-menu'], out: 3, in: 9 },
  { id: 'today', kind: 'block', from: ['.site-facts', '.site-hero__actions'], to: ['.r-today'], out: 0, in: 8 },
  { id: 'reserve', kind: 'block', from: ['.site-hero__actions'], to: ['.r-reserve'], out: 1, in: 10 },
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
 * --exit-scale. No morph and no theme switch: the page is taken apart,
 * re-planned on a new grid and rebuilt piece by piece.
 *
 * Labels (timeline seconds, continuing experienceTimeline.js; desktop):
 *   adapt      17.8  the restaurant layer is laid over the frame, nothing moves yet
 *   takeApart  18.55 element by element, details first, the page falls back
 *                    into grey placeholders ("DIFFERENT BUSINESS")
 *   replan     19.4  the new grid is drawn, then the placeholders move into it,
 *                    structure first; the photo field splits into kitchen and cook
 *   rebuild    20.75 each field is filled in its turn: warm paper, kitchen, nav,
 *                    headline, cook, "Heute" and menu, the reservation last;
 *                    counter → WEBSITE 02 ("→ DIFFERENT WEBSITE." once it stands)
 *   end        ~24.6 short hold on the restaurant
 */
export function addAdapt(tl, stage, q) {
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
  const block = (...ids) => ids.map((id) => blocks[BLOCKS.findIndex((b) => b.id === id)])
  const site = q('.r-site')[0]

  /* ── adapt: lay the restaurant layer over the frame ───── */
  tl.addLabel('adapt', 'handoff')
    .set(q('.scene--adapt'), { autoAlpha: 1 }, 'adapt')
    .set(q('.adapt__clip'), { clipPath: clipAt(S) }, 'adapt')
    .set(root, { ...contentAt(S), transformOrigin: '0 0' }, 'adapt')

  /* ── take apart: one element after the other ──────────── */
  const OUT = 0.07
  const IN = 0.05
  tl.addLabel('takeApart', 'adapt+=0.75').addLabel('replan', 'takeApart+=0.85')
  const fading = new Set()
  BLOCKS.forEach((b, i) => {
    const from = place(metalRoot, metalRoot, b.from, b.kind)
    const to = place(site, root, b.to, b.kind)
    const out = `takeApart+=${(b.out * OUT).toFixed(2)}`
    tl.fromTo(blocks[i], { autoAlpha: 0, ...transformOf(from) }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, out)

    // The element itself goes as its placeholder arrives (once per element:
    // two placeholders can start on the same one).
    const el = first(metalRoot, b.from)
    if (el && !fading.has(el)) {
      fading.add(el)
      tl.to(el, { autoAlpha: 0, duration: 0.25, ease: 'power1.in' }, `takeApart+=${(b.out * OUT + 0.08).toFixed(2)}`)
    }

    /* ── re-plan: every placeholder to its new place ─── */
    tl.to(
      blocks[i],
      { ...transformOf(to), duration: 0.9, ease: 'power3.inOut' },
      `replan+=${(0.3 + b.in * IN).toFixed(2)}`,
    )
  })
  // Whatever has no placeholder goes with the photo, the last piece: the
  // rest of the page (on wide screens its top edge shows below the hero).
  tl.to(
    q('.scene--site .site-nav, .scene--site .site-project, .scene--site .site-details'),
    { autoAlpha: 0, duration: 0.25, ease: 'power1.in' },
    `takeApart+=${(9 * OUT + 0.08).toFixed(2)}`,
  ).fromTo(
    q('.adapt__message-a'),
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    'takeApart',
  )

  /* ── re-plan ──────────────────────────────────────────── */
  // The new plan is drawn first, then the fields move into it.
  tl.fromTo(
    q('.adapt__guide--h'),
    { autoAlpha: 0, scaleX: 0 },
    { autoAlpha: 1, scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
    'replan',
  )
    .fromTo(
      q('.adapt__guide--v'),
      { autoAlpha: 0, scaleY: 0 },
      { autoAlpha: 1, scaleY: 1, duration: 0.55, stagger: 0.05, ease: 'power2.inOut' },
      'replan+=0.05',
    )
    .to(q('.adapt__guide'), { autoAlpha: 0, duration: 0.4, ease: 'power1.out' }, 'replan+=1.6')

  /* ── rebuild: each field filled in its turn ───────────── */
  // A placeholder hands over to its content as that content arrives.
  const handOver = (ids, at) =>
    tl.to(block(...ids), { autoAlpha: 0, duration: 0.3, ease: 'power1.inOut' }, at)

  tl.addLabel('rebuild', 'replan+=1.35')
    // New ground: the warm paper is laid from the top.
    .fromTo(
      q('.adapt__bg'),
      { autoAlpha: 1, clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.inOut' },
      'rebuild',
    )
    // The kitchen fills its field from the top, settling as it lands.
    .fromTo(
      q('.r-hero__media'),
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power3.inOut' },
      'rebuild+=0.15',
    )
    .fromTo(q('.r-hero__img'), { scale: 1.08 }, { scale: 1, duration: 1.3, ease: 'power2.out' }, 'rebuild+=0.15')
  handOver(['photo'], 'rebuild+=0.6')
    // Navigation on the photo.
    .fromTo(q('.r-nav'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 'rebuild+=0.6')
  handOver(['logo', 'menu', 'action'], 'rebuild+=0.6')
    // Headline from its masks, the new typeface's first appearance.
    .fromTo(q('.r-eyebrow'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 'rebuild+=0.75')
    .fromTo(
      q('.r-hero__title .site-line__inner'),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      'rebuild+=0.8',
    )
  handOver(['eyebrow', 'title-1', 'title-2'], 'rebuild+=0.75')
    // The cook, the second half of the old photo.
    .fromTo(
      q('.r-chef'),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut' },
      'rebuild+=1.05',
    )
  handOver(['detail'], 'rebuild+=1.45')
    // Heute and the menu, line by line.
    .fromTo(
      q('.r-today__label, .r-today__hours, .r-menu [data-reveal]'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      'rebuild+=1.3',
    )
  handOver(['today', 'text'], 'rebuild+=1.3')
    // The reservation last: the one action this page is built around.
    .fromTo(
      q('.r-reserve'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      'rebuild+=1.85',
    )
  handOver(['reserve'], 'rebuild+=1.85')
    // Viktor's context line counts on.
    .to(q('.context__item:not(.context__item--next)'), { yPercent: -110, duration: 0.5, ease: 'power2.in' }, 'rebuild+=0.2')
    .fromTo(
      q('.context__item--next'),
      { autoAlpha: 1, yPercent: 110 },
      { yPercent: 0, duration: 0.5, ease: 'power2.out' },
      'rebuild+=0.55',
    )
    .fromTo(
      q('.adapt__message-b'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      'rebuild+=2.1',
    )
    // Hold the finished restaurant.
    .to({}, { duration: 1.2 })
}
