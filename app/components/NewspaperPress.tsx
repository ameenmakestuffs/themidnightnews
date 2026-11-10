'use client'

interface NewspaperPressProps {
  className?: string
}

export default function NewspaperPress({ className = '' }: NewspaperPressProps) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={`w-full h-auto ${className}`}
      style={{ 
        maxWidth: '200px',
        transition: 'transform 0.4s cubic-bezier(.32,.72,0,1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <defs>
        <clipPath id="pressClip">
          <rect x="20" y="10" width="160" height="80" />
        </clipPath>
      </defs>
      
      {/* Base / Platform */}
      <g stroke="var(--fg)" strokeWidth="0.5" fill="none">
        {/* Back base */}
        <path d="M30 90 L170 90" stroke="var(--border)" />
        <path d="M40 85 L160 85" stroke="var(--rule)" />
        
        {/* Left support */}
        <path d="M45 85 L45 70" stroke="var(--rule)" />
        <path d="M45 70 L55 60" stroke="var(--rule)" />
        
        {/* Right support */}
        <path d="M155 85 L155 70" stroke="var(--rule)" />
        <path d="M155 70 L145 60" stroke="var(--rule)" />
      </g>
      
      {/* Press mechanism - back layer */}
      <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.5">
        {/* Left frame */}
        <path d="M50 60 L50 25 L60 15 L60 50 Z" stroke="var(--rule)" />
        <path d="M50 60 L50 25 L60 15 L60 50 Z" fill="none" stroke="var(--border)" strokeWidth="0.3" />
        
        {/* Right frame */}
        <path d="M150 60 L150 25 L140 15 L140 50 Z" stroke="var(--rule)" />
        <path d="M150 60 L150 25 L140 15 L140 50 Z" fill="none" stroke="var(--border)" strokeWidth="0.3" />
      </g>
      
      {/* Top press plate */}
      <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.5">
        <path d="M55 20 L145 20 L140 30 L60 30 Z" stroke="var(--rule)" />
        <path d="M55 20 L145 20 L140 30 L60 30 Z" fill="none" stroke="var(--border)" strokeWidth="0.3" />
        
        {/* Press handle */}
        <path d="M90 20 L90 8 L100 8 L100 20" fill="none" />
        <path d="M110 20 L110 8 L100 8" fill="none" />
      </g>
      
      {/* Stack of papers - middle layer */}
      <g stroke="var(--fg)" strokeWidth="0.5" fill="none">
        {/* Paper 3 (top, partially visible) */}
        <path d="M65 45 L135 45 L135 52 L65 52 Z" stroke="var(--border)" />
        <path d="M70 48 L130 48" stroke="var(--rule)" strokeWidth="0.3" />
        
        {/* Paper 2 */}
        <path d="M60 50 L140 50 L140 60 L60 60 Z" stroke="var(--rule)" />
        <path d="M65 55 L135 55" stroke="var(--rule)" strokeWidth="0.3" />
      </g>
      
      {/* Bottom paper - front layer (main broadsheet) */}
      <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.5">
        <path d="M55 58 L145 58 L145 72 L55 72 Z" />
        
        {/* Newspaper content lines */}
        <g stroke="var(--rule)" strokeWidth="0.3" fill="none">
          {/* Headline area */}
          <path d="M62 62 L95 62" />
          <path d="M62 65 L108 65" />
          <path d="M62 68 L90 68" />
          
          {/* Columns */}
          <path d="M100 62 L100 70" strokeWidth="0.2" />
          <path d="M115 62 L115 70" strokeWidth="0.2" />
          <path d="M130 62 L130 70" strokeWidth="0.2" />
        </g>
      </g>
      
      {/* Press rollers */}
      <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.5">
        {/* Left roller */}
        <ellipse cx="52" cy="65" rx="4" ry="8" />
        <ellipse cx="52" cy="65" rx="2" ry="5" stroke="var(--rule)" strokeWidth="0.3" />
        
        {/* Right roller */}
        <ellipse cx="148" cy="65" rx="4" ry="8" />
        <ellipse cx="148" cy="65" rx="2" ry="5" stroke="var(--rule)" strokeWidth="0.3" />
      </g>
      
      {/* Gear detail */}
      <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.5">
        <circle cx="148" cy="78" r="4" />
        <circle cx="148" cy="78" r="1.5" stroke="var(--rule)" strokeWidth="0.3" />
        
        {/* Gear teeth */}
        <path d="M148 73 L149 74 L147 74 Z" fill="var(--fg)" stroke="none" />
        <path d="M148 83 L149 82 L147 82 Z" fill="var(--fg)" stroke="none" />
        <path d="M153 78 L152 79 L152 77 Z" fill="var(--fg)" stroke="none" />
        <path d="M143 78 L144 79 L144 77 Z" fill="var(--fg)" stroke="none" />
      </g>
    </svg>
  )
}