import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ARTWORKS, FRAMING_LABEL, PRICES, CHIBI_PRICE, formatPrice, type Artwork, type Finish, type Framing, type Currency, type Rates } from '../data'
import { Lightbox } from './Lightbox'
import { Doodle } from './Doodles'

const GROUPS: Record<Finish, Framing[]> = {
  rendered: ['bust', 'torso', 'fullbody'],
  sketch: ['bust', 'torso', 'fullbody'],
}

type Tab = Finish | 'chibi'
const TABS: { value: Tab; label: string }[] = [
  { value: 'rendered', label: 'Rendered' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'chibi', label: 'Chibi' },
]

const EASE = [0.23, 1, 0.32, 1] as const

export function Gallery({ currency, rates }: { currency: Currency; rates: Rates }) {
  const [finish, setFinish] = useState<Tab>('rendered')
  const [active, setActive] = useState<Artwork | null>(null)

  return (
    <section id="work" className="scroll-mt-6">
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 md:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-hand text-4xl uppercase sm:text-5xl">The work</h2>
          <div role="tablist" aria-label="Finish" className="inline-flex gap-2">
            {TABS.map(({ value: f, label }) => (
              <button
                key={f}
                role="tab"
                aria-selected={finish === f}
                onClick={() => setFinish(f)}
                className={`rounded-full border-[2.5px] border-ink px-5 py-1.5 text-sm font-bold whitespace-nowrap transition-colors duration-150 ${
                  finish === f ? 'bg-ink text-paper' : 'bg-card hover:bg-cream'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={finish}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="mt-8 space-y-12"
          >
            {finish === 'chibi' && (
              <div>
                <div className="mb-4 flex items-baseline gap-3">
                  <h3 className="text-xl font-extrabold">Chibi</h3>
                  <span className="text-sm font-medium text-ink-soft tabular-nums">{formatPrice(CHIBI_PRICE, currency, rates)}</span>
                </div>
                {(() => {
                  const works = ARTWORKS.filter((a) => a.finish === 'chibi')
                  return works.length === 0 ? (
                    <ToBeUpdated label="Chibi examples" />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                      {works.map((art) => (
                        <button
                          key={art.id}
                          onClick={() => setActive(art)}
                          className="group aspect-[4/5] overflow-hidden bg-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
                          aria-label={`View: ${art.alt}`}
                        >
                          <img
                            src={art.src}
                            alt={art.alt}
                            loading="lazy"
                            className="h-full w-full object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                          />
                        </button>
                      ))}
                    </div>
                  )
                })()}
              </div>
            )}
            {finish !== 'chibi' && GROUPS[finish].map((framing) => {
              const works = ARTWORKS.filter((a) => a.finish === finish && a.framing === framing)
              return (
                <div key={framing}>
                  <div className="mb-4 flex items-baseline gap-3">
                    <h3 className="text-xl font-extrabold">{FRAMING_LABEL[framing]}</h3>
                    <span className="text-sm font-medium text-ink-soft tabular-nums">from {formatPrice(PRICES[finish][framing], currency, rates)}</span>
                  </div>

                  {works.length === 0 ? (
                    <ToBeUpdated label={`${FRAMING_LABEL[framing]} ${finish === 'rendered' ? 'renders' : 'sketches'}`} />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                      {works.map((art) => (
                        <button
                          key={art.id}
                          onClick={() => setActive(art)}
                          className="group aspect-[4/5] overflow-hidden bg-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
                          aria-label={`View: ${art.alt}`}
                        >
                          <img
                            src={art.src}
                            alt={art.alt}
                            loading="lazy"
                            className="h-full w-full object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox art={active} onClose={() => setActive(null)} />
    </section>
  )
}

function ToBeUpdated({ label }: { label: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`aspect-[4/5] flex-col items-center justify-center gap-2 border-[2.5px] border-dashed border-ink/40 bg-card p-4 text-center ${
            i > 1 ? 'hidden md:flex' : 'flex'
          }`}
        >
          {i === 0 ? (
            <>
              <Doodle name="pencil" className="h-12 w-auto -rotate-12" />
              <p className="font-hand text-3xl leading-none uppercase">To be updated!</p>
              <p className="text-sm text-ink-soft">{label} are on the way — you can still order one.</p>
            </>
          ) : (
            <Doodle name={(['sparkle', 'star', 'cloud'] as const)[i - 1]} className="h-10 w-auto opacity-40" />
          )}
        </div>
      ))}
    </div>
  )
}
