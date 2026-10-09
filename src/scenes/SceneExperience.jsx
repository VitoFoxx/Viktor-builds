import SiteDemo from '../site/SiteDemo.jsx'
import { brand, study, restaurant, salon, dental, yours } from '../site/content.js'
import './SceneExperience.css'

/**
 * Scene 03 + 04: Enter / Experience. A layer of the pinned stage.
 *
 * Two levels, kept strictly apart:
 *   - VITOWORKS (Geist): the context line, visible from Scene 03 on.
 *   - The design study (brand tokens), only ever inside .portal__clip,
 *     which is the browser frame's page area or the full screen.
 *
 * Without motion the same markup is a framed section: context line,
 * then the study in a static browser frame.
 */
export default function SceneExperience() {
  return (
    <section className="scene scene--site" id="referenzen" aria-labelledby="experience-context">
      <h2 id="experience-context" className="experience__context">
        {brand.name} <span aria-hidden="true">—</span>{' '}
        <span className="context__swap">
          <span className="context__item">{study.context}</span>
          {/* ADAPT counts on here (its studies have their own labels),
              RESULT ends the count on the visitor's business. */}
          {[restaurant, salon, dental, yours].map((next) => (
            <span className="context__item context__item--next" aria-hidden="true" key={next.context}>
              {next.context}
            </span>
          ))}
        </span>
      </h2>

      <div
        className="portal__clip site"
        data-brand="metallbau"
        role="group"
        aria-label={`Designstudie von ${brand.name}: Website für einen ${study.trade}betrieb`}
      >
        <div className="portal__content">
          <SiteDemo />
        </div>
      </div>
    </section>
  )
}
