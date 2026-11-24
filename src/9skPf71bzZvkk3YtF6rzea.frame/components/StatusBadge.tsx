import React from 'react'

export function StatusBadge({ open }: { open: boolean }) {
  return (
    <span
      role="status"
      className={`inline-flex -rotate-2 items-center gap-2 rounded-full border-[2.5px] border-ink px-3.5 py-1 font-hand text-lg leading-tight whitespace-nowrap uppercase ${
        open ? 'bg-mustard' : 'bg-pink'
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full border-2 border-ink ${open ? 'bg-teal' : 'bg-coral'}`} />
      {open ? 'Commissions open' : 'Commissions closed'}
    </span>
  )
}
