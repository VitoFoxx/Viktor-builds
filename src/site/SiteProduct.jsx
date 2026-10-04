import SiteImage from './SiteImage.jsx'
import { product } from './content.js'
import './product.css'

/**
 * VANTA / 001. The studio lights come on bank by bank, then the specs and the
 * two calls to action. Its timeline ends on the label `handoff`, where
 * Scene 05 will later continue (see experienceTimeline.js).
 */
export default function SiteProduct() {
  return (
    <section id="vanta-001" className="product" aria-labelledby="product-title">
      <div className="product__stage">
        <h3 id="product-title" className="product__title">
          <span className="site-line">
            <span className="site-line__inner">{product.name}</span>
          </span>
          <span className="site-line">
            <span className="site-line__inner">
              <span className="product__slash" aria-hidden="true">/</span>
              <span className="sr-only"> </span>
              {product.model}
            </span>
          </span>
        </h3>
        <div className="product__figure">
          <SiteImage className="product__img" image={product.image} />
          <span className="product__lights" aria-hidden="true">
            <span className="product__light" />
            <span className="product__light" />
            <span className="product__light" />
          </span>
        </div>
      </div>

      <div className="product__body">
        <p className="product__intro" data-reveal>
          {product.intro}
        </p>
        <dl id="vanta-specs" className="product__specs">
          {product.specs.map((spec) => (
            <div className="product__spec" key={spec.label}>
              <span className="product__rule" aria-hidden="true" />
              <dt className="site-label">{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="product__links">
          {product.links.map((link, i) => (
            <li key={link.label}>
              <a className={`product__link${link.primary ? ' product__link--primary' : ''}`} href={link.href}>
                <span className="product__rule" aria-hidden="true" />
                <span className="product__link-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="product__link-label">{link.label}</span>
                <span className="product__link-arrow" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
