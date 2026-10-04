// Copy of the fictional client website VANTA (Scene 03 / 04).
// Images live in media.js.
import { media } from './media.js'

export const brand = {
  name: 'VANTA',
  nav: [
    { label: 'Vehicles', href: '#vanta-001' },
    { label: 'Atelier', href: '#vanta-details' },
    { label: 'Performance', href: '#vanta-performance' },
  ],
  enquire: { label: 'Enquire', href: '#vanta-contact' },
  eyebrow: 'VANTA / 001 — Hand-built restomod',
  headline: ['Built around', 'the driver.'],
  meta: ['Series of 25', 'Atelier München'],
}

export const details = [
  {
    id: 'line',
    title: 'The Line',
    text: 'A hand-formed carbon body. The silhouette of 1973, every panel made new.',
    spec: 'Carbon body · 1,180 kg dry',
    image: media.detailLine,
  },
  {
    id: 'heart',
    title: 'The Heart',
    text: 'A 4.0-litre twin-turbo six, assembled from first bolt to last by one engineer.',
    spec: '4.0 L twin-turbo six',
    image: media.detailHeart,
  },
  {
    id: 'cabin',
    title: 'The Cabin',
    text: 'Leather stitched by hand, aluminium machined from solid. Nothing that does not need to be there.',
    spec: 'Hand-stitched · 212 hours',
    image: media.detailCabin,
  },
]

export const performance = {
  title: 'Performance',
  figures: [
    { value: '640', unit: 'HP', label: 'Output', note: 'at 7,200 rpm' },
    { value: '780', unit: 'NM', label: 'Torque', note: '2,500–6,000 rpm' },
    { value: '3.2', unit: 'S', label: '0–100 km/h', note: 'with launch control' },
  ],
}

export const product = {
  name: 'VANTA',
  model: '001',
  intro: 'The first VANTA. Twenty-five cars, each one built for a single driver over fourteen months.',
  specs: [
    { label: 'Engine', value: '4.0 L twin-turbo six' },
    { label: 'Power', value: '640 HP' },
    { label: 'Torque', value: '780 NM' },
    { label: '0–100 km/h', value: '3.2 s' },
    { label: 'Dry weight', value: '1,180 kg' },
    { label: 'Production', value: '25 cars' },
  ],
  links: [
    { label: 'Explore VANTA / 001', href: '#vanta-specs', primary: true },
    { label: 'Build yours', href: '#vanta-contact' },
  ],
  image: media.product,
}

export const footer = {
  note: 'VANTA is a fictional brand. Designed and built by Viktor Builds.',
  contact: [
    { label: 'Atelier', value: 'München' },
    { label: 'Commissions', value: 'build@vanta.example' },
  ],
}
