import SiteNav from './SiteNav.jsx'
import SitePhoto from './SitePhoto.jsx'
import { study, project, details } from './content.js'
import './site.css'

const Line = ({ children }) => (
  <span className="site-line">
    <span className="site-line__inner">{children}</span>
  </span>
)

/**
 * The Scene 03 / 04 design study: one short page built from slots
 * (nav, hero, project, details) that ADAPT will rebuild per industry.
 * The hero mirrors the mock in BrowserFrame (same cqw grid), so the abstract
 * page sharpens into this one instead of being replaced by it.
 */
export default function SiteDemo() {
  return (
    <div className="site-demo">
      <div className="site-hero">
        <SiteNav />

        <div className="site-hero__main">
          <div className="site-hero__copy">
            <p className="site-eyebrow" data-reveal>
              {study.eyebrow}
            </p>
            <h3 className="site-hero__title">
              {study.headline.map((line) => (
                <Line key={line}>{line}</Line>
              ))}
            </h3>
            <p className="site-hero__text" data-reveal>
              {study.text}
            </p>
            <p className="site-hero__actions" data-reveal>
              {study.actions.map((action) => (
                <span className={action.primary ? 'site-link site-link--primary' : 'site-link'} key={action.label}>
                  {action.label}
                </span>
              ))}
            </p>
          </div>

          <div className="site-hero__media">
            <div className="site-hero__img">
              <SitePhoto name="metallbau.hero" sizes="(min-width: 768px) 45vw, 90vw" priority />
            </div>
          </div>
        </div>

        <ul className="site-facts">
          {study.facts.map((fact) => (
            <li className="site-facts__item" key={fact.title} data-reveal>
              <span className="site-facts__title">{fact.title}</span>
              <span className="site-facts__text">{fact.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-project">
        <div className="site-project__media">
          <div className="site-project__img">
            <SitePhoto name="metallbau.project" />
          </div>
        </div>
        <p className="site-project__caption">
          <Line>
            <strong>{project.title}</strong>
          </Line>
          <Line>{project.type}</Line>
          <Line>{project.year}</Line>
        </p>
      </div>

      <dl className="site-details">
        {details.map((item) => (
          <div className="site-details__item" key={item.label}>
            <dt className="site-details__label">{item.label}</dt>
            <dd className="site-details__value">
              <Line>{item.value}</Line>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
