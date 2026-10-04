// The single exchange point for every client-site image (Scene 03 / 04).
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

const missing = { src: null }

const shot = (id, motif, alt, format, focus = '50% 50%') => ({
  id,
  motif,
  alt,
  format,
  focus,
  desktop: missing,
  mobile: missing,
})

export const media = {
  hero: shot(
    'PROJECT_KIRCHRODE_01',
    'Fertige Stahlwangentreppe im Treppenraum, Tageslicht',
    'Stahlwangentreppe mit Eichenstufen in einem hellen Treppenraum',
    '4:5',
  ),
  projectOverview: shot(
    'PROJECT_KIRCHRODE_02',
    'Totale: Treppe im Wohnraum, Eiche und dunkler Stahl',
    'Wohnraum mit viertelgewendelter Stahlwangentreppe und Eichenstufen',
    '16:9 · mobil 4:5',
  ),
  projectDetail: shot(
    'PROJECT_KIRCHRODE_03',
    'Detail: Anschluss Eichenstufe an Stahlwange, Schraubpunkte',
    'Nahaufnahme einer Eichenstufe, die auf einer dunklen Stahlwange aufliegt',
    '16:9 · mobil 4:5',
  ),
  processPlanung: shot(
    'PROCESS_PLANUNG_01',
    'Werkzeichnung mit Bleistiftnotizen auf der Werkbank',
    'Ausgedruckte Werkzeichnung einer Treppe mit handschriftlichen Notizen',
    '2:1 · mobil 4:5',
  ),
  processFertigung: shot(
    'PROCESS_FERTIGUNG_01',
    'Schweißer an einer Stahlwange, Schutzausrüstung, Halle',
    'Metallbauer schweißt an einer Treppenwange in der Werkstatt',
    '2:1 · mobil 4:5',
  ),
  processOberflaeche: shot(
    'PROCESS_OBERFLAECHE_01',
    'Beschichtete Wangen hängen in der Beschichtungsanlage',
    'Pulverbeschichtete Stahlwangen in einer Beschichtungsanlage',
    '2:1 · mobil 4:5',
  ),
  processMontage: shot(
    'PROCESS_MONTAGE_01',
    'Zwei Monteure setzen die Wange im Rohbau ein',
    'Zwei Monteure richten eine Stahlwange im Treppenhaus aus',
    '2:1 · mobil 4:5',
  ),
  detailStahl: shot(
    'DETAIL_STAHL_01',
    'Makro: verschliffene Schweißnaht an Flachstahl',
    'Nahaufnahme einer verschliffenen Schweißnaht',
    '3:4',
  ),
  detailWange: shot(
    'DETAIL_WANGE_01',
    'Makro: Stirnkante der 15-mm-Wange',
    'Nahaufnahme der Stirnkante einer 15 Millimeter starken Stahlwange',
    '3:4',
  ),
  detailOberflaeche: shot(
    'DETAIL_OBERFLAECHE_01',
    'Makro: Struktur der Pulverbeschichtung DB 703',
    'Nahaufnahme einer matten, grau-metallischen Pulverbeschichtung',
    '3:4',
  ),
  company: shot(
    'COMPANY_WERKSTATT_01',
    'Werkstatt-Totale, Team vor dem offenen Hallentor',
    'Das Team von Wehrkamp Metallbau vor dem Hallentor der Werkstatt',
    '21:9 · mobil 4:5',
  ),
}
