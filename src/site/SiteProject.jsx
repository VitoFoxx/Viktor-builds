import SitePhoto from './SitePhoto.jsx'
import { SiteHead } from './SiteSection.jsx'
import { project } from './content.js'

/**
 * 02 Referenz: one project, staged large. Static layout stacks title,
 * photos and data sheet; on desktop the stage pins and the photos open to
 * full screen before the data sheet builds up (createProject).
 */
export default function SiteProject() {
  return (
    <section className="mb-section mb-project" id="referenzen" aria-labelledby="project-title">
      <div className="mb-project__stage">
        <SiteHead index="02" label="Referenz" />

        <div className="mb-project__intro">
          <p className="mb-label">{project.kicker}</p>
          <h2 id="project-title" className="mb-h2">
            {project.title}
          </h2>
          <p className="mb-project__text">{project.text}</p>
        </div>

        {/* Measuring slots for the pinned layout: where the photos rest. */}
        <span className="mb-project__slot mb-project__slot--intro" aria-hidden="true" />
        <span className="mb-project__slot mb-project__slot--sheet" aria-hidden="true" />

        <figure className="mb-project__fig mb-project__fig--overview">
          <SitePhoto name="projectOverview" />
        </figure>
        <figure className="mb-project__fig mb-project__fig--detail">
          <SitePhoto name="projectDetail" />
        </figure>

        <div className="mb-sheet">
          <h3 className="mb-label mb-sheet__title">{project.sheetTitle}</h3>
          <dl>
            {project.sheet.map((row) => (
              <div className="mb-sheet__row" key={row.label}>
                <span className="mb-sheet__rule" aria-hidden="true" />
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
