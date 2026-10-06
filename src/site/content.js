// Content of the design studies. There is deliberately no company name:
// the wordmark is the trade itself, so each demo reads as a study by
// Viktor Builds, never as a client or a reference.
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
  menu: [
    { dish: 'Rehrücken, Jus, Quitte', price: '29' },
    { dish: 'Saibling, Lauch, Beurre blanc', price: '24' },
    { dish: 'Kürbis, Polenta, Salbei', price: '19' },
  ],
  reserve: { when: 'Heute · 2 Personen · 19:30', action: 'Tisch reservieren' },
}
