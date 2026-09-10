import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface CountdownDigitProps {
  value: string // single character: '0'–'9'
}

// Single animated digit — slides up/out on exit, slides in from below on enter.
// Each tick gives the digit a new key, triggering AnimatePresence to swap it.
// prefers-reduced-motion: simple cross-fade instead of slide.
export function CountdownDigit({ value }: CountdownDigitProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: '60%', opacity: 0, scale: 0.85 },
        animate: { y: '0%', opacity: 1, scale: 1 },
        exit: { y: '-60%', opacity: 0, scale: 0.85 },
      }

  const transition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        // Width is fixed so layout doesn't jump between digits
        width: '0.62em',
        textAlign: 'center',
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
