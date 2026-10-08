import SitePhoto from './SitePhoto.jsx'
import { dental, dentalRequest as request } from './content.js'
import './dental-phone.css'

const Line = ({ children }) => (
  <span className="site-line">
    <span className="site-line__inner">{children}</span>
  </span>
)

const Radio = ({ label }) => (
  <li className="pd-option">
    <span className="pd-option__label">{label}</span>
    <span className="pd-option__radio">
      <span className="pd-option__dot" />
    </span>
  </li>
)

/**
 * Design study 04 on a phone (Scene 06 BUSINESS): the practice website
 * from ADAPT, reflowed for a narrow screen, then the short request a new
 * patient sends in the evening. Same brand, same content; on the phone the
 * navigation folds into a menu, the photos and the ways in stack, and the
 * appointment becomes the action bar at the bottom.
 *
 * Laid out in cqw of the phone (the numbers of the practice's mobile
 * layout at 390 px), so it is the same page at every phone size. Each
 * element that has a counterpart on the desktop page is moved from there
 * by businessTimeline.js. Pages sit on top of each other; the timeline
 * pushes them in. Visual only: nothing here is a real control.
 */
export default function SiteDentalPhone() {
  const [concern, facts, when] = request.steps

  return (
    <div className="pd-site">
      <div className="pd-status">
        <span className="pd-status__bg" />
        <span className="pd-status__swap">
          <span className="pd-status__today">{dental.status.today}</span>
          <span className="pd-status__today pd-status__today--closed">{request.closed}</span>
        </span>
        <span className="pd-status__call">{dental.status.call}</span>
      </div>

      <div className="pd-nav">
        <span className="pd-logo">{dental.trade}</span>
        <span className="pd-burger">
          <span />
          <span />
        </span>
        <span className="pd-nav__rule" />
        <span className="pd-progress" />
      </div>

      <div className="pd-pages">
        {/* The practice's start page. */}
        <div className="pd-page pd-page--home">
          <div className="pd-photo pd-photo--reception">
            <div className="pd-photo__img">
              <SitePhoto name="dental.hero" sizes="(min-width: 768px) 12vw, 40vw" />
            </div>
          </div>
          <div className="pd-photo pd-photo--chair">
            <div className="pd-photo__img">
              <SitePhoto name="dental.detail" sizes="(min-width: 768px) 8vw, 24vw" />
            </div>
          </div>

          <div className="pd-intro">
            <p className="pd-eyebrow">{dental.eyebrow}</p>
            <p className="pd-title">
              {dental.headline.map((line) => (
                <Line key={line}>{line}</Line>
              ))}
            </p>
          </div>

          <ul className="pd-needs">
            {dental.needs.map((need, i) => (
              <li className="pd-need" key={need.title}>
                <span className="pd-need__rule" />
                <span className="pd-need__title">{need.title}</span>
                <span className="pd-need__text">{need.text}</span>
                <span className={i === 0 ? 'pd-need__go pd-need__go--call' : 'pd-need__go'}>
                  {i === 0 ? dental.status.call : '→'}
                </span>
              </li>
            ))}
            <li className="pd-needs__end" />
          </ul>
        </div>

        {/* Step 1: the concern. */}
        <div className="pd-page pd-page--step">
          <p className="pd-step">{request.label} · 1 von 3</p>
          <p className="pd-step__title">{concern.title}</p>
          <ul className="pd-options">
            {concern.options.map((option) => (
              <Radio label={option} key={option} />
            ))}
          </ul>
        </div>

        {/* Step 2: two facts the practice needs before the first call. */}
        <div className="pd-page pd-page--step">
          <p className="pd-step">{request.label} · 2 von 3</p>
          <p className="pd-step__title">{facts.title}</p>
          {facts.choices.map((choice) => (
            <div className="pd-choice" key={choice.question}>
              <p className="pd-choice__question">{choice.question}</p>
              <ul className="pd-choice__options">
                {choice.options.map((option) => (
                  <li className="pd-choice__option" key={option}>
                    <span className="pd-choice__fill" />
                    <span className="pd-choice__label">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Step 3: when, and where to call back. */}
        <div className="pd-page pd-page--step">
          <p className="pd-step">{request.label} · 3 von 3</p>
          <p className="pd-step__title">{when.title}</p>
          <ul className="pd-options">
            {when.options.map((option) => (
              <Radio label={option} key={option} />
            ))}
          </ul>
          <p className="pd-field">
            <span className="pd-field__label">{when.phoneLabel}</span>
            <span className="pd-field__box">
              <span className="pd-field__value">{when.phone}</span>
            </span>
          </p>
        </div>

        {/* Sent: what the patient has asked for, in four lines. */}
        <div className="pd-page pd-page--sent">
          <p className="pd-sent__title">
            {request.sent.title.map((line) => (
              <span className="pd-sent__line" key={line}>
                {line}
              </span>
            ))}
          </p>
          <p className="pd-sent__text">{request.sent.text}</p>
          <dl className="pd-summary">
            {request.summary.map((row) => (
              <div className="pd-summary__row" key={row.label}>
                <dt>{row.label}</dt>
                <dd className="pd-summary__value">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* The appointment, now the bar at the bottom; it carries each step's action. */}
      <div className="pd-bar">
        <span className="pd-bar__bg" />
        <span className="pd-bar__press" />
        <span className="pd-bar__labels">
          {[dental.navAction, ...request.steps.map((step) => step.action)].map((label, i) => (
            <span className="pd-bar__label" key={i}>
              {label}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
