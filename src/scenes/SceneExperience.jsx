import SiteDemo from '../site/SiteDemo.jsx'
import { study, restaurant } from '../site/content.js'
import './SceneExperience.css'

/**
 * Scene 03 + 04: Enter / Experience. A layer of the pinned stage.
 *
 * Two levels, kept strictly apart:
 *   - Viktor Builds (Geist): the context line, visible from Scene 03 on.
 *   - The design study (brand tokens), only ever inside .portal__clip,
 *     which is the browser frame's page area or the full screen.
 *
 * Without motion the same markup is a framed section: context line,
 * then the study in a static browser frame.
 */
export default function SceneExperience() {
  return (
    <section className="scene scene--site" aria-labelledby="experience-context">
      <h2 id="experience-context" className="experience__context">
        Viktor Builds <span aria-hidden="true">—</span>{' '}
        <span className="context__swap">
          <span className="context__item">{study.context}</span>
          {/* ADAPT counts on here; the restaurant section has its own heading. */}
          <span className="context__item context__item--next" aria-hidden="true">
            {restaurant.context}
          </span>
        </span>
      </h2>

      <div
        className="portal__clip site"
        data-brand="metallbau"
        role="group"
        aria-label={`Designstudie von Viktor Builds: Website für einen ${study.trade}betrieb`}
      >
        <div className="portal__content">
          <SiteDemo />
        </div>
      </div>
    </section>
  )
}
