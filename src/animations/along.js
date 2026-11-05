import { gsap } from './gsap.js'

// Shared by the scenes' scroll motion (stageTimeline.js).

// A little softening, so a mouse wheel's steps don't read as jumps; the
// position still drives everything.
export const SCRUB = 0.4

/** A timeline scrubbed along a trigger's way through the screen. */
export const along = (trigger, start, end, scrub = SCRUB, extra = {}) =>
  gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger, start, end, scrub, ...extra } })

/** A line of type rises out of its mask: [from, to] for fromTo(). */
export const rise = (vars = {}) => [{ yPercent: 110 }, { yPercent: 0, ease: 'power2.out', ...vars }]

/** A block comes up a short way and becomes visible: [from, to]. */
export const comeUp = (vars = {}, y = 36) => [
  { autoAlpha: 0, y },
  { autoAlpha: 1, y: 0, ease: 'power2.out', ...vars },
]

/**
 * A headline over a scene comes up with its section: its parts one after
 * the other while it travels from the bottom edge into the screen.
 */
export function addHeadline(parts, trigger) {
  const tl = along(trigger, 'top 96%', 'top 62%')
  parts.forEach((part, i) => tl.fromTo(part, ...comeUp(), i * 0.35))
  return tl
}
