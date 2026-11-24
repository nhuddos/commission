import React from 'react'

import type { Currency } from '../data'

const OPTIONS: { value: Currency; label: string }[] = [
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
  { value: 'VND', label: '₫ VND' },
]

export function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex gap-1.5 rounded-full border-[2.5px] border-ink bg-card p-1 text-ink">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3 py-1 text-sm font-bold whitespace-nowrap transition-colors duration-150 ${
            value === o.value ? 'bg-ink text-card' : 'hover:bg-cream'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
