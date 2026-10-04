import { gsap, ScrollTrigger } from './gsap.js'

/*
 * Scene 04: the VANTA website below the pinned stage, in normal document
 * flow. Each chapter is one scrubbed timeline (pinned where it needs the
 * full screen), so everything reverses exactly with the scroll.
 */

const vh = () => window.innerHeight

/**
 * Desktop: one pinned frame. The next chapter cuts in from the right like a
 * film edit, the previous image drifts left and dims, the caption rises.
 */
export function createDetails(q) {
  const frame = q('.details__frame')[0]
  const figures = q('.detail__figure')
  const imgs = q('.detail__img')
  const shades = q('.detail__shade')
  const captions = q('.detail__caption')
  const index = q('.details__index-item')
  const n = figures.length

  // The first image settles while the section scrolls into view.
  gsap.fromTo(
    imgs[0],
    { scale: 1.08 },
    { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'top top', scrub: true } },
  )

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: frame,
      start: 'top top',
      end: () => `+=${vh() * (1.1 * (n - 1) + 0.4)}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.fromTo(q('.details__progress-bar'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: n - 0.4 }, 0)

  for (let i = 1; i < n; i++) {
    const t = i - 1 + 0.2
    tl.fromTo(figures[i], { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 }, t)
      .fromTo(imgs[i], { xPercent: 8, scale: 1.06 }, { xPercent: 0, scale: 1, duration: 1.1, ease: 'power2.out' }, t)
      .to(imgs[i - 1], { xPercent: -6, duration: 0.9 }, t)
      .fromTo(shades[i - 1], { opacity: 0 }, { opacity: 0.6, duration: 0.9 }, t)
      // The outgoing caption clears before the incoming one rises.
      .to(captions[i - 1], { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, t)
      .fromTo(
        captions[i].querySelectorAll('.site-line__inner'),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
        t + 0.45,
      )
      .to(index[i - 1], { opacity: 0.38, duration: 0.3 }, t + 0.4)
      .fromTo(index[i], { opacity: 0.38 }, { opacity: 1, duration: 0.3 }, t + 0.4)
  }
  tl.to({}, { duration: 0.4 })
  return tl
}

/** Mobile: stacked chapters; each image opens from the bottom as it scrolls in. */
export function createDetailCards(q) {
  q('.detail__figure').forEach((figure) => {
    const scrollTrigger = { trigger: figure, start: 'top 95%', end: 'top 35%', scrub: 1 }
    gsap.fromTo(figure, { clipPath: 'inset(16% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger })
    gsap.fromTo(figure.querySelector('.detail__img'), { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger })
  })
}

/**
 * Performance: each figure appears large at the centre, its digits roll to
 * their value like a mechanical counter, then it settles into the spec row
 * (its static position). A marker travels the measuring line meanwhile.
 *
 * All positions are offsets inside the frame (they ignore transforms), so
 * they stay valid on refresh mid-animation.
 */
export function createPerformance(q, { isDesktop }) {
  const frame = q('.performance__frame')[0]
  const rule = q('.performance__rule')[0]
  const figures = q('.figure')
  const STEP = isDesktop ? 1.7 : 1.2
  const total = 0.5 + figures.length * STEP + 0.4

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: frame,
      start: 'top top',
      end: () => `+=${vh() * (isDesktop ? 3 : 2.4)}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0).fromTo(
    q('.performance__marker'),
    { x: 0 },
    { x: () => rule.offsetWidth, ease: 'none', duration: total },
    0,
  )

  figures.forEach((figure, i) => {
    const digits = figure.querySelector('.figure__digits')
    const scale = () =>
      Math.min(isDesktop ? 2 : 1.45, (frame.clientWidth * 0.86) / digits.offsetWidth, (frame.clientHeight * 0.42) / digits.offsetHeight)
    // Desktop: origin-'0 0' transform that centres the digits in the frame.
    // Mobile: the figures are stacked through the middle of the screen, so
    // each one rolls in at its own place instead.
    const centre = isDesktop
      ? {
          x: () => frame.clientWidth / 2 - (scale() * digits.offsetWidth) / 2 - digits.offsetLeft,
          y: () => frame.clientHeight * 0.5 - (scale() * digits.offsetHeight) / 2 - digits.offsetTop,
          scale,
        }
      : { x: 0, y: 0, scale: 1 }
    const t = 0.5 + i * STEP

    tl.fromTo(
      digits,
      { autoAlpha: 0, transformOrigin: '0 0', ...centre },
      { autoAlpha: 1, ...centre, duration: 0.25, ease: 'none' },
      t,
    )
      .fromTo(
        figure.querySelectorAll('.figure__reel'),
        { y: 0, yPercent: 0 },
        {
          yPercent: (_, reel) => -(10 + Number(reel.dataset.value)) * 5,
          duration: 1,
          stagger: { each: 0.12, from: 'end' },
          ease: 'power3.out',
        },
        t,
      )
      .to(digits, { x: 0, y: 0, scale: 1, duration: 0.8 }, t + 1.1)
      .fromTo(
        figure.querySelector('.figure__label'),
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        isDesktop ? t + 1.5 : t + 0.6,
      )
  })
  tl.to({}, { duration: 0.4 })
  return tl
}

/**
 * VANTA / 001: the studio lights come on bank by bank, the title rises,
 * then the specs and links draw in. Desktop pins the whole composed screen;
 * mobile pins only the stage and lets the specs follow in flow.
 *
 * Scene 05 hand-off: the returned timeline ends on the label `handoff`.
 * Scene 05 continues by appending to this timeline (extending the same pin,
 * as Scene 03 extends the stage), so there is no unpin/re-pin cut.
 */
export function createProduct(q, { isDesktop }) {
  const section = q('.product')[0]
  const stage = q('.product__stage')[0]
  const body = [
    ...q('.product__intro'),
    ...q('.product__spec dt, .product__spec dd'),
    ...q('.product__link-num, .product__link-label, .product__link-arrow'),
  ]
  const rules = q('.product__body .product__rule')

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: isDesktop ? section : stage,
      start: 'top top',
      end: () => `+=${vh() * (isDesktop ? 2 : 1.4)}`,
      pin: true,
      // The mobile stage sits in a flex column, where ScrollTrigger would
      // otherwise skip the spacing.
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.fromTo(
    q('.product__title .site-line__inner'),
    { yPercent: 110 },
    { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
    0,
  )
    .fromTo(q('.product__light'), { opacity: 1 }, { opacity: 0, duration: 0.3, stagger: 0.5, ease: 'power2.out' }, 0.3)
    .fromTo(q('.product__img'), { scale: 1.06 }, { scale: 1, duration: 2, ease: 'none' }, 0.3)

  const reveal = (target, at) =>
    target
      .fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.04 }, at)
      .fromTo(body, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out' }, at + 0.2)

  if (isDesktop) {
    reveal(tl, 1.9)
  } else {
    // Mobile: the specs scroll in below the pinned stage.
    reveal(
      gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: q('.product__body')[0], start: 'top 85%', toggleActions: 'play none none reverse' },
      }),
      0,
    )
  }

  tl.to({}, { duration: 0.8 }).addLabel('handoff')
  return tl
}

/** Reduced motion: no pins, no scrub. Each chapter only fades in once. */
export function createReducedFades(q) {
  q('.details, .performance, .product').forEach((section) => {
    gsap.from(section, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.out',
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
    })
  })
}

/**
 * The demo badge is visible while the client site is on screen, until the
 * footer, which says the same thing in its own words.
 */
export function createDemoBadge({ trigger, start }) {
  const badge = document.querySelector('.demo-badge')
  if (!badge) return
  ScrollTrigger.create({
    trigger,
    start,
    endTrigger: '.site-footer',
    end: 'top 92%',
    toggleClass: { targets: badge, className: 'is-visible' },
  })
}
