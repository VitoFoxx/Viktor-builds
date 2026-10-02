export default function ScrollHint() {
  return (
    <div className="scroll-hint">
      <div className="scroll-hint__inner">
        <span className="scroll-hint__label">Scroll to explore</span>
        <span className="scroll-hint__track" aria-hidden="true">
          <span className="scroll-hint__line" />
        </span>
      </div>
    </div>
  )
}
