import { hero } from '../site/content.js'

export default function ScrollHint() {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <div className="scroll-hint__inner">
        <span className="scroll-hint__label">{hero.scroll}</span>
        <span className="scroll-hint__icon">
          <svg className="scroll-hint__arrow" viewBox="0 0 12 18" width="12" height="18">
            <path d="M6 1v15M1.5 11.5 6 16l4.5-4.5" />
          </svg>
        </span>
      </div>
    </div>
  )
}
