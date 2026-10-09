import { hero } from '../site/content.js'

export default function ScrollHint() {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <div className="scroll-hint__inner">
        <span className="scroll-hint__track">
          <span className="scroll-hint__line" />
        </span>
        <span className="scroll-hint__label">{hero.scroll}</span>
      </div>
    </div>
  )
}
