import SiteRestaurant from '../site/SiteRestaurant.jsx'
import SiteSalon from '../site/SiteSalon.jsx'
import SiteDental from '../site/SiteDental.jsx'
import { restaurant, salon, dental } from '../site/content.js'
import { STUDIES } from '../animations/adaptTimeline.js'
import './SceneAdapt.css'

const SITES = {
  restaurant: { Site: SiteRestaurant, content: restaurant, label: 'ein Restaurant' },
  salon: { Site: SiteSalon, content: salon, label: 'einen Barbershop' },
  dental: { Site: SiteDental, content: dental, label: 'eine Zahnarztpraxis' },
}

/**
 * Scene 05: Adapt. A layer of the pinned stage, exactly over the frame's
 * page area where Scene 04 left the metalwork study. Each business has its
 * own layer (restaurant, barbershop, practice), stacked in that order: the
 * page below is taken apart into grey placeholders (the vocabulary of
 * Scene 02), they re-plan into the next layout, and the next page is built
 * from them on its own ground.
 *
 * Without motion: Viktor's line, then the three pages one below the other,
 * each in a static browser frame under its context line.
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

      <div className="adapt__clip">
        <div className="adapt__content">
          {STUDIES.map(({ brand, blocks, guides }) => {
            const { Site, content, label } = SITES[brand]
            return (
              <div
                className={`adapt__layer adapt__layer--${brand}`}
                data-brand={brand}
                role="group"
                aria-label={`Designstudie von Viktor Builds: Website für ${label}`}
                key={brand}
              >
                <p className="adapt__context">
                  Viktor Builds <span aria-hidden="true">—</span> {content.context}
                </p>
                <div className="adapt__page">
                  <div className="adapt__bg" />
                  <div className="adapt__skeleton" aria-hidden="true">
                    {blocks.map((block) => (
                      <span className={`adapt__block adapt__block--${block.kind}`} key={block.id} />
                    ))}
                    <span className="adapt__guide adapt__guide--h" />
                    {Array.from({ length: guides }, (_, i) => (
                      <span className={`adapt__guide adapt__guide--v adapt__guide--v${i}`} key={i} />
                    ))}
                  </div>
                  <div className="adapt__site">
                    <Site />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
