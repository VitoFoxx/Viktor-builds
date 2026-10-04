import './BrowserFrame.css'

// Decorative mock of a website being built. The real message lives in the
// Scene 02 heading, so the mock is hidden from assistive technology.
export default function BrowserFrame() {
  return (
    <div className="frame" aria-hidden="true">
      <div className="frame__chrome">
        <span className="frame__dots">
          <span className="frame__dot" />
          <span className="frame__dot" />
          <span className="frame__dot" />
        </span>
        <span className="frame__url">your-business.com</span>
      </div>

      <div className="frame__page">
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
                <span className="mock-line__inner">BUILT AROUND</span>
              </span>
              <span className="mock-line">
                <span className="mock-line__inner">THE DRIVER.</span>
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
    </div>
  )
}
