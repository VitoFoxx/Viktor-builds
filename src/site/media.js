// The single exchange point for every demo-site image (Scene 03 / 04).
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
    '4:5 · mobil 16:10',
  ),
  project: shot(
    'PROJECT_KIRCHRODE_02',
    'Totale: Treppe im Wohnraum, Eiche und dunkler Stahl',
    'Wohnraum mit viertelgewendelter Stahlwangentreppe und Eichenstufen',
    '16:9 · mobil 4:5',
  ),
  workshop: shot(
    'WORKSHOP_01',
    'Werkstatt: Hände an einer Stahlwange, frische Schweißnaht',
    'Hände eines Metallbauers an einer Stahlwange mit verschliffener Schweißnaht',
    '3:2',
  ),
}
