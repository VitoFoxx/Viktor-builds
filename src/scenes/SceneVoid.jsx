import ScrollHint from '../components/ScrollHint.jsx'
import { brand, hero, result } from '../site/content.js'

/**
 * Scene 01: the opening. Clarity first: who (VITOWORKS), what (websites
 * nach Maß), for whom (Unternehmen), why (they bring customers to act),
 * and the two ways on. The website itself sits in `.hero__visual`: the
 * slot only marks the place, the real browser frame (Scene 02) and the
 * design study (Scene 03) are laid into it by the stage timeline, so the
 * website seen first is the one the visitor later builds and enters.
 *
 * `.void__type` is not part of the opening: RESULT brings the brand and
 * the closing claim back here at the end of the stage.
 */
export default function SceneVoid() {
  return (
    <section className="scene scene--void" aria-labelledby="hero-title">
      <header className="hero__bar">
        <p className="hero__brand">{brand.name}</p>
        <nav className="hero__nav" aria-label="Seitenbereiche">
          {hero.nav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="hero__copy">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="hero__title">
          {hero.claim.map((line) => (
            <span className="hero__line" key={line}>
              <span className="hero__line-inner">
                {line.endsWith('.') ? (
                  <>
                    {line.slice(0, -1)}
                    <span className="hero__stop">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <p className="hero__actions">
          <a className="hero__cta" href="#kontakt">
            {hero.request} <span aria-hidden="true">→</span>
          </a>
          <a className="hero__refs" href="#referenzen">
            {hero.references}
          </a>
        </p>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <span className="hero__measure" />
        <p className="hero__example">{hero.example}</p>
      </div>

      <ScrollHint />

      <div className="void__type" aria-hidden="true">
        <p className="void__title">
          <span className="void__word">
            <span className="void__mask">
              <span className="void__word-inner">{brand.name}</span>
            </span>
          </span>
        </p>
        <p className="void__tagline">{result.claim.line}</p>
      </div>
    </section>
  )
}
