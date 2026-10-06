// The single exchange point for every demo-site image (Scene 03 – 05),
// grouped by industry: media.<branche>.<slot>. Components ask for a slot
// by path, e.g. <SitePhoto name="metallbau.hero" />.
//
// NO VISUAL ASSET SUBSTITUTION: while `src` is null, SitePhoto renders a
// neutral grey placeholder labelled `IMAGE / <id>`. Never replace a missing
// photo with drawings, gradients or shapes.
//
// To add a real photo: put the files in src/assets/site/, import them here
// and fill `desktop` / `mobile` (src, width, height, optional srcSet).
// Components and CSS do not change.
//
//   desktop  ≥ 768 px     mobile  < 768 px (falls back to desktop if null)
//   focus    CSS object-position of the crop
//   format   intended aspect ratio, printed on the placeholder
//   source   origin and licence, for the asset audit before launch
//
// Crops, retouching and black-and-white conversion are baked into the
// files (originals and steps: see the PR that added them).

import kirchrode1600 from '../assets/site/project-kirchrode-01-1600.webp'
import kirchrode800 from '../assets/site/project-kirchrode-01-800.webp'
import kirchrodeM800 from '../assets/site/project-kirchrode-01-m-800.webp'
import metallbauDetail1200 from '../assets/site/metallbau-detail-01-1200.webp'
import metallbauDetail800 from '../assets/site/metallbau-detail-01-800.webp'
import restaurantHero1600 from '../assets/site/restaurant-hero-01-1600.webp'
import restaurantHero800 from '../assets/site/restaurant-hero-01-800.webp'
import restaurantDetail960 from '../assets/site/restaurant-detail-01-960.webp'
import restaurantDetail480 from '../assets/site/restaurant-detail-01-480.webp'

const missing = { src: null }

const shot = (id, motif, alt, format, focus = '50% 50%') => ({
  id,
  motif,
  alt,
  format,
  focus,
  desktop: missing,
  mobile: missing,
  source: null,
})

const pexels = (photographer, url) => ({ site: 'Pexels', license: 'Pexels License', photographer, url })

// Two widths of one file: the larger one is the default src.
const file = (large, largeW, small, smallW, ratio) => ({
  src: large,
  width: largeW,
  height: Math.round(largeW * ratio),
  srcSet: `${small} ${smallW}w, ${large} ${largeW}w`,
})

export const media = {
  // 01 Metallbau: black and white throughout.
  metallbau: {
    // Fertigung: retouched (jacket logo removed), cropped below the helmet top.
    hero: {
      ...shot(
        'METALLBAU_DETAIL_01',
        'Schweißer an einem Stahlrahmen, Funkenflug, Werkstatt',
        'Metallbauer mit Schweißhelm schweißt einen Rahmen aus Stahlrohr, Funken fliegen',
        'quer · mobil 16:10',
        '50% 54%',
      ),
      desktop: file(metallbauDetail1200, 1200, metallbauDetail800, 800, 4400 / 3510),
      source: pexels('Halil İbrahim Altıparmak', 'https://www.pexels.com/photo/19926190/'),
    },
    // Referenzprojekt: the full-bleed project photo.
    project: {
      ...shot(
        'PROJECT_KIRCHRODE_01',
        'Außentreppe aus Stahl mit Seilgeländer an einem Gewerbebau',
        'Lange Stahltreppe mit Edelstahl-Seilgeländer vor einer Glasfassade, schwarz-weiß',
        '16:9 · mobil 4:5',
        '50% 60%',
      ),
      desktop: file(kirchrode1600, 1600, kirchrode800, 800, 3208 / 4812),
      mobile: { src: kirchrodeM800, width: 800, height: 1000 },
      source: pexels('Martijn Stoof', 'https://www.pexels.com/photo/36345818/'),
    },
  },

  // 02 Restaurant: colour, warm working light.
  restaurant: {
    // Retouched (stickers on the hood), cropped (blurred foreground at the edges).
    hero: {
      ...shot(
        'RESTAURANT_HERO_01',
        'Offene Küche am Pass: Abzugshaube, Pfannen, Tellerstapel',
        'Offene Restaurantküche mit hängenden Pfannen, Abzugshaube aus Edelstahl und gestapelten Tellern',
        '16:9 · mobil 4:5',
        '50% 42%',
      ),
      desktop: file(restaurantHero1600, 1600, restaurantHero800, 800, 1576 / 2420),
      source: pexels('Maria Orlova', 'https://www.pexels.com/photo/4947388/'),
    },
    // Cropped to 4:5, the second cook's face is outside the frame.
    detail: {
      ...shot(
        'RESTAURANT_DETAIL_01',
        'Koch richtet einen Teller an, Sauce vom Löffel',
        'Koch gießt mit einem Löffel Sauce über einen angerichteten Teller',
        '4:5',
        '50% 50%',
      ),
      desktop: file(restaurantDetail960, 960, restaurantDetail480, 480, 1.25),
      source: pexels('cottonbro studio', 'https://www.pexels.com/photo/4253312/'),
    },
  },
}
