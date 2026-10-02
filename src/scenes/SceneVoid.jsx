import ScrollHint from '../components/ScrollHint.jsx'

export default function SceneVoid() {
  return (
    <section className="scene scene--void" aria-labelledby="scene-void-title">
      <div className="void__type">
        <h1 id="scene-void-title" className="void__title">
          <span className="void__word void__word--a">
            <span className="void__mask">
              <span className="void__word-inner">Viktor</span>
            </span>
          </span>{' '}
          <span className="void__word void__word--b">
            <span className="void__mask">
              <span className="void__word-inner">Builds</span>
            </span>
          </span>
        </h1>
        <p className="void__tagline">
          <span className="void__tagline-inner">Websites that move.</span>
        </p>
      </div>
      <ScrollHint />
    </section>
  )
}
