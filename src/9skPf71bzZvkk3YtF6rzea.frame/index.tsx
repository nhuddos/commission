import React, { useState } from 'react'

import { StatusBadge } from './components/StatusBadge'
import { RebusHero } from './components/RebusHero'
import { Gallery } from './components/Gallery'
import { PriceSheet } from './components/PriceSheet'
import { QuoteEstimator } from './components/QuoteEstimator'
import { Socials } from './components/Socials'
import { Terms } from './components/Terms'
import { useRates } from './useRates'
import type { Currency } from './data'

type Props = Partial<typeof args>

export default function CommissionPage(props: Props) {
  const { commissionsOpen, artistName, twitter, instagram, discord } = { ...args, ...props }

  const [currency, setCurrency] = useState<Currency>('EUR')
  const { rates, live } = useRates()

  const goToSocials = () => document.getElementById('say-hi')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-full bg-paper font-sans text-ink">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
        <a href="#top" className="font-hand text-3xl leading-none tracking-wide whitespace-nowrap uppercase sm:text-4xl">
          {artistName}
        </a>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-6 text-[15px] font-semibold md:flex">
            <a href="#work" className="transition-colors duration-150 hover:text-coral">Work</a>
            <a href="#prices" className="transition-colors duration-150 hover:text-coral">Prices</a>
            <a href="#estimate" className="transition-colors duration-150 hover:text-coral">Estimate</a>
            <a href="#tos" className="transition-colors duration-150 hover:text-coral">TOS</a>
            <a href="#say-hi" className="transition-colors duration-150 hover:text-coral">Say hi</a>
          </nav>
          <StatusBadge open={commissionsOpen} />
        </div>
      </header>

      <RebusHero open={commissionsOpen} />
      <Gallery currency={currency} rates={rates} />
      <PriceSheet currency={currency} onCurrency={setCurrency} rates={rates} liveRates={live} />
      <QuoteEstimator open={commissionsOpen} onSend={goToSocials} currency={currency} onCurrency={setCurrency} rates={rates} />
      <Terms />
      <Socials open={commissionsOpen} twitter={twitter} instagram={instagram} discord={discord} />

      <footer className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pt-6 pb-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-hand text-2xl text-ink uppercase">{artistName}</span>
        <span>All artwork © {artistName}. Please don't repost or feed it to AI.</span>
      </footer>
    </div>
  )
}

export const args = {
  commissionsOpen: true,
  artistName: 'yoyoottoo',
  twitter: 'yoyoottoo',
  instagram: 'yoyoottoo',
  discord: 'yoyoott0o',
}

export const argTypes = {
  commissionsOpen: { control: 'boolean' },
  artistName: { control: 'text' },
  twitter: { control: 'text' },
  instagram: { control: 'text' },
  discord: { control: 'text' },
}
