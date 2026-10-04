import { gsap, ScrollTrigger } from './gsap.js'

/*
 * Scene 04: the client website in normal document flow.
 * One small scrubbed trigger per section, so scrolling the demo feels like
 * scrolling the client's site itself. Everything reverses with the scroll.
 */

/** The hairline from Scene 01 returns as the section divider. */
export function createRules(q) {
  q('.site-label').forEach((label) => {
    gsap.fromTo(
      label.querySelector('.site-rule'),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: label, start: 'top 88%', end: 'top 55%', scrub: 1 },
      },
    )
  })
}

/** Statement is read in word by word. */
export function createStatement(q) {
  gsap.fromTo(
    q('.site-statement__word'),
    { opacity: 0.14 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: {
        trigger: q('.site-statement__text')[0],
        start: 'top 80%',
        end: 'bottom 45%',
        scrub: 1,
      },
    },
  )
}

/**
 * Desktop: pinned split. Each next image wipes up over the previous one,
 * which settles back slightly; the list highlights the active project.
 */
export function createWorkPinned(q) {
  const items = q('.work__item')
  const figures = q('.work__figure')
  const texts = q('.work__text')

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: q('.work')[0],
      start: 'top top',
      end: () => `+=${window.innerHeight * 0.8 * (items.length - 1)}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  gsap.set(texts.slice(1), { opacity: 0.28 })

  for (let i = 1; i < items.length; i++) {
    tl.fromTo(
      figures[i],
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 },
      i - 1,
    )
      .fromTo(figures[i].firstChild, { scale: 1.12 }, { scale: 1, duration: 1.2 }, i - 1)
      .to(figures[i - 1].firstChild, { scale: 0.94, duration: 1 }, i - 1)
      .to(texts[i - 1], { opacity: 0.28, duration: 0.5 }, i - 0.75)
      .to(texts[i], { opacity: 1, duration: 0.5 }, i - 0.75)
  }
  // A short rest on the last project before the pin releases.
  tl.to({}, { duration: 0.3 })
}

/** Mobile: each card's image opens from the bottom as it scrolls in. */
export function createWorkCards(q) {
  q('.work__figure').forEach((figure) => {
    gsap.fromTo(
      figure,
      { clipPath: 'inset(18% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: figure, start: 'top 95%', end: 'top 45%', scrub: 1 },
      },
    )
  })
}

export function createIndex(q) {
  gsap.from(q('.index__row'), {
    autoAlpha: 0,
    y: 18,
    duration: 0.7,
    stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: { trigger: q('.index')[0], start: 'top 82%', toggleActions: 'play none none reverse' },
  })
}

/**
 * Pointer preview for the index (fine pointers only). The preview follows
 * the cursor with a short lag; the hovered project's image is shown.
 */
export function createIndexPreview(q) {
  const list = q('.index')[0]
  const preview = q('.index__preview')[0]
  const imgs = q('.index__preview-img')
  const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3.out' })
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3.out' })
  let active = -1

  gsap.set(preview, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.85 })

  const show = (i) => {
    if (i === active) return
    active = i
    imgs.forEach((img, j) => gsap.to(img, { autoAlpha: j === i ? 1 : 0, duration: 0.25, overwrite: true }))
  }
  const onMove = (e) => {
    const row = e.target.closest('.index__row')
    if (row) show(+row.dataset.preview)
    xTo(e.clientX)
    yTo(e.clientY)
  }
  const onEnter = (e) => {
    gsap.set(preview, { x: e.clientX, y: e.clientY })
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
  }
  const onLeave = () => {
    active = -1
    gsap.to(preview, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: 'power2.in', overwrite: 'auto' })
  }

  list.addEventListener('pointermove', onMove)
  list.addEventListener('pointerenter', onEnter)
  list.addEventListener('pointerleave', onLeave)

  return () => {
    list.removeEventListener('pointermove', onMove)
    list.removeEventListener('pointerenter', onEnter)
    list.removeEventListener('pointerleave', onLeave)
  }
}

/**
 * Contact: an ink panel grows from an inset card to full bleed, turning the
 * light site dark again. The footer wordmark rises out of its mask.
 */
export function createContact(q) {
  const panel = q('.site-contact')[0]

  gsap.fromTo(
    panel,
    { clipPath: 'inset(0% 4.4% 0% 4.4% round 14px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 25%', scrub: 1 },
    },
  )

  gsap.fromTo(
    q('.site-footer__mark'),
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: q('.site-footer')[0], start: 'top bottom', end: 'bottom bottom', scrub: 1 },
    },
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
    toggleClass: { targets: badge, className: 'is-visible' },
  })
}
