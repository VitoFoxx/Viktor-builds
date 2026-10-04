import { useRef } from 'react'
import { gsap, useGSAP } from '../animations/gsap.js'
import { MEDIA } from '../animations/stageTimeline.js'
import {
  createHeader,
  createRules,
  createIntro,
  createProject,
  createProcess,
  createSpecs,
  createClosing,
  createReducedFades,
  createDemoBadge,
} from '../animations/experienceTimeline.js'
import SiteHeader from '../site/SiteHeader.jsx'
import SiteIntro from '../site/SiteIntro.jsx'
import SiteProject from '../site/SiteProject.jsx'
import SiteProcess from '../site/SiteProcess.jsx'
import SiteSpecs from '../site/SiteSpecs.jsx'
import SiteClosing from '../site/SiteClosing.jsx'
import '../site/site.css'
import '../site/sections.css'

/**
 * Scene 04: The Experience. The Wehrkamp Metallbau site continues below the
 * pinned stage, whose last state is this site's hero (SiteHero).
 */
export default function SceneExperience() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions
        const q = gsap.utils.selector(root)
        const hero = document.querySelector('.scene--site')

        if (reduceMotion) {
          // The hero sits outside this component's scope, so it is looked up directly.
          createDemoBadge({ trigger: hero, start: 'top 60%' })
          createHeader(q, { trigger: hero, start: 'bottom top' })
          createReducedFades(q)
          return
        }

        // Both appear exactly as the pinned stage releases into the site.
        createDemoBadge({ trigger: root.current, start: 'top bottom' })
        createHeader(q, { trigger: root.current, start: 'top bottom' })
        createRules(q)
        createIntro(q)
        createProject(q, { isDesktop })
        createProcess(q, { isDesktop })
        createSpecs(q, { isDesktop })
        // Ends on the label `handoff`: the starting point of Scene 05.
        createClosing(q, { isDesktop })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div className="site site-body" data-brand="metallbau" ref={root}>
      <SiteHeader />
      <SiteIntro />
      <SiteProject />
      <SiteProcess />
      <SiteSpecs />
      <SiteClosing />
    </div>
  )
}
