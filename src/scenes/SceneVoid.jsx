import ScrollHint from '../components/ScrollHint.jsx'
import { hero, result } from '../site/content.js'

export default function SceneVoid() {
  return (
    <section className="scene scene--void" aria-labelledby="scene-void-title">
      <div className="void__type">
        <h1 id="scene-void-title" className="void__title">
          <span className="void__word void__word--a">
            <span className="void__mask">
              <span className="void__word-inner">Viktor</span>
            </span>
          </span>{' '}
          <span className="void__word void__word--b">
            <span className="void__mask">
              <span className="void__word-inner">Builds</span>
            </span>
          </span>
        </h1>
        <p className="void__tagline">
          <span className="void__tagline-inner">{hero.tagline}</span>
          {/* The closing claim takes its place when the ring closes (RESULT). */}
          <span className="void__tagline-final" aria-hidden="true">
            {result.claim.line}
          </span>
        </p>
        <p className="void__lead">{hero.lead}</p>
      </div>
      <ScrollHint />
    </section>
  )
}
