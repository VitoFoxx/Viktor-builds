// The VANTA wordmark: five extended capitals drawn on one 30 × 24 grid.
export default function VantaMark({ className, title = 'VANTA' }) {
  return (
    <svg className={className} viewBox="0 0 198 24" role="img" aria-label={title} fill="currentColor">
      {/* V */}
      <polygon points="0,0 5.2,0 15,18.6 24.8,0 30,0 17.4,24 12.6,24" />
      {/* A */}
      <g transform="translate(42 0)">
        <polygon points="12.6,0 17.4,0 30,24 24.8,24 15,5.4 5.2,24 0,24" />
        <polygon points="9.6,15 20.4,15 22.5,19 7.5,19" />
      </g>
      {/* N */}
      <g transform="translate(84 0)">
        <rect width="4.6" height="24" />
        <rect x="25.4" width="4.6" height="24" />
        <polygon points="0,0 5.6,0 30,24 24.4,24" />
      </g>
      {/* T */}
      <g transform="translate(126 0)">
        <rect width="30" height="4.6" />
        <rect x="12.7" width="4.6" height="24" />
      </g>
      {/* A */}
      <g transform="translate(168 0)">
        <polygon points="12.6,0 17.4,0 30,24 24.8,24 15,5.4 5.2,24 0,24" />
        <polygon points="9.6,15 20.4,15 22.5,19 7.5,19" />
      </g>
    </svg>
  )
}
