import SitePhoto from './SitePhoto.jsx'
import { SiteHead } from './SiteSection.jsx'
import { company, contact } from './content.js'

/**
 * 05 Kontakt: the company comes together again in one calm composition.
 * Its end state is the `handoff` for Scene 05, which will swap these same
 * slots (name, headline, photo, contact) for other industries.
 */
export default function SiteClosing() {
  return (
    <section className="mb-section mb-closing" id="kontakt" aria-labelledby="closing-title">
      <div className="mb-closing__stage">
        <SiteHead index="05" label="Kontakt" />

        <figure className="mb-closing__fig">
          <SitePhoto name="company" />
        </figure>

        <div className="mb-grid mb-closing__cols">
          <div className="mb-closing__col mb-closing__col--brand">
            <p className="mb-closing__mark">
              <strong>{company.short}</strong> Metallbau
            </p>
            <h2 id="closing-title" className="mb-closing__title">
              {contact.title}
            </h2>
          </div>
          <address className="mb-closing__col mb-closing__col--address">
            {contact.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span className="mb-closing__muted">{contact.hours}</span>
          </address>
          <div className="mb-closing__col mb-closing__col--contact">
            <a className="site-link" href={contact.action.href}>
              {contact.action.label}
            </a>
            <a href={contact.phone.href}>{contact.phone.label}</a>
            <a href={contact.email.href}>{contact.email.label}</a>
          </div>
        </div>

        <footer className="site-footer">
          <span>© 2026 {company.legal}</span>
          <span className="site-footer__legal">
            {contact.legal.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
          <span className="site-footer__demo">{contact.demo}</span>
        </footer>
      </div>
    </section>
  )
}
