import React, { useState } from 'react'
import { Minus, Plus, Check } from 'lucide-react'

import { PRICES, CHIBI_PRICE, ADDONS, FRAMING_LABEL, TURNAROUND, formatPrice, type Finish, type Framing, type Currency, type Rates } from '../data'
import { CurrencyToggle } from './CurrencyToggle'

type Piece = Framing | 'chibi'
type Style = 'anime' | 'realistic'

type Props = {
  open: boolean
  onSend: (summary: string) => void
  currency: Currency
  onCurrency: (c: Currency) => void
  rates: Rates
}

export function QuoteEstimator({ open, onSend, currency, onCurrency, rates }: Props) {
  const fmt = (eur: number) => formatPrice(eur, currency, rates)
  const [finish, setFinish] = useState<Finish>('rendered')
  const [piece, setPiece] = useState<Piece>('bust')
  const [style, setStyle] = useState<Style>('anime')
  const [characters, setCharacters] = useState(1)
  const [addons, setAddons] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const base = piece === 'chibi' ? CHIBI_PRICE : PRICES[finish][piece]
  const chosenAddons = ADDONS.filter((a) => addons.includes(a.id))
  const total = base * characters + chosenAddons.reduce((s, a) => s + a.price, 0)

  const pieceLabel = piece === 'chibi' ? 'Chibi' : `${finish === 'rendered' ? 'Rendered' : 'Sketch'} ${FRAMING_LABEL[piece].toLowerCase()}`
  const summary =
    [
      piece === 'chibi' ? pieceLabel : `${pieceLabel}, ${style} style`,
      `${characters} character${characters > 1 ? 's' : ''}`,
      ...chosenAddons.map((a) => a.label.toLowerCase()),
    ].join(' · ') +
    ` — estimated ${fmt(total)}${currency === 'EUR' ? '' : ` (€${total})`}`

  const toggleAddon = (id: string) => {
    setCopied(false)
    setAddons((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  }

  const send = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
    } catch {
      setCopied(false)
    }
    onSend(summary)
  }

  return (
    <section id="estimate" className="scroll-mt-6 border-t-[2.5px] border-ink bg-teal text-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <h2 className="font-hand text-4xl uppercase sm:text-5xl">How much will it be?</h2>
          <p className="mt-2 max-w-md text-lg text-card/85">Build your piece and see the total before you message me.</p>

          <div className="mt-8 space-y-6">
            <Field label="Type">
              <Segmented
                value={piece === 'chibi' ? 'chibi' : finish}
                options={[
                  { value: 'sketch', label: 'Sketch' },
                  { value: 'rendered', label: 'Rendered' },
                  { value: 'chibi', label: 'Chibi' },
                ]}
                onChange={(v) => {
                  setCopied(false)
                  if (v === 'chibi') setPiece('chibi')
                  else {
                    setFinish(v as Finish)
                    if (piece === 'chibi') setPiece('bust')
                  }
                }}
              />
            </Field>

            {piece !== 'chibi' && (
              <Field label="Framing">
                <Segmented
                  value={piece}
                  options={(['bust', 'torso', 'fullbody'] as Framing[]).map((f) => ({ value: f, label: `${FRAMING_LABEL[f]} · ${fmt(PRICES[finish][f])}` }))}
                  onChange={(v) => {
                    setCopied(false)
                    setPiece(v as Framing)
                  }}
                />
              </Field>
            )}

            {piece !== 'chibi' && (
              <Field label="Style">
                <Segmented
                  value={style}
                  options={[
                    { value: 'anime', label: 'Anime' },
                    { value: 'realistic', label: 'Realistic' },
                  ]}
                  onChange={(v) => {
                    setCopied(false)
                    setStyle(v as Style)
                  }}
                />
              </Field>
            )}

            <Field label="Characters">
              <div className="inline-flex items-center rounded-full border-[2.5px] border-ink bg-card text-ink">
                <button
                  onClick={() => { setCopied(false); setCharacters((c) => Math.max(1, c - 1)) }}
                  disabled={characters <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-cream disabled:opacity-30"
                  aria-label="Fewer characters"
                >
                  <Minus className="h-4 w-4" strokeWidth={3} />
                </button>
                <span className="w-10 text-center text-lg font-extrabold tabular-nums" aria-live="polite">{characters}</span>
                <button
                  onClick={() => { setCopied(false); setCharacters((c) => Math.min(10, c + 1)) }}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-cream"
                  aria-label="More characters"
                >
                  <Plus className="h-4 w-4" strokeWidth={3} />
                </button>
              </div>
            </Field>

            <Field label="Add-ons">
              <div className="flex flex-wrap gap-2">
                {ADDONS.map((a) => {
                  const on = addons.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      aria-pressed={on}
                      className={`inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink px-4 py-1.5 text-sm font-bold whitespace-nowrap transition-colors duration-150 ${
                        on ? 'bg-mustard text-ink' : 'bg-card text-ink hover:bg-cream'
                      }`}
                    >
                      {on && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
                      {a.label} +{fmt(a.price)}
                    </button>
                  )
                })}
              </div>
            </Field>
          </div>
        </div>

        {/* Total */}
        <div className="min-w-0 lg:pt-16">
          <div className="rotate-1 border-[2.5px] border-ink bg-card p-6 text-ink sm:p-8 lg:sticky lg:top-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-hand text-2xl uppercase">Your total</p>
              <CurrencyToggle value={currency} onChange={onCurrency} />
            </div>
            <p className={`mt-2 leading-none font-extrabold break-words tabular-nums ${currency === 'VND' ? 'text-5xl' : 'text-7xl'}`}>{fmt(total)}</p>

            <dl className="mt-6 space-y-1.5 border-t-2 border-dashed border-ink/30 pt-4">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{pieceLabel}</dt>
                <dd className="font-semibold whitespace-nowrap tabular-nums">{fmt(base)}</dd>
              </div>
              {characters > 1 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">× {characters} characters</dt>
                  <dd className="font-semibold whitespace-nowrap tabular-nums">{fmt(base * characters)}</dd>
                </div>
              )}
              {chosenAddons.map((a) => (
                <div key={a.id} className="flex justify-between gap-4">
                  <dt className="text-ink-soft">{a.label}</dt>
                  <dd className="font-semibold whitespace-nowrap tabular-nums">+{fmt(a.price)}</dd>
                </div>
              ))}
            </dl>

            <button
              onClick={send}
              className="mt-7 w-full rounded-full border-[2.5px] border-ink bg-coral px-6 py-3 font-bold text-ink transition-colors duration-150 hover:bg-tangerine"
            >
              {copied ? 'Copied! Paste it in a DM' : open ? 'Copy & message me' : 'Copy & ask about it'}
            </button>
            <p className="mt-3 text-center text-sm text-ink-soft">Ready in about {TURNAROUND}. Final price confirmed once I've seen your refs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-hand text-2xl leading-none uppercase">{label}</p>
      {children}
    </div>
  )
}

function Segmented({ value, options, onChange }: { value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full border-[2.5px] border-ink px-4 py-1.5 text-sm font-bold whitespace-nowrap transition-colors duration-150 ${
            value === o.value ? 'bg-ink text-card' : 'bg-card text-ink hover:bg-cream'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
