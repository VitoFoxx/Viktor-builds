import SiteRestaurant from '../site/SiteRestaurant.jsx'
import SiteSalon from '../site/SiteSalon.jsx'
import SiteDental from '../site/SiteDental.jsx'
import { FrameChrome } from '../components/BrowserFrame.jsx'
import { adapt, brand as studio, restaurant, salon, dental } from '../site/content.js'
import withStop from '../components/withStop.jsx'
import './SceneAdapt.css'

// In the order of the story; `brand` names the study's tokens (data-brand)
// and the jump target of its card in the opening's fan.
const STUDIES = [
  { brand: 'restaurant', Site: SiteRestaurant, content: restaurant, label: 'ein Restaurant' },
  { brand: 'salon', Site: SiteSalon, content: salon, label: 'einen Barbershop' },
  { brand: 'dental', Site: SiteDental, content: dental, label: 'eine Zahnarztpraxis' },
]

/**
 * Scene 05: Adapt. Viktor's line, then the three businesses one below the
 * other, each in its own browser frame under its context line. Every
 * website builds itself in its own order as it comes up from below
 * (adaptTimeline.js): what a restaurant shows first is not what a
 * practice shows first.
 */
export default function SceneAdapt() {
  return (
    <section className="scene scene--adapt" aria-labelledby="adapt-title">
      <h2 id="adapt-title" className="adapt__message">
        <span className="adapt__message-a">Jede Branche ist anders.</span>{' '}
        <span className="adapt__message-b">
          <span aria-hidden="true">→ </span>
          {withStop('Ihre Website sollte es auch sein.')}
        </span>
        <span className="adapt__message-sub">{adapt.sub}</span>
      </h2>

      <div className="adapt__content">
        {STUDIES.map(({ brand, Site, content, label }) => (
          <div
            className={`adapt__layer adapt__layer--${brand}`}
            data-brand={brand}
            role="group"
            aria-label={`Designstudie von ${studio.name}: Website für ${label}`}
            key={brand}
          >
            <p className="adapt__context">
              {studio.name} <span aria-hidden="true">—</span> {content.context}
            </p>
            <div className="adapt__page">
              <FrameChrome />
              <div className="adapt__site">
                <Site />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
