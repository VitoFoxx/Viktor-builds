import ScrollHint from '../components/ScrollHint.jsx'
import HeroFan from '../components/HeroFan.jsx'
import { FrameChrome } from '../components/BrowserFrame.jsx'
import SiteDemo from '../site/SiteDemo.jsx'
import { brand, hero } from '../site/content.js'

// The claim is set in capitals; CSS would spell ß as SS ("MASS").
const capitalSharpS = (text) => text.replace(/ß/g, 'ẞ')

/**
 * Scene 01: the opening. Clarity first: who (VITOWORKS), what (websites
 * nach Maß), for whom (Unternehmen), why (they bring customers to act),
 * and the two ways on. On the right the metalwork study in its browser
 * frame, the website the visitor sees being built next (Scene 02); three
 * more studies fan out behind it (HeroFan). The study is laid out at the
 * screen's width and scaled into the frame (IntroStage.jsx, --hero-s), so
 * it is the same page as below, only smaller.
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
          {hero.claim.map(capitalSharpS).map((line) => (
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
          <a className="hero__refs" href="#beispiele" data-jump="study">
            {hero.references}
          </a>
        </p>
      </div>

      <div className="hero__showcase">
        <div className="hero__visual" aria-hidden="true">
          <HeroFan />
          <span className="frame-shadow" />
          <a className="hero-card frame" href="#beispiele" data-jump="study" tabIndex={-1}>
            <FrameChrome />
            <div className="hero-card__page">
              <div className="hero-card__site site" data-brand="metallbau">
                <SiteDemo />
              </div>
            </div>
          </a>
          <p className="hero__example">{hero.example}</p>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
