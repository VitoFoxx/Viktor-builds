import SiteImage from './SiteImage.jsx'
import { details } from './content.js'
import './details.css'

/**
 * Vehicle detail sequence. Desktop: one pinned frame, the chapters cut into
 * each other like a film edit. Mobile and reduced motion: stacked chapters.
 */
export default function SiteDetails() {
  return (
    <section id="vanta-details" className="details" aria-label="Details">
      <div className="details__frame">
        {details.map((item, i) => (
          <article className="detail" key={item.id} aria-labelledby={`detail-${item.id}`}>
            <div className="detail__figure">
              <SiteImage className="detail__img" image={item.image} />
              <span className="detail__shade" aria-hidden="true" />
            </div>
            <div className="detail__caption">
              <p className="detail__num site-label">
                <span className="site-line">
                  <span className="site-line__inner">{String(i + 1).padStart(2, '0')} / 03</span>
                </span>
              </p>
              <h3 id={`detail-${item.id}`} className="detail__title">
                <span className="site-line">
                  <span className="site-line__inner">{item.title}</span>
                </span>
              </h3>
              <p className="detail__text">
                <span className="site-line">
                  <span className="site-line__inner">{item.text}</span>
                </span>
              </p>
              <p className="detail__spec site-label">
                <span className="site-line">
                  <span className="site-line__inner">{item.spec}</span>
                </span>
              </p>
            </div>
          </article>
        ))}

        <ol className="details__index" aria-hidden="true">
          {details.map((item, i) => (
            <li className="details__index-item" key={item.id}>
              <span className="details__index-num">{String(i + 1).padStart(2, '0')}</span>
              {item.title}
            </li>
          ))}
        </ol>
        <span className="details__progress" aria-hidden="true">
          <span className="details__progress-bar" />
        </span>
      </div>
    </section>
  )
}
