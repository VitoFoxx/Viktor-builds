import { gsap } from './gsap.js'
import { along, addHeadline, rise, comeUp } from './along.js'

/**
 * Scene 02 – 04: from the idea to the website, and through it
 * (SceneInterface.jsx). One frame in the page flow:
 *
 *   build    the plan (grey bars) builds itself part by part, each part
 *            as it comes up over the bottom edge of the screen
 *   resolve  once the frame's first screen is in view, the plan gives way
 *            from the bottom up and the real page sets itself into the
 *            same grid; the line completes: → ZUR WEBSITE.
 *   through  the visitor scrolls on through the metalwork website in its
 *            frame, at the speed of their own scroll; its rows rise as
 *            they come into view
 */
export function addStudy(q, { isDesktop }) {
  const frame = q('.study')[0]
  const mock = q('.study .frame__page')[0]
  const s = (selector) => q(`.study ${selector}`)

  // The line comes up with the frame; its second half waits for the website.
  addHeadline([q('.interface__message-a')[0], q('.study__label')[0]], q('.scene--interface')[0])
  gsap.set(q('.interface__message-b'), { autoAlpha: 0, y: 24 })

  /* ── build: each part of the plan as it comes into view ── */

  const build = (trigger, add) => add(along(trigger, 'top 98%', isDesktop ? 'top 74%' : 'top 80%'))

  build(s('.mock-nav')[0], (tl) =>
    tl.fromTo(
      s('.mock-nav__mark, .mock-bar--logo, .mock-nav__link, .mock-nav__burger'),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
    ),
  )
  build(s('.mock-hero__copy')[0], (tl) =>
    tl
      .fromTo(s('.mock-bar--eyebrow'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 0)
      .fromTo(s('.mock-line__inner'), ...rise({ stagger: 0.14 }), 0.15)
      .fromTo(s('.mock-bar--text'), { scaleX: 0 }, { scaleX: 1, stagger: 0.1, ease: 'power2.out' }, 0.4)
      .fromTo(s('.mock-btn'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.1, ease: 'power2.out' }, 0.7),
  )
  build(s('.mock-hero__media')[0], (tl) =>
    tl
      .fromTo(
        s('.mock-hero__media'),
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' },
        0,
      )
      .fromTo(s('.mock-hero__media-inner'), { scale: 1.2 }, { scale: 1, ease: 'power2.out' }, 0),
  )
  build(s('.mock-cols')[0], (tl) =>
    tl
      .fromTo(s('.mock-col__rule'), { scaleX: 0 }, { scaleX: 1, stagger: 0.12, ease: 'power2.inOut' }, 0)
      .fromTo(
        s('.mock-bar--col-title, .mock-bar--col-text'),
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, stagger: 0.06, ease: 'power2.out' },
        0.3,
      ),
  )

  /* ── resolve: the plan gives way to the website ────────── */

  // While the frame travels from here to the top of the screen.
  const tl = along(frame, isDesktop ? 'top 40%' : 'top 30%', isDesktop ? 'top 10%' : 'top 2%')
  tl.fromTo(q('.interface__message-b'), ...comeUp({ duration: 0.4 }), 0)
    .fromTo(
      mock,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'power2.inOut' },
      0.1,
    )
    .fromTo(s('.site-hero__img .site-photo'), { scale: 1.1 }, { scale: 1, duration: 0.9, ease: 'power2.out' }, 0.1)
    .fromTo(s('.site-hero .site-line__inner'), ...rise({ duration: 0.45, stagger: 0.1 }), 0.45)
    .fromTo(
      s('.site-hero [data-reveal]'),
      { autoAlpha: 0, y: 12 },
      // Bottom up, in step with the plan giving way.
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: { each: 0.05, from: 'end' }, ease: 'power2.out' },
      0.15,
    )

  /* ── through the website ──────────────────────────────── */

  // The hero photo lags behind as the hero leaves the screen.
  gsap.fromTo(
    s('.site-hero__img'),
    { yPercent: 0 },
    {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: s('.site-hero')[0], start: 'top top', end: 'bottom top', scrub: true },
    },
  )
  along(s('.site-project')[0], 'top bottom', 'top 25%', true).fromTo(
    s('.site-project__img'),
    { scale: 1.1 },
    { scale: 1, ease: 'power1.out' },
  )
  const rows = (trigger, targets) => along(trigger, 'top 96%', 'top 70%').fromTo(targets, ...rise({ stagger: 0.12 }))
  rows(s('.site-project__caption')[0], s('.site-project__caption .site-line__inner'))
  rows(s('.site-details')[0], s('.site-details .site-line__inner'))
}
