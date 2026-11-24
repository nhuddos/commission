import React from 'react'

import { Doodle, type DoodleName } from './Doodles'

type Token = string | { d: DoodleName }

export function RebusHero({ open }: { open: boolean }) {
  const tokens = open ? OPEN : CLOSED
  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-20">
      <h1 className="font-hand text-[2.35rem] leading-[1.18] uppercase sm:text-6xl lg:text-7xl lg:leading-[1.12]">
        {tokens.map((t, i) =>
          typeof t === 'string' ? (
            <React.Fragment key={i}>{t} </React.Fragment>
          ) : (
            <React.Fragment key={i}>
              <Doodle name={t.d} className="mx-[0.06em] inline-block h-[0.9em] w-auto -translate-y-[0.06em] align-middle" />{' '}
            </React.Fragment>
          ),
        )}
      </h1>
    </section>
  )
}

const OPEN: Token[] = [
  'Hi! I’m an', { d: 'eye' }, 'artist', { d: 'pencil' }, 'who draws', { d: 'heart' },
  'characters,', { d: 'cat' }, ' and', { d: 'star' }, 'ur OCs', { d: 'flower' },
  'for', { d: 'brush' }, 'fun. Commissions are', { d: 'rainbow' }, 'open!', { d: 'sparkle' }, { d: 'bird' },
]

const CLOSED: Token[] = [
  'Hi! I’m an', { d: 'eye' }, 'artist', { d: 'pencil' }, 'who draws', { d: 'heart' },
  'characters,', { d: 'cat' }, ' and', { d: 'star' }, 'ur OCs. Commissions are closed', { d: 'cloud' },
  'for now, but come say hi', { d: 'bubble' }, 'and I’ll ping you when they reopen.', { d: 'sparkle' },
]
