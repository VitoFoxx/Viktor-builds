import SiteFigure from './SiteFigure.jsx'
import { performance } from './content.js'
import './performance.css'

/**
 * Performance as typography. The figures roll in one at a time at the centre
 * and then settle into a spec row (the static layout, which is also the
 * reduced-motion and end state). A measuring line tracks the sequence.
 */
export default function SitePerformance() {
  return (
    <section id="vanta-performance" className="performance" aria-labelledby="performance-title">
      <div className="performance__frame">
        <header className="performance__head">
          <h3 id="performance-title" className="site-label">
            {performance.title}
          </h3>
          <span className="performance__rule" aria-hidden="true">
            <span className="performance__marker" />
          </span>
        </header>
        <dl className="performance__figures">
          {performance.figures.map((figure) => (
            <SiteFigure key={figure.label} {...figure} />
          ))}
        </dl>
      </div>
    </section>
  )
}
