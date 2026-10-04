import SiteDemo from '../site/SiteDemo.jsx'
import { company } from '../site/content.js'
import './SceneExperience.css'

/**
 * Scene 03 + 04: Enter / Experience. A layer of the pinned stage.
 *
 * Two levels, kept strictly apart:
 *   - Viktor Builds (Geist, dark): statement, caption, context line.
 *   - The demo website (brand tokens), only ever inside .portal__clip,
 *     which is the browser frame's page area or the full screen.
 *
 * Without motion the same markup is a framed section: statement,
 * the demo page in a browser frame, caption.
 */
export default function SceneExperience() {
  return (
    <section className="scene scene--site" aria-labelledby="experience-title">
      <h2 id="experience-title" className="experience__statement">
        <span className="experience__mask">
          <span className="experience__line">Same principles.</span>
        </span>{' '}
        <span className="experience__mask">
          <span className="experience__line">Different business.</span>
        </span>
      </h2>

      <div
        className="portal__clip site"
        data-brand="metallbau"
        role="group"
        aria-label={`Demo-Website: ${company.name} (fiktives Unternehmen)`}
      >
        <div className="portal__content">
          <SiteDemo />
        </div>
      </div>

      <p className="experience__caption">
        <span>Website 01 — Industrial / Craft</span>
        <span className="experience__caption-sep" aria-hidden="true">
          {' · '}
        </span>
        <span>Designed and built by Viktor Builds</span>
      </p>

      <p className="experience__context" aria-hidden="true">
        Viktor Builds / Website 01
      </p>
    </section>
  )
}
