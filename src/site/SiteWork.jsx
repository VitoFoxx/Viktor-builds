import SiteImage from './SiteImage.jsx'
import SiteLabel from './SiteLabel.jsx'
import { work } from './content.js'

/**
 * Desktop (motion): pinned split, all images share the left column and wipe
 * over each other while the list on the right follows.
 * Mobile / reduced motion: each project is a simple card with its image.
 */
export default function SiteWork() {
  return (
    <section id="site-work" className="site-section site-work" aria-labelledby="site-work-title">
      <SiteLabel id="site-work-title" index="02">
        Selected work
      </SiteLabel>
      <ol className="work">
        {work.map((project, i) => (
          <li className="work__item" key={project.name}>
            <figure className="work__figure">
              <SiteImage image={project.image} sizes="(min-width: 768px) 46vw, 90vw" className="work__img" />
            </figure>
            <div className="work__text">
              <span className="work__index">0{i + 1}</span>
              <h4 className="work__name">{project.name}</h4>
              <p className="work__meta">
                {project.place}, {project.year}
              </p>
              <p className="work__note">{project.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
