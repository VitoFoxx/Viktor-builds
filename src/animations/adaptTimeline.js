import { gsap } from './gsap.js'
import { portalGeometry } from './portalTimeline.js'

/**
 * The placeholders of ADAPT, one set per rebuild. Each one starts on an
 * element of the page being taken apart and ends on one of the new page.
 * `from` / `to` are selector lists, the first rendered match wins (mobile
 * hides some elements).
 *   line   nav items, labels: a thin bar, like the mock in Scene 02
 *   block  headline lines, text, lists
 *   image  photos become plain fields
 *   out    order in which the old page is taken apart: details first,
 *          the structure (nav, photos) last
 *   in     order in which the fields move into the new plan: structure
 *          first (photos, nav), then type and content
 * Every new page has its own grid (`guides`, see SceneAdapt.css) and its
 * own build order (`build*` below).
 */
const RESTAURANT_BLOCKS = [
  { id: 'logo', kind: 'line', from: ['.site-nav__logo'], to: ['.r-nav__logo'], out: 7, in: 2 },
  { id: 'menu', kind: 'line', from: ['.site-nav__links', '.site-nav__contact'], to: ['.r-nav__menu'], out: 8, in: 3 },
  { id: 'action', kind: 'line', from: ['.site-nav__contact', '.site-nav__links'], to: ['.r-nav__reserve'], out: 8, in: 4 },
  { id: 'eyebrow', kind: 'line', from: ['.site-eyebrow'], to: ['.r-eyebrow'], out: 4, in: 5 },
  { id: 'title-1', kind: 'block', from: ['.site-hero__title .site-line:nth-child(1)'], to: ['.r-hero__title .site-line:nth-child(1)'], out: 6, in: 6 },
  { id: 'title-2', kind: 'block', from: ['.site-hero__title .site-line:nth-child(2)'], to: ['.r-hero__title .site-line:nth-child(2)'], out: 5, in: 7 },
  // The metalwork photo splits in two: the kitchen and the cook.
  { id: 'photo', kind: 'image', from: ['.site-hero__media'], to: ['.r-hero__media'], out: 9, in: 0 },
  { id: 'detail', kind: 'image', from: ['.site-hero__media'], to: ['.r-chef'], out: 9, in: 1 },
  { id: 'text', kind: 'block', from: ['.site-hero__text'], to: ['.r-menu'], out: 3, in: 9 },
  { id: 'today', kind: 'block', from: ['.site-facts', '.site-hero__actions'], to: ['.r-today'], out: 0, in: 8 },
  { id: 'reserve', kind: 'block', from: ['.site-hero__actions'], to: ['.r-reserve'], out: 1, in: 10 },
]

// Restaurant → barbershop: the menu becomes the price list, "Heute" the
// third word of the board, the reservation the booking.
const SALON_BLOCKS = [
  { id: 'logo', kind: 'line', from: ['.r-nav__logo'], to: ['.s-logo'], out: 7, in: 2 },
  { id: 'index', kind: 'block', from: ['.r-nav__menu'], to: ['.s-index', '.s-nav-action'], out: 8, in: 3 },
  { id: 'eyebrow', kind: 'line', from: ['.r-nav__reserve'], to: ['.s-eyebrow'], out: 8, in: 4 },
  { id: 'title-1', kind: 'block', from: ['.r-hero__title .site-line:nth-child(1)'], to: ['.s-title .site-line:nth-child(1)'], out: 6, in: 5 },
  { id: 'title-2', kind: 'block', from: ['.r-hero__title .site-line:nth-child(2)'], to: ['.s-title .site-line:nth-child(2)'], out: 5, in: 6 },
  { id: 'title-3', kind: 'block', from: ['.r-today__label'], to: ['.s-title .site-line:nth-child(3)'], out: 3, in: 7 },
  { id: 'label', kind: 'line', from: ['.r-eyebrow'], to: ['.s-eyebrow'], out: 4, in: 4 },
  { id: 'photo', kind: 'image', from: ['.r-hero__media'], to: ['.s-room'], out: 9, in: 0 },
  { id: 'detail', kind: 'image', from: ['.r-chef'], to: ['.s-razor'], out: 9, in: 1 },
  { id: 'prices', kind: 'block', from: ['.r-menu'], to: ['.s-prices'], out: 0, in: 8 },
  { id: 'hours', kind: 'line', from: ['.r-today__hours'], to: ['.s-walkin', '.s-steps'], out: 2, in: 9 },
  { id: 'action', kind: 'block', from: ['.r-reserve'], to: ['.s-action'], out: 1, in: 10 },
]

// Barbershop → practice: the price list becomes the visitor's ways in,
// the walk-in hours today's status bar, the booking moves up into the nav.
const DENTAL_BLOCKS = [
  { id: 'status', kind: 'line', from: ['.s-walkin', '.s-steps'], to: ['.d-status'], out: 0, in: 0 },
  { id: 'logo', kind: 'line', from: ['.s-logo'], to: ['.d-nav__logo'], out: 8, in: 3 },
  { id: 'links', kind: 'line', from: ['.s-index', '.s-nav-action'], to: ['.d-nav__links', '.d-nav__logo'], out: 8, in: 4 },
  { id: 'action', kind: 'line', from: ['.s-action'], to: ['.d-nav__action'], out: 2, in: 5 },
  { id: 'eyebrow', kind: 'line', from: ['.s-eyebrow'], to: ['.d-eyebrow'], out: 4, in: 6 },
  { id: 'title-1', kind: 'block', from: ['.s-title .site-line:nth-child(1)'], to: ['.d-title .site-line:nth-child(1)'], out: 7, in: 7 },
  { id: 'title-2', kind: 'block', from: ['.s-title .site-line:nth-child(2)'], to: ['.d-title .site-line:nth-child(2)'], out: 6, in: 8 },
  { id: 'title-3', kind: 'block', from: ['.s-title .site-line:nth-child(3)'], to: ['.d-hours', '.d-eyebrow'], out: 5, in: 9 },
  { id: 'photo', kind: 'image', from: ['.s-room'], to: ['.d-reception'], out: 9, in: 1 },
  { id: 'detail', kind: 'image', from: ['.s-razor'], to: ['.d-chair'], out: 9, in: 2 },
  { id: 'needs', kind: 'block', from: ['.s-prices'], to: ['.d-needs'], out: 3, in: 10 },
]

export const STUDIES = [
  { brand: 'restaurant', blocks: RESTAURANT_BLOCKS, guides: 4 },
  { brand: 'salon', blocks: SALON_BLOCKS, guides: 4 },
  { brand: 'dental', blocks: DENTAL_BLOCKS, guides: 4 },
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

/**
 * One rebuild, as its own timeline: the old page is taken apart into the
 * grey placeholders of Scene 02, the new grid is drawn and the fields move
 * into it, then the new page is built field by field (`build`).
 *
 * Labels (seconds from the start of the rebuild, before `speed`):
 *   apart    0.75  element by element, details first
 *   replan   1.6   grid, then every placeholder to its new place
 *   rebuild  2.95  new ground, then the page in its own order
 */
function rebuild({ layer, from, rest, blocks, root, build, lead = 0.75, hold }) {
  const tl = gsap.timeline()
  const site = layer.querySelector('.adapt__site > *')
  const skeleton = layer.querySelector('.adapt__skeleton')
  const placeholders = layer.querySelectorAll('.adapt__block')
  const block = (...ids) => ids.map((id) => placeholders[blocks.findIndex((b) => b.id === id)])
  const $ = (selector) => layer.querySelectorAll(selector)

  /* ── take apart: one element after the other ──────────── */
  const OUT = 0.07
  const IN = 0.05
  tl.addLabel('apart', lead).addLabel('replan', 'apart+=0.85')
  const fading = new Set()
  blocks.forEach((b, i) => {
    const start = place(from.scope, from.root, b.from, b.kind)
    const end = place(site, root, b.to, b.kind)
    tl.fromTo(
      placeholders[i],
      { autoAlpha: 0, ...transformOf(start) },
      { autoAlpha: 1, duration: 0.3, ease: 'power1.out' },
      `apart+=${(b.out * OUT).toFixed(2)}`,
    )

    // The element itself goes as its placeholder arrives (once per element:
    // two placeholders can start on the same one).
    const el = first(from.scope, b.from)
    if (el && !fading.has(el)) {
      fading.add(el)
      tl.to(el, { autoAlpha: 0, duration: 0.25, ease: 'power1.in' }, `apart+=${(b.out * OUT + 0.08).toFixed(2)}`)
    }

    /* ── re-plan: every placeholder to its new place ─── */
    tl.to(
      placeholders[i],
      { ...transformOf(end), duration: 0.9, ease: 'power3.inOut' },
      `replan+=${(0.3 + b.in * IN).toFixed(2)}`,
    )
  })
  // Whatever has no placeholder goes with the photo, the last piece.
  tl.to(rest, { autoAlpha: 0, duration: 0.25, ease: 'power1.in' }, `apart+=${(9 * OUT + 0.08).toFixed(2)}`)

  // The new plan is drawn first, then the fields move into it.
  tl.fromTo(
    $('.adapt__guide--h'),
    { autoAlpha: 0, scaleX: 0 },
    { autoAlpha: 1, scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
    'replan',
  )
    .fromTo(
      $('.adapt__guide--v'),
      { autoAlpha: 0, scaleY: 0 },
      { autoAlpha: 1, scaleY: 1, duration: 0.55, stagger: 0.05, ease: 'power2.inOut' },
      'replan+=0.05',
    )
    .to($('.adapt__guide'), { autoAlpha: 0, duration: 0.4, ease: 'power1.out' }, 'replan+=1.6')

  /* ── rebuild ──────────────────────────────────────────── */
  // New ground, laid from the top. The placeholders take the new page's
  // tone with it (they would vanish on a ground of their own colour).
  const style = getComputedStyle(layer)
  tl.addLabel('rebuild', 'replan+=1.35')
    .fromTo(
      $('.adapt__bg'),
      { autoAlpha: 1, clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.inOut' },
      'rebuild',
    )
    .fromTo(
      skeleton,
      { color: style.getPropertyValue('--ph-from').trim() },
      { color: style.getPropertyValue('--ph-to').trim(), duration: 0.6, ease: 'power2.inOut' },
      'rebuild',
    )

  // A placeholder hands over to its content as that content arrives.
  const handOver = (ids, at) => tl.to(block(...ids), { autoAlpha: 0, duration: 0.3, ease: 'power1.inOut' }, at)
  build(tl, handOver)

  tl.addLabel('built').to({}, { duration: hold })
  return tl
}

// Reveal helpers shared by the build orders.
const rise = (targets) => [
  targets,
  { yPercent: 110 },
  { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
]
const fadeUp = (targets, stagger = 0) => [
  targets,
  { autoAlpha: 0, y: 8 },
  { autoAlpha: 1, y: 0, duration: 0.5, stagger, ease: 'power2.out' },
]
const wipe = (targets, from = 'top', duration = 0.75) => [
  targets,
  { clipPath: from === 'top' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)' },
  { clipPath: 'inset(0% 0% 0% 0%)', duration, ease: 'power3.inOut' },
]

/* ── Build orders: what each business shows first ───────── */

// Restaurant: the kitchen, nav on it, the headline, the cook, Heute and
// the menu, the reservation last.
const buildRestaurant = (q, stageQ) => (tl, handOver) => {
  tl.fromTo(...wipe(q('.r-hero__media')), 'rebuild+=0.15').fromTo(
    q('.r-hero__img'),
    { scale: 1.08 },
    { scale: 1, duration: 1.3, ease: 'power2.out' },
    'rebuild+=0.15',
  )
  handOver(['photo'], 'rebuild+=0.6').fromTo(
    q('.r-nav'),
    { autoAlpha: 0, y: 6 },
    { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    'rebuild+=0.6',
  )
  handOver(['logo', 'menu', 'action'], 'rebuild+=0.6')
    .fromTo(q('.r-eyebrow'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 'rebuild+=0.75')
    .fromTo(...rise(q('.r-hero__title .site-line__inner')), 'rebuild+=0.8')
  handOver(['eyebrow', 'title-1', 'title-2'], 'rebuild+=0.75').fromTo(...wipe(q('.r-chef'), 'bottom', 0.7), 'rebuild+=1.05')
  handOver(['detail'], 'rebuild+=1.45').fromTo(
    ...fadeUp(q('.r-today__label, .r-today__hours, .r-menu [data-reveal]'), 0.06),
    'rebuild+=1.3',
  )
  handOver(['today', 'text'], 'rebuild+=1.3').fromTo(...fadeUp(q('.r-reserve')), 'rebuild+=1.85')
  handOver(['reserve'], 'rebuild+=1.85')
    // "→ DIFFERENT WEBSITE." once the first proof stands.
    .fromTo(
      stageQ('.adapt__message-b'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      'rebuild+=2.1',
    )
}

// Barbershop: the room, then the shop's name and index, the board word
// by word with its prices, the razor and the line on the cut, the booking
// last.
const buildSalon = (q) => (tl, handOver) => {
  tl.fromTo(...wipe(q('.s-room'), 'bottom'), 'rebuild+=0.15').fromTo(
    q('.s-room .site-photo'),
    { scale: 1.08 },
    { scale: 1, duration: 1.3, ease: 'power2.out' },
    'rebuild+=0.15',
  )
  handOver(['photo'], 'rebuild+=0.6')
    .fromTo(...fadeUp([...q('.s-logo, .s-nav-action'), ...q('.s-index li')], 0.05), 'rebuild+=0.55')
  handOver(['logo', 'index'], 'rebuild+=0.6')
    .fromTo(...fadeUp(q('.s-eyebrow')), 'rebuild+=0.75')
    .fromTo(...rise(q('.s-title .site-line__inner')), 'rebuild+=0.8')
  handOver(['eyebrow', 'label', 'title-1', 'title-2', 'title-3'], 'rebuild+=0.8')
    .fromTo(...fadeUp(q('.s-price [data-reveal]'), 0.04), 'rebuild+=1.05')
  handOver(['prices'], 'rebuild+=1.1')
    .fromTo(...wipe(q('.s-razor'), 'top', 0.7), 'rebuild+=1.1')
    .fromTo(...fadeUp(q('.s-style')), 'rebuild+=1.3')
  handOver(['detail'], 'rebuild+=1.5').fromTo(...fadeUp(q('.s-steps, .s-walkin'), 0.08), 'rebuild+=1.45')
  handOver(['hours'], 'rebuild+=1.5').fromTo(...fadeUp(q('.s-action')), 'rebuild+=1.85')
  handOver(['action'], 'rebuild+=1.85')
}

// Practice: status bar and the two photos (structure), navigation, the
// question, the ways in and the hours, the appointment last.
const buildDental = (q) => (tl, handOver) => {
  tl.fromTo(...wipe(q('.d-status'), 'top', 0.5), 'rebuild+=0.1')
  handOver(['status'], 'rebuild+=0.35')
    .fromTo(...wipe(q('.d-reception')), 'rebuild+=0.15')
    .fromTo(q('.d-reception .site-photo'), { scale: 1.06 }, { scale: 1, duration: 1.3, ease: 'power2.out' }, 'rebuild+=0.15')
    .fromTo(...wipe(q('.d-chair'), 'top', 0.7), 'rebuild+=0.4')
  handOver(['photo', 'detail'], 'rebuild+=0.75')
    .fromTo(...fadeUp(q('.d-nav__logo, .d-nav__links li'), 0.05), 'rebuild+=0.6')
  handOver(['logo', 'links'], 'rebuild+=0.6')
    .fromTo(...fadeUp(q('.d-eyebrow')), 'rebuild+=0.75')
    .fromTo(...rise(q('.d-title .site-line__inner')), 'rebuild+=0.8')
  handOver(['eyebrow', 'title-1', 'title-2'], 'rebuild+=0.8')
    .fromTo(...fadeUp(q('.d-need'), 0.07), 'rebuild+=1.15')
    .fromTo(...fadeUp(q('.d-hours [data-reveal]'), 0.06), 'rebuild+=1.25')
  handOver(['needs', 'title-3'], 'rebuild+=1.2')
    // The appointment last: the action this page and BUSINESS are built on.
    .fromTo(...fadeUp(q('.d-nav__action')), 'rebuild+=1.85')
  handOver(['action'], 'rebuild+=1.85')
}

/**
 * Scene 05: Adapt, Metallbau → Restaurant → Barbershop → Zahnarztpraxis.
 * Appended to the master timeline at `handoff`, where Scene 04 left the
 * study in the frame at --exit-scale. No morph and no theme switch: each
 * page is taken apart, re-planned on a new grid and rebuilt piece by piece.
 * The rebuilds accelerate (the visitor knows the mechanics after the
 * first), the practice holds longest.
 *
 * Master labels (timeline seconds, desktop):
 *   adapt       17.8  the new layers are laid over the frame
 *   restaurant  17.8  rebuild 1 (as in PR #10), "DIFFERENT BUSINESS",
 *                     "→ DIFFERENT WEBSITE." once it stands
 *   salon       24.6  rebuild 2, ×0.75
 *   dental      ~29.6 rebuild 3, ×0.62
 *   adaptEnd    end   the practice stands, nothing moves: BUSINESS
 *                     (Scene 06) starts here, from .d-status and
 *                     .d-nav__action of SiteDental
 */
export function addAdapt(tl, stage, q) {
  const metalRoot = q('.scene--site .portal__content')[0]
  const root = q('.adapt__content')[0]
  const layers = q('.adapt__layer')
  const { clipAt, contentAt } = portalGeometry(stage, q)
  const S = parseFloat(getComputedStyle(stage).getPropertyValue('--exit-scale')) || 0.75

  /* ── adapt: lay the new layers over the frame ─────────── */
  tl.addLabel('adapt', 'handoff')
    .set(q('.scene--adapt'), { autoAlpha: 1 }, 'adapt')
    .set(q('.adapt__clip'), { clipPath: clipAt(S) }, 'adapt')
    .set(root, { ...contentAt(S), transformOrigin: '0 0' }, 'adapt')
    .fromTo(
      q('.adapt__message-a'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      'adapt+=0.75',
    )

  const scoped = (layer) => gsap.utils.selector(layer)
  const contexts = q('.context__item')
  const STEPS = [
    {
      label: 'restaurant',
      from: { scope: metalRoot, root: metalRoot },
      rest: q('.scene--site .site-nav, .scene--site .site-project, .scene--site .site-details'),
      build: buildRestaurant,
      hold: 1.2,
      speed: 1,
    },
    { label: 'salon', build: buildSalon, lead: 0.4, hold: 1.0, speed: 1 / 0.75 },
    { label: 'dental', build: buildDental, lead: 0.4, hold: 2.4, speed: 1 / 0.62 },
  ]

  STEPS.forEach((step, i) => {
    const layer = layers[i]
    const prev = layers[i - 1]
    const from = step.from ?? { scope: prev, root }
    const rest = step.rest ?? prev.querySelectorAll('.adapt__site > * > *')
    const sub = rebuild({
      layer,
      from,
      rest,
      blocks: STUDIES[i].blocks,
      root,
      build: step.build(scoped(layer), q),
      lead: step.lead,
      hold: step.hold,
    })

    // Viktor's context line counts on (WEBSITE 02, 03, 04) as the new
    // ground is laid.
    const counter = sub.labels.rebuild + 0.2
    sub
      .to(contexts[i], { yPercent: -110, duration: 0.5, ease: 'power2.in' }, counter)
      .fromTo(contexts[i + 1], { autoAlpha: 1, yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'power2.out' }, counter + 0.35)

    tl.addLabel(step.label, i === 0 ? 'adapt' : '>').add(sub.timeScale(step.speed), step.label)
  })

  tl.addLabel('adaptEnd')
}
