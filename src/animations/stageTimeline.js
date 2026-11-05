import { gsap } from './gsap.js'
import { along } from './along.js'
import { addStudy } from './studyTimeline.js'
import { addAdapt } from './adaptTimeline.js'
import { addBusiness } from './businessTimeline.js'

// Keep in sync with the media queries in the scene CSS.
export const MEDIA = {
  isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  isMobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

/**
 * The story in the page's own flow. Every scene is an ordinary section:
 * scrolling down, what is on screen moves up and leaves at the top, the
 * next scene comes up from below. Nothing is pinned by script; the one
 * moment that holds still is BUSINESS, with CSS `position: sticky`.
 *
 * Motion is bound to where an element is on its way through the screen,
 * never to a clock: each part builds itself as it comes in from below
 * (scrubbed ScrollTriggers, see `along`), so scrolling back plays every
 * step backwards, and resting means nothing moves.
 *
 *   Scene 01  the opening scrolls away, its copy a little faster than
 *             the website (depth), the fan opens slightly
 *   02 – 04   studyTimeline.js: the plan builds, the real website takes
 *             its place, the visitor scrolls through it in its frame
 *   05        adaptTimeline.js: three websites, each built in its order
 *   06        businessTimeline.js: the phone holds while the request is made
 *   07        revealTimeline.js (SceneResult.jsx)
 */
export function createStage(q, { isDesktop }) {
  addHero(q)
  addStudy(q, { isDesktop })
  addAdapt(q)
  addBusiness(q, { isDesktop })
}

/* ── Scene 01: the opening ────────────────────────────────── */

function addHero(q) {
  const hero = q('.scene--void')[0]
  // While the opening leaves, its parts move at slightly different
  // speeds: the copy goes first, the website follows.
  along(hero, 'top top', 'bottom top', true)
    .to(q('.scroll-hint'), { autoAlpha: 0, y: -24, duration: 0.12 }, 0)
    .to(q('.hero__copy'), { y: () => -window.innerHeight * 0.14, duration: 1 }, 0)
    .to(q('.hero__showcase'), { y: () => window.innerHeight * 0.06, duration: 1 }, 0)
    .to(q('.hero-fan'), { '--fan-out': 0.35, duration: 0.8 }, 0)
}

/**
 * Reduced motion: the same sections, still. Only a short fade as they
 * come into view.
 */
export function createReducedMotion(q) {
  const fadeIn = (targets, trigger) =>
    gsap.from(targets, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.out',
      scrollTrigger: { trigger, start: 'top 75%', once: true },
    })

  fadeIn(q('.scene--interface > *'), q('.scene--interface')[0])
  fadeIn(q('.scene--adapt > *'), q('.scene--adapt')[0])
  fadeIn(q('.scene--business > *'), q('.scene--business')[0])
}
