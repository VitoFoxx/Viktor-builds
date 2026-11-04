import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../animations/gsap.js'
import { MEDIA, createStageTimeline, createReducedMotion } from '../animations/stageTimeline.js'
import { createIntroTimeline } from '../animations/introTimeline.js'
import { glideTo } from '../animations/scrollTo.js'
import { enableDemoTouch } from '../animations/demoTouch.js'
import SceneVoid from './SceneVoid.jsx'
import SceneInterface from './SceneInterface.jsx'
import SceneExperience from './SceneExperience.jsx'
import SceneAdapt from './SceneAdapt.jsx'
import SceneBusiness from './SceneBusiness.jsx'
import '../site/interactive.css'
import './IntroStage.css'

// The scrollbar's tone follows the page: dark on the opening's paper,
// light once it has turned anthracite (base.css).
const setTone = (dark) => {
  document.documentElement.dataset.tone = dark ? 'dark' : 'light'
}

export default function IntroStage() {
  const stage = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Progress through the pinned sequence, carried across a breakpoint
      // change. Reverting the old pin collapses the page, which would
      // otherwise throw the visitor back to the top.
      let carriedProgress = 0

      mm.add(MEDIA, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions
        const q = gsap.utils.selector(stage)

        if (reduceMotion) {
          carriedProgress = 0
          createReducedMotion(q)
          // Static sections: dark from the end of the opening on.
          ScrollTrigger.create({
            trigger: q('.scene--void')[0],
            start: 'bottom center',
            onEnter: () => setTone(true),
            onLeaveBack: () => setTone(false),
          })
          return
        }

        createIntroTimeline(q)
        const tl = createStageTimeline(stage.current, q, {
          isDesktop,
          onUpdate: (self) => {
            carriedProgress = self.progress
            // Halfway through the paper turning anthracite ('plan', 1 s fade).
            const a = self.animation
            setTone(self.progress * a.duration() >= a.labels.plan + 0.5)
          },
        })
        const st = tl.scrollTrigger
        // For checks in development: the timeline and its scroll mapping.
        if (import.meta.env.DEV) window.__stage = { tl, st }

        const jumpTo = (progress) => {
          st.scroll(st.start + progress * (st.end - st.start))
          st.update()
          st.getTween()?.progress(1)
        }

        // Ways in from the opening: "Beispiele" leads to the first website
        // at full size, each card of the fan to its website in ADAPT. The
        // targets sit inside the pinned stage, so glide to their moment.
        const onJump = (event) => {
          const link = event.target.closest('[data-jump]')
          const label = link?.dataset.jump
          if (!label || !(label in tl.labels)) return
          event.preventDefault()
          glideTo(st.labelToScroll(label))
        }
        const root = stage.current
        root.addEventListener('click', onJump)
        const releaseDemos = enableDemoTouch(root)

        // The fan follows the pointer while the opening is on screen.
        const fan = q('.hero-fan')[0]
        let onPointer = null
        if (fan && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          gsap.set(fan, { '--mx': 0, '--my': 0 })
          const toX = gsap.quickTo(fan, '--mx', { duration: 0.9, ease: 'power3.out' })
          const toY = gsap.quickTo(fan, '--my', { duration: 0.9, ease: 'power3.out' })
          let resting = true
          onPointer = (event) => {
            if (st.progress > 0.03) {
              if (!resting) toX(0), toY(0), (resting = true)
              return
            }
            resting = false
            toX((event.clientX / window.innerWidth) * 2 - 1)
            toY((event.clientY / window.innerHeight) * 2 - 1)
          }
          window.addEventListener('pointermove', onPointer, { passive: true })
        }

        let raf = 0
        if (carriedProgress > 0) {
          const progress = carriedProgress
          raf = requestAnimationFrame(() => jumpTo(progress))
        }

        // A resize within the same breakpoint changes the pinned distance
        // (it is measured in viewport heights). Keep the visitor at the same
        // moment of the sequence instead of the same pixel offset.
        let kept = 0
        const keep = () => (kept = st.progress)
        const restore = () => kept > 0 && jumpTo(kept)
        ScrollTrigger.addEventListener('refreshInit', keep)
        ScrollTrigger.addEventListener('refresh', restore)

        return () => {
          cancelAnimationFrame(raf)
          root.removeEventListener('click', onJump)
          releaseDemos()
          if (onPointer) window.removeEventListener('pointermove', onPointer)
          ScrollTrigger.removeEventListener('refreshInit', keep)
          ScrollTrigger.removeEventListener('refresh', restore)
        }
      })

      // Typography metrics change once the web font has loaded.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())

      return () => mm.revert()
    },
    { scope: stage },
  )

  return (
    <div className="stage" ref={stage}>
      <SceneVoid />
      <SceneInterface />
      <SceneExperience />
      <SceneAdapt />
      <SceneBusiness />
    </div>
  )
}
