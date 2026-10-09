import { gsap } from './gsap.js'
import { addPortal, portalGeometry } from './portalTimeline.js'
import { addExperience } from './experienceTimeline.js'
import { addAdapt } from './adaptTimeline.js'
import { addBusiness } from './businessTimeline.js'
import { addResult } from './resultTimeline.js'

// Keep in sync with the media queries in IntroStage.css / BrowserFrame.css.
export const MEDIA = {
  isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  isMobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

// Scroll pace of the stage, in viewport heights per timeline second. These are
// the Phase 1 values (4 / 3 viewports for 9.9 s), kept for every scene.
const PACE = { desktop: 4 / 9.9, mobile: 3 / 9.9 }

/**
 * One pinned stage, one scrubbed master timeline for Scene 01 → 02 → 03 → 04 → 05 → 06 → 07.
 *
 * Labels (timeline seconds, mapped linearly onto the pinned scroll distance):
 *   hero        0.0  the opening's copy leaves; the website glides from its
 *                    slot (.hero__visual) to the centre of the stage
 *   plan        1.7  lights down: the paper turns anthracite, the finished
 *                    page fades and leaves the empty frame
 *   build       2.4  the website assembles itself inside the frame
 *   experience  6.0  the message completes, the frame settles
 *   resolve …   7.6  Scene 03, see portalTimeline.js
 *   demo …           Scene 04, see experienceTimeline.js
 *   adapt …   handoff  Scene 05, see adaptTimeline.js
 *   business … adaptEnd  Scene 06, see businessTimeline.js
 *   result … businessEnd  Scene 07, see resultTimeline.js; the contact
 *                    area follows unpinned (SceneResult.jsx)
 */
export function createStageTimeline(stage, q, { isDesktop, onUpdate }) {
  const site = q('.scene--site')[0]
  const clip = q('.portal__clip')[0]
  const content = q('.portal__content')[0]
  const slot = q('.hero__visual')[0]
  const { wrap, clipAt, contentAt } = portalGeometry(stage, q)
  const bg = getComputedStyle(stage).getPropertyValue('--c-bg').trim()

  // The opening's slot, as a transform of the centred frame: scale about
  // its centre, then move. Measured from layout boxes (the slot is never
  // transformed), so it holds at any scroll position.
  const hero = {
    scale: () => slot.offsetWidth / wrap.offsetWidth,
    x: () => rect().x + slot.offsetWidth / 2 - stage.offsetWidth / 2,
    y: () => rect().y + slot.offsetHeight / 2 - stage.offsetHeight / 2,
  }
  const GLIDE = { duration: 1.8, ease: 'power2.inOut' }
  const GLIDE_AT = 0.15

  function rect() {
    const a = slot.getBoundingClientRect()
    const b = stage.getBoundingClientRect()
    return { x: a.left - b.left, y: a.top - b.top }
  }

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
      // Before the glide starts, nothing re-renders the opening's
      // freshly measured slot after a resize or a late font swap. Step
      // just past the start and back, so the frame sits in its new slot.
      onRefresh: (self) => {
        const a = self.animation
        if (a && a.time() < GLIDE_AT) {
          const t = a.time()
          a.time(GLIDE_AT + 0.001, true).time(t, true)
        }
      },
    },
  })

  // The opening shows the finished study inside the frame.
  gsap.set(site, { autoAlpha: 1 })
  // The frame scales about its top-left corner throughout the stage
  // (Scene 03 – 07 rely on it). A percentage origin would be stored in
  // pixels and go stale on resize.
  gsap.set(wrap, { transformOrigin: '0 0' })
  // The opening's slot in that origin: the same box as a centre scale.
  const heroWrap = {
    scale: hero.scale,
    x: () => hero.x() + ((1 - hero.scale()) * wrap.offsetWidth) / 2,
    y: () => hero.y() + ((1 - hero.scale()) * wrap.offsetHeight) / 2,
  }

  /* ── hero ─────────────────────────────────────────────── */

  tl.addLabel('hero', 0)
    .to(q('.scroll-hint'), { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, 'hero')
    .to(q('.hero__bar'), { autoAlpha: 0, y: -16, duration: 0.7, ease: 'power1.in' }, 'hero')
    .to(q('.hero__copy'), { autoAlpha: 0, y: () => -window.innerHeight * 0.08, duration: 0.9, ease: 'power2.in' }, 'hero')
    .to(slot, { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 'hero')
    // Frame, clip and content share one ease, so they stay locked together.
    .fromTo(wrap, { ...heroWrap }, { x: 0, y: 0, scale: 1, ...GLIDE }, GLIDE_AT)
    .fromTo(clip, { clipPath: clipAt(hero.scale, hero.x, hero.y) }, { clipPath: clipAt(1), ...GLIDE }, GLIDE_AT)
    .fromTo(
      content,
      { ...contentAt(hero.scale, hero.x, hero.y), transformOrigin: '0 0' },
      { ...contentAt(1), ...GLIDE },
      GLIDE_AT,
    )

  /* ── plan ─────────────────────────────────────────────── */
  // The page goes back to its plan: what follows shows how it is made.
  tl.addLabel('plan', 1.7)
    .to(stage, { backgroundColor: bg, duration: 1.0, ease: 'power1.inOut' }, 'plan')
    .to(site, { autoAlpha: 0, duration: 0.7, ease: 'power1.inOut' }, 'plan')
    .to(q('.frame-shadow'), { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' }, 'plan')
    // Hidden, so Scene 03 can set it into the grid again (portalTimeline.js).
    .set(q('.site-hero .site-line__inner'), { yPercent: 110 }, 'plan+=0.7')
    .set(q('.site-hero [data-reveal]'), { autoAlpha: 0, y: 10 }, 'plan+=0.7')
    .set(q('.site-hero__media'), { autoAlpha: 0 }, 'plan+=0.7')
    .set(q('.site-hero__img .site-photo'), { scale: 1.08 }, 'plan+=0.7')
    .fromTo(
      q('.interface__message-a'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      'plan+=0.5',
    )

  /* ── build ────────────────────────────────────────────── */
  tl.addLabel('build', 2.4)
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
  tl.addLabel('experience', 6.0)
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
  addAdapt(tl, stage, q)
  const device = addBusiness(tl, stage, q, { isDesktop })
  addResult(tl, stage, q, { isDesktop, device })

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
  fadeIn(q('.scene--business > *'), q('.scene--business')[0])
}
