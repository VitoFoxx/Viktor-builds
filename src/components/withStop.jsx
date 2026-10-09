/* A line's closing full stop in the accent, as in the opening claim. */
export default function withStop(text) {
  if (!text.endsWith('.')) return text
  return (
    <>
      {text.slice(0, -1)}
      <span className="line__stop">.</span>
    </>
  )
}
