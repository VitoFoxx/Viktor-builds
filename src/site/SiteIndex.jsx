import SiteImage from './SiteImage.jsx'
import SiteLabel from './SiteLabel.jsx'
import { index } from './content.js'

export default function SiteIndex() {
  return (
    <section id="site-index" className="site-section site-index" aria-labelledby="site-index-title">
      <SiteLabel id="site-index-title" index="03">
        Index
      </SiteLabel>
      <ul className="index">
        {index.map((row, i) => (
          <li className="index__row" key={row.name} data-preview={i}>
            <span className="index__name">{row.name}</span>
            <span className="index__type">{row.type}</span>
            <span className="index__place">{row.place}</span>
            <span className="index__year">{row.year}</span>
          </li>
        ))}
      </ul>
      {/* Pointer preview (desktop only). Decorative: every project is named in the list. */}
      <div className="index__preview" aria-hidden="true">
        {index.map((row) => (
          <SiteImage image={{ ...row.image, alt: '' }} sizes="22vw" className="index__preview-img" key={row.name} />
        ))}
      </div>
    </section>
  )
}
