import barbershop640 from '../assets/site/hero-fan-barbershop-640.webp'
import barbershop1100 from '../assets/site/hero-fan-barbershop-1100.webp'
import barbershopM420 from '../assets/site/hero-fan-barbershop-m-420.webp'
import restaurant640 from '../assets/site/hero-fan-restaurant-640.webp'
import restaurant1100 from '../assets/site/hero-fan-restaurant-1100.webp'
import restaurantM420 from '../assets/site/hero-fan-restaurant-m-420.webp'
import dental640 from '../assets/site/hero-fan-dental-640.webp'
import dental1100 from '../assets/site/hero-fan-dental-1100.webp'
import dentalM420 from '../assets/site/hero-fan-dental-m-420.webp'

// Three more of the studies (Scene 05), as stills of their finished first
// screen, fanned out behind the opening's website: "nach Maß" at a glance.
// Rendered from the live demo pages; the photos in them are the ones in
// media.js (restaurant, salon, dental) and fall under the same asset audit.
// Back to front: `--k` is the card's distance from the website.
//
// Each card is a way in: a click glides to the moment its website stands
// in ADAPT (`jump`, a label of the master timeline). Pointer only: the
// keyboard way in is the opening's "Beispiele" link.
const cards = [
  { key: 'dental', k: 3, small: dental640, large: dental1100, mobile: dentalM420, name: 'Zahnarztpraxis', jump: 'dentalBuilt' },
  { key: 'barbershop', k: 2, small: barbershop640, large: barbershop1100, mobile: barbershopM420, name: 'Barbershop', jump: 'salonBuilt' },
  { key: 'restaurant', k: 1, small: restaurant640, large: restaurant1100, mobile: restaurantM420, name: 'Restaurant', jump: 'restaurantBuilt' },
]

export default function HeroFan() {
  return (
    <div className="hero-fan" aria-hidden="true">
      {cards.map(({ key, k, small, large, mobile, name, jump }) => (
        <a className="hero-fan__card" style={{ '--k': k }} key={key} href="#beispiele" data-jump={jump} tabIndex={-1}>
          <picture>
            <source media="(max-width: 767.98px)" srcSet={mobile} />
            <img
              src={large}
              srcSet={`${small} 640w, ${large} 1100w`}
              sizes="(max-width: 1099.98px) 69vw, 40vw"
              alt=""
              decoding="async"
            />
          </picture>
          <span className="hero-fan__tag">
            {name} <span aria-hidden="true">→</span>
          </span>
        </a>
      ))}
    </div>
  )
}
