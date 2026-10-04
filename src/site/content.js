// Content of the fictional client website shown in Scene 03 / Scene 04.
// Images are placeholders rendered for this demo; swap the imports to replace them.
import hero800 from '../assets/site/hero-800.webp'
import hero1600 from '../assets/site/hero-1600.webp'
import cantilever800 from '../assets/site/cantilever-800.webp'
import cantilever1600 from '../assets/site/cantilever-1600.webp'
import stair800 from '../assets/site/stair-800.webp'
import stair1600 from '../assets/site/stair-1600.webp'
import colonnade800 from '../assets/site/colonnade-800.webp'
import colonnade1600 from '../assets/site/colonnade-1600.webp'
import pavilion800 from '../assets/site/pavilion-800.webp'
import pavilion1600 from '../assets/site/pavilion-1600.webp'

const image = (small, large, width, height, alt) => ({
  src: large,
  srcSet: `${small} 800w, ${large} 1600w`,
  width,
  height,
  alt,
})

export const images = {
  hero: image(hero800, hero1600, 1600, 2000, 'Concrete facade with a single deep window in low evening light'),
  cantilever: image(cantilever800, cantilever1600, 1600, 1100, 'Long cantilevered house floating above a grassy slope'),
  stair: image(stair800, stair1600, 1600, 2000, 'Stone staircase rising through a shaft of daylight'),
  colonnade: image(colonnade800, colonnade1600, 1600, 1100, 'Colonnade casting diagonal shadows across a courtyard floor'),
  pavilion: image(pavilion800, pavilion1600, 1600, 2000, 'Flat-roofed pavilion reflected in still water'),
}

export const studio = {
  name: 'Halden Architects',
  nav: [
    { label: 'Studio', href: '#site-studio' },
    { label: 'Work', href: '#site-work' },
    { label: 'Index', href: '#site-index' },
    { label: 'Contact', href: '#site-contact' },
  ],
  eyebrow: 'Architecture & Interiors, Zurich',
  intro: 'Houses, studios and public rooms, designed to grow quieter and better with time.',
  facts: [
    { title: 'Since 2009', text: 'Independent studio of twelve architects.' },
    { title: '140 projects', text: 'Residential, cultural and civic work.' },
    { title: 'Zurich / Oslo', text: 'Two studios, one practice.' },
  ],
  statement:
    'We design buildings that age with dignity. Every project begins with the site, its light and its silence, and is finished only when nothing more can be taken away.',
}

export const work = [
  { name: 'House on the Slope', place: 'Flims', year: '2024', note: 'A single volume held above the meadow.', image: images.cantilever },
  { name: 'Lindenhof Stair', place: 'Zurich', year: '2023', note: 'A stair as a room for daylight.', image: images.stair },
  { name: 'Courtyard House', place: 'Ticino', year: '2022', note: 'Shade as the main building material.', image: images.colonnade },
  { name: 'Lake Pavilion', place: 'Zug', year: '2021', note: 'One roof, one floor, the water between.', image: images.pavilion },
]

export const index = [
  { name: 'Studio Rämistrasse', type: 'Workplace', place: 'Zurich', year: '2025', image: images.hero },
  ...work.map(({ name, place, year, image }, i) => ({
    name,
    place,
    year,
    image,
    type: ['Residential', 'Civic', 'Residential', 'Cultural'][i],
  })),
  { name: 'Gallery Annex', type: 'Cultural', place: 'Basel', year: '2019', image: images.colonnade },
]

export const contact = {
  title: 'Let’s build something lasting.',
  text: 'We take on a small number of new projects each year. Tell us about your site.',
  details: [
    { label: 'Studio', value: 'Rämistrasse 18, 8001 Zurich' },
    { label: 'Email', value: 'studio@halden.example' },
    { label: 'Phone', value: '+41 44 000 00 00' },
  ],
}
