import SitePhoto from './SitePhoto.jsx'
import { SiteHead } from './SiteSection.jsx'
import { specs } from './content.js'

/** 04 Material: three technical facts, set very large, each with a macro photo. */
export default function SiteSpecs() {
  return (
    <section className="mb-section mb-specs" id="material" aria-label="Material">
      <SiteHead index="04" label="Material" />
      {specs.map((spec) => (
        <article className="mb-spec" key={spec.value}>
          <p className="mb-label mb-spec__label">{spec.label}</p>
          <h3 className="mb-spec__value">
            <span className="mb-spec__value-inner">{spec.value}</span>
          </h3>
          <p className="mb-spec__text">{spec.text}</p>
          <figure className="mb-spec__fig">
            <SitePhoto name={spec.image} sizes="(min-width: 768px) 30vw, 90vw" />
          </figure>
        </article>
      ))}
    </section>
  )
}
