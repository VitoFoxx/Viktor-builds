// Content of the Scene 03 / 04 design study: a website for a metalwork
// business. There is deliberately no company name: the wordmark is the
// trade itself, so the demo reads as a study by Viktor Builds, never as a
// client or a reference.
//
// ADAPT (Scene 05) will rebuild these slots per industry, together with
// media.js and the [data-brand] tokens.

export const study = {
  trade: 'Metallbau',
  context: 'Website 01 / Metallbau',
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
