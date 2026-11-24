import React, { useState } from 'react'

import { Doodle, type DoodleName } from './Doodles'

export function Socials({ open, twitter, instagram, discord }: { open: boolean; twitter: string; instagram: string; discord: string }) {
  const [copied, setCopied] = useState(false)

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(discord)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — the handle is visible anyway */
    }
  }

  return (
    <section id="say-hi" className="scroll-mt-6 border-t-[2.5px] border-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <h2 className="font-hand text-5xl uppercase sm:text-6xl">Say hi!</h2>
        <p className="mt-2 max-w-lg text-lg text-ink-soft">
          {open
            ? 'DM me on any of these with your idea and refs — I usually reply within a day or two.'
            : "Commissions are closed right now, but feel free to follow along or ask me anything."}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <SocialCard
            href={`https://x.com/${twitter}`}
            doodle="bird"
            network="Twitter / X"
            handle={`@${twitter}`}
            bg="bg-periwinkle"
            tilt="-rotate-1"
          />
          <SocialCard
            href={`https://www.instagram.com/${instagram}`}
            doodle="camera"
            network="Instagram"
            handle={`@${instagram}`}
            bg="bg-pink"
            tilt="rotate-1"
          />
          <button
            onClick={copyDiscord}
            className="group flex -rotate-[0.5deg] flex-col items-start gap-4 border-[2.5px] border-ink bg-mustard p-6 text-left transition-transform duration-150 ease-out active:scale-[0.98]"
          >
            <Doodle name="bubble" className="h-14 w-auto transition-transform duration-200 ease-out group-hover:-rotate-6" />
            <span>
              <span className="block font-hand text-3xl leading-none uppercase">Discord</span>
              <span className="mt-1 block text-lg font-semibold">{discord}</span>
              <span className="mt-1 block text-sm text-ink/70">{copied ? 'Copied — add me!' : 'Tap to copy username'}</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

function SocialCard({ href, doodle, network, handle, bg, tilt }: { href: string; doodle: DoodleName; network: string; handle: string; bg: string; tilt: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group flex ${tilt} flex-col items-start gap-4 border-[2.5px] border-ink ${bg} p-6 transition-transform duration-150 ease-out active:scale-[0.98]`}
    >
      <Doodle name={doodle} className="h-14 w-auto transition-transform duration-200 ease-out group-hover:-rotate-6" />
      <span>
        <span className="block font-hand text-3xl leading-none uppercase">{network}</span>
        <span className="mt-1 block text-lg font-semibold">{handle}</span>
        <span className="mt-1 block text-sm text-ink/70">Open profile ↗</span>
      </span>
    </a>
  )
}
