import SiteNav from './SiteNav.jsx'
import SitePhoto from './SitePhoto.jsx'
import { company } from './content.js'
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
    <section className="scene scene--site site" data-brand="metallbau" aria-labelledby="site-title" id="top-site">
      <div className="portal__clip">
        <div className="portal__content">
          <div className="site-hero">
            <SiteNav reveal />

            <div className="site-hero__main">
              <div className="site-hero__copy">
                <p className="site-eyebrow" data-reveal>
                  {company.eyebrow}
                </p>
                <h2 id="site-title" className="site-hero__title">
                  {company.headline.map((line, i) => (
                    <span className="site-line" key={i}>
                      <span className="site-line__inner">{line}</span>
                    </span>
                  ))}
                </h2>
                <p className="site-hero__text" data-reveal>
                  {company.intro}
                </p>
                <div className="site-hero__actions" data-reveal>
                  {company.actions.map((action) => (
                    <a className="site-link" href={action.href} key={action.href}>
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="site-hero__media">
                <div className="site-hero__img">
                  <SitePhoto name="hero" sizes="(min-width: 768px) 45vw, 90vw" eager />
                </div>
              </div>
            </div>

            <ul className="site-facts">
              {company.facts.map((fact) => (
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
