import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../animations/gsap.js'
import { MEDIA, createStageTimeline, createReducedMotion } from '../animations/stageTimeline.js'
import { createIntroTimeline } from '../animations/introTimeline.js'
import SceneVoid from './SceneVoid.jsx'
import SceneInterface from './SceneInterface.jsx'
import './IntroStage.css'

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
          return
        }

        createIntroTimeline(q)
        const tl = createStageTimeline(stage.current, q, {
          isDesktop,
          onUpdate: (self) => (carriedProgress = self.progress),
        })
        const st = tl.scrollTrigger

        let raf = 0
        if (carriedProgress > 0) {
          const progress = carriedProgress
          raf = requestAnimationFrame(() => {
            st.scroll(st.start + progress * (st.end - st.start))
            st.update()
            st.getTween()?.progress(1)
          })
        }

        return () => cancelAnimationFrame(raf)
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
    </div>
  )
}
