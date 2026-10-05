import { study } from './content.js'

/**
 * Demo-site navigation. The demo is a picture of a website inside Viktor's
 * stage, so its links are visual only: no focus stops, no dead targets.
 * The wordmark is the trade, with a small square mark.
 */
export default function SiteNav() {
  return (
    <div className="site-nav" data-reveal>
      <span className="site-nav__logo">
        <span className="site-nav__mark" aria-hidden="true" />
        {study.trade}
      </span>
      <ul className="site-nav__links">
        {study.nav.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <span className="site-nav__contact">{study.navAction}</span>
    </div>
  )
}
