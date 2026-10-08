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
// when can I come? So the page is a price board, the room shows what kind
// of shop it is, and booking runs service → barber → time. Du, short.
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
    { title: 'Neu bei uns', text: 'Was Sie zum ersten Termin mitbringen' },
    { title: 'Leistungen', text: 'Von Prophylaxe bis Zahnersatz' },
  ],
  hoursLabel: 'Sprechzeiten',
  hours: [
    { days: 'Mo – Do', time: '8 – 18 Uhr' },
    { days: 'Fr', time: '8 – 14 Uhr' },
  ],
}
