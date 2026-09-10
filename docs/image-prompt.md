# image-prompt.md

Master prompts for every image this site needs. Generate each with the given prompt, export as `.webp`, compress, and place at `apps/web/src/assets/images/<filename>` (or `apps/web/public/` where noted) using the **exact filename** given. Do not rename — component code references these names directly.

All images follow the `DESIGN.md` system: pure black/near-black grading, dramatic single-source lighting, no text/logos baked into the image, no visible sponsor branding, no real identifiable players/teams/kits.

---

### 1. `hero-bg-desktop.webp`
**Size:** 2560×1440px (16:9), export quality ~75-80 webp
**Location:** `apps/web/src/assets/images/`
**Master prompt:**
> Cinematic wide-angle photograph of an empty professional football stadium at night, shot from a low pitch-level angle. Dramatic floodlights cutting through light mist/fog, creating hard directional beams of light and deep black shadows. Pure black night sky, no visible crowd, no readable text or logos on any surface, no identifiable team branding. The grass is dark, wet, and reflective, showing sharp specular highlights from the floodlights. A single football sits centered on the halfway line, sharply lit, rest of the frame falling into near-black shadow at the edges. Grade the image so the top third and lower third are darker (near-black) to leave clean space for overlaid white uppercase display type. High contrast, moody, aerospace-launchpad-at-night mood transposed onto a football pitch. No color grading beyond cool blue-white and black — no warm tones, no accent colors.

### 2. `hero-bg-tablet.webp`
**Size:** 1536×2048px (3:4 portrait crop, same scene as #1)
**Location:** `apps/web/src/assets/images/`
**Master prompt:**
> Same scene, lighting, and grading as `hero-bg-desktop.webp` (empty floodlit football stadium at night, mist, single ball on halfway line, near-black top/bottom for type overlay), but composed as a portrait 3:4 crop centered on the lit football and central pitch area, with the floodlight towers visible at the top edge of frame.

### 3. `hero-bg-mobile.webp`
**Size:** 1080×1920px (9:16 portrait crop, same scene as #1)
**Location:** `apps/web/src/assets/images/`
**Master prompt:**
> Same scene, lighting, and grading as `hero-bg-desktop.webp`, tightly cropped 9:16 portrait, focal subject is the single sharply-lit football on the wet pitch with floodlight beams crossing above it, heavy near-black vignette top and bottom for type legibility on a small screen.

### 4. `notfound-bg-desktop.webp`
**Size:** 2560×1440px (16:9)
**Location:** `apps/web/src/assets/images/`
**Master prompt:**
> Cinematic photograph of an empty football pitch corner flag area at night, thick fog rolling across the grass, floodlights mostly off except one flickering distant light, overall much darker and emptier than the hero image — a "lost signal / off the pitch" mood. No people, no text, no branding. Grain and slight desaturation for a glitch/static feel. Near-black grading overall, leaving generous negative space for overlaid uppercase type and a ghost pill button.

### 5. `notfound-bg-mobile.webp`
**Size:** 1080×1920px (9:16)
**Location:** `apps/web/src/assets/images/`
**Master prompt:**
> Same fog/corner-flag/flickering-floodlight scene and mood as `notfound-bg-desktop.webp`, cropped portrait 9:16, corner flag positioned in the lower third, fog and negative black space filling the upper two-thirds for type overlay.

### 6. `og-image.webp`
**Size:** 1200×630px (standard OG/Twitter card ratio)
**Location:** `apps/web/public/`
**Master prompt:**
> Social share card, 1200×630px. Same visual system as the hero: empty floodlit football stadium at night, dramatic mist and light beams, pure black/white grading, no real team branding, no players. Compose with strong empty dark space on the left third and the lit pitch/floodlight action on the right two-thirds, so a headline and countdown snippet can be overlaid on the left in white uppercase type without fighting the image. No text baked into the image itself — text will be added in code.

---

## Notes for the coding agent
- Use `srcset`/`<picture>` with the desktop/tablet/mobile variants above for the hero and 404 backgrounds, matching `DESIGN.md`'s art-direction breakpoint guidance.
- Preload only the hero desktop or mobile variant (whichever matches viewport) — lazy-load the rest.
- If a listed file is missing at build time, fall back to a plain `{colors.canvas-night}` background rather than breaking the layout.
