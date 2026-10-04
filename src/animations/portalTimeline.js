import { gsap } from './gsap.js'

/**
 * Scene 03: Enter the Website. Appended to the stage's master timeline, so
 * Scene 02 → 03 is one continuous pinned sequence.
 *
 * Labels (timeline seconds, continuing stageTimeline.js):
 *   resolve  9.3   inside the frame, the abstract page becomes the real site
 *   enter   10.9   the view moves into the frame until the site fills the screen
 *   arrive  13.1   short rest, then the stage unpins into Scene 04
 *
 * The site layer is laid out at full viewport size. At the start it is
 * clipped to the frame's page area and scaled down to exactly that size,
 * so its cqw grid lines up with the mock's. "Enter" interpolates clip,
 * content and frame together, which keeps all three locked to each other:
 * the browser chrome rides out of the top edge and the text ends at scale 1.
 */
export function addPortal(tl, stage, q) {
  const wrap = q('.interface__frame-wrap')[0]
  const page = q('.frame__page')[0]
  const clip = q('.portal__clip')[0]
  const content = q('.portal__content')[0]

  // The frame's page area in stage coordinates, at the frame's final scale of 1.
  // Offsets ignore transforms, so this is safe to measure mid-animation.
  const area = () => {
    const W = stage.offsetWidth
    const H = stage.offsetHeight
    const left = (W - wrap.offsetWidth) / 2 + page.offsetLeft + 1 // + frame border
    const top = (H - wrap.offsetHeight) / 2 + page.offsetTop + 1
    return { W, H, left, top, width: page.offsetWidth, height: page.offsetHeight }
  }
  const radius = () => parseFloat(getComputedStyle(q('.frame')[0]).borderRadius) - 1

  const clipFrom = () => {
    const a = area()
    const r = radius()
    return `inset(${a.top}px ${a.W - a.left - a.width}px ${a.H - a.top - a.height}px ${a.left}px round 0px 0px ${r}px ${r}px)`
  }
  // Origin-'0 0' transform that maps the frame's page area onto the full stage.
  const frameTarget = (axis) => () => {
    const a = area()
    const k = a.W / a.width
    if (axis === 'scale') return k
    const pos = axis === 'x' ? a.left : a.top
    const start = axis === 'x' ? (a.W - wrap.offsetWidth) / 2 : (a.H - wrap.offsetHeight) / 2
    return -start - k * (pos - start)
  }
  const CLIP_FULL = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)'

  /* ── resolve ──────────────────────────────────────────── */
  // "Lights on": the light page fades in over the dark mock first, then the
  // real content sets itself into the mock's grid. Keeping the two apart
  // avoids two headlines blending into each other.
  tl.addLabel('resolve', '+=0')
    .fromTo(q('.scene--site'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.inOut' }, 'resolve')
    .fromTo(
      q('.site-line__inner'),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      'resolve+=0.45',
    )
    .fromTo(
      q('.site-hero [data-reveal]'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
      'resolve+=0.5',
    )
    .fromTo(
      q('.site-hero__media'),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.7, ease: 'power1.inOut' },
      'resolve+=0.55',
    )
    .fromTo(q('.site-hero__img img'), { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, 'resolve+=0.55')

  /* ── enter ────────────────────────────────────────────── */
  const ENTER = { duration: 2.2, ease: 'power2.inOut' }

  tl.addLabel('enter', 'resolve+=1.6')
    .fromTo(clip, { clipPath: clipFrom }, { clipPath: CLIP_FULL, ...ENTER }, 'enter')
    .fromTo(
      content,
      { x: () => area().left, y: () => area().top, scale: () => area().width / area().W, transformOrigin: '0 0' },
      { x: 0, y: 0, scale: 1, ...ENTER },
      'enter',
    )
    // The frame grows with the page area, so its chrome stays attached
    // above the clip's top edge and slides out of view.
    .set(wrap, { transformOrigin: '0 0' }, 'enter')
    .to(wrap, { x: frameTarget('x'), y: frameTarget('y'), scale: frameTarget('scale'), ...ENTER }, 'enter')
    .to(q('.interface__message'), { y: () => -stage.offsetHeight * 0.22, autoAlpha: 0, duration: 1.3, ease: 'power2.in' }, 'enter')

  /* ── arrive ───────────────────────────────────────────── */
  tl.addLabel('arrive', 'enter+=2.2')
    .set(wrap, { autoAlpha: 0 }, 'arrive')
    .to({}, { duration: 0.6 }, 'arrive')
}

/**
 * Scene 04 begins: once the stage unpins, the hero scrolls away like the top
 * of any page, with the photo lagging slightly behind (parallax).
 */
export function createHeroExit(q, stageTrigger) {
  return gsap.fromTo(
    q('.site-hero__img'),
    { yPercent: 0 },
    {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        start: () => stageTrigger.end,
        end: () => stageTrigger.end + window.innerHeight,
        scrub: true,
      },
    },
  )
}
