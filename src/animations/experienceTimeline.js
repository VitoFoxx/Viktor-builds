import { portalGeometry } from './portalTimeline.js'

/**
 * Scene 04: Experience. Appended to the stage's master timeline after
 * Scene 03 (`arrive`), so the design study is never more than a layer of
 * Viktor's stage.
 *
 * Labels (timeline seconds, continuing portalTimeline.js):
 *   demo     13.7  one screen's worth of "scrolling" through the study
 *   exit     16.2  the study shrinks back into the frame, chrome and stage return
 *   handoff  17.8  no rest: ADAPT (Scene 05) starts here
 *
 * The exit is the inverse of `enter`, aimed at a centred frame scaled to
 * --exit-scale instead of 1. Clip, content and frame stay coupled.
 */
export function addExperience(tl, stage, q) {
  const clip = q('.portal__clip')[0]
  const content = q('.portal__content')[0]
  const demo = q('.site-demo')[0]
  const { wrap, clipAt, contentAt } = portalGeometry(stage, q)

  // Shared with the CSS (IntroStage.css), which sizes the frame.
  const S = parseFloat(getComputedStyle(stage).getPropertyValue('--exit-scale')) || 0.75
  const pageEnd = () => -Math.max(0, demo.offsetHeight - stage.offsetHeight)
  const rise = (targets, at, stagger) =>
    tl.fromTo(targets, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger, ease: 'power3.out' }, at)

  /* ── context line: Viktor's mark from Scene 03 on ─────── */
  // Appears as the camera moves into the frame and stays: ADAPT will
  // count it on (WEBSITE 02 …).
  tl.fromTo(
    q('.experience__context'),
    { autoAlpha: 0 },
    { autoAlpha: 0.75, duration: 0.6, ease: 'power1.out' },
    'enter+=0.4',
  )

  /* ── demo ─────────────────────────────────────────────── */
  tl.addLabel('demo', 'arrive+=0.6')
    .to(demo, { y: pageEnd, duration: 2.1, ease: 'power1.inOut' }, 'demo')
    // The hero photo lags behind as the hero leaves the screen.
    .to(q('.site-hero__img'), { yPercent: 12, duration: 0.9, ease: 'none' }, 'demo')
    .fromTo(q('.site-project__img'), { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, 'demo+=0.2')
  rise(q('.site-project__caption .site-line__inner'), 'demo+=0.7', 0.08)
  rise(q('.site-details .site-line__inner'), 'demo+=1.3', 0.12)

  /* ── exit ─────────────────────────────────────────────── */
  const EXIT = { duration: 1.6, ease: 'power2.inOut' }

  tl.addLabel('exit', 'demo+=2.5')
    // Back to the top of the page while it recedes into the frame.
    .to(demo, { y: 0, duration: 1.3, ease: 'power2.inOut' }, 'exit')
    .to(q('.site-hero__img'), { yPercent: 0, duration: 1.3, ease: 'power2.inOut' }, 'exit')
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

  /* ── handoff ──────────────────────────────────────────── */
  tl.addLabel('handoff', 'exit+=1.6')
}
