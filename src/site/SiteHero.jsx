import SiteImage from './SiteImage.jsx'
import VantaMark from './VantaMark.jsx'
import { brand } from './content.js'
import { media } from './media.js'
import './site.css'

/**
 * Scene 03 → 04: the hero of the fictional client website VANTA.
 * Rendered as a layer of the pinned stage. The photo first appears exactly
 * on the image area of the mock in BrowserFrame and floods the page from
 * there (resolve), then the view moves in until it fills the screen (enter).
 * The nav uses the mock's cqw grid, so the abstract nav sharpens into it.
 */
export default function SiteHero() {
  return (
    <section className="scene scene--site site" data-brand="vanta" aria-labelledby="site-title">
      <div className="portal__clip">
        <div className="portal__content">
          <div className="site-hero">
            <div className="site-hero__media">
              <div className="site-hero__img">
                <SiteImage image={media.hero} eager />
              </div>
              <span className="site-hero__shade" aria-hidden="true" />
            </div>

            <header className="site-nav" data-reveal>
              <a className="site-nav__logo" href="#vanta-001">
                <VantaMark className="site-nav__mark" />
              </a>
              <nav className="site-nav__links" aria-label={brand.name}>
                <ul>
                  {brand.nav.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a className="site-nav__enquire" href={brand.enquire.href}>
                {brand.enquire.label}
              </a>
            </header>

            <div className="site-hero__copy">
              <p className="site-label" data-reveal>
                {brand.eyebrow}
              </p>
              <h2 id="site-title" className="site-hero__title">
                {brand.headline.map((line) => (
                  <span className="site-line" key={line}>
                    <span className="site-line__inner">{line}</span>
                  </span>
                ))}
              </h2>
            </div>

            <p className="site-hero__meta site-label" data-reveal>
              {brand.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
