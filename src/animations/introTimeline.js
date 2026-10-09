import { gsap } from './gsap.js'

// The intro plays once per page load. If a breakpoint change rebuilds the
// animations later, the opening is already in place and stays there.
let introDone = false

/**
 * Load intro for the opening. Animates only *inner* elements, so it never
 * fights the scroll timeline, which animates their wrappers (.hero__bar,
 * .hero__copy, .hero__visual, the frame wrap and the site's clip). The fan
 * shares one element with it, on separate properties (--fan-in here,
 * --fan-out and opacity there).
 */
export function createIntroTimeline(q) {
  if (introDone) return null

  return gsap
    .timeline({ defaults: { ease: 'power3.out' }, onComplete: () => (introDone = true) })
    .from(q('.hero__brand, .hero__nav'), { autoAlpha: 0, duration: 0.8, ease: 'power1.out' }, 0.1)
    .from(q('.hero__line-inner'), { yPercent: 110, duration: 1.2, stagger: 0.09, ease: 'power4.out' }, 0.15)
    .from(q('.hero__eyebrow, .hero__sub, .hero__actions'), { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.08 }, 0.5)
    // The website appears as one object: frame and page together.
    .from(q('.frame, .portal__content'), { autoAlpha: 0, duration: 1.1, ease: 'power1.out' }, 0.45)
    // Then the two studies fan out from behind it.
    .from(q('.hero-fan__card'), { autoAlpha: 0, duration: 0.4, stagger: 0.12, ease: 'power1.out' }, 1.05)
    .from(q('.hero-fan'), { '--fan-in': 0, duration: 1.4, ease: 'expo.out' }, 1.05)
    .from(q('.hero__example, .scroll-hint__inner'), { autoAlpha: 0, duration: 0.8, ease: 'power1.out' }, 1.3)
}
