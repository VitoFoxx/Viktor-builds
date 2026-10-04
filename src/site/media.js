// The single exchange point for every VANTA image.
//
// The files in src/assets/vanta/ are rendered placeholders. To use real
// photography, drop the files into that folder, change the imports below and,
// if needed, `width`/`height`, `srcSet` and `focus` (CSS object-position).
// Components and CSS do not need to change. All shots must show the same car.
//
//   desktop  ≥ 768 px, landscape crop     mobile  < 768 px, portrait crop
//   srcSet   optional, e.g. `${a800} 800w, ${a1600} 1600w, ${a2400} 2400w`
import hero from '../assets/vanta/hero.svg'
import heroMobile from '../assets/vanta/hero-mobile.svg'
import detailLine from '../assets/vanta/detail-line.svg'
import detailLineMobile from '../assets/vanta/detail-line-mobile.svg'
import detailHeart from '../assets/vanta/detail-heart.svg'
import detailHeartMobile from '../assets/vanta/detail-heart-mobile.svg'
import detailCabin from '../assets/vanta/detail-cabin.svg'
import detailCabinMobile from '../assets/vanta/detail-cabin-mobile.svg'
import product from '../assets/vanta/product.svg'
import productMobile from '../assets/vanta/product-mobile.svg'

const crop = (src, width, height, srcSet) => ({ src, width, height, srcSet })

export const media = {
  hero: {
    desktop: crop(hero, 2400, 1350),
    mobile: crop(heroMobile, 1080, 1920),
    alt: 'VANTA 001 in a dark studio, seen low from the front three-quarter',
    focus: '62% 60%',
  },
  detailLine: {
    desktop: crop(detailLine, 2400, 1350),
    mobile: crop(detailLineMobile, 1080, 1350),
    alt: 'Light running along the hand-formed rear haunch of the carbon body',
    focus: '50% 50%',
  },
  detailHeart: {
    desktop: crop(detailHeart, 2400, 1350),
    mobile: crop(detailHeartMobile, 1080, 1350),
    alt: 'Six polished intake trumpets of the twin-turbo engine',
    focus: '50% 50%',
  },
  detailCabin: {
    desktop: crop(detailCabin, 2400, 1350),
    mobile: crop(detailCabinMobile, 1080, 1350),
    alt: 'Hand-stitched leather steering wheel with a single orange centre mark',
    focus: '50% 40%',
  },
  product: {
    desktop: crop(product, 2400, 1030),
    mobile: crop(productMobile, 1200, 800),
    alt: 'VANTA 001 in pure side profile on a dark studio floor',
    focus: '50% 50%',
  },
}
