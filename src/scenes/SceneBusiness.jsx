import SiteDentalPhone from '../site/SiteDentalPhone.jsx'
import withStop from '../components/withStop.jsx'
import { address, brand, business, dentalRequest } from '../site/content.js'
import { summaryFor, useAnswers } from '../site/visitorChoice.js'
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
 * Scene 06: Business. The practice from ADAPT, now on a phone: the
 * request comes in the evening, from a phone. A new patient sends a short
 * request (the visitor may answer it themselves); the next morning the
 * practice finds it in four plain lines. Viktor's level (his line, the
 * time, the entry) stays in his type, around the phone, never inside it.
 *
 * The one place of the page that holds still for a while: the scene
 * comes up from below, stays while the request is made (a phone has to
 * hold still to be used), then moves on upwards (`.business__pin` is
 * sticky, `.business__hold` the distance it holds, businessTimeline.js).
 *
 * Without motion: the line, then the evening (phone with the sent request)
 * next to the morning (the entry).
 */
export default function SceneBusiness() {
  // The entry shows what the visitor picked on the phone.
  const summary = summaryFor(useAnswers())

  return (
    <section className="scene scene--business" aria-labelledby="business-title">
      <div className="business__pin">
        <h2 id="business-title" className="business__message">
          <span className="business__message-a">{business.line[0]}</span>{' '}
          <span className="business__message-b">{withStop(business.line[1])}</span>
        </h2>

        {/* The two moments of the story, swapped in place; read out below. */}
        <div className="business__time" aria-hidden="true">
          <Mark time={business.evening} modifier="evening" />
          <Mark time={business.morning} modifier="morning" />
          <p className="time__hint">{business.hint}</p>
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
              <span className="device__url">{address}</span>
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
            {summary.map((row) => (
              <div className="entry__row" key={row.label}>
                <dt className="entry__label">{row.label}</dt>
                <dd className="entry__value">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="business__hold" aria-hidden="true" />
    </section>
  )
}
