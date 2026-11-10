'use client'

import { useEffect, useState, useCallback } from 'react'
import { HNStory, HNComment, fetchTopComments, formatTimeAgo, extractDomain } from '../lib/hackernews'

interface ReaderDrawerProps {
  story: HNStory | null
  isOpen: boolean
  onClose: () => void
}

export default function ReaderDrawer({ story, isOpen, onClose }: ReaderDrawerProps) {
  const [comments, setComments] = useState<HNComment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  
  const loadComments = useCallback(async () => {
    if (!story?.kids || story.kids.length === 0) {
      setComments([])
      setIsLoadingComments(false)
      return
    }
    
    setIsLoadingComments(true)
    try {
      const topComments = await fetchTopComments(story.id, 5)
      setComments(topComments)
    } catch (error) {
      console.error('Failed to load comments:', error)
      setComments([])
    } finally {
      setIsLoadingComments(false)
    }
  }, [story])
  
  useEffect(() => {
    if (isOpen && story) {
      loadComments()
    }
  }, [isOpen, story, loadComments])
  
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])
  
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  if (!isOpen || !story) return null
  
  const domain = extractDomain(story.url)
  
  // Strip HTML from story text if present
  const cleanText = story.text ? story.text.replace(/<[^>]*>/g, '') : ''
  
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[var(--bg)]/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        className="
          relative w-full md:max-w-3xl md:rounded-sm
          bg-[var(--bg)] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
          max-h-[85vh] overflow-y-auto
          animate-[workIn_0.3s_ease-out]
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            w-8 h-8 flex items-center justify-center
            font-geist text-lg text-[var(--muted)]
            hover:text-[var(--fg)] hover:bg-[var(--surface-step)]
            rounded-sm transition-colors duration-200
          "
          aria-label="Close reader"
        >
          ×
        </button>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <header className="mb-6 section-rule pb-6">
            <h2 
              id="drawer-title"
              className="font-newsreader text-2xl md:text-3xl font-normal text-[var(--fg)] leading-tight mb-4"
            >
              {story.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-3 font-geist text-xs text-[var(--muted)]">
              <span>by <span className="text-[var(--fg)]">{story.by}</span></span>
              <span>•</span>
              <span>{formatTimeAgo(story.time)}</span>
              {domain && (
                <>
                  <span>•</span>
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-[var(--surface-step)] rounded-sm hover:text-[var(--accent)] transition-colors"
                  >
                    {domain}
                  </a>
                </>
              )}
              {story.url && (
                <>
                  <span>•</span>
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline"
                  >
                    Visit Source →
                  </a>
                </>
              )}
            </div>
          </header>
          
          {/* Story text if available */}
          {cleanText && (
            <div className="mb-8 font-inter text-sm text-[var(--fg)] leading-relaxed">
              <p>{cleanText}</p>
            </div>
          )}
          
          {/* Comments / Letters to the Editor */}
          <section>
            <h3 className="font-newsreader text-lg text-[var(--fg)] mb-4 flex items-center gap-2">
              <span>Letters to the Editor</span>
              <span className="font-geist text-xs text-[var(--muted)]">
                ({comments.length})
              </span>
            </h3>
            
            {isLoadingComments ? (
              <div className="font-geist text-sm text-[var(--muted)]">
                Loading letters...
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <article 
                    key={comment.id}
                    className="p-4 bg-[var(--surface-step)] rounded-sm"
                  >
                    <header className="flex items-center gap-2 mb-2 font-geist text-[10px] text-[var(--muted)]">
                      <span className="font-medium text-[var(--fg)]">{comment.by}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(comment.time)}</span>
                      <span className="ml-auto">Letter #{index + 1}</span>
                    </header>
                    <div 
                      className="font-inter text-sm text-[var(--fg)] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: comment.text || '' }}
                    />
                  </article>
                ))}
              </div>
            ) : (
              <div className="font-inter text-sm text-[var(--muted)] italic">
                No letters to the editor yet.
              </div>
            )}
          </section>
          
          {/* Keyboard hint */}
          <footer className="mt-8 pt-4 border-t border-[var(--border)]">
            <p className="font-geist text-[10px] text-[var(--muted)] text-center">
              Press <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm">Esc</kbd> or click outside to close
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}