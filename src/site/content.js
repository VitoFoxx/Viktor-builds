// Content of the fictional client website shown in Scene 03 / Scene 04.
// Wehrkamp Metallbau is invented: the company name lives only in `company`
// below, so it can be replaced in one place. Contact details are deliberately
// non-functional (.example domain, zero phone number).
//
// Scene 05 will swap this object (plus media.js and the [data-brand] tokens)
// for other industries. Keep the slot structure: name, headline, intro,
// facts, contact.

export const company = {
  name: 'Wehrkamp Metallbau',
  short: 'Wehrkamp',
  legal: 'Wehrkamp Metallbau GmbH',
  nav: [
    { label: 'Betrieb', href: '#betrieb' },
    { label: 'Referenzen', href: '#referenzen' },
    { label: 'Fertigung', href: '#fertigung' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  eyebrow: 'Metallbau · Hannover · Seit 1987',
  headline: ['Treppen.', 'Geländer.', 'Sonder­anfertigungen.'],
  intro: 'Planung und Fertigung in Hannover. Für private Bauherren, Architekten und Bauträger.',
  actions: [
    { label: 'Referenzen ansehen', href: '#referenzen' },
    { label: 'Projekt anfragen', href: '#kontakt' },
  ],
  facts: [
    { title: 'Seit 1987', text: 'Familienbetrieb in zweiter Generation' },
    { title: '14 Mitarbeitende', text: 'Konstruktion, Fertigung, Montage' },
    { title: 'Eigene Fertigung', text: '1.200 m² in Hannover-Vahrenheide' },
  ],
}

export const about = {
  text: 'Wir planen, fertigen und montieren Treppen, Geländer und Stahlbauteile für Wohnhäuser und Gewerbebauten in der Region Hannover. Aufmaß, Konstruktion und Fertigung liegen bei uns im Haus, montiert wird mit eigenen Leuten.',
  data: [
    { label: 'Gegründet', value: '1987' },
    { label: 'Inhaber', value: 'Jens Wehrkamp, Metallbauermeister' },
    { label: 'Einsatzgebiet', value: 'Region Hannover, 60 km' },
    { label: 'Zertifizierung', value: 'DIN EN 1090, EXC 2' },
  ],
}

export const project = {
  kicker: 'Referenz · 2026',
  title: 'Wohnhaus Hannover-Kirchrode',
  text: 'Stahlwangentreppe mit Eichenstufen und einem Geländer aus Flachstahl. Vom Aufmaß im Rohbau bis zur Montage aus einer Hand.',
  sheetTitle: 'Projektdaten',
  sheet: [
    { label: 'Bauherr', value: 'privat' },
    { label: 'Leistung', value: 'Aufmaß, Werkplanung, Fertigung, Montage' },
    { label: 'Treppe', value: 'Stahlwangentreppe, viertelgewendelt, EG–OG' },
    { label: 'Steigungen', value: '16 × 17,8 cm, Auftritt 27 cm' },
    { label: 'Wangen', value: 'Flachstahl S235JR, 15 × 300 mm' },
    { label: 'Stufen', value: 'Eiche massiv, 40 mm, geölt' },
    { label: 'Geländer', value: 'Flachstahl 40 × 8 mm, Handlauf Eiche' },
    { label: 'Oberfläche', value: 'Pulverbeschichtung DB 703' },
    { label: 'Montage', value: '2 Tage, 2 Monteure' },
    { label: 'Fertigstellung', value: 'März 2026' },
  ],
}

export const process = {
  title: 'Von der Zeichnung bis zur Montage.',
  steps: [
    {
      name: 'Planung',
      text: 'Aufmaß vor Ort, danach die Werkzeichnung. Gefertigt wird erst nach Freigabe.',
      spec: 'Werkzeichnung M 1:10 · Freigabe durch Bauherr und Architekt',
      image: 'processPlanung',
    },
    {
      name: 'Fertigung',
      text: 'Zuschnitt, Schweißen und Schleifen in der eigenen Halle.',
      spec: 'MAG-Schweißen · Ausführungsklasse EXC 2 nach DIN EN 1090',
      image: 'processFertigung',
    },
    {
      name: 'Oberfläche',
      text: 'Strahlen, grundieren, pulverbeschichten. Beim Beschichter in der Region.',
      spec: 'Pulverbeschichtung DB 703 · Schichtdicke ca. 80 µm',
      image: 'processOberflaeche',
    },
    {
      name: 'Montage',
      text: 'Eigene Monteure, ein fester Ansprechpartner, eine saubere Übergabe.',
      spec: 'Kirchrode: 2 Tage, 2 Monteure',
      image: 'processMontage',
    },
  ],
}

export const specs = [
  {
    label: 'Werkstoff',
    value: 'S235JR',
    text: 'Unlegierter Baustahl für Wangen, Pfosten und Geländer. Gut schweißbar, überall nachweisbar.',
    image: 'detailStahl',
  },
  {
    label: 'Wangenstärke',
    value: '15 MM',
    text: 'Flachstahl 15 × 300 mm, statisch bemessen. Die Wange trägt die Treppe ohne zusätzliche Stützen.',
    image: 'detailWange',
  },
  {
    label: 'Oberfläche',
    value: 'DB 703',
    text: 'Pulverbeschichtung in Eisenglimmer-Optik. Matt, robust, im Innenraum kaum zu beschädigen.',
    image: 'detailOberflaeche',
  },
]

export const contact = {
  title: 'Sprechen wir über Ihr Projekt.',
  address: ['Wehrkamp Metallbau GmbH', 'Werkstraße 12', '30179 Hannover'],
  hours: 'Mo–Fr 7–16 Uhr',
  action: { label: 'Projekt anfragen', href: 'mailto:anfrage@wehrkamp-metallbau.example' },
  phone: { label: '0511 000 000-0', href: 'tel:+495110000000' },
  email: { label: 'info@wehrkamp-metallbau.example', href: 'mailto:info@wehrkamp-metallbau.example' },
  legal: ['Impressum', 'Datenschutz'],
  demo: 'Fiktives Unternehmen · Demo von Viktor Builds',
}
