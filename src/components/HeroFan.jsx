import barbershop640 from '../assets/site/hero-fan-barbershop-640.webp'
import barbershop1100 from '../assets/site/hero-fan-barbershop-1100.webp'
import barbershopM420 from '../assets/site/hero-fan-barbershop-m-420.webp'
import dental640 from '../assets/site/hero-fan-dental-640.webp'
import dental1100 from '../assets/site/hero-fan-dental-1100.webp'
import dentalM420 from '../assets/site/hero-fan-dental-m-420.webp'

// Two more of the studies (Scene 05), as stills of their finished first
// screen, fanned out behind the opening's website: "nach Maß" at a glance.
// Rendered from the live demo pages; the photos in them are the ones in
// media.js (salon, dental) and fall under the same asset audit.
// Back to front: `--k` is the card's distance from the website.
const cards = [
  { key: 'dental', k: 2, small: dental640, large: dental1100, mobile: dentalM420 },
  { key: 'barbershop', k: 1, small: barbershop640, large: barbershop1100, mobile: barbershopM420 },
]

export default function HeroFan() {
  return (
    <div className="hero-fan" aria-hidden="true">
      {cards.map(({ key, k, small, large, mobile }) => (
        <picture className="hero-fan__card" style={{ '--k': k }} key={key}>
          <source media="(max-width: 767.98px)" srcSet={mobile} />
          <img
            src={large}
            srcSet={`${small} 640w, ${large} 1100w`}
            sizes="(max-width: 1099.98px) 69vw, 40vw"
            alt=""
            decoding="async"
          />
        </picture>
      ))}
    </div>
  )
}
