import { useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HeroBackground } from '../components/Background/HeroBackground'
import { CountdownDisplay } from '../components/Countdown/CountdownDisplay'
import { CrashScreen } from '../components/Crash/CrashScreen'
import { GhostPill } from '../components/UI/GhostPill'

// Responsive display font sizes per DESIGN.md breakpoints:
// <600px → 40px  (Small Mobile)
// 600–767px → 48px  (Mobile)
// 768–960px → 60px  (Tablet)
// ≥961px → 80px  (Laptop / Desktop / Wide)
// Applied via CSS class .display-headline in index.css

export function Home() {
  const [crashed, setCrashed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleComplete = useCallback(() => {
    setCrashed(true)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#000000', // canvas-night
      }}
    >
      <AnimatePresence mode="wait">
        {crashed ? (
          <CrashScreen key="crash" />
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.04 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.3 }
                : { duration: 0.6, ease: 'easeIn' }
            }
            style={{
              position: 'relative',
              minHeight: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {/* Full-bleed hero background with ambient Ken Burns */}
            <HeroBackground />

            {/* Content overlay — sits above the background image */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px', // {spacing.xxl}
                padding: '48px 24px', // {spacing.huge} {spacing.xl}
                textAlign: 'center',
                width: '100%',
                maxWidth: '1200px', // inner reading column per DESIGN.md
                margin: '0 auto',
              }}
            >
              {/* Eyebrow / mission status line */}
              <motion.p
                className="micro-cap"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
                style={{
                  margin: 0,
                  color: '#f0f0fa', // on-primary-mute
                  letterSpacing: '1.8px',
                }}
              >
                T-MINUS · MISSION CLOCK ACTIVE · STATUS: ARMED
              </motion.p>

              {/* Primary display headline */}
              <motion.h1
                className="display-headline"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
                style={{
                  margin: 0,
                  color: '#ffffff', // on-primary
                }}
              >
                GO FOR
                <br />
                KICKOFF
              </motion.h1>

              {/* Live countdown clock */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: 'easeOut' }}
                style={{ width: '100%' }}
              >
                <CountdownDisplay onComplete={handleComplete} />
              </motion.div>

              {/* Ghost pill CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.45, ease: 'easeOut' }}
              >
                <GhostPill label="MISSION STATUS" />
              </motion.div>

              {/* Kickoff window sub-caption */}
              <motion.p
                className="text-caption"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
                style={{
                  margin: 0,
                  color: '#f0f0fa',
                  opacity: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.96px',
                }}
              >
                KICKOFF WINDOW · 17:00 BST+6 · 11 SEP 2026
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
