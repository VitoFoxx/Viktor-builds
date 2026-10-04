import SiteLabel from './SiteLabel.jsx'
import { contact, studio } from './content.js'

export default function SiteContact() {
  return (
    <section id="site-contact" className="site-contact" aria-labelledby="site-contact-title">
      <div className="site-section site-contact__inner">
        <SiteLabel id="site-contact-title" index="04">
          Contact
        </SiteLabel>
        <p className="site-contact__title">{contact.title}</p>
        <p className="site-contact__text">{contact.text}</p>
        <dl className="site-contact__details">
          {contact.details.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <footer className="site-footer">
        <span className="site-footer__mask" aria-hidden="true">
          <span className="site-footer__mark">Halden</span>
        </span>
        <p className="site-footer__meta">
          <span>© 2026 {studio.name}</span>
          <span>A fictional studio, designed and built by Viktor Builds.</span>
        </p>
      </footer>
    </section>
  )
}
