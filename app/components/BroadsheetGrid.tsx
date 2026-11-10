'use client'

import { useEffect, useState, useMemo } from 'react'
import { HNStory } from '../lib/hackernews'
import StoryCard from './StoryCard'

interface BroadsheetGridProps {
  stories: HNStory[]
  onStoryClick: (story: HNStory) => void
}

export default function BroadsheetGrid({ stories, onStoryClick }: BroadsheetGridProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Split stories into 3 columns
  const columns = useMemo(() => {
    const col1: HNStory[] = []
    const col2: HNStory[] = []
    const col3: HNStory[] = []

    stories.forEach((story, index) => {
      if (index % 3 === 0) col1.push(story)
      else if (index % 3 === 1) col2.push(story)
      else col3.push(story)
    })

    return [col1, col2, col3]
  }, [stories])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`
            relative
            ${mounted ? 'animate-work-in' : ''}
            ${colIndex < 2 ? 'md:border-r md:border-[var(--border)] md:pr-6' : ''}
            ${colIndex > 0 ? 'md:pl-3' : ''}
          `}
          style={
            mounted
              ? { animationDelay: `${colIndex * 0.1}s` }
              : { filter: 'blur(3px)', opacity: 0, transform: 'translateY(8px)' }
          }
        >
          {column.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => onStoryClick(story)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
