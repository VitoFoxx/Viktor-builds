import { gsap } from './gsap.js'
import { addPortal } from './portalTimeline.js'
import { addExperience } from './experienceTimeline.js'
import { addAdapt } from './adaptTimeline.js'

// Keep in sync with the media queries in IntroStage.css / BrowserFrame.css.
export const MEDIA = {
  isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  isMobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

// Scroll pace of the stage, in viewport heights per timeline second. These are
// the Phase 1 values (4 / 3 viewports for 9.9 s), so Scene 01 and 02 keep the
// exact feel they had; Scene 03 – 05 simply add distance at the same pace.
const PACE = { desktop: 4 / 9.9, mobile: 3 / 9.9 }

const FRAME_CLOSED = 'inset(50% 0% 50% 0% round 12px)'
const FRAME_OPEN = 'inset(0% 0% 0% 0% round 12px)'

/**
 * One pinned stage, one scrubbed master timeline for Scene 01 → 02 → 03 → 04 → 05.
 *
 * Labels (timeline seconds, mapped linearly onto the pinned scroll distance):
 *   void        0.0  type opens up, hint and tagline leave
 *   impulse     1.2  a point of light appears and stretches into a line
 *   frame       3.0  the line splits into the frame's edges, the frame opens
 *   build       4.2  the website assembles itself inside the frame
 *   experience  7.8  the message completes, the frame settles
 *   resolve …   9.3  Scene 03, see portalTimeline.js
 *   demo …     13.7  Scene 04, see experienceTimeline.js
 *   adapt …    17.8  Scene 05, see adaptTimeline.js
 */
export function createStageTimeline(stage, q, { isDesktop, onUpdate }) {
  const wrap = q('.interface__frame-wrap')[0]
  const halfFrame = () => wrap.offsetHeight / 2

  // Desktop: the two words part sideways. Mobile: they are stacked and part vertically.
  const part = (dir) =>
    isDesktop
      ? { x: () => dir * window.innerWidth * 0.08 }
      : { y: () => dir * window.innerHeight * 0.12 }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * (isDesktop ? PACE.desktop : PACE.mobile) * tl.duration()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate,
    },
  })

  /* ── void ─────────────────────────────────────────────── */
  tl.addLabel('void', 0)
    .to(q('.scroll-hint'), { autoAlpha: 0, y: 12, duration: 0.4, ease: 'power1.in' }, 'void')
    .to(q('.void__tagline'), { autoAlpha: 0, y: -24, duration: 0.8 }, 'void+=0.1')
    .to(q('.void__word--a'), { ...part(-1), scale: isDesktop ? 0.78 : 0.9, duration: 1.8 }, 'void')
    .to(q('.void__word--b'), { ...part(1), scale: isDesktop ? 0.78 : 0.9, duration: 1.8 }, 'void')

  /* ── impulse ──────────────────────────────────────────── */
  tl.addLabel('impulse', 1.2)
    .fromTo(
      q('.impulse__dot'),
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
      'impulse',
    )
    .to(q('.void__word'), { autoAlpha: 0, duration: 0.9, ease: 'power1.inOut' }, 'impulse+=0.5')
    .fromTo(
      q('.impulse__line'),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },
      'impulse+=0.7',
    )
    .to(q('.impulse__dot'), { autoAlpha: 0, scale: 0.4, duration: 0.4 }, 'impulse+=1.3')
    .fromTo(
      q('.interface__message-a'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      'impulse+=0.9',
    )

  /* ── frame ────────────────────────────────────────────── */
  tl.addLabel('frame', 3.0)
    .fromTo(wrap, { scale: 0.92 }, { scale: 1, duration: 5.2, ease: 'power1.inOut' }, 'frame')
    .fromTo(
      q('.frame'),
      { clipPath: FRAME_CLOSED },
      { clipPath: FRAME_OPEN, duration: 1.2, ease: 'power3.inOut' },
      'frame',
    )
    .to(q('.impulse__line--top'), { y: () => -halfFrame(), duration: 1.2, ease: 'power3.inOut' }, 'frame')
    .to(q('.impulse__line--bottom'), { y: () => halfFrame(), duration: 1.2, ease: 'power3.inOut' }, 'frame')
    .to(q('.impulse__line'), { autoAlpha: 0, duration: 0.5, ease: 'power1.out' }, 'frame+=1.0')
    .fromTo(
      q('.frame__dot, .frame__url'),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: 'power1.out' },
      'frame+=0.9',
    )

  /* ── build ────────────────────────────────────────────── */
  tl.addLabel('build', 4.2)
    .fromTo(
      q('.mock-nav__mark, .mock-bar--logo, .mock-nav__link, .mock-nav__burger'),
      { autoAlpha: 0, y: -6 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
      'build',
    )
    .fromTo(
      q('.mock-bar--eyebrow'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power2.out' },
      'build+=0.4',
    )
    .fromTo(
      q('.mock-line__inner'),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out' },
      'build+=0.5',
    )
    .fromTo(
      q('.mock-bar--text'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      'build+=1.0',
    )
    .fromTo(
      q('.mock-hero__media'),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' },
      'build+=1.1',
    )
    .fromTo(
      q('.mock-hero__media-inner'),
      { scale: 1.2 },
      { scale: 1, duration: 1.6, ease: 'power2.out' },
      'build+=1.1',
    )
    .fromTo(
      q('.mock-btn'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      'build+=1.8',
    )
    .fromTo(
      q('.mock-col__rule'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, stagger: 0.12, ease: 'power2.inOut' },
      'build+=2.3',
    )
    .fromTo(
      q('.mock-bar--col-title, .mock-bar--col-text'),
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      'build+=2.6',
    )

  /* ── experience ───────────────────────────────────────── */
  tl.addLabel('experience', 7.8)
    .fromTo(
      q('.interface__message-b'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      'experience',
    )
    // Hold the finished interface for a moment before Scene 03 begins.
    .to({}, { duration: 0.8 })

  addPortal(tl, stage, q)
  addExperience(tl, stage, q, { isDesktop })
  addAdapt(tl, stage, q, { isDesktop })

  return tl
}

/**
 * Reduced motion: no pin, no scrub. Every scene is a static section in its
 * final state (see CSS); Scene 02 and the framed study only fade in briefly.
 */
export function createReducedMotion(q) {
  const fadeIn = (targets, trigger) =>
    gsap.from(targets, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.out',
      scrollTrigger: { trigger, start: 'top 75%', once: true },
    })

  fadeIn(q('.interface__stack'), q('.scene--interface')[0])
  fadeIn(q('.scene--site > *'), q('.scene--site')[0])
  fadeIn(q('.scene--adapt > *'), q('.scene--adapt')[0])
}
