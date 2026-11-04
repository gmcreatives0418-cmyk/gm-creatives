/**
 * GM Creatives logo — tries the PNG first, falls back to inline SVG wordmark.
 * Drop gm-logo.png into client/public/ to use the real logo.
 */
export default function Logo({ height = 44, inverted = false }) {
  const color = inverted ? '#ffffff' : '#A31621';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Geometric mark */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer hexagon */}
        <path d="M50 5 L90 28 L90 82 L50 105 L10 82 L10 28 Z" fill={color} />
        {/* Inner GM letterform */}
        <path
          d="M28 38 L28 72 L38 72 L38 55 L50 72 L62 55 L62 72 L72 72 L72 38 L62 38 L50 55 L38 38 Z"
          fill="white"
        />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontWeight: 900,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
          color,
          lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        GM CREATIVES
      </span>
    </div>
  );
}
