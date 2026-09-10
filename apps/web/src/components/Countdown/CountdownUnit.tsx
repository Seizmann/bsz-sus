import { CountdownDigit } from './CountdownDigit'

interface CountdownUnitProps {
  value: number
  label: string
  // How many digits to zero-pad to (2 for HH/MM/SS, up to 3 for DDD)
  digits?: number
}

// One countdown unit: two (or three) animated digits + a label below.
// e.g. value=14, label="HRS" → shows "14 HRS"
export function CountdownUnit({ value, label, digits = 2 }: CountdownUnitProps) {
  const padded = String(value).padStart(digits, '0')
  const chars = padded.split('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px', // {spacing.xs}
      }}
    >
      {/* Digit row */}
      <div
        className="countdown-digit-size"
        style={{
          display: 'flex',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.04em',
          color: '#ffffff', // on-primary
        }}
        aria-label={`${value} ${label}`}
      >
        {chars.map((char, i) => (
          // key = slot index keeps the component instance stable;
          // the animation key inside CountdownDigit is value itself,
          // so AnimatePresence fires correctly on every digit change
          <CountdownDigit key={`${label}-${i}`} value={char} />
        ))}
      </div>

      {/* Unit label */}
      <span
        className="micro-cap"
        style={{
          color: '#f0f0fa', // on-primary-mute — subtle hierarchy below digits
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}
