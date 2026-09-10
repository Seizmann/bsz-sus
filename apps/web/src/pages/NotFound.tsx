import { motion, useReducedMotion } from 'framer-motion'
import { NotFoundBackground } from '../components/Background/NotFoundBackground'
import { GhostPill } from '../components/UI/GhostPill'

// Custom 404 page — "lost signal / off pitch" treatment.
// Distinct animation from the crash screen: scanning-line sweep + bad-TV flicker on the 404 number,
// NOT the system-death glitch sequence used on CrashScreen.
// Ghost pill CTA returns to /.

export function NotFound() {
  const prefersReducedMotion = useReducedMotion()

  // Scanning line: a thin horizontal bar that sweeps top→bottom on mount
  const scanLineVariants = {
    initial: { top: '-2px', opacity: 0.7 },
    animate: prefersReducedMotion
      ? { top: '-2px', opacity: 0 }
      : { top: '102%', opacity: [0.7, 0.7, 0] },
  }

  const scanLineTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.6, ease: 'easeIn', delay: 0.3 }

  // 404 entry: bad-TV flicker (distinct from crash strobe — slower, more like a weak signal)
  const displayVariants = {
    initial: { opacity: 0 },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: [0, 0.4, 0, 0.8, 0.3, 1],
          filter: [
            'blur(4px)',
            'blur(2px)',
            'blur(6px)',
            'blur(1px)',
            'blur(2px)',
            'blur(0px)',
          ],
        },
  }

  const displayTransition = prefersReducedMotion
    ? { duration: 0.4, ease: 'easeOut' }
    : {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.5,
        times: [0, 0.15, 0.3, 0.55, 0.75, 1],
      }

  // Supporting lines stagger in cleanly after the 404 settles
  const lineVariants = {
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      {/* Art-directed fog/corner-flag background */}
      <NotFoundBackground />

      {/* Scanning line sweep — like a bad TV signal */}
      {!prefersReducedMotion && (
        <motion.div
          variants={scanLineVariants}
          initial="initial"
          animate="animate"
          transition={scanLineTransition}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100dvh',
          gap: '32px',
          padding: '48px 24px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          className="micro-cap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.4, ease: 'easeOut' }}
          style={{
            margin: 0,
            color: '#f0f0fa',
            opacity: 0.55,
            letterSpacing: '1.8px',
          }}
        >
          SIGNAL LOST · POSITION UNKNOWN
        </motion.p>

        {/* 404 with bad-TV flicker entry */}
        <motion.h1
          className="display-headline"
          variants={displayVariants}
          initial="initial"
          animate="animate"
          transition={displayTransition}
          style={{
            margin: 0,
            color: '#ffffff',
          }}
        >
          404
          <br />
          PITCH NOT FOUND
        </motion.h1>

        {/* Sub-message — terse, HUMANIZER.md voice */}
        <motion.div
          variants={lineVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2.0, duration: 0.4, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <p
            className="micro-cap"
            style={{
              margin: 0,
              color: '#f0f0fa',
              opacity: 0.6,
              letterSpacing: '1.4px',
            }}
          >
            WE SEARCHED THE ENTIRE PITCH.
          </p>
          <p
            className="text-caption"
            style={{
              margin: 0,
              color: '#5a5a5f',
              textTransform: 'uppercase',
              letterSpacing: '0.96px',
            }}
          >
            THIS URL IS OFF THE BOOKS.
          </p>
        </motion.div>

        {/* Ghost pill back to home */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.4, ease: 'easeOut' }}
        >
          <GhostPill label="RETURN TO BASE" href="/" />
        </motion.div>
      </div>
    </div>
  )
}
