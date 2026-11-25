import React from 'react'

import { PRICES, CHIBI_PRICE, ADDONS, FRAMING_LABEL, TURNAROUND, formatPrice, type Framing, type Currency, type Rates } from '../data'
import { Doodle } from './Doodles'
import { CurrencyToggle } from './CurrencyToggle'

const FRAMINGS: Framing[] = ['bust', 'torso', 'fullbody']

type Props = { currency: Currency; onCurrency: (c: Currency) => void; rates: Rates; liveRates: boolean }

export function PriceSheet({ currency, onCurrency, rates, liveRates }: Props) {
  const fmt = (eur: number) => formatPrice(eur, currency, rates)

  return (
    <section id="prices" className="scroll-mt-6 border-t-[2.5px] border-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="font-hand text-4xl uppercase sm:text-5xl">
              Prices <Doodle name="star" className="inline-block h-[0.8em] w-auto align-middle" />
            </h2>
            <p className="mt-2 max-w-lg text-lg text-ink-soft">Per character.</p>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <CurrencyToggle value={currency} onChange={onCurrency} />
            {currency !== 'EUR' && (
              <p className="text-xs text-ink-soft">
                Converted from euros{liveRates ? ' at today’s rate' : ' (approx.)'} · invoiced in US$ via PayPal
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* Main price table */}
          <div className="min-w-0 border-[2.5px] border-ink bg-card">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-[2.5px] border-ink">
                  <th scope="col" className="px-4 py-3 sm:px-6"><span className="sr-only">Framing</span></th>
                  <th scope="col" className="bg-cream px-3 py-3 text-right font-hand text-2xl font-normal uppercase sm:px-6">Sketch</th>
                  <th scope="col" className="bg-periwinkle px-3 py-3 text-right font-hand text-2xl font-normal uppercase sm:px-6">Rendered</th>
                </tr>
              </thead>
              <tbody>
                {FRAMINGS.map((f) => (
                  <tr key={f} className="border-b-2 border-ink/15">
                    <th scope="row" className="px-4 py-5 text-xl font-extrabold sm:px-6 sm:text-2xl">{FRAMING_LABEL[f]}</th>
                    <td className="px-3 py-5 text-right text-xl font-semibold whitespace-nowrap tabular-nums sm:px-6 sm:text-3xl">{fmt(PRICES.sketch[f])}</td>
                    <td className="px-3 py-5 text-right text-xl font-extrabold whitespace-nowrap tabular-nums sm:px-6 sm:text-3xl">{fmt(PRICES.rendered[f])}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-4 py-5 text-xl font-extrabold sm:px-6 sm:text-2xl">Chibi</th>
                  <td colSpan={2} className="px-3 py-5 text-right text-xl font-extrabold whitespace-nowrap tabular-nums sm:px-6 sm:text-3xl">{fmt(CHIBI_PRICE)}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center gap-3 border-t-[2.5px] border-ink bg-teal px-4 py-3.5 text-card sm:px-6">
              <Doodle name="heart" className="h-7 w-auto shrink-0" />
              <p className="text-lg font-semibold">
                Each commission takes around <span className="font-hand text-2xl uppercase">{TURNAROUND}</span> &lt;3
              </p>
            </div>
          </div>

          {/* Extras */}
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border-[2.5px] border-ink bg-mustard p-5 sm:p-6">
              <h3 className="font-hand text-3xl leading-none uppercase">Add-ons</h3>
              <ul className="mt-4 space-y-2.5">
                {ADDONS.map((a) => (
                  <li key={a.id} className="flex items-baseline justify-between gap-4 text-lg">
                    <span className="font-medium">{a.label}</span>
                    <span className="font-extrabold whitespace-nowrap tabular-nums">+{fmt(a.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-[2.5px] border-ink bg-pink p-5 sm:p-6">
              <h3 className="font-hand text-3xl leading-none uppercase">A whole crew?</h3>
              <p className="mt-3 text-lg leading-snug">
                The base price is multiplied by how many characters are in the scene.
              </p>
              <p className="mt-2 font-semibold">2 rendered busts = 2 × {fmt(50)} = {fmt(100)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
