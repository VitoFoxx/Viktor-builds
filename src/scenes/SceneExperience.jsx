import { useRef } from 'react'
import { gsap, useGSAP } from '../animations/gsap.js'
import { MEDIA } from '../animations/stageTimeline.js'
import {
  createRules,
  createStatement,
  createWorkPinned,
  createWorkCards,
  createIndex,
  createIndexPreview,
  createContact,
  createDemoBadge,
} from '../animations/experienceTimeline.js'
import SiteStatement from '../site/SiteStatement.jsx'
import SiteWork from '../site/SiteWork.jsx'
import SiteIndex from '../site/SiteIndex.jsx'
import SiteContact from '../site/SiteContact.jsx'
import '../site/site.css'

/**
 * Scene 04: The Experience. The client site continues below the pinned
 * stage, whose last state is this site's hero (SiteHero).
 */
export default function SceneExperience() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add({ ...MEDIA, canHover: '(hover: hover) and (pointer: fine)' }, (ctx) => {
        const { isDesktop, reduceMotion, canHover } = ctx.conditions
        const q = gsap.utils.selector(root)

        if (reduceMotion) {
          // The hero sits outside this component's scope, so it is looked up directly.
          createDemoBadge({ trigger: document.querySelector('.scene--site'), start: 'top 60%' })
          return
        }

        // The badge appears as the pinned stage releases into the site.
        createDemoBadge({ trigger: root.current, start: 'top bottom' })
        createRules(q)
        createStatement(q)
        if (isDesktop) createWorkPinned(q)
        else createWorkCards(q)
        createIndex(q)
        createContact(q)
        if (isDesktop && canHover) return createIndexPreview(q)
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div className="site site-body" ref={root}>
      <SiteStatement />
      <SiteWork />
      <SiteIndex />
      <SiteContact />
    </div>
  )
}
