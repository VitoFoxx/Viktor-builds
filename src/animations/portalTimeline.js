/**
 * Scene 03: Enter the Website. Appended to the stage's master timeline, so
 * Scene 02 → 03 is one continuous pinned sequence.
 *
 * Labels (timeline seconds, continuing stageTimeline.js):
 *   resolve  9.3   inside the frame, the abstract page becomes the real site
 *   enter   10.9   the view moves into the frame until the site fills the screen
 *   arrive  13.1   short rest, then Scene 04 (experienceTimeline.js)
 *
 * The site layer is laid out at full viewport size. At the start it is
 * clipped to the frame's page area and scaled down to exactly that size,
 * so its cqw grid lines up with the mock's. "Enter" interpolates clip,
 * content and frame together, which keeps all three locked to each other:
 * the browser chrome rides out of the top edge and the text ends at scale 1.
 */
export function portalGeometry(stage, q) {
  const wrap = q('.interface__frame-wrap')[0]
  const page = q('.frame__page')[0]

  // The frame's page area in stage coordinates, with the frame scaled by `s`
  // about its centre. Offsets ignore transforms, so this is safe to measure
  // mid-animation.
  const area = (s = 1) => {
    const W = stage.offsetWidth
    const H = stage.offsetHeight
    const left = (W - s * wrap.offsetWidth) / 2 + s * (page.offsetLeft + 1) // + frame border
    const top = (H - s * wrap.offsetHeight) / 2 + s * (page.offsetTop + 1)
    return { W, H, left, top, width: s * page.offsetWidth, height: s * page.offsetHeight }
  }
  const radius = () => parseFloat(getComputedStyle(q('.frame')[0]).borderRadius) - 1

  // Clip of the site layer onto that page area.
  const clipAt = (s = 1) => () => {
    const a = area(s)
    const r = radius() * s
    return `inset(${a.top}px ${a.W - a.left - a.width}px ${a.H - a.top - a.height}px ${a.left}px round 0px 0px ${r}px ${r}px)`
  }
  // Origin-'0 0' transform of the full-size site content onto that page area.
  const contentAt = (s = 1) => ({
    x: () => area(s).left,
    y: () => area(s).top,
    scale: () => area(s).width / area(s).W,
  })

  return { wrap, area, clipAt, contentAt }
}

export function addPortal(tl, stage, q) {
  const clip = q('.portal__clip')[0]
  const content = q('.portal__content')[0]
  const { wrap, area, clipAt, contentAt } = portalGeometry(stage, q)

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
      q('.site-hero .site-line__inner'),
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
    .fromTo(q('.site-hero__img .site-photo'), { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, 'resolve+=0.55')

  /* ── enter ────────────────────────────────────────────── */
  const ENTER = { duration: 2.2, ease: 'power2.inOut' }

  tl.addLabel('enter', 'resolve+=1.6')
    .fromTo(clip, { clipPath: clipAt(1) }, { clipPath: CLIP_FULL, ...ENTER }, 'enter')
    .fromTo(
      content,
      { ...contentAt(1), transformOrigin: '0 0' },
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

