import { useState, useEffect } from 'react'

export interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
  totalSecondsRemaining: number
}

// Target: 2026-09-11T17:00:00+06:00 (Asia/Dhaka)
// Parsing this ISO string with the explicit +06:00 offset gives the correct UTC epoch
// regardless of the visitor's local timezone — the browser's Date constructor handles
// the UTC offset arithmetic, so no timezone library is needed.
const TARGET_ISO = '2026-09-11T17:00:00+06:00'
const TARGET_MS = new Date(TARGET_ISO).getTime()

function computeCountdown(): CountdownState {
  const now = Date.now()
  const diff = TARGET_MS - now

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
      totalSecondsRemaining: 0,
    }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isComplete: false, totalSecondsRemaining: totalSeconds }
}

export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(computeCountdown)

  useEffect(() => {
    // If already complete on mount, no interval needed
    if (state.isComplete) return

    const id = setInterval(() => {
      const next = computeCountdown()
      setState(next)
      if (next.isComplete) {
        clearInterval(id)
      }
    }, 1000)

    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
