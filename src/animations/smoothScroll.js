import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap.js'
import { setScroller } from './scrollTo.js'

/**
 * Smooth wheel scrolling on desktop (mouse or trackpad). A mouse wheel
 * scrolls in steps of about 100 px; through a scrubbed story those steps
 * read as a stutter. Lenis eases the page between them, driven by GSAP's
 * ticker, so the stage and the scroll move on the same frame. Touch keeps
 * the browser's own scrolling, and so does reduced motion (IntroStage.jsx
 * starts this only with pointer: fine and no-preference).
 *
 * Returns the cleanup.
 */
export function startSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, autoRaf: false })
  const tick = (time) => lenis.raf(time * 1000)

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  setScroller(lenis)

  return () => {
    setScroller(null)
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}
