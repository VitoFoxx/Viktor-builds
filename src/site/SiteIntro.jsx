import { SiteHead } from './SiteSection.jsx'
import { about } from './content.js'

/** 01 Betrieb: who the company is, in one paragraph and four facts. */
export default function SiteIntro() {
  return (
    <section className="mb-section mb-intro" id="betrieb" aria-label="Betrieb">
      <SiteHead index="01" label="Betrieb" />
      <div className="mb-grid">
        <p className="mb-intro__text">{about.text}</p>
        <dl className="mb-data">
          {about.data.map((item) => (
            <div className="mb-data__item" key={item.label}>
              <dt className="mb-label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
