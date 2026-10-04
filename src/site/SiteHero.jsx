import SiteImage from './SiteImage.jsx'
import { images, studio } from './content.js'
import './site.css'

/**
 * Scene 03 → 04: the hero of the fictional client website.
 * Rendered as a layer of the pinned stage: it appears inside the browser
 * frame (resolve) and then grows to fill the viewport (enter). Its layout
 * mirrors the mock in BrowserFrame (same cqw grid), so the abstract page
 * sharpens into this one instead of being replaced by it.
 */
export default function SiteHero() {
  return (
    <section className="scene scene--site site" aria-labelledby="site-title">
      <div className="portal__clip">
        <div className="portal__content">
          <div className="site-hero">
            <header className="site-nav" data-reveal>
              <span className="site-nav__logo">
                <span className="site-nav__mark" aria-hidden="true" />
                {studio.name}
              </span>
              <nav className="site-nav__links" aria-label={studio.name}>
                <ul>
                  {studio.nav.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a className="site-nav__contact" href="#site-contact">
                Contact
              </a>
            </header>

            <div className="site-hero__main">
              <div className="site-hero__copy">
                <p className="site-eyebrow" data-reveal>
                  {studio.eyebrow}
                </p>
                <h2 id="site-title" className="site-hero__title">
                  <span className="site-line">
                    <span className="site-line__inner">Built to be</span>
                  </span>{' '}
                  <span className="site-line">
                    <em className="site-line__inner">remembered.</em>
                  </span>
                </h2>
                <p className="site-hero__text" data-reveal>
                  {studio.intro}
                </p>
                <div className="site-hero__actions" data-reveal>
                  <a className="site-btn site-btn--primary" href="#site-work">
                    View work
                  </a>
                  <a className="site-btn site-btn--ghost" href="#site-studio">
                    The studio
                  </a>
                </div>
              </div>

              <div className="site-hero__media">
                <div className="site-hero__img">
                  <SiteImage image={images.hero} sizes="(min-width: 768px) 45vw, 90vw" eager />
                </div>
              </div>
            </div>

            <ul className="site-facts">
              {studio.facts.map((fact) => (
                <li className="site-facts__item" key={fact.title} data-reveal>
                  <span className="site-facts__title">{fact.title}</span>
                  <span className="site-facts__text">{fact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
