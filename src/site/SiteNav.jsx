import { company } from './content.js'

/**
 * Demo-site navigation. The demo is a picture of a website inside Viktor's
 * stage, so its links are visual only: no focus stops, no dead targets.
 */
export default function SiteNav() {
  return (
    <div className="site-nav" data-reveal>
      <span className="site-nav__logo">
        <strong>{company.short}</strong> Metallbau
      </span>
      <ul className="site-nav__links">
        {company.nav.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <span className="site-nav__contact">{company.navAction}</span>
    </div>
  )
}
