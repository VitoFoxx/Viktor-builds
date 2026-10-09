/**
 * Scene 03: Enter the Website. Appended to the stage's master timeline, so
 * Scene 02 → 03 is one continuous pinned sequence.
 *
 * Labels (timeline seconds, continuing stageTimeline.js):
 *   resolve  7.6   inside the frame, the abstract page becomes the real site
 *   enter    9.2   the view moves into the frame until the site fills the screen
 *   arrive  11.4   short rest, then Scene 04 (experienceTimeline.js)
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
  const read = (v) => (typeof v === 'function' ? v() : v)

  // The frame's page area in stage coordinates, with the frame scaled by `s`
  // about its centre and moved by `dx`, `dy` (the opening places it off
  // centre). Offsets ignore transforms, so this is safe to measure
  // mid-animation.
  const area = (s = 1, dx = 0, dy = 0) => {
    const W = stage.offsetWidth
    const H = stage.offsetHeight
    const left = (W - s * wrap.offsetWidth) / 2 + dx + s * (page.offsetLeft + 1) // + frame border
    const top = (H - s * wrap.offsetHeight) / 2 + dy + s * (page.offsetTop + 1)
    return { W, H, left, top, width: s * page.offsetWidth, height: s * page.offsetHeight }
  }
  const radius = () => parseFloat(getComputedStyle(q('.frame')[0]).borderRadius) - 1

  // Clip of the site layer onto that page area. Arguments may be functions,
  // read when the tween (re)records its values.
  const clipAt =
    (s = 1, dx = 0, dy = 0) =>
    () => {
      const k = read(s)
      const a = area(k, read(dx), read(dy))
      const r = radius() * k
      return `inset(${a.top}px ${a.W - a.left - a.width}px ${a.H - a.top - a.height}px ${a.left}px round 0px 0px ${r}px ${r}px)`
    }
  // Origin-'0 0' transform of the full-size site content onto that page area.
  const contentAt = (s = 1, dx = 0, dy = 0) => {
    const at = () => area(read(s), read(dx), read(dy))
    return { x: () => at().left, y: () => at().top, scale: () => at().width / at().W }
  }

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
  // avoids two headlines blending into each other. The opening showed this
  // page finished; Scene 02 hid its content while the frame was empty
  // (stageTimeline.js), so plain `to` tweens bring it back.
  tl.addLabel('resolve', '+=0')
    .to(q('.scene--site'), { autoAlpha: 1, duration: 0.5, ease: 'power1.inOut' }, 'resolve')
    .to(q('.site-hero .site-line__inner'), { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, 'resolve+=0.45')
    .to(
      q('.site-hero [data-reveal]'),
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
      'resolve+=0.5',
    )
    .to(q('.site-hero__media'), { autoAlpha: 1, duration: 0.7, ease: 'power1.inOut' }, 'resolve+=0.55')
    .to(q('.site-hero__img .site-photo'), { scale: 1, duration: 1.2, ease: 'power2.out' }, 'resolve+=0.55')

  /* ── enter ────────────────────────────────────────────── */
  const ENTER = { duration: 2.2, ease: 'power2.inOut' }

  tl.addLabel('enter', 'resolve+=1.6')
    .fromTo(clip, { clipPath: clipAt(1) }, { clipPath: CLIP_FULL, ...ENTER, immediateRender: false }, 'enter')
    .fromTo(
      content,
      { ...contentAt(1), transformOrigin: '0 0' },
      { x: 0, y: 0, scale: 1, ...ENTER, immediateRender: false },
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

