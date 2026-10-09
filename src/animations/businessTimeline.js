import { gsap } from './gsap.js'
import { portalGeometry } from './portalTimeline.js'
import { boxIn } from './adaptTimeline.js'

const MORPH = { duration: 1.1, ease: 'power3.inOut' }
const PUSH = { duration: 0.55, ease: 'power3.inOut' }

// Percentages of a CSS object-position ("58% 40%").
const focusOf = (img) => {
  const [fx = 50, fy = 50] = getComputedStyle(img).objectPosition.split(' ').map(parseFloat)
  return [fx / 100, fy / 100]
}

/**
 * Scene 06: Business. Appended to the master timeline at `adaptEnd`, where
 * ADAPT left the practice standing in the frame at --exit-scale.
 *
 * Labels (seconds after `adaptEnd`):
 *   business    0.0   the line changes: A WEBSITE CAN DO MORE
 *   reflow      0.55  what has no place on a phone leaves first, then the
 *                     frame becomes a phone and the practice page reflows
 *                     into it, every element from its desktop position
 *   evening     1.6   DI 21:47, the site reads "closed" … THAN LOOK GOOD.
 *   request     2.6   three short steps, each pushed in from the right
 *   sent        5.75  the request in four lines
 *   morning     7.05  MI 07:30, the phone is put away, its four lines
 *                     move into the practice's entry
 *   businessEnd 9.95  the entry stands, nothing moves: RESULT
 *                     (Scene 07, resultTimeline.js) starts here
 *
 * The reflow is one FLIP: the phone layout is the real layout, each part
 * starts transformed onto its counterpart (the frame, the desktop page)
 * and moves home. Type keeps its proportions (uniform scale), fields and
 * rules stretch, photos keep their aspect while their crop changes.
 */
export function addBusiness(tl, stage, q, { isDesktop }) {
  const layer = q('.scene--business')[0]
  const device = q('.business__device')[0]
  const root = q('.adapt__content')[0]
  const page = q('.adapt__layer--dental')[0]
  const { wrap, area } = portalGeometry(stage, q)
  const S = parseFloat(getComputedStyle(stage).getPropertyValue('--exit-scale')) || 0.75

  const desk = (selector) => page.querySelector(selector)
  const phone = (selector) => device.querySelector(selector)
  const phoneAll = (selector) => [...device.querySelectorAll(selector)]

  /* ── geometry, in the device's own coordinates ────────── */

  // Box of an element of the desktop practice (scaled into the frame).
  const fromPage = (el, adjust = (r) => r) => () => {
    const a = area(S)
    const s = a.width / a.W
    const r = adjust(boxIn(el, root), el)
    return {
      x: a.left + s * r.x - device.offsetLeft,
      y: a.top + s * r.y - device.offsetTop,
      w: s * r.w,
      h: s * r.h,
    }
  }
  // Scene 02's browser frame at --exit-scale (centred, see experienceTimeline.js).
  const frame = () => ({
    x: (stage.offsetWidth - S * wrap.offsetWidth) / 2 - device.offsetLeft,
    y: (stage.offsetHeight - S * wrap.offsetHeight) / 2 - device.offsetTop,
    w: S * wrap.offsetWidth,
    h: S * wrap.offsetHeight,
  })
  const inner = () => {
    const f = frame()
    return { x: f.x + S, y: f.y + S, w: f.w - 2 * S, h: f.h - 2 * S }
  }
  const chrome = () => ({ ...inner(), h: S * q('.frame__chrome')[0].offsetHeight })
  // The URL pill is centred with `translate`, which offsets ignore.
  const url = () => {
    const el = q('.frame__url')[0]
    const c = inner()
    return {
      x: c.x + S * (el.offsetLeft - el.offsetWidth / 2),
      y: c.y + S * (el.offsetTop - el.offsetHeight / 2),
      w: S * el.offsetWidth,
      h: S * el.offsetHeight,
    }
  }
  const pageArea = () => {
    const a = area(S)
    return { x: a.left - device.offsetLeft, y: a.top - device.offsetTop, w: a.width, h: a.height }
  }
  const home = (el) => () => boxIn(el, device)

  /* ── FLIP helpers ─────────────────────────────────────── */

  const flips = []
  // Type and buttons: one scale for both axes, from the heights (both
  // sides share line-height and em paddings).
  // `anchor` (default: the element itself) is the part that has to land
  // on `start`, e.g. one label of a masked group that moves as a whole.
  // The transform that puts `el` onto `start` (RESULT reuses it).
  const uniformOnto = (el, start, by = 'h', anchor = el) => {
    const box = home(el)
    const end = home(anchor)
    const k = () => start()[by] / end()[by]
    return {
      x: () => start().x - box().x - k() * (end().x - box().x),
      y: () => start().y - box().y - k() * (end().y - box().y),
      scale: k,
      transformOrigin: '0 0',
    }
  }
  const uniform = (el, start, by, anchor) =>
    flips.push([el, uniformOnto(el, start, by, anchor), { x: 0, y: 0, scale: 1 }])
  // Grounds, bars and rules: stretched onto their counterpart.
  const stretch = (el, start) => {
    const end = home(el)
    flips.push([
      el,
      {
        x: () => start().x - end().x,
        y: () => start().y - end().y,
        scaleX: () => start().w / end().w,
        scaleY: () => start().h / end().h,
        transformOrigin: '0 0',
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1 },
    ])
  }
  // Photos: the window moves from the desktop crop to the phone crop
  // while the photo itself keeps its aspect.
  const photo = (box, deskBox) => {
    const img = box.querySelector('.pd-photo__img')
    const deskImg = deskBox.querySelector('img')
    const crop = fromPage(deskBox)
    // The desktop photo as rendered: object-fit cover at its focus.
    const shown = () => {
      const d = crop()
      const ratio = deskImg.getAttribute('width') / deskImg.getAttribute('height')
      const w = Math.max(d.w, d.h * ratio)
      const h = w / ratio
      const [fx, fy] = focusOf(deskImg)
      return { x: d.x + (d.w - w) * fx, y: d.y + (d.h - h) * fy, w, h }
    }
    const frameBox = home(box)
    const imgBox = home(img)
    flips.push([
      box,
      {
        clipPath: () => {
          const d = crop()
          const b = frameBox()
          return `inset(${d.y - b.y}px ${b.x + b.w - d.x - d.w}px ${b.y + b.h - d.y - d.h}px ${d.x - b.x}px)`
        },
      },
      { clipPath: 'inset(0px 0px 0px 0px)' },
    ])
    flips.push([
      img,
      {
        x: () => shown().x - imgBox().x,
        y: () => shown().y - imgBox().y,
        scale: () => shown().w / imgBox().w,
        transformOrigin: '0 0',
      },
      { x: 0, y: 0, scale: 1 },
    ])
  }
  // A rule along the top or bottom edge of a desktop element.
  const edge = (el, side) =>
    fromPage(el, (r) => ({ x: r.x, y: side === 'top' ? r.y : r.y + r.h - 1, w: r.w, h: 1 }))
  // The text box of a padded element.
  const content = (el) =>
    fromPage(el, (r) => {
      const cs = getComputedStyle(el)
      const [t, rt, b, l] = ['Top', 'Right', 'Bottom', 'Left'].map((side) => parseFloat(cs[`padding${side}`]))
      return { x: r.x + l, y: r.y + t, w: r.w - l - rt, h: r.h - t - b }
    })

  /* ── the device: frame → phone ────────────────────────── */

  const radius = () => device.offsetWidth * 0.09
  const frameRadius = parseFloat(getComputedStyle(q('.frame')[0]).borderRadius) || 12
  // Clip of `el` onto a rect in device coordinates.
  const clip = (el, r, rad) => {
    const x = r.x - el.offsetLeft
    const y = r.y - el.offsetTop
    return `inset(${y}px ${el.offsetWidth - x - r.w}px ${el.offsetHeight - y - r.h}px ${x}px round ${rad}px)`
  }
  const shell = phone('.device__shell')
  const screen = phone('.device__screen')
  const full = (grow) => () => ({ x: -grow, y: -grow, w: device.offsetWidth + 2 * grow, h: device.offsetHeight + 2 * grow })

  flips.push(
    [
      shell,
      { clipPath: () => clip(shell, frame(), frameRadius * S) },
      { clipPath: () => clip(shell, full(1)(), radius() + 1) },
    ],
    [
      screen,
      { clipPath: () => clip(screen, inner(), (frameRadius - 1) * S) },
      { clipPath: () => clip(screen, full(0)(), radius()) },
    ],
  )
  stretch(phone('.device__chrome'), chrome)
  uniform(phone('.device__url'), url, 'w')
  stretch(phone('.device__ground'), pageArea)
  // Shell, screen, chrome, address and ground: RESULT turns them back.
  const deviceFlips = flips.slice()

  /* ── the practice: desktop → phone ────────────────────── */

  stretch(phone('.pd-status__bg'), fromPage(desk('.d-status')))
  uniform(phone('.pd-status__swap'), fromPage(desk('.d-status__today')))
  uniform(phone('.pd-status__call'), fromPage(desk('.d-status__links > span')))
  uniform(phone('.pd-logo'), fromPage(desk('.d-nav__logo')))
  stretch(phone('.pd-nav__rule'), edge(desk('.d-nav'), 'bottom'))
  photo(phone('.pd-photo--reception'), desk('.d-reception'))
  photo(phone('.pd-photo--chair'), desk('.d-chair'))
  uniform(phone('.pd-eyebrow'), fromPage(desk('.d-eyebrow')))
  uniform(phone('.pd-title'), fromPage(desk('.d-title')))

  const deskNeeds = page.querySelectorAll('.d-need')
  phoneAll('.pd-need').forEach((need, i) => {
    const from = deskNeeds[i]
    const part = (name) => need.querySelector(`.pd-need__${name}`)
    stretch(part('rule'), edge(from, 'top'))
    uniform(part('title'), fromPage(from.querySelector('.d-need__title')))
    uniform(part('text'), fromPage(from.querySelector('.d-need__text')))
    uniform(part('go'), fromPage(from.querySelector('.d-need__go')))
  })
  stretch(phone('.pd-needs__end'), edge(deskNeeds[deskNeeds.length - 1], 'bottom'))

  // The appointment moves from the navigation into the bar at the bottom.
  stretch(phone('.pd-bar__bg'), fromPage(desk('.d-nav__action')))
  uniform(phone('.pd-bar__labels'), content(desk('.d-nav__action')), 'h', phone('.pd-bar__label'))

  /* ── business: the line changes ───────────────────────── */

  tl.addLabel('business', 'adaptEnd')
    .set(layer, { autoAlpha: 1 }, 'business')
    .to(q('.adapt__message'), { autoAlpha: 0, y: -10, duration: 0.45, ease: 'power1.in' }, 'business')
    .fromTo(
      q('.business__message-a'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      'business+=0.3',
    )

  /* ── reflow: frame → phone ────────────────────────────── */

  // What a phone has no room for leaves the desktop page first.
  tl.to(
    [...page.querySelectorAll('.d-nav__links, .d-status__emergency, .d-hours'), ...q('.frame__dot')],
    { autoAlpha: 0, duration: 0.3, ease: 'power1.in' },
    'business+=0.15',
  )

  // Hand over: the device takes the exact place of frame and page.
  tl.addLabel('reflow', 'business+=0.55')
    .set([wrap, q('.adapt__clip')[0], q('.portal__clip')[0]], { autoAlpha: 0 }, 'reflow')
    .set(device, { autoAlpha: 1 }, 'reflow')
    .set(phoneAll('.pd-page--home, .pd-bar, .pd-status__today:first-child'), { autoAlpha: 1 }, 'reflow')
    .set(phone('.pd-page--sent'), { autoAlpha: 0 }, 'reflow')
  flips.forEach(([el, from, to]) => tl.fromTo(el, from, { ...to, ...MORPH }, 'reflow'))

  // What only the phone has.
  tl.fromTo(
    phoneAll('.pd-burger, .device__clock'),
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.35, ease: 'power1.out' },
    'reflow+=0.85',
  )

  /* ── evening: 21:47, closed ───────────────────────────── */

  // Masked lines (see the CSS masks): in from below, out to the top.
  const lineIn = (targets, at) =>
    tl.fromTo(targets, { autoAlpha: 1, yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, at)
  const lineOut = (targets, at) =>
    tl.to(targets, { yPercent: -110, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, at)

  tl.addLabel('evening', 'reflow+=1.05')
  lineIn(q('.time__mark--evening .time__mask > *'), 'evening')
  tl.fromTo(
    q('.business__message-b'),
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    'evening+=0.1',
  )
  // The site itself knows the practice is closed.
  lineOut(phone('.pd-status__today'), 'evening+=0.35')
  lineIn(phone('.pd-status__today--closed'), 'evening+=0.55')

  /* ── request: three short steps ───────────────────────── */

  const pages = phoneAll('.pd-page')
  const labels = phoneAll('.pd-bar__label')
  const progress = phone('.pd-progress')
  // A tap on the bar: it darkens for a moment.
  const press = (at) =>
    tl
      .to(phone('.pd-bar__press'), { autoAlpha: 1, duration: 0.08, ease: 'none' }, at)
      .to(phone('.pd-bar__press'), { autoAlpha: 0, duration: 0.25, ease: 'power1.out' }, at + 0.08)
  const push = (i, at) => {
    tl.set(pages[i], { autoAlpha: 1 }, at)
      .fromTo(pages[i], { xPercent: 100 }, { xPercent: 0, ...PUSH }, at)
      .to(pages[i - 1], { xPercent: -100, ...PUSH }, at)
      .set(pages[i - 1], { autoAlpha: 0 }, at + PUSH.duration)
    if (i < labels.length) {
      lineOut(labels[i - 1], at)
      lineIn(labels[i], at + 0.15)
    }
  }
  const pick = (el, at) => tl.fromTo(el, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'power3.out' }, at)
  const onAccent = getComputedStyle(phone('[data-brand]')).getPropertyValue('--brand-on-accent').trim()
  const choose = (option, at) =>
    tl
      .fromTo(option.querySelector('.pd-choice__fill'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }, at)
      .to(option.querySelector('.pd-choice__label'), { color: onAccent, duration: 0.25, ease: 'power1.out' }, at)

  const step = (n) => pages[n]
  const STEP = 1.0
  const t0 = tl.labels.evening + 1.0
  tl.addLabel('request', t0)

  // The appointment bar → 1 of 3: the concern.
  press(t0)
  push(1, t0 + 0.1)
  tl.fromTo(progress, { autoAlpha: 1, scaleX: 0 }, { scaleX: 1 / 3, ...PUSH }, t0 + 0.1)
  pick(step(1).querySelector('.pd-option__dot'), t0 + 0.75)

  // → 2 of 3: new here, statutory insurance.
  const t1 = t0 + STEP
  press(t1)
  push(2, t1 + 0.1)
  tl.to(progress, { scaleX: 2 / 3, ...PUSH }, t1 + 0.1)
  const [returning, insurance] = step(2).querySelectorAll('.pd-choice')
  choose(returning.querySelectorAll('.pd-choice__option')[1], t1 + 0.75)
  choose(insurance.querySelectorAll('.pd-choice__option')[0], t1 + 0.95)

  // → 3 of 3: as early as possible, call back on this number.
  const t2 = t1 + STEP + 0.05
  press(t2)
  push(3, t2 + 0.1)
  tl.to(progress, { scaleX: 1, ...PUSH }, t2 + 0.1)
  pick(step(3).querySelector('.pd-option__dot'), t2 + 0.75)
  tl.fromTo(
    phone('.pd-field__value'),
    { clipPath: 'inset(0% 100% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: 'power2.out' },
    t2 + 0.95,
  )

  // Send: the bar leaves, the request is confirmed in four lines.
  const t3 = t2 + STEP
  press(t3)
  tl.addLabel('sent', t3 + 0.1)
  push(4, t3 + 0.1)
  tl.to(phone('.pd-bar'), { yPercent: 100, duration: 0.45, ease: 'power2.in' }, t3 + 0.15)
    .to(progress, { autoAlpha: 0, duration: 0.3 }, t3 + 0.35)
    .fromTo(
      phoneAll('.pd-sent__line, .pd-sent__text, .pd-summary__row'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
      t3 + 0.45,
    )

  /* ── morning: 07:30, the entry is there ───────────────── */

  tl.addLabel('morning', t3 + 1.4)
  lineOut(q('.time__mark--evening .time__mask > *'), 'morning')
  lineIn(q('.time__mark--morning .time__mask > *'), 'morning+=0.25')
  tl.fromTo(phone('.device__dim'), { autoAlpha: 0 }, { autoAlpha: 0.84, duration: 1.1, ease: 'power1.inOut' }, 'morning')

  // Mobile: the phone makes room for the entry.
  if (!isDesktop) {
    tl.to(device, { scale: 0.38, y: () => -layer.offsetHeight * 0.015, transformOrigin: '50% 0%', duration: 1, ease: 'power3.inOut' }, 'morning')
  }

  // The patient's four lines move out of the phone into the entry.
  const sum = phoneAll('.pd-summary__value')
  const values = q('.entry__value')
  // Each value starts on its line in the phone (before the phone moves).
  const source = (el) => () => {
    const b = boxIn(el, device)
    return { x: device.offsetLeft + b.x, y: device.offsetTop + b.y, h: b.h }
  }
  // They take off in the practice's ink and land in Viktor's light type.
  const ink = getComputedStyle(phone('[data-brand]')).getPropertyValue('--brand-ink').trim()
  const light = getComputedStyle(layer).getPropertyValue('--c-fg').trim()
  values.forEach((value, i) => {
    const from = source(sum[i])
    const to = () => boxIn(value, layer)
    const at = 0.35 + i * 0.1
    tl.fromTo(
      value,
      {
        x: () => from().x - to().x,
        y: () => from().y - to().y,
        scale: () => from().h / to().h,
        color: ink,
        transformOrigin: '0 0',
      },
      { x: 0, y: 0, scale: 1, color: light, duration: 1.0, ease: 'power3.inOut' },
      `morning+=${at}`,
    )
      .fromTo(value, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'none' }, `morning+=${at}`)
      .to(sum[i], { autoAlpha: 0, duration: 0.2, ease: 'none' }, `morning+=${at}`)
  })
  tl.fromTo(
    q('.entry__head, .entry__label'),
    { autoAlpha: 0, y: 6 },
    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
    'morning+=0.55',
  )

  /* ── handoff ──────────────────────────────────────────── */

  // The entry stands a moment before RESULT; nothing asks yet.
  tl.to({}, { duration: 0.6 }, 'morning+=1.5')
    .to({}, { duration: 0.8 })
    .addLabel('businessEnd')

  /* ── for RESULT (Scene 07) ────────────────────────────── */

  // The empty phone becomes Scene 02's browser frame again: the inverse
  // of the reflow's device part. Explicit start values: a browser may
  // shorten a computed inset() with equal sides, which would not tween.
  const toFrame = (at) =>
    deviceFlips.forEach(([el, from, to]) => tl.fromTo(el, { ...to }, { ...from, ...MORPH, immediateRender: false }, at))
  const [[, shellFrame], [, screenFrame]] = deviceFlips

  // The frame contracts onto its address, centred on the stage and `grow`
  // times its size in the frame.
  const toAddress = (at, grow, vars) => {
    const address = () => {
      const u = url()
      const w = u.w * grow
      const h = u.h * grow
      return {
        x: stage.offsetWidth / 2 - w / 2 - device.offsetLeft,
        y: stage.offsetHeight / 2 - h / 2 - device.offsetTop,
        w,
        h,
      }
    }
    const outline = () => {
      const a = address()
      return { x: a.x - 1, y: a.y - 1, w: a.w + 2, h: a.h + 2 }
    }
    tl.fromTo(shell, shellFrame, { clipPath: () => clip(shell, outline(), outline().h / 2), ...vars, immediateRender: false }, at)
      .fromTo(screen, screenFrame, { clipPath: () => clip(screen, address(), address().h / 2), ...vars, immediateRender: false }, at)
      .to(phone('.device__url'), { ...uniformOnto(phone('.device__url'), address, 'w'), ...vars }, at)
  }

  return { toFrame, toAddress }
}
