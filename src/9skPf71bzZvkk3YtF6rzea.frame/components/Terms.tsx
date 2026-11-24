import React from 'react'
import { Check, X } from 'lucide-react'

import { Doodle } from './Doodles'

export function Terms() {
  return (
    <section id="tos" className="scroll-mt-6 border-t-[2.5px] border-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <h2 className="font-hand text-4xl uppercase sm:text-5xl">
          Terms of service <Doodle name="pencil" className="inline-block h-[0.8em] w-auto align-middle" />
        </h2>
        <p className="mt-2 max-w-lg text-lg text-ink-soft">Please read these before messaging me — it saves us both time!</p>

        {/* Will / won't */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="border-[2.5px] border-ink bg-card p-5 sm:p-6">
            <h3 className="font-hand text-3xl leading-none uppercase">Will do</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {WILL.map((w) => (
                <li key={w} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-teal px-3 py-1 font-semibold text-card">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-[2.5px] border-ink bg-card p-5 sm:p-6">
            <h3 className="font-hand text-3xl leading-none uppercase">Won't do</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {WONT.map((w) => (
                <li key={w} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-coral px-3 py-1 font-semibold text-ink">
                  <X className="h-4 w-4" strokeWidth={3} aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Numbered terms */}
        <ol className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {TERMS.map((t, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-8 shrink-0 font-hand text-3xl leading-none text-coral">{i + 1}.</span>
              <p className="text-[17px] leading-relaxed">{t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const WILL = ['Humans', 'A/M characters', 'OCs', 'Mild gore', 'Slight NSFW']
const WONT = ['Heavy armors', 'Mechas', 'Furries', 'Heavy NSFW']

const TERMS = [
  'I accept payment through PayPal invoice in US$ (or bank transfer if you live in Vietnam or Europe).',
  'Commissions are not first come, first served. I’ll consider your request if it matches my art style and personal interest — please understand if I decline.',
  'You can ask for edits during the sketching stage, and only minor adjustments in the finishing stage.',
  'I’ll only send you the finished piece after receiving the full payment.',
  'Commercial work has an additional commercial fee on top of the estimated price — usually about 50% to 100% of the commission price, and it can be negotiated.',
  'Refunds can only be requested during the sketching stage.',
  'Commissions with a rush deadline include an additional rush fee.',
  'Please let me know beforehand if you plan to commercialize your commission later.',
  'I do not accept NFTs or any use of AI with my commission art.',
]
