import { useRef, useEffect } from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import { CountdownUnit } from './CountdownUnit'

interface CountdownDisplayProps {
  onComplete: () => void
}

// Assembles the four time units into a full countdown row.
// Calls onComplete once when the clock reaches zero.
// Separator colons are static chrome — not animated.
export function CountdownDisplay({ onComplete }: CountdownDisplayProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown()
  const calledRef = useRef(false)

  useEffect(() => {
    if (isComplete && !calledRef.current) {
      calledRef.current = true
      onComplete()
    }
  }, [isComplete, onComplete])

  const separator = (
    <span
      style={{
        color: '#f0f0fa',
        lineHeight: '1',
        paddingBottom: '1.4em', // aligns colon mid-digit, above the label row
        userSelect: 'none',
        opacity: 0.4,
      }}
      aria-hidden="true"
      className="countdown-digit-size"
    >
      :
    </span>
  )

  return (
    <div
      role="timer"
      aria-label="Mission countdown"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '4px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <CountdownUnit value={days} label="DAYS" digits={3} />
      {separator}
      <CountdownUnit value={hours} label="HRS" digits={2} />
      {separator}
      <CountdownUnit value={minutes} label="MIN" digits={2} />
      {separator}
      <CountdownUnit value={seconds} label="SEC" digits={2} />
    </div>
  )
}
