import { portalGeometry } from './portalTimeline.js'

/**
 * Scene 04: Experience. Appended to the stage's master timeline after
 * Scene 03 (`arrive`), so the demo website is never more than a layer of
 * Viktor's stage.
 *
 * Labels (timeline seconds, continuing portalTimeline.js):
 *   demo       13.7  the visitor "scrolls" through the demo site
 *   exit       17.1  the site shrinks back into the frame, chrome and stage return
 *   statement  18.6  SAME PRINCIPLES. DIFFERENT BUSINESS. + caption
 *   handoff    20.2  rest; the starting state for Scene 05 (ADAPT)
 *
 * The exit is the inverse of `enter`, aimed at a centred frame scaled to
 * --exit-scale instead of 1. Clip, content and frame stay coupled.
 */
export function addExperience(tl, stage, q) {
  const clip = q('.portal__clip')[0]
  const content = q('.portal__content')[0]
  const demo = q('.site-demo')[0]
  const { wrap, clipAt, contentAt } = portalGeometry(stage, q)

  // Shared with the CSS that places statement and caption around the frame.
  const S = parseFloat(getComputedStyle(stage).getPropertyValue('--exit-scale')) || 0.72
  const pageEnd = () => -Math.max(0, demo.offsetHeight - stage.offsetHeight)
  const rise = (targets, at, stagger = 0.1) =>
    tl.fromTo(targets, { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger, ease: 'power3.out' }, at)

  /* ── context line: Viktor's mark while inside the demo ─── */
  tl.fromTo(
    q('.experience__context'),
    { autoAlpha: 0 },
    { autoAlpha: 0.7, duration: 0.5, ease: 'power1.out' },
    'arrive',
  )

  /* ── demo ─────────────────────────────────────────────── */
  tl.addLabel('demo', 'arrive+=0.6')
    .to(demo, { y: pageEnd, duration: 2.8, ease: 'power1.inOut' }, 'demo')
    // The hero photo lags behind as the hero leaves the screen.
    .to(q('.site-hero__img'), { yPercent: 12, duration: 1.0, ease: 'none' }, 'demo')
    .fromTo(q('.site-project__img'), { scale: 1.1 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 'demo+=0.3')
  rise(q('.site-project__caption .site-line__inner'), 'demo+=0.9', 0.08)
  rise(q('.site-details .site-line__inner'), 'demo+=1.6', 0.15)
  rise(q('.site-cta .site-line__inner'), 'demo+=2.1', 0.12)

  /* ── exit ─────────────────────────────────────────────── */
  const EXIT = { duration: 2.0, ease: 'power2.inOut' }

  tl.addLabel('exit', 'demo+=3.4')
    .to(q('.experience__context'), { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 'exit')
    // Back to the top of the page while it recedes into the frame.
    .to(demo, { y: 0, duration: 1.6, ease: 'power2.inOut' }, 'exit')
    .to(q('.site-hero__img'), { yPercent: 0, duration: 1.6, ease: 'power2.inOut' }, 'exit')
    .set(wrap, { autoAlpha: 1 }, 'exit')
    .to(clip, { clipPath: clipAt(S), ...EXIT }, 'exit')
    .to(content, { ...contentAt(S), ...EXIT }, 'exit')
    .to(
      wrap,
      {
        x: () => (wrap.offsetWidth * (1 - S)) / 2,
        y: () => (wrap.offsetHeight * (1 - S)) / 2,
        scale: S,
        ...EXIT,
      },
      'exit',
    )

  /* ── statement ────────────────────────────────────────── */
  tl.addLabel('statement', 'exit+=1.5')
  rise(q('.experience__line'), 'statement', 0.15)
  tl.fromTo(
    q('.experience__caption'),
    { autoAlpha: 0, y: 8 },
    { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    'statement+=0.35',
  )

  /* ── handoff ──────────────────────────────────────────── */
  tl.to({}, { duration: 0.6 }).addLabel('handoff')
}
