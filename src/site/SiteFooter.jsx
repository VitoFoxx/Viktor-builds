import VantaMark from './VantaMark.jsx'
import { footer } from './content.js'

export default function SiteFooter() {
  return (
    <footer id="vanta-contact" className="site-footer">
      <VantaMark className="site-footer__mark" />
      <dl className="site-footer__contact">
        {footer.contact.map((item) => (
          <div key={item.label}>
            <dt className="site-label">{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="site-footer__note site-label">{footer.note}</p>
    </footer>
  )
}
