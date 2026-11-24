import React from 'react'

import CommissionPage from '../9skPf71bzZvkk3YtF6rzea.frame'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

/** Flip this to show visitors whether you're taking commissions. */
export const args = {
  commissionsOpen: true,
}

export const argTypes = {
  commissionsOpen: { control: 'boolean' },
}

type Props = Partial<typeof args> & { start?: string }

export default function Prototype(props: Props) {
  const { commissionsOpen } = { ...args, ...props }
  return <CommissionPage commissionsOpen={commissionsOpen} />
}
