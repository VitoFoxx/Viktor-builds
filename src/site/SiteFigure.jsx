// One performance figure. Every digit is a column of 0–9 (twice, so even a
// zero rolls a full turn) that GSAP rolls to its value like a mechanical
// counter. The readable value is the visually hidden text.
const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10)

export default function SiteFigure({ value, unit, label, note }) {
  return (
    <div className="figure">
      <dt className="figure__label site-label">
        {label}
        <span className="figure__note">{note}</span>
      </dt>
      <dd className="figure__value">
        <span className="sr-only">
          {value} {unit}
        </span>
        <span className="figure__digits" aria-hidden="true">
          {[...value].map((char, i) =>
            /\d/.test(char) ? (
              <span className="figure__digit" key={i}>
                <span className="figure__reel" data-value={char} style={{ "--d": char }}>
                  {DIGITS.map((d, j) => (
                    <span key={j}>{d}</span>
                  ))}
                </span>
              </span>
            ) : (
              <span className="figure__char" key={i}>
                {char}
              </span>
            ),
          )}
          <span className="figure__unit">{unit}</span>
        </span>
      </dd>
    </div>
  )
}
