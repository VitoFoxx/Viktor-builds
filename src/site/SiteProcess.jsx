import SitePhoto from './SitePhoto.jsx'
import { SiteHead } from './SiteSection.jsx'
import { process } from './content.js'

/**
 * 03 Fertigung: four documentary photos, each with one short caption.
 * No step boxes: on desktop the stage pins, every photo wipes over the
 * previous one and its caption replaces the last (createProcess).
 */
export default function SiteProcess() {
  return (
    <section className="mb-section mb-process" id="fertigung" aria-labelledby="process-title">
      <div className="mb-process__stage">
        <div className="mb-process__top">
          <SiteHead index="03" label="Fertigung" />
          <p className="mb-process__terms" aria-hidden="true">
            {process.steps.map((step) => (
              <span className="mb-process__term" key={step.name}>
                {step.name}
                <span className="mb-process__term-rule" />
              </span>
            ))}
          </p>
        </div>

        <h2 id="process-title" className="mb-h2 mb-process__title">
          {process.title}
        </h2>

        <ol className="mb-process__steps">
          {process.steps.map((step) => (
            <li className="mb-process__step" key={step.name}>
              <figure className="mb-process__fig">
                <SitePhoto name={step.image} />
              </figure>
              <div className="mb-process__caption">
                <h3 className="mb-process__name">
                  <span className="mb-mask__inner">{step.name}</span>
                </h3>
                <p className="mb-process__text">
                  <span className="mb-mask__inner">{step.text}</span>
                </p>
                <p className="mb-process__spec mb-label">
                  <span className="mb-mask__inner">{step.spec}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
