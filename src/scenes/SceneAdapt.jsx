import SiteRestaurant from '../site/SiteRestaurant.jsx'
import { restaurant } from '../site/content.js'
import { BLOCKS } from '../animations/adaptTimeline.js'
import './SceneAdapt.css'

/**
 * Scene 05: Adapt. A layer of the pinned stage, exactly over the frame's
 * page area where Scene 04 left the metalwork study. The study is taken
 * apart into grey placeholders (the vocabulary of Scene 02), they re-plan
 * into a new layout, and the restaurant is built from them.
 *
 * Without motion: Viktor's line, the context line and the restaurant in
 * a static browser frame, below the metalwork study.
 */
export default function SceneAdapt() {
  return (
    <section className="scene scene--adapt" aria-labelledby="adapt-title">
      <div className="adapt__anchor">
        <h2 id="adapt-title" className="adapt__message">
          <span className="adapt__message-a">Different business</span>{' '}
          <span className="adapt__message-b">
            <span aria-hidden="true">→ </span>different website.
          </span>
        </h2>
      </div>

      <p className="adapt__context">
        Viktor Builds <span aria-hidden="true">—</span> {restaurant.context}
      </p>

      <div
        className="adapt__clip"
        data-brand="restaurant"
        role="group"
        aria-label="Designstudie von Viktor Builds: Website für ein Restaurant"
      >
        <div className="adapt__content">
          <div className="adapt__bg" />
          <div className="adapt__skeleton" aria-hidden="true">
            {BLOCKS.map((block) => (
              <span className={`adapt__block adapt__block--${block.kind}`} key={block.id} />
            ))}
            <span className="adapt__guide adapt__guide--h" />
            {[0, 1, 2, 3].map((i) => (
              <span className={`adapt__guide adapt__guide--v adapt__guide--v${i}`} key={i} />
            ))}
          </div>
          <SiteRestaurant />
        </div>
      </div>
    </section>
  )
}
