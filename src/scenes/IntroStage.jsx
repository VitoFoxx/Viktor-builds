import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../animations/gsap.js'
import { MEDIA, createStage, createReducedMotion } from '../animations/stageTimeline.js'
import { createIntroTimeline } from '../animations/introTimeline.js'
import { glideTo } from '../animations/scrollTo.js'
import { enableDemoTouch } from '../animations/demoTouch.js'
import { startSmoothScroll } from '../animations/smoothScroll.js'
import { SCRUB } from '../animations/along.js'
import SceneVoid from './SceneVoid.jsx'
import SceneInterface from './SceneInterface.jsx'
import SceneAdapt from './SceneAdapt.jsx'
import SceneBusiness from './SceneBusiness.jsx'
import '../site/interactive.css'
import './IntroStage.css'

// The scrollbar's tone follows the page: dark on the opening's paper,
// light once the anthracite part fills the screen (base.css).
const setTone = (dark) => {
  document.documentElement.dataset.tone = dark ? 'dark' : 'light'
}

// Where the ways in from the opening lead (data-jump), and how far below
// the top of the screen the target should come to rest.
const JUMPS = {
  study: { target: '.study', offset: 0.1 },
  restaurant: { target: '.adapt__layer--restaurant', offset: 0.08 },
  salon: { target: '.adapt__layer--salon', offset: 0.08 },
  dental: { target: '.adapt__layer--dental', offset: 0.08 },
}

/**
 * The story, Scene 01 – 06, as sections in the page's own flow (see
 * stageTimeline.js). Scene 07 follows in SceneResult.jsx.
 */
export default function IntroStage() {
  const stage = useRef(null)

  // The opening's website: the study laid out at the screen's width (at
  // most a common desktop's, so a very wide screen does not stretch it)
  // and scaled into its frame, as tall as the frame shows.
  const fitHeroSite = () => {
    const page = stage.current?.querySelector('.hero-card__page')
    if (!page?.offsetWidth) return
    const width = Math.min(document.documentElement.clientWidth, 1920)
    const scale = page.offsetWidth / width
    page.style.setProperty('--hero-w', `${width}px`)
    page.style.setProperty('--hero-s', scale)
    page.style.setProperty('--hero-h', `${Math.ceil(page.offsetHeight / scale) + 2}px`)
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const q = gsap.utils.selector(stage)
      const root = stage.current

      // A change of breakpoint rebuilds the motion; ScrollTrigger then
      // starts from the top. Keep the visitor where they were instead: the
      // section at the top of the screen, and how far into it.
      let place = null
      const keepPlace = () => {
        const el = [...document.querySelectorAll('.stage > .scene, .result > *, .footer')].find(
          (section) => section.getBoundingClientRect().bottom > 0,
        )
        if (!el) return
        const box = el.getBoundingClientRect()
        place = { el, into: -box.top / box.height }
      }
      const returnToPlace = () => {
        if (!place) return
        const { el, into } = place
        place = null
        const restore = () => {
          ScrollTrigger.removeEventListener('refresh', restore)
          const box = el.getBoundingClientRect()
          window.scrollTo(0, window.scrollY + box.top + into * box.height)
        }
        ScrollTrigger.addEventListener('refresh', restore)
      }

      // From cream to anthracite as the visitor scrolls, never a cut: the
      // opening and the section below share one colour, which darkens while
      // that section comes up the screen. It stays light a while, passes the
      // middle quickly and settles dark. The type on it (the opening's copy,
      // the line and label below) switches from ink to light in one short
      // step where both read alike, so it never fades into the grey.
      // Bound to the scroll in every mode: a change of colour, no movement.
      const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      const ink = { color: '--c-ink', '--c-ink': '--c-ink', '--c-ink-muted': '--c-ink-muted', '--c-ink-line': '--c-ink-line', '--c-fg': '--c-ink', '--c-muted': '--c-ink-muted' }
      const light = { color: '--c-fg', '--c-ink': '--c-fg', '--c-ink-muted': '--c-muted', '--c-ink-line': '--c-line', '--c-fg': '--c-fg', '--c-muted': '--c-muted' }
      const resolve = (set) => Object.fromEntries(Object.entries(set).map(([key, name]) => [key, token(name)]))
      const next = q('.scene--interface')[0]
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 35%', scrub: SCRUB },
        })
        .fromTo(
          [q('.scene--void')[0], next],
          { backgroundColor: token('--c-paper') },
          { backgroundColor: token('--c-bg'), duration: 1, ease: 'power2.inOut' },
          0,
        )
        .fromTo(
          q('.hero__bar, .hero__copy, .scroll-hint, .interface__message, .study__label'),
          resolve(ink),
          { ...resolve(light), duration: 0.04 },
          0.48,
        )

      // Dark from the moment the opening has mostly left the screen.
      ScrollTrigger.create({
        trigger: q('.scene--void')[0],
        start: 'bottom 45%',
        onEnter: () => setTone(true),
        onLeaveBack: () => setTone(false),
      })

      mm.add(MEDIA, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions
        returnToPlace()

        if (reduceMotion) {
          createReducedMotion(q)
          return keepPlace
        }

        fitHeroSite()
        window.addEventListener('resize', fitHeroSite)
        createIntroTimeline(q)
        createStage(q, { isDesktop })

        // Ways in from the opening: "Beispiele" and the website in front
        // lead to the study, each card of the fan to its website in ADAPT.
        const onJump = (event) => {
          const jump = JUMPS[event.target.closest('[data-jump]')?.dataset.jump]
          const el = jump && root.querySelector(jump.target)
          if (!el) return
          event.preventDefault()
          glideTo(el.getBoundingClientRect().top + window.scrollY - window.innerHeight * jump.offset)
        }
        root.addEventListener('click', onJump)
        const releaseDemos = enableDemoTouch(root)

        // Mouse or trackpad: smooth wheel scrolling, and the fan follows
        // the pointer while the opening is on screen.
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        const stopSmoothScroll = finePointer ? startSmoothScroll() : null
        const fan = q('.hero-fan')[0]
        let onPointer = null
        if (fan && finePointer) {
          gsap.set(fan, { '--mx': 0, '--my': 0 })
          const toX = gsap.quickTo(fan, '--mx', { duration: 0.9, ease: 'power3.out' })
          const toY = gsap.quickTo(fan, '--my', { duration: 0.9, ease: 'power3.out' })
          let resting = true
          onPointer = (event) => {
            if (window.scrollY > window.innerHeight * 0.1) {
              if (!resting) (toX(0), toY(0), (resting = true))
              return
            }
            resting = false
            toX((event.clientX / window.innerWidth) * 2 - 1)
            toY((event.clientY / window.innerHeight) * 2 - 1)
          }
          window.addEventListener('pointermove', onPointer, { passive: true })
        }

        return () => {
          keepPlace()
          window.removeEventListener('resize', fitHeroSite)
          root.removeEventListener('click', onJump)
          releaseDemos()
          stopSmoothScroll?.()
          if (onPointer) window.removeEventListener('pointermove', onPointer)
        }
      })

      // Typography metrics change once the web font has loaded.
      document.fonts?.ready.then(() => {
        fitHeroSite()
        ScrollTrigger.refresh()
      })

      return () => mm.revert()
    },
    { scope: stage },
  )

  return (
    <div className="stage" ref={stage}>
      <SceneVoid />
      <SceneInterface />
      <SceneAdapt />
      <SceneBusiness />
    </div>
  )
}
