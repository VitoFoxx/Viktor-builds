import ProjectRequest from '../components/ProjectRequest.jsx'
import { result, request, contact, footer } from '../site/content.js'
import './SceneResult.css'

const Legal = ({ href, children }) => (href ? <a href={href}>{children}</a> : <span>{children}</span>)

/**
 * Scene 07: Result, the part after the pinned stage. The stage has just
 * closed the ring (ihr-unternehmen.de → VIKTOR BUILDS / WEBSITES, DIE KUNDEN ZUM HANDELN BRINGEN.);
 * here Viktor Builds says plainly what it offers, and "Projekt anfragen"
 * is the one thing to do. Normal page flow, so the request is comfortable
 * to fill in. Calm on purpose: no scroll animation.
 *
 * Without motion the stage has no ring closure, so the section opens with
 * it in plain type.
 */
export default function SceneResult() {
  const direct = [
    contact.email && { label: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: contact.phone, href: `tel:${contact.phoneHref || contact.phone}` },
  ].filter(Boolean)

  return (
    <section className="result" aria-labelledby="result-title">
      <div className="result__ring">
        <p className="result__address">{result.claim.address}</p>
        <p className="result__name">{result.claim.name}</p>
        <p className="result__claim">{result.claim.line}</p>
      </div>

      <header className="result__intro">
        <p className="result__eyebrow">{result.eyebrow}</p>
        <h2 id="result-title" className="result__title">
          {result.title[0]} <span>{result.title[1]}</span>
        </h2>
        <p className="result__lead">{result.lead}</p>
        <a className="result__cta" href="#kontakt">
          {result.cta} <span aria-hidden="true">→</span>
        </a>
      </header>

      <ol className="result__offer" id="leistungen">
        {result.offer.map((item, i) => (
          <li className="offer" key={item.title}>
            <span className="offer__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="offer__title">{item.title}</h3>
            <p className="offer__text">{item.text}</p>
          </li>
        ))}
      </ol>

      <p className="result__services">
        {result.services.map((service, i) => (
          <span key={service}>
            {i > 0 && <span aria-hidden="true"> · </span>}
            {service}
          </span>
        ))}
      </p>

      <div className="request" id="kontakt" aria-labelledby="request-title" role="region">
        <div className="request__intro">
          <h2 id="request-title" className="request__title">
            {request.title}
          </h2>
          <p className="request__text">{request.text}</p>
          {direct.length > 0 && (
            <ul className="request__direct">
              {direct.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          )}
          {contact.region && <p className="request__region">{contact.region}</p>}
        </div>
        <ProjectRequest />
      </div>
    </section>
  )
}

// The page's last line: what Viktor Builds does, and the legal links.
export function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footer__line">{footer.line}</p>
      <p className="footer__note">{footer.note}</p>
      <p className="footer__legal">
        <Legal href={contact.imprintUrl}>{footer.imprint}</Legal>
        <Legal href={contact.privacyUrl}>{footer.privacy}</Legal>
      </p>
    </footer>
  )
}
