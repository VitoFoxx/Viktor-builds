import { gsap, ScrollTrigger, SplitText } from './gsap.js'

/*
 * Scene 04: the Wehrkamp Metallbau website in normal document flow.
 *
 * Builders are called in page order, so every trigger measures after the
 * pins above it. Two chapters pin on desktop (Referenz, Fertigung) plus a
 * short rest on the closing composition, which ends on the label `handoff`.
 * Everything is scrubbed or uses reversing toggleActions: scrolling back
 * plays the site backwards.
 */

const REVERSE = 'play none none reverse'
const px = (n) => `${Math.round(n)}px`

/** Clip-path that shows only `slot`'s rectangle of the full-stage element. */
const insetTo = (stage, slot) => () =>
  `inset(${px(slot.offsetTop)} ${px(stage.offsetWidth - slot.offsetLeft - slot.offsetWidth)} ${px(
    stage.offsetHeight - slot.offsetTop - slot.offsetHeight,
  )} ${px(slot.offsetLeft)})`
const CLIP_FULL = 'inset(0px 0px 0px 0px)'

/** The hairline from Scene 01 returns as the chapter divider. */
function drawRule(head) {
  if (!head) return
  gsap.fromTo(
    head.querySelector('.mb-rule'),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: head, start: 'top 92%', end: 'top 60%', scrub: 1 },
    },
  )
}

/** A photo opens upwards as it scrolls in (mobile and unpinned layouts). */
function revealPhoto(figure, start = 'top 95%') {
  gsap.fromTo(
    figure,
    { clipPath: 'inset(14% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: figure, start, end: 'top 45%', scrub: 1 },
    },
  )
}

/**
 * The fixed company header takes over from the hero navigation when the
 * stage unpins. A hairline appears once the hero has moved on.
 */
export function createHeader(q, { trigger, start }) {
  const header = q('.site-header')[0]
  // Refreshed last, after the pins further down have added their spacing.
  const shared = { trigger, end: 'max', refreshPriority: -1 }
  ScrollTrigger.create({ ...shared, start, toggleClass: { targets: header, className: 'is-visible' } })
  ScrollTrigger.create({
    ...shared,
    start: start === 'top bottom' ? 'top 85%' : start,
    toggleClass: { targets: header, className: 'is-ruled' },
  })
}

/** Rules of chapters without a pin. Pinned chapters draw their own. */
export function createRules(q) {
  drawRule(q('.mb-intro .mb-head')[0])
}

/** 01 Betrieb: the paragraph rises line by line, the facts follow. */
export function createIntro(q) {
  const text = q('.mb-intro__text')[0]

  SplitText.create(text, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 105,
        duration: 0.9,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: text, start: 'top 82%', toggleActions: REVERSE },
      }),
  })

  gsap.from(q('.mb-data__item'), {
    autoAlpha: 0,
    y: 14,
    duration: 0.6,
    stagger: 0.07,
    ease: 'power2.out',
    scrollTrigger: { trigger: q('.mb-data')[0], start: 'top 90%', toggleActions: REVERSE },
  })
}

/**
 * 02 Referenz.
 * Desktop: pinned. The overview photo opens from its grid slot to the full
 * screen, the detail photo wipes up over it, then settles into the left
 * columns while the data sheet builds up row by row on the right.
 * Mobile: photos open as they scroll in, the sheet rows set in.
 */
export function createProject(q, { isDesktop }) {
  const stage = q('.mb-project__stage')[0]
  const overview = q('.mb-project__fig--overview')[0]
  const detail = q('.mb-project__fig--detail')[0]
  const rows = q('.mb-sheet__row')

  if (!isDesktop) {
    drawRule(stage.querySelector('.mb-head'))
    revealPhoto(overview)
    revealPhoto(detail)
    gsap.from(rows, {
      autoAlpha: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: { trigger: q('.mb-sheet')[0], start: 'top 85%', toggleActions: REVERSE },
    })
    return
  }

  drawRule(stage.querySelector('.mb-head'))

  const introSlot = q('.mb-project__slot--intro')[0]
  const sheetSlot = q('.mb-project__slot--sheet')[0]
  const hidden = () => `inset(${px(stage.offsetHeight)} 0px 0px 0px)`

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.fromTo(overview, { clipPath: insetTo(stage, introSlot) }, { clipPath: CLIP_FULL, duration: 1.2 }, 0.3)
    .fromTo(overview.firstChild, { scale: 1.1 }, { scale: 1, duration: 1.6 }, 0.3)
    .to(q('.mb-project__intro'), { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power2.in' }, 0.3)

    .fromTo(detail, { clipPath: hidden }, { clipPath: CLIP_FULL, duration: 1 }, 1.9)
    .fromTo(detail.firstChild, { scale: 1.12 }, { scale: 1, duration: 1.3 }, 1.9)
    .to(overview.firstChild, { scale: 0.96, duration: 1 }, 1.9)

    .to(detail, { clipPath: insetTo(stage, sheetSlot), duration: 1 }, 3.2)
    .to(overview, { autoAlpha: 0, duration: 0.3, ease: 'none' }, 3.2)
    .fromTo(q('.mb-sheet__title'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 3.6)
    .fromTo(
      q('.mb-sheet__rule'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
      3.6,
    )
    .fromTo(
      q('.mb-sheet__row dt, .mb-sheet__row dd'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.025, ease: 'power2.out' },
      3.7,
    )
    // A short rest on the finished sheet before the pin releases.
    .to({}, { duration: 0.5 })
}

/**
 * 03 Fertigung.
 * Desktop: pinned. Each documentary photo wipes up over the previous one;
 * its caption replaces the last one line by line. The terms line at the
 * top marks where the visitor is (functional red rule, no step boxes).
 * Mobile: one photo after the other, captions set in.
 */
export function createProcess(q, { isDesktop }) {
  const stage = q('.mb-process__stage')[0]
  const figs = q('.mb-process__fig')
  const captions = q('.mb-process__caption')

  drawRule(stage.querySelector('.mb-head'))

  if (!isDesktop) {
    figs.forEach((fig) => revealPhoto(fig))
    captions.forEach((caption) =>
      gsap.from(caption.querySelectorAll('.mb-mask__inner'), {
        yPercent: 105,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: caption, start: 'top 90%', toggleActions: REVERSE },
      }),
    )
    return
  }

  const terms = q('.mb-process__term')
  const inners = captions.map((c) => c.querySelectorAll('.mb-mask__inner'))
  const STEP = 1.6
  const at = (i) => 0.3 + i * STEP

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  gsap.set(inners, { yPercent: 105 })
  gsap.set(q('.mb-process__term-rule'), { scaleX: 0 })

  tl.to(q('.mb-process__title'), { autoAlpha: 0, y: -32, duration: 0.6, ease: 'power2.in' }, at(0))

  figs.forEach((fig, i) => {
    const t = at(i)
    tl.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, t)
      .fromTo(fig.firstChild, { scale: 1.1 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, t)
      .to(inners[i], { yPercent: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, t + 0.5)
      .to(terms[i], { opacity: 1, duration: 0.3 }, t + 0.3)
      .to(terms[i].querySelector('.mb-process__term-rule'), { scaleX: 1, duration: 0.4 }, t + 0.3)

    if (i > 0) {
      tl.to(inners[i - 1], { yPercent: -105, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, t)
        .to(figs[i - 1].firstChild, { scale: 0.96, duration: 1 }, t)
        .to(terms[i - 1], { opacity: 0.4, duration: 0.3 }, t + 0.3)
        .to(terms[i - 1].querySelector('.mb-process__term-rule'), { scaleX: 0, duration: 0.3 }, t + 0.3)
    }
  })

  // Rest on the last photo before the pin releases.
  tl.to({}, { duration: 0.6 })
}

/**
 * 04 Material: each technical fact rises out of its mask, then drifts
 * left as it leaves (desktop). The macro photo opens from below.
 */
export function createSpecs(q, { isDesktop }) {
  drawRule(q('.mb-specs > .mb-head')[0])

  q('.mb-spec').forEach((spec) => {
    const value = spec.querySelector('.mb-spec__value-inner')
    const fig = spec.querySelector('.mb-spec__fig')

    gsap.fromTo(
      value,
      { yPercent: 105 },
      {
        yPercent: 0,
        ease: 'power2.out',
        scrollTrigger: { trigger: spec, start: 'top 85%', end: 'top 45%', scrub: 1 },
      },
    )

    if (isDesktop) {
      gsap.fromTo(
        value,
        { x: 0 },
        {
          x: () => -window.innerWidth * 0.04,
          ease: 'none',
          scrollTrigger: { trigger: spec, start: 'center 40%', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        },
      )
    }

    gsap.fromTo(
      fig,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power2.out',
        scrollTrigger: { trigger: fig, start: 'top 90%', end: 'top 40%', scrub: 1 },
      },
    )
    gsap.fromTo(
      fig.firstChild,
      { scale: 1.12 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom 40%', scrub: true } },
    )
  })
}

/**
 * 05 Kontakt: the company comes together in one calm composition.
 * Desktop pins it for a short rest. The returned timeline ends on the
 * label `handoff`, the starting state for Scene 05.
 */
export function createClosing(q, { isDesktop }) {
  const stage = q('.mb-closing__stage')[0]
  const fig = q('.mb-closing__fig')[0]
  const cols = q('.mb-closing__col, .site-footer')

  drawRule(stage.querySelector('.mb-head'))

  if (!isDesktop) {
    revealPhoto(fig)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: q('.mb-closing__cols')[0], start: 'top 85%', toggleActions: REVERSE },
    })
    tl.from(cols, { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08, ease: 'power2.out' }).addLabel('handoff')
    return tl
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * 0.9}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.fromTo(fig, { clipPath: 'inset(0% 6% 0% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
    .fromTo(fig.firstChild, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
    .fromTo(cols, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.4)
    .to({}, { duration: 0.6 })
    .addLabel('handoff')

  return tl
}

/** Reduced motion: no pins, no scrub. Each chapter fades in once, briefly. */
export function createReducedFades(q) {
  q('.mb-section').forEach((section) =>
    gsap.from(section, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.out',
      scrollTrigger: { trigger: section, start: 'top 85%', once: true },
    }),
  )
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
    refreshPriority: -1,
    toggleClass: { targets: badge, className: 'is-visible' },
  })
}
