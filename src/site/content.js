// Content of the design studies. There is deliberately no company name:
// the wordmark is the trade itself, so each demo reads as a study by
// VITOWORKS, never as a client or a reference.
//
// 01 Metallbau: Scene 03 / 04. 02 Restaurant: rebuilt from it in ADAPT
// (Scene 05), with its own layout, type and priorities, not new colours
// on the same page.

export const study = {
  trade: 'Metallbau',
  context: 'Website 01 / Metallbau',
  nav: ['Projekte', 'Leistungen', 'Kontakt'],
  navAction: 'Anfrage',
  eyebrow: 'Metallbau · Hannover',
  headline: ['Metallbau.', 'Ohne Umwege.'],
  text: 'Treppen, Geländer und Sonderanfertigungen aus Stahl. Geplant und gefertigt in Hannover.',
  actions: [{ label: 'Projekte ansehen' }, { label: 'Anfrage stellen', primary: true }],
  factsLabel: 'Leistungen',
  facts: [
    { title: 'Treppen', text: 'Stahlwangen, gewendelt, gerade' },
    { title: 'Geländer', text: 'Flachstahl, innen und außen' },
    { title: 'Sonderanfertigungen', text: 'Nach Zeichnung oder Aufmaß' },
  ],
}

// Follows the photo (PROJECT_KIRCHRODE_01): a commercial exterior stair,
// not a private house. The ID keeps its original name.
export const project = {
  title: 'Außentreppe Bürogebäude',
  type: 'Stahltreppe / Seilgeländer',
  year: '2026',
}

export const details = [
  { label: 'Werkstoff', value: 'S235JR' },
  { label: 'Wange', value: '15 MM' },
  { label: 'Oberfläche', value: 'DB 703' },
]

// 02 Restaurant. Its visitors ask first: open today, what is cooking,
// is there a table? So the page starts with the room and "Heute".
// Prices use old-style figures (see restaurant.css).
export const restaurant = {
  trade: 'Restaurant',
  context: 'Website 02 / Restaurant',
  navMenu: 'Karte',
  navAction: 'Reservieren',
  eyebrow: 'Offene Küche · Hannover',
  headline: ['Gekocht wird', 'vor Ihren Augen.'],
  today: { label: 'Heute', hours: 'Geöffnet ab 17 Uhr' },
  menuLabel: 'Aus der Karte',
  menu: [
    { dish: 'Rehrücken, Jus, Quitte', price: '29' },
    { dish: 'Saibling, Lauch, Beurre blanc', price: '24' },
    { dish: 'Kürbis, Polenta, Salbei', price: '19' },
  ],
  reserve: { when: 'Heute · 2 Personen · 19:30', action: 'Tisch reservieren' },
}

// 03 Barbershop. Its visitors ask: what do they do, what does it cost,
// what will it look like, when can I come? So the page reads service →
// style → appointment: a price board, one line on the cut (with the room
// as the shop's look), and booking as service → barber → time. Du, short.
export const salon = {
  trade: 'Barbershop',
  context: 'Website 03 / Barbershop',
  eyebrow: 'Herrenfriseur und Barbier · Linden',
  index: ['Preise', 'Barbiere', 'Laden'],
  navAction: 'Termin',
  board: [
    { word: 'Schnitt.', service: 'Haarschnitt', note: 'Schere oder Maschine, mit Waschen', time: '30 Min', price: '32 €' },
    { word: 'Bart.', service: 'Bart in Form', note: 'Konturen mit der Klinge', time: '20 Min', price: '22 €' },
    { word: 'Rasur.', service: 'Nassrasur', note: 'Heißes Tuch, Klinge, Balsam', time: '30 Min', price: '28 €' },
  ],
  style: 'Klassisch geschnitten, mit der Klinge nachgezogen.',
  steps: ['Leistung', 'Barbier', 'Uhrzeit'],
  action: 'Termin wählen',
  walkIn: 'Ohne Termin? Komm Di – Fr zwischen 10 und 13 Uhr vorbei.',
}

// 04 Zahnarztpraxis. Its visitors arrive with a concern, not with time to
// read: the page starts with their question and four ways in, opening
// hours and the phone always in view. Sie, calm, no promises.
// BUSINESS (Scene 06) continues from this page: `status` and `action`
// are the elements it will pick up.
export const dental = {
  trade: 'Zahnarztpraxis',
  context: 'Website 04 / Zahnarztpraxis',
  status: { today: 'Heute geöffnet · 8 – 18 Uhr', call: 'Anrufen', emergency: 'Notdienst' },
  nav: ['Leistungen', 'Team', 'Praxis'],
  navAction: 'Termin vereinbaren',
  eyebrow: 'Hannover-List · alle Kassen und privat',
  headline: ['Wobei können wir', 'Ihnen helfen?'],
  needs: [
    { title: 'Akute Beschwerden', text: 'Schmerzen, Schwellung oder ein Unfall' },
    { title: 'Termin vereinbaren', text: 'Kontrolle, Reinigung oder Behandlung' },
    { title: 'Neupatient', text: 'Was Sie zum ersten Termin mitbringen' },
    { title: 'Leistungen', text: 'Von Prophylaxe bis Zahnersatz' },
  ],
  hoursLabel: 'Sprechzeiten',
  hours: [
    { days: 'Mo – Do', time: '8 – 18 Uhr' },
    { days: 'Fr', time: '8 – 14 Uhr' },
  ],
}

// Scene 06 BUSINESS: the same practice website, evening, on a phone. A new
// patient asks for an appointment in three short steps (concern, two
// facts, when and where to call back). Only organisational details: no
// symptoms, no diagnosis, no promise. `summary` is what the practice finds
// the next morning, word for word.
export const dentalRequest = {
  closed: 'Geschlossen · morgen ab 8 Uhr',
  label: 'Terminanfrage',
  steps: [
    {
      title: 'Worum geht es?',
      options: ['Akute Beschwerden', 'Kontrolle oder Reinigung', 'Laufende Behandlung', 'Etwas anderes'],
      action: 'Weiter',
    },
    {
      title: 'Zwei kurze Fragen',
      choices: [
        { question: 'Waren Sie schon bei uns?', options: ['Ja', 'Nein'], picked: 1 },
        { question: 'Wie sind Sie versichert?', options: ['Gesetzlich', 'Privat'], picked: 0 },
      ],
      action: 'Weiter',
    },
    {
      title: 'Wann passt es Ihnen?',
      options: ['So früh wie möglich', 'Diese Woche', 'Nächste Woche'],
      phoneLabel: 'Rückrufnummer',
      phone: '0151 •••• 2047',
      action: 'Anfrage senden',
    },
  ],
  sent: {
    title: ['Danke.', 'Ihre Anfrage ist da.'],
    text: 'Wir rufen Sie morgen ab 8 Uhr zurück.',
  },
  summary: [
    { label: 'Anliegen', value: 'Akute Beschwerden' },
    { label: 'Patient', value: 'Neu · gesetzlich versichert' },
    { label: 'Termin', value: 'So früh wie möglich' },
    { label: 'Rückruf', value: '0151 •••• 2047' },
  ],
}

// Scene 07 RESULT: the next website in the count is the visitor's.
export const yours = { context: 'Website 05 / Ihr Unternehmen' }

// The brand. Viktor is the person, VITOWORKS the name of the studio.
export const brand = { name: 'VITOWORKS' }

// The opening screen: who, what, for whom, why it matters, in that order.
// `example` names the website shown in the frame, so it reads as an
// example of the work, never as the page's own business.
export const hero = {
  nav: [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  eyebrow: 'Webdesign und Entwicklung',
  claim: ['Websites', 'nach Maß.'],
  sub: 'Individuelle Websites für Unternehmen, die nicht nur gut aussehen, sondern Kunden zum Handeln bringen.',
  request: 'Projekt anfragen',
  references: 'Referenzen',
  example: 'Beispiel: Website für einen Metallbaubetrieb',
  scroll: 'Scrollen, um mehr zu erfahren',
}

export const adapt = {
  sub: 'Maßgeschneidert auf Ihr Unternehmen, Ihre Kunden und Ihre Ziele.',
}

export const business = {
  line: ['Eine Website kann mehr', 'als gut aussehen.'],
  evening: { clock: 'Di 21:47', state: 'Praxis geschlossen', spoken: 'Dienstag, 21:47 Uhr' },
  morning: { clock: 'Mi 07:30', state: 'Vor der Sprechstunde', spoken: 'Mittwoch, 7:30 Uhr' },
  entry: 'Eingang über die Website · Di 21:47',
}

// Scene 07 RESULT, the contact area. Viktor's own page: German, Sie,
// short. Fields marked "einzutragen" are Viktor's to fill in before the
// launch; empty values are simply not shown (no invented contact data).
export const result = {
  claim: { address: 'ihr-unternehmen.de', name: brand.name, line: 'Websites, die Kunden zum Handeln bringen.' },
  eyebrow: `${brand.name} · Webdesign und Entwicklung`,
  title: ['Individuelle Websites', 'für Unternehmen.'],
  lead: 'Ich bin Viktor und baue Websites, die zu Ihrem Unternehmen passen und Ihre Kunden gezielt zur Anfrage, Buchung oder Kontaktaufnahme führen.',
  offer: [
    { title: 'Individuelle Websites', text: 'Aufbau, Gestaltung und Texte richten sich nach Ihrem Betrieb und Ihren Kunden.' },
    { title: 'Modernes Webdesign', text: 'Klare Typografie, kurze Ladezeiten, am Smartphone so gut bedienbar wie am Schreibtisch.' },
    { title: 'Animation und Interaktion', text: 'Bewegung dort, wo sie etwas zeigt oder durch die Seite führt.' },
    { title: 'Fokus auf Ergebnis', text: 'Die Seite ist dafür gebaut, dass aus Besuchern Anfragen, Termine und Kunden werden.' },
    { title: 'DSGVO-gerecht', text: 'Datenschutz von Anfang an mitgedacht.' },
    { title: 'SEO-optimiert', text: 'Technisch sauber aufgebaut, damit Suchmaschinen Ihre Inhalte verstehen können.' },
  ],
  services: ['Konzept', 'Design', 'Entwicklung', 'Hosting', 'Pflege'],
  cta: 'Projekt anfragen',
}

export const request = {
  title: 'Projekt anfragen',
  text: 'Drei kurze Angaben genügen für den Anfang. Alles Weitere besprechen wir persönlich.',
  steps: [
    {
      label: 'Ihr Unternehmen',
      question: 'Was macht Ihr Unternehmen?',
      placeholder: 'z. B. Tischlerei mit eigener Werkstatt',
    },
    {
      label: 'Ziel',
      question: 'Was soll die Website erreichen?',
      hint: 'Mehrere möglich',
      options: ['Mehr Anfragen', 'Termine oder Buchungen online', 'Besser gefunden werden', 'Ein zeitgemäßer Auftritt'],
    },
    {
      label: 'Zeitrahmen und Kontakt',
      question: 'Wann soll es losgehen?',
      options: ['So bald wie möglich', 'In den nächsten Monaten', 'Noch offen'],
      name: 'Ihr Name',
      contact: 'E-Mail oder Telefon',
    },
  ],
  submit: 'Projekt anfragen',
  note: 'Beim Absenden öffnet sich Ihr E-Mail-Programm mit der fertigen Nachricht. Gespeichert wird nichts.',
  sent: {
    title: ['Danke.', 'Ihre Anfrage ist fertig.'],
    text: 'Sie liegt in Ihrem E-Mail-Programm bereit. Bitte dort noch absenden.',
    again: 'Nicht geöffnet? Noch einmal öffnen',
  },
  subject: 'Projektanfrage',
}

// Einzutragen: Viktor's real details. Empty = not shown.
export const contact = {
  email: '',
  phone: '',
  phoneHref: '',
  region: '',
  imprintUrl: '',
  privacyUrl: '',
}

export const footer = {
  line: `${brand.name} — Individuelle Websites für Unternehmen.`,
  note: `Alle gezeigten Websites sind Designstudien von ${brand.name}.`,
  imprint: 'Impressum',
  privacy: 'Datenschutz',
}
