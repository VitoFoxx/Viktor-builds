import { useRef } from 'react'
import { gsap, useGSAP } from '../animations/gsap.js'
import { MEDIA } from '../animations/stageTimeline.js'
import {
  createDetails,
  createDetailCards,
  createPerformance,
  createProduct,
  createReducedFades,
  createDemoBadge,
} from '../animations/experienceTimeline.js'
import SiteDetails from '../site/SiteDetails.jsx'
import SitePerformance from '../site/SitePerformance.jsx'
import SiteProduct from '../site/SiteProduct.jsx'
import SiteFooter from '../site/SiteFooter.jsx'
import '../site/site.css'

/**
 * Scene 04: The Experience. The VANTA site continues below the pinned
 * stage, whose last state is this site's hero (SiteHero).
 */
export default function SceneExperience() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions
        const q = gsap.utils.selector(root)

        if (reduceMotion) {
          // The hero sits outside this component's scope, so it is looked up directly.
          createDemoBadge({ trigger: document.querySelector('.scene--site'), start: 'top 60%' })
          createReducedFades(q)
          return
        }

        // The badge appears as the pinned stage releases into the site.
        createDemoBadge({ trigger: root.current, start: 'top bottom' })
        if (isDesktop) createDetails(q)
        else createDetailCards(q)
        createPerformance(q, { isDesktop })
        // Ends on the label `handoff`: the starting point of Scene 05.
        createProduct(q, { isDesktop })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div className="site site-body" data-brand="vanta" ref={root}>
      <SiteDetails />
      <SitePerformance />
      <SiteProduct />
      <SiteFooter />
    </div>
  )
}
