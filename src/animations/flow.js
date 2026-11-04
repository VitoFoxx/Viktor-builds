/**
 * The story flows with the scroll. Scrolling down, everything that arrives
 * comes up from below and everything that leaves goes on upwards, so the
 * visitor feels the page moving under their hand and wants to go on.
 * Nothing simply appears in place.
 *
 * Distances in px, a little shorter on phones. Functions, so GSAP reads
 * them again after a resize.
 */
const scaled = (px) => () => (window.innerWidth < 768 ? px * 0.65 : px)

// Lines over the stage (Scene 02, 05, 06 headlines, the closing claim).
export const LINE_IN = scaled(72)
export const LINE_OUT = () => -LINE_IN()
// Elements inside a website (in the frame or on the phone).
export const PART_IN = scaled(28)
export const PART_OUT = () => -PART_IN()

// The usual arrival of a part: from below, fading in.
export const fromBelow = (distance = PART_IN) => ({ autoAlpha: 0, y: distance })
export const settled = { autoAlpha: 1, y: 0 }
