'use client'

interface VectorDividerProps {
  className?: string
}

export default function VectorDivider({ className = '' }: VectorDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        className="w-full h-2"
        vectorEffect="non-scaling-stroke"
      >
        {/* Main hairline */}
        <path
          d="M0 10 L1200 10"
          stroke="var(--rule)"
          strokeWidth="0.5"
          fill="none"
          className="vector-divider"
          style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
        />
        
        {/* Decorative endpoints */}
        <circle cx="0" cy="10" r="1.5" fill="var(--rule)" />
        <circle cx="1200" cy="10" r="1.5" fill="var(--rule)" />
        
        {/* Center ornament */}
        <g transform="translate(600, 10)">
          <path
            d="M-20 0 L-8 0"
            stroke="var(--rule)"
            strokeWidth="0.5"
            className="vector-divider"
            style={{ animationDelay: '0.3s' }}
          />
          <circle r="3" fill="var(--border)" stroke="var(--rule)" strokeWidth="0.5" />
          <circle r="1" fill="var(--rule)" />
          <path
            d="M8 0 L20 0"
            stroke="var(--rule)"
            strokeWidth="0.5"
            className="vector-divider"
            style={{ animationDelay: '0.3s' }}
          />
        </g>
        
        {/* Traveling pulse effect */}
        <rect
          x="0"
          y="9"
          width="60"
          height="2"
          fill="var(--rule)"
          className="animate-pulse-travel"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  )
}