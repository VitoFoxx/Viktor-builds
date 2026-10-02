import BrowserFrame from '../components/BrowserFrame.jsx'

export default function SceneInterface() {
  return (
    <section className="scene scene--interface" aria-labelledby="scene-interface-title">
      <div className="interface__stack">
        <h2 id="scene-interface-title" className="interface__message">
          <span className="interface__message-a">From an idea</span>{' '}
          <span className="interface__message-b">
            <span aria-hidden="true">→ </span>to an experience.
          </span>
        </h2>

        <div className="interface__frame-wrap">
          {/* The impulse: a point of light that stretches into a line and
              splits into the frame's top and bottom edges. */}
          <span className="impulse impulse__dot" aria-hidden="true" />
          <span className="impulse impulse__line impulse__line--top" aria-hidden="true" />
          <span className="impulse impulse__line impulse__line--bottom" aria-hidden="true" />
          <BrowserFrame />
        </div>
      </div>
    </section>
  )
}
