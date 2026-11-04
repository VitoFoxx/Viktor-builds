/**
 * A personal link for outreach: vitoworks.de/?fuer=Bäckerei%20Schmidt
 * The address line of every frame then reads "baeckerei-schmidt.de", the
 * closing ring and the context line name the business, and the request
 * starts with its name filled in. An explicit `&domain=schmidt-hannover.de`
 * wins over the derived address.
 *
 * Read once from the URL, shown as text only (React escapes it). Nothing
 * is stored or sent anywhere.
 */
const MAX_NAME = 40
const MAX_DOMAIN = 48

const clean = (text) => text.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, MAX_NAME)

export function toDomain(name) {
  const slug = name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/&/g, ' und ')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_DOMAIN - 3)
    .replace(/-+$/, '')
  return slug ? `${slug}.de` : ''
}

const DOMAIN = /^(?=.{4,48}$)[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/

function read() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const name = clean(params.get('fuer') ?? '')
  if (!name) return null
  const given = (params.get('domain') ?? '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
  const domain = DOMAIN.test(given) ? given : toDomain(name)
  return domain ? { name, domain } : null
}

export const personal = read()
