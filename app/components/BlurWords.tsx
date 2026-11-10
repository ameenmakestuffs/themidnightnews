'use client'

import { useEffect, useState, useMemo, ReactElement } from 'react'

interface BlurWordsProps {
  text: string
  className?: string
  as?: keyof React.ReactHTML
  delay?: number
}

export default function BlurWords({ 
  text, 
  className = '', 
  as: Component = 'span',
  delay = 0
}: BlurWordsProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const words = useMemo(() => text.split(/\s+/), [text])
  
  const animationStyle = mounted ? {} : { 
    filter: 'blur(5px)', 
    transform: 'translateY(4px)', 
    opacity: '0' 
  }
  
  // Use 'span' as default to avoid JSX.IntrinsicElements issues
  const Wrapper = Component as React.ElementType
  
  return (
    <Wrapper className={`inline ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-[0.25em]"
          style={{
            ...animationStyle,
            animation: mounted ? `wordBlurIn 0.62s cubic-bezier(0.22, 0.61, 0.36, 1) forwards` : 'none',
            animationDelay: `${delay + index * 0.08}s`,
            opacity: mounted ? undefined : 0,
          }}
        >
          {word}
        </span>
      ))}
    </Wrapper>
  )
}