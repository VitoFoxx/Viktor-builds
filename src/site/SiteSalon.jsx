import SitePhoto from './SitePhoto.jsx'
import { salon } from './content.js'
import './salon.css'

const Line = ({ children }) => (
  <span className="site-line">
    <span className="site-line__inner">{children}</span>
  </span>
)

/**
 * Design study 03: a barbershop, rebuilt from the restaurant in ADAPT.
 * The page is a price board: three services as the headline, each with
 * its time and price on the same row, the room as a tall photo beside it
 * (what kind of shop) and booking as service → barber → time. Dark like
 * the shop, a numbered index instead of a menu bar. Links are visual only.
 */
export default function SiteSalon() {
  return (
    <div className="s-site">
      <div className="s-room">
        <SitePhoto name="salon.hero" sizes="(min-width: 768px) 38vw, 100vw" />
      </div>

      <div className="s-razor">
        <SitePhoto name="salon.detail" sizes="(min-width: 768px) 15vw, 36vw" />
      </div>

      <p className="s-logo">{salon.trade}</p>
      <span className="s-nav-action">{salon.navAction}</span>

      <ol className="s-index">
        {salon.index.map((label, i) => (
          <li key={label} data-reveal>
            <span className="s-index__no">{String(i + 1).padStart(2, '0')}</span>
            {label}
          </li>
        ))}
      </ol>

      <p className="s-eyebrow" data-reveal>
        {salon.eyebrow}
      </p>

      <h3 className="s-title">
        {salon.board.map((row) => (
          <Line key={row.word}>{row.word}</Line>
        ))}
      </h3>

      <ul className="s-prices">
        {salon.board.map((row) => (
          <li className="s-price" key={row.word}>
            <span className="s-price__service" data-reveal>
              {row.service}
            </span>
            <span className="s-price__meta" data-reveal>
              <span>{row.time}</span>
              <span className="s-price__amount">{row.price}</span>
            </span>
            <span className="s-price__note" data-reveal>
              {row.note}
            </span>
          </li>
        ))}
      </ul>

      <div className="s-book">
        <ol className="s-steps" data-reveal>
          {salon.steps.map((step, i) => (
            <li key={step}>
              <span className="s-steps__no">{i + 1}</span> {step}
            </li>
          ))}
        </ol>
        <p className="s-action">{salon.action}</p>
        <p className="s-walkin" data-reveal>
          {salon.walkIn}
        </p>
      </div>
    </div>
  )
}
