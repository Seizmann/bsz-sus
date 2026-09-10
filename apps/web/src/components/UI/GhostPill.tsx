import { motion, useReducedMotion } from 'framer-motion'

interface GhostPillProps {
  label: string
  href?: string
  onClick?: () => void
}

// The brand's single ghost-outlined pill CTA per DESIGN.md {button-ghost-on-dark}.
// One per screen, never filled, never accent-colored.
// Spec: 1px solid #fff border, 32px border-radius ({rounded.pill}),
//       padding 18px 24px ({spacing.lg} {spacing.xl}),
//       font: D-DIN 700 13.008px / 0.94 / 1.17px tracking, uppercase.
export function GhostPill({ label, href, onClick }: GhostPillProps) {
  const prefersReducedMotion = useReducedMotion()

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.03, backgroundColor: 'rgba(255,255,255,0.09)' },
        whileTap: { scale: 0.97 },
        transition: { duration: 0.18, ease: 'easeOut' },
      }

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '18px 24px', // {spacing.lg} {spacing.xl}
    border: '1px solid #ffffff',
    borderRadius: '32px', // {rounded.pill}
    background: 'transparent',
    color: '#ffffff', // {on-primary}
    fontFamily: "'D-DIN', 'Arial', 'Verdana', sans-serif",
    fontSize: '13.008px', // {typography.button-cap}
    fontWeight: 700,
    lineHeight: '0.94',
    letterSpacing: '1.17px',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    textDecoration: 'none',
    minHeight: '44px', // WCAG AA touch target
    whiteSpace: 'nowrap' as const,
    userSelect: 'none' as const,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        style={baseStyle}
        {...motionProps}
      >
        {label}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={baseStyle}
      {...motionProps}
    >
      {label}
    </motion.button>
  )
}
