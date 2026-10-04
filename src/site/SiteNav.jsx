import { company } from './content.js'

/** Company navigation: used in the hero and, identically, in the fixed header. */
export default function SiteNav({ reveal = false }) {
  return (
    <div className="site-nav" data-reveal={reveal || undefined}>
      <a className="site-nav__logo" href="#top-site">
        <strong>{company.short}</strong> Metallbau
      </a>
      <nav className="site-nav__links" aria-label={company.name}>
        <ul>
          {company.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="site-nav__contact" href="#kontakt">
        Anfrage
      </a>
    </div>
  )
}
