// Section heading of the client site: "(01) Studio" over a hairline rule.
export default function SiteLabel({ id, index, children }) {
  return (
    <div className="site-label">
      <h3 id={id} className="site-label__title">
        <span className="site-label__index">({index})</span> {children}
      </h3>
      <span className="site-rule" aria-hidden="true" />
    </div>
  )
}
