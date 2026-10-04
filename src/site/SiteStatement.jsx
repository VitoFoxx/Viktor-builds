import SiteLabel from './SiteLabel.jsx'
import { studio } from './content.js'

export default function SiteStatement() {
  const words = studio.statement.split(' ')

  return (
    <section id="site-studio" className="site-section site-statement" aria-labelledby="site-studio-title">
      <SiteLabel id="site-studio-title" index="01">
        Studio
      </SiteLabel>
      {/* Words are split so the statement can be read in with the scroll. */}
      <p className="site-statement__text">
        {words.map((word, i) => (
          <span className="site-statement__word" key={i}>
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
