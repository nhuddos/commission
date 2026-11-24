import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { FRAMING_LABEL, type Artwork } from '../data'

const EASE = [0.23, 1, 0.32, 1] as const

export function Lightbox({ art, onClose }: { art: Artwork | null; onClose: () => void }) {
  useEffect(() => {
    if (!art) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [art, onClose])

  return (
    <AnimatePresence>
      {art && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={art.alt}
        >
          <motion.figure
            className="flex max-h-full max-w-4xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={art.src} alt={art.alt} className="max-h-[78vh] w-auto border-[2.5px] border-ink bg-white object-contain" />
            <figcaption className="mt-3 font-hand text-2xl text-paper uppercase">
              {art.finish === 'rendered' ? 'Rendered' : 'Sketch'} · {FRAMING_LABEL[art.framing]}
            </figcaption>
          </motion.figure>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors duration-150 hover:bg-paper/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
