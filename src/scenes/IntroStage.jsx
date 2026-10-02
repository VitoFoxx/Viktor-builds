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

      mm.add(MEDIA, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions
        const q = gsap.utils.selector(stage)

        if (reduceMotion) {
          createReducedMotion(q)
          return
        }

        createIntroTimeline(q)
        createStageTimeline(stage.current, q, { isDesktop })
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
