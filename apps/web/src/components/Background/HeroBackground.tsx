import { useReducedMotion, motion } from 'framer-motion'

// Art-directed hero background with slow Ken Burns ambient motion.
// Uses <picture> with 3 breakpoint-matched sources per docs/image-prompt.md:
//   ≥1280px → desktop (2560×1440)
//   ≥768px  → tablet (1536×2048)
//   <768px  → mobile (1080×1920)
// Falls back to pure #000000 if images fail to load.

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#000000', // canvas-night fallback
      }}
    >
      <motion.div
        style={{ width: '100%', height: '100%', transformOrigin: 'center center' }}
        // Slow Ken Burns: imperceptibly drifts 1.0→1.04 scale over 22s, loops
        animate={
          prefersReducedMotion
            ? { scale: 1 }
            : {
                scale: [1, 1.04, 1],
                x: [0, -8, 8, 0],
                y: [0, -4, 4, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 22,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
              }
        }
      >
        <picture style={{ display: 'block', width: '100%', height: '100%' }}>
          {/* Desktop: ≥1280px */}
          <source
            media="(min-width: 1280px)"
            srcSet="/assets/images/hero-bg-desktop.webp"
            type="image/webp"
          />
          {/* Tablet: 768px–1279px */}
          <source
            media="(min-width: 768px)"
            srcSet="/assets/images/hero-bg-tablet.webp"
            type="image/webp"
          />
          {/* Mobile fallback: <768px */}
          <img
            src="/assets/images/hero-bg-mobile.webp"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </picture>
      </motion.div>
    </div>
  )
}
