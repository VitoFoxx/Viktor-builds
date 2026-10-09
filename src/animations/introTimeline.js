import { gsap } from './gsap.js'

// The intro plays once per page load. If a breakpoint change rebuilds the
// animations later, the typography is already in place and stays there.
let introDone = false

/**
 * Load intro for Scene 01. Animates only the *inner* elements, so it never
 * fights the scroll timeline, which animates their outer wrappers.
 */
export function createIntroTimeline(q) {
  if (introDone) return null

  return gsap
    .timeline({ defaults: { ease: 'power4.out' }, onComplete: () => (introDone = true) })
    .from(q('.void__word-inner'), { yPercent: 110, duration: 1.25, stagger: 0.09 }, 0.15)
    .from(q('.void__tagline-inner'), { autoAlpha: 0, y: 14, duration: 0.9, ease: 'power3.out' }, 0.75)
    .from(q('.void__lead'), { autoAlpha: 0, y: 14, duration: 0.9, ease: 'power3.out' }, 1.0)
    .from(q('.scroll-hint__inner'), { autoAlpha: 0, duration: 0.8, ease: 'power1.out' }, 1.15)
}
