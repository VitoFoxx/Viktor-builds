import SitePhoto from './SitePhoto.jsx'
import { dental } from './content.js'
import './dental.css'

const Line = ({ children }) => (
  <span className="site-line">
    <span className="site-line__inner">{children}</span>
  </span>
)

/**
 * Design study 04: a dental practice, rebuilt from the barbershop in ADAPT,
 * and the last state of ADAPT. It starts with the visitor's concern: today's
 * hours and the phone in a bar on top, the question "Wobei können wir Ihnen
 * helfen?" with four ways in (acute pain first, by phone), then the
 * practice in two photos. Calm, legible, Sie. Links are visual only.
 *
 * BUSINESS (Scene 06) will continue from exactly this page: .d-status
 * (open / closed) and .d-nav__action (the appointment) are its hooks.
 */
export default function SiteDental() {
  return (
    <div className="d-site">
      <p className="d-status" data-reveal>
        <span className="d-status__today">{dental.status.today}</span>
        <span className="d-status__links">
          <span>{dental.status.call}</span>
          <span className="d-status__emergency">{dental.status.emergency}</span>
        </span>
      </p>

      <div className="d-nav">
        <span className="d-nav__logo">{dental.trade}</span>
        <ul className="d-nav__links">
          {dental.nav.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <span className="d-nav__action">{dental.navAction}</span>
      </div>

      <div className="d-intro">
        <p className="d-eyebrow" data-reveal>
          {dental.eyebrow}
        </p>
        <h3 className="d-title">
          {dental.headline.map((line) => (
            <Line key={line}>{line}</Line>
          ))}
        </h3>
      </div>

      <ul className="d-needs">
        {dental.needs.map((need, i) => (
          <li className={i === 0 ? 'd-need d-need--acute' : 'd-need'} key={need.title} data-reveal>
            <span className="d-need__title">{need.title}</span>
            <span className="d-need__text">{need.text}</span>
            <span className="d-need__go" aria-hidden="true">
              {i === 0 ? dental.status.call : '→'}
            </span>
          </li>
        ))}
      </ul>

      <div className="d-reception">
        <SitePhoto name="dental.hero" sizes="(min-width: 768px) 27vw, 56vw" />
      </div>

      <dl className="d-hours">
        <dt className="d-hours__label" data-reveal>
          {dental.hoursLabel}
        </dt>
        {dental.hours.map((row) => (
          <dd className="d-hours__row" key={row.days} data-reveal>
            <span>{row.days}</span>
            <span>{row.time}</span>
          </dd>
        ))}
      </dl>

      <div className="d-chair">
        <SitePhoto name="dental.detail" sizes="(min-width: 768px) 17vw, 30vw" />
      </div>
    </div>
  )
}
