/** Chapter of the client site: index, label and a hairline across the grid. */
export function SiteHead({ index, label }) {
  return (
    <div className="mb-head">
      <span className="mb-head__index">{index}</span>
      <span className="mb-head__label">{label}</span>
      <span className="mb-rule" aria-hidden="true" />
    </div>
  )
}
