import { FrameChrome, MockPage } from '../components/BrowserFrame.jsx'
import withStop from '../components/withStop.jsx'
import SiteDemo from '../site/SiteDemo.jsx'
import { brand, study } from '../site/content.js'
import './SceneInterface.css'

/**
 * Scene 02 – 04: from the idea to the website, and through it. One
 * browser frame in the page flow. It comes up from below as a plan (the
 * mock, grey bars) that builds itself element by element as it enters;
 * then the plan gives way, bottom up, to the real metalwork study, and the
 * visitor scrolls on through that website inside its frame, at the speed
 * of their own scroll (studyTimeline.js). The browser bar stays at the top
 * of the screen while the page passes, so it always reads as a website
 * shown by VITOWORKS, never as a page of its own.
 *
 * Without motion: the line, the label and the finished study.
 */
export default function SceneInterface() {
  return (
    <section className="scene scene--interface" id="beispiele" aria-labelledby="scene-interface-title">
      <h2 id="scene-interface-title" className="interface__message">
        <span className="interface__message-a">Von der Idee</span>{' '}
        <span className="interface__message-b">
          <span aria-hidden="true">→ </span>
          {withStop('zur Website.')}
        </span>
      </h2>

      <p className="study__label">{study.label}</p>

      <div className="study frame">
        <FrameChrome />
        <div
          className="study__page site"
          data-brand="metallbau"
          role="group"
          aria-label={`Designstudie von ${brand.name}: Website für einen ${study.trade}betrieb`}
        >
          <div className="study__content">
            <SiteDemo />
          </div>
          <MockPage />
        </div>
      </div>
    </section>
  )
}
