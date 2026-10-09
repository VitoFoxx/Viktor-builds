import SiteDentalPhone from '../site/SiteDentalPhone.jsx'
import withStop from '../components/withStop.jsx'
import { brand, business, dentalRequest } from '../site/content.js'
import './SceneBusiness.css'

const Mark = ({ time, modifier }) => (
  <p className={`time__mark time__mark--${modifier}`}>
    <span className="time__mask">
      <span className="time__clock">{time.clock}</span>
    </span>
    <span className="time__mask">
      <span className="time__state">{time.state}</span>
    </span>
  </p>
)

/**
 * Scene 06: Business. A layer of the pinned stage, over the practice where
 * ADAPT left it. The browser frame becomes a phone (the request comes in
 * the evening, from a phone) and the practice website reflows into it.
 * A new patient sends a short request; the next morning the practice finds
 * it in four plain lines. Viktor's level (his line, the time, the entry,
 * "Projekt anfragen") stays in his type, around the phone, never inside it.
 *
 * Without motion: the line, then the evening (phone with the sent request)
 * next to the morning (the entry), then "Projekt anfragen".
 */
export default function SceneBusiness() {
  return (
    <section className="scene scene--business" aria-labelledby="business-title">
      <h2 id="business-title" className="business__message">
        <span className="business__message-a">{business.line[0]}</span>{' '}
        <span className="business__message-b">{withStop(business.line[1])}</span>
      </h2>

      {/* The two moments of the story, swapped in place; read out below. */}
      <div className="business__time" aria-hidden="true">
        <Mark time={business.evening} modifier="evening" />
        <Mark time={business.morning} modifier="morning" />
      </div>

      <p className="business__sr">
        {business.evening.spoken}: {business.evening.state}.
      </p>
      <div
        className="business__device"
        role="group"
        aria-label={`Designstudie von ${brand.name}: die Website der Zahnarztpraxis auf dem Smartphone. Ein neuer Patient fragt am Abend in drei Schritten einen Termin an: Anliegen, zwei kurze Fragen, Rückrufnummer.`}
      >
        <div className="device__shell" />
        <div className="device__screen" data-brand="dental">
          <div className="device__chrome" />
          <div className="device__bar" aria-hidden="true">
            <span className="device__clock">{business.evening.clock.split(' ')[1]}</span>
            <span className="device__url">ihr-unternehmen.de</span>
          </div>
          <div className="device__ground" />
          <div className="device__site" aria-hidden="true">
            <SiteDentalPhone />
          </div>
          <div className="device__dim" />
        </div>
      </div>

      <p className="business__sr">
        {business.morning.spoken}: {business.morning.state}.
      </p>
      <div className="business__entry">
        <p className="entry__head">{business.entry}</p>
        <dl className="entry__list">
          {dentalRequest.summary.map((row) => (
            <div className="entry__row" key={row.label}>
              <dt className="entry__label">{row.label}</dt>
              <dd className="entry__value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Small and late on purpose: RESULT makes it the main action. */}
      <a className="business__cta" href="#kontakt">
        {business.cta} <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}
