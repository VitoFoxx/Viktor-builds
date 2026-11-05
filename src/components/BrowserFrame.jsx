import { address } from '../site/content.js'
import './BrowserFrame.css'

/**
 * The browser bar every website of the page is shown in: three dots and
 * the address (the visitor's own with a personal link, see personal.js).
 * Decorative: what the frame holds is named by the line above it.
 */
export function FrameChrome() {
  return (
    <div className="frame__chrome" aria-hidden="true">
      <span className="frame__dots">
        <span className="frame__dot" />
        <span className="frame__dot" />
        <span className="frame__dot" />
      </span>
      <span className="frame__url">{address}</span>
    </div>
  )
}

/**
 * The website as a plan (Scene 02): grey bars where the content will be.
 * It lies over the first screen of the real study and is built as it
 * comes up from below; then the real page takes its place
 * (studyTimeline.js). Same cqw grid as the study's hero (site.css).
 */
export function MockPage() {
  return (
    <div className="frame__page" aria-hidden="true">
      <div className="mock-nav">
        <span className="mock-nav__logo">
          <span className="mock-nav__mark" />
          <span className="mock-bar mock-bar--logo" />
        </span>
        <span className="mock-nav__links">
          <span className="mock-bar mock-nav__link" />
          <span className="mock-bar mock-nav__link" />
          <span className="mock-bar mock-nav__link" />
          <span className="mock-bar mock-nav__link" />
        </span>
        <span className="mock-nav__burger">
          <span />
          <span />
        </span>
      </div>

      <div className="mock-hero">
        <div className="mock-hero__copy">
          <span className="mock-bar mock-bar--eyebrow" />
          <div className="mock-hero__title">
            <span className="mock-line">
              <span className="mock-line__inner">Metallbau.</span>
            </span>
            <span className="mock-line">
              <span className="mock-line__inner">Ohne Umwege.</span>
            </span>
          </div>
          <span className="mock-bar mock-bar--text" />
          <span className="mock-bar mock-bar--text mock-bar--short" />
          <span className="mock-hero__actions">
            <span className="mock-btn mock-btn--primary" />
            <span className="mock-btn mock-btn--ghost" />
          </span>
        </div>
        <div className="mock-hero__media">
          <span className="mock-hero__media-inner" />
        </div>
      </div>

      <div className="mock-cols">
        {[0, 1, 2].map((i) => (
          <div className="mock-col" key={i}>
            <span className="mock-col__rule" />
            <span className="mock-bar mock-bar--col-title" />
            <span className="mock-bar mock-bar--col-text" />
          </div>
        ))}
      </div>
    </div>
  )
}
