// Content of the demo client website shown in Scene 03 / Scene 04.
// Wehrkamp Metallbau is invented and only a secondary demo name: it lives in
// `company` below and can be replaced in one place. Contact details are
// deliberately non-functional (zero phone number).
//
// Scene 05 (ADAPT) will swap these slots per industry, together with
// media.js and the [data-brand] tokens. Keep the slot structure:
// nav, eyebrow, headline, text, actions, facts, project, details, cta.

export const company = {
  name: 'Wehrkamp Metallbau',
  short: 'Wehrkamp',
  nav: ['Projekte', 'Leistungen', 'Kontakt'],
  navAction: 'Anfrage',
  eyebrow: 'Metallbau · Hannover',
  headline: ['Metallbau.', 'Ohne Umwege.'],
  text: 'Treppen, Geländer und Sonderanfertigungen aus Stahl. Geplant und gefertigt in Hannover.',
  actions: [{ label: 'Projekte ansehen' }, { label: 'Anfrage stellen', primary: true }],
  facts: [
    { title: 'Treppen', text: 'Stahlwangen, gewendelt, gerade' },
    { title: 'Geländer', text: 'Flachstahl, innen und außen' },
    { title: 'Sonderanfertigungen', text: 'Nach Zeichnung oder Aufmaß' },
  ],
}

export const project = {
  title: 'Wohnhaus Hannover-Kirchrode',
  type: 'Stahlwangentreppe / Eiche',
  year: '2026',
}

export const details = [
  { label: 'Werkstoff', value: 'S235JR' },
  { label: 'Wange', value: '15 MM' },
  { label: 'Oberfläche', value: 'DB 703' },
]

export const cta = {
  headline: ['Ihre Treppe beginnt', 'mit einem Aufmaß.'],
  action: 'Anfrage stellen',
  phone: '0511 000 000-0',
}
