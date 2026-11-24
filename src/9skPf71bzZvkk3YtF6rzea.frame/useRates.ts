import { useEffect, useState } from 'react'

import { FALLBACK_RATES, type Rates } from './data'

/** Live EUR → USD / VND rates, refreshed on each visit. Falls back to fixed rates offline. */
export function useRates() {
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data?.rates?.USD || !data?.rates?.VND) return
        setRates({ EUR: 1, USD: data.rates.USD, VND: data.rates.VND })
        setLive(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return { rates, live }
}
