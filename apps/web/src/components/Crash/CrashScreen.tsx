import { motion, useReducedMotion } from 'framer-motion'

// System crash screen — triggered when countdown reaches zero.
// Pure visual front-end illusion. No destructive logic, no backend calls.
// Once shown, this state is permanent (no UI reset path).
//
// Animation sequence (full motion):
//   Phase 1 (0–0.6s): rapid flicker — opacity strobe, conveying system overload
//   Phase 2 (0.6–1.4s): chromatic jitter — horizontal x stutter, like a failing display
//   Phase 3 (1.4s+): settles to steady state on near-black canvas (#0a0a0a)
// prefers-reduced-motion: simple fade-in, no strobe/jitter.

export function CrashScreen() {
  const prefersReducedMotion = useReducedMotion()

  // The glitch overlay that precedes the settled message
  const glitchVariants = {
    initial: { opacity: 0, x: 0 },
    animate: prefersReducedMotion
      ? { opacity: 1, x: 0 }
      : {
          opacity: [0, 1, 0, 1, 0.3, 1, 0, 1, 0.6, 1],
          x: [0, -6, 6, -3, 3, -1, 1, 0, 0, 0],
        },
  }

  const glitchTransition = prefersReducedMotion
    ? { duration: 0.4, ease: 'easeOut' }
    : {
        duration: 1.4,
        ease: 'easeOut',
        times: [0, 0.08, 0.15, 0.25, 0.38, 0.50, 0.62, 0.75, 0.87, 1],
      }

  // Text lines stagger in after the glitch settles
  const lineVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      key="crash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeIn' }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0a0a0a', // canvas-night-soft — stark, not pure black
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px',
        overflowX: 'hidden',
      }}
      aria-live="assertive"
      role="alert"
    >
      <motion.div
        variants={glitchVariants}
        initial="initial"
        animate="animate"
        transition={glitchTransition}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          textAlign: 'center',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        {/* Status eyebrow */}
        <motion.p
          className="micro-cap"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.6, duration: 0.4, ease: 'easeOut' }}
          style={{ color: '#f0f0fa', margin: 0, opacity: 0.6 }}
        >
          SYSTEM STATUS · CRITICAL FAILURE
        </motion.p>

        {/* Primary headline */}
        <motion.h1
          className="display-headline"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.8, duration: 0.45, ease: 'easeOut' }}
          style={{
            margin: 0,
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          SIGNAL
          <br />
          TERMINATED
        </motion.h1>

        {/* Glitch sub-message in monospace-feel caps */}
        <motion.div
          variants={lineVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2.1, duration: 0.4, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <p
            className="micro-cap"
            style={{
              margin: 0,
              color: '#f0f0fa',
              opacity: 0.7,
              letterSpacing: '1.8px',
            }}
          >
            MISSION CLOCK · 00:00:00
          </p>
          <p
            className="micro-cap"
            style={{
              margin: 0,
              color: '#f0f0fa',
              opacity: 0.45,
              letterSpacing: '1.4px',
            }}
          >
            GO FOR KICKOFF · LAUNCH WINDOW CLOSED
          </p>
        </motion.div>

        {/* Hairline separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '1px',
            backgroundColor: '#3a3a3f', // hairline-on-dark
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />

        {/* Final terse line */}
        <motion.p
          className="text-caption"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2.6, duration: 0.4, ease: 'easeOut' }}
          style={{
            margin: 0,
            color: '#5a5a5f', // ink-mute — barely visible, mission-control style
            textTransform: 'uppercase',
            letterSpacing: '0.96px',
          }}
        >
          BSZ · FANTASY DIVISION · MATCHDAY ARMED
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
