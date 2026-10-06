import { portalGeometry } from './portalTimeline.js'

/**
 * Scene 04: Experience. Appended to the stage's master timeline after
 * Scene 03 (`arrive`), so the design study is never more than a layer of
 * Viktor's stage.
 *
 * Labels (timeline seconds, continuing portalTimeline.js):
 *   demo     13.7  the visitor "scrolls" through the study
 *   exit     16.2  (mobile 17.5) the study shrinks back into the frame,
 *                  chrome and stage return
 *   handoff  17.8  (mobile 19.1) no rest: ADAPT (Scene 05, adaptTimeline.js)
 *                  starts here
 *
 * The page inside moves linearly, about as fast as the visitor's own scroll
 * on mobile, so it reads like scrolling, not like a fly-through. Mobile gets
 * more time because its page is taller relative to the screen and its pace
 * (vh per second) is lower.
 *
 * The exit is the inverse of `enter`, aimed at a centred frame scaled to
 * --exit-scale instead of 1. Clip, content and frame stay coupled.
 */
export function addExperience(tl, stage, q, { isDesktop }) {
  const clip = q('.portal__clip')[0]
  const content = q('.portal__content')[0]
  const demo = q('.site-demo')[0]
  const { wrap, clipAt, contentAt } = portalGeometry(stage, q)

  // Shared with the CSS (IntroStage.css), which sizes the frame.
  const S = parseFloat(getComputedStyle(stage).getPropertyValue('--exit-scale')) || 0.75
  const pageEnd = () => -Math.max(0, demo.offsetHeight - stage.offsetHeight)
  // Page movement and when its rows come into view, as fractions of it.
  const T = isDesktop
    ? { scroll: 2.1, caption: 0.62, details: 0.68, stagger: 0.12 }
    : { scroll: 3.4, caption: 0.44, details: 0.52, stagger: 0.42 }
  const at = (fraction) => `demo+=${(fraction * T.scroll).toFixed(2)}`
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
    .to(demo, { y: pageEnd, duration: T.scroll, ease: 'none' }, 'demo')
    // The hero photo lags behind as the hero leaves the screen.
    .to(q('.site-hero__img'), { yPercent: 12, duration: T.scroll * 0.45, ease: 'none' }, 'demo')
    .fromTo(
      q('.site-project__img'),
      { scale: 1.08 },
      { scale: 1, duration: T.scroll * 0.6, ease: 'power2.out' },
      at(0.1),
    )
  rise(q('.site-project__caption .site-line__inner'), at(T.caption), 0.08)
  rise(q('.site-details .site-line__inner'), at(T.details), T.stagger)

  /* ── exit ─────────────────────────────────────────────── */
  const EXIT = { duration: 1.6, ease: 'power2.inOut' }

  // A short hold on the last row before the page leaves.
  tl.addLabel('exit', `demo+=${T.scroll + 0.4}`)
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
