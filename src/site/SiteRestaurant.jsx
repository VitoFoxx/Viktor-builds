import SitePhoto from './SitePhoto.jsx'
import { restaurant } from './content.js'
import './restaurant.css'

const Line = ({ children }) => (
  <span className="site-line">
    <span className="site-line__inner">{children}</span>
  </span>
)

/**
 * Design study 02: a restaurant, rebuilt from the metalwork study in
 * ADAPT. One screen, image first: the open kitchen, the cook anchored to
 * its lower edge, then "Heute" with the reservation and the evening's
 * menu. Like SiteDemo it is a picture of a website: links are visual only.
 */
export default function SiteRestaurant() {
  return (
    <div className="r-site">
      <div className="r-hero__media">
        <div className="r-hero__img">
          <SitePhoto name="restaurant.hero" sizes="(min-width: 768px) 75vw, 100vw" />
        </div>
      </div>

      <div className="r-nav" data-reveal>
        <span className="r-nav__menu">{restaurant.navMenu}</span>
        <span className="r-nav__logo">{restaurant.trade}</span>
        <span className="r-nav__reserve">{restaurant.navAction}</span>
      </div>

      <div className="r-hero__copy">
        <p className="r-eyebrow" data-reveal>
          {restaurant.eyebrow}
        </p>
        <h3 className="r-hero__title">
          {restaurant.headline.map((line) => (
            <Line key={line}>{line}</Line>
          ))}
        </h3>
      </div>

      <div className="r-chef">
        <SitePhoto name="restaurant.detail" sizes="(min-width: 768px) 22vw, 42vw" />
      </div>

      <div className="r-today">
        <p className="r-today__label" data-reveal>
          {restaurant.today.label}
        </p>
        <p className="r-today__hours" data-reveal>
          {restaurant.today.hours}
        </p>
        <p className="r-reserve" data-reveal>
          <span className="r-reserve__when">{restaurant.reserve.when}</span>
          <span className="r-reserve__action">{restaurant.reserve.action}</span>
        </p>
      </div>

      <div className="r-menu">
        <p className="r-menu__label" data-reveal>
          {restaurant.menuLabel}
        </p>
        <ul>
          {restaurant.menu.map((item) => (
            <li className="r-menu__item" key={item.dish} data-reveal>
              <span>{item.dish}</span>
              <span className="r-menu__price">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
