import BrowserFrame from '../components/BrowserFrame.jsx'
import HeroFan from '../components/HeroFan.jsx'
import withStop from '../components/withStop.jsx'

export default function SceneInterface() {
  return (
    <section className="scene scene--interface" aria-labelledby="scene-interface-title">
      <div className="interface__stack">
        <h2 id="scene-interface-title" className="interface__message">
          <span className="interface__message-a">Von der Idee</span>{' '}
          <span className="interface__message-b">
            <span aria-hidden="true">→ </span>
            {withStop('zur Website.')}
          </span>
        </h2>

        <div className="interface__frame-wrap">
          <HeroFan />
          {/* The website lies on the opening's paper: a soft contact shadow
              that leaves with the paper. */}
          <span className="frame-shadow" aria-hidden="true" />
          <BrowserFrame />
        </div>
      </div>
    </section>
  )
}
