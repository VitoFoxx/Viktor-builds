import { gsap } from './gsap.js'
import { along, addHeadline, rise, comeUp } from './along.js'

// The parts of a page arrive in these few ways, all in the scroll's
// direction: photos open from their lower edge, type rises.
const wipe = (vars = {}) => [
  { clipPath: 'inset(100% 0% 0% 0%)' },
  { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', ...vars },
]
const settle = (vars = {}) => [{ scale: 1.12 }, { scale: 1, ease: 'power2.out', ...vars }]
const up = (stagger = 0) => comeUp({ stagger }, 10)

/* ── Build orders: what each business shows first ───────── */

// Restaurant: the kitchen, the nav on it, the headline, the cook, Heute
// and the menu, the reservation last.
const buildRestaurant = (q, tl) =>
  tl
    .fromTo(q('.r-hero__media'), ...wipe({ duration: 0.8 }), 0)
    .fromTo(q('.r-nav'), ...up(), 0.45)
    .fromTo(q('.r-eyebrow'), ...up(), 0.6)
    .fromTo(q('.r-hero__title .site-line__inner'), ...rise({ duration: 0.6, stagger: 0.12 }), 0.65)
    .fromTo(q('.r-chef'), ...wipe({ duration: 0.7 }), 0.9)
    .fromTo(q('.r-today__label, .r-today__hours, .r-menu [data-reveal]'), ...up(0.06), 1.15)
    .fromTo(q('.r-reserve'), ...up(), 1.7)

// Barbershop: the room, then the shop's name and index, the board word by
// word with its prices, the razor and the line on the cut, the booking last.
const buildSalon = (q, tl) =>
  tl
    .fromTo(q('.s-room'), ...wipe({ duration: 0.8 }), 0)
    .fromTo([...q('.s-logo, .s-nav-action'), ...q('.s-index li')], ...up(0.05), 0.4)
    .fromTo(q('.s-eyebrow'), ...up(), 0.6)
    .fromTo(q('.s-title .site-line__inner'), ...rise({ duration: 0.6, stagger: 0.12 }), 0.65)
    .fromTo(q('.s-price [data-reveal]'), ...up(0.04), 0.9)
    .fromTo(q('.s-razor'), ...wipe({ duration: 0.7 }), 0.95)
    .fromTo(q('.s-style'), ...up(), 1.15)
    .fromTo(q('.s-steps, .s-walkin'), ...up(0.08), 1.3)
    .fromTo(q('.s-action'), ...up(), 1.7)

// Practice: status bar and the two photos (structure), navigation, the
// question, the ways in and the hours, the appointment last.
const buildDental = (q, tl) =>
  tl
    .fromTo(q('.d-status'), ...wipe({ duration: 0.5 }), 0)
    .fromTo(q('.d-nav__logo, .d-nav__links li'), ...up(0.05), 0.3)
    .fromTo(q('.d-reception'), ...wipe({ duration: 0.8 }), 0.2)
    .fromTo(q('.d-chair'), ...wipe({ duration: 0.7 }), 0.45)
    .fromTo(q('.d-eyebrow'), ...up(), 0.55)
    .fromTo(q('.d-title .site-line__inner'), ...rise({ duration: 0.6, stagger: 0.12 }), 0.6)
    .fromTo(q('.d-need'), ...up(0.07), 0.95)
    .fromTo(q('.d-hours [data-reveal]'), ...up(0.06), 1.05)
    // The appointment last: the action this page and BUSINESS are built on.
    .fromTo(q('.d-nav__action'), ...up(), 1.6)

const STUDIES = {
  restaurant: { build: buildRestaurant, photos: ['.r-hero__img', '.r-chef .site-photo'] },
  salon: { build: buildSalon, photos: ['.s-room .site-photo', '.s-razor .site-photo'] },
  dental: { build: buildDental, photos: ['.d-reception .site-photo', '.d-chair .site-photo'] },
}

/**
 * Scene 05: Adapt (SceneAdapt.jsx). Viktor's line comes up, then the
 * three websites one after the other. Each builds itself in its own order
 * while its frame comes up from the bottom edge into the screen, so the
 * point (a restaurant does not show what a practice shows first) is made
 * by the pages themselves, three times, in the scroll's direction.
 *
 * While a website passes, its two photos move at different speeds: the
 * page reads as layers, not as a flat picture.
 */
export function addAdapt(q) {
  addHeadline(q('.adapt__message-a, .adapt__message-b, .adapt__message-sub'), q('.scene--adapt')[0])

  q('.adapt__layer').forEach((layer) => {
    const lq = gsap.utils.selector(layer)
    const page = lq('.adapt__page')[0]
    const { build, photos } = STUDIES[layer.dataset.brand]

    along(layer, 'top 96%', 'top 80%').fromTo(lq('.adapt__context'), ...comeUp({}, 16))
    // The frame itself comes up a little further than the page does.
    along(page, 'top bottom', 'top 55%').fromTo(page, { y: 60, scale: 0.97 }, { y: 0, scale: 1, ease: 'power2.out' })
    // Built while the page travels in, done before it reaches the top.
    build(lq, along(page, 'top 88%', 'bottom 92%'))

    const [main, detail] = photos.map((selector) => lq(selector))
    along(page, 'top bottom', 'bottom top', true)
      .fromTo(main, { scale: 1.08, yPercent: -3 }, { scale: 1.08, yPercent: 3 }, 0)
      .fromTo(detail, { scale: 1.1, yPercent: 5 }, { scale: 1.1, yPercent: -5 }, 0)
  })
}
