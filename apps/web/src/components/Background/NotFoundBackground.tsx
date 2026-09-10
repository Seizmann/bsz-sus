import { useReducedMotion, motion } from 'framer-motion'

// Art-directed 404 background — fog, corner flag, flickering light.
// Only desktop and mobile variants exist per docs/image-prompt.md.
// Falls back to pure #000000 if images fail to load.

export function NotFoundBackground() {
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
        // Slower, more ominous drift than the hero — "lost signal" mood
        animate={
          prefersReducedMotion
            ? { scale: 1 }
            : {
                scale: [1, 1.03, 1.01, 1],
                x: [0, 5, -5, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 30,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
              }
        }
      >
        <picture style={{ display: 'block', width: '100%', height: '100%' }}>
          {/* Desktop: ≥768px */}
          <source
            media="(min-width: 768px)"
            srcSet="/assets/images/notfound-bg-desktop.webp"
            type="image/webp"
          />
          {/* Mobile fallback */}
          <img
            src="/assets/images/notfound-bg-mobile.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
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
