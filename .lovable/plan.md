# Cinematic 3D Motion Upgrade

## Goal
Make the existing red-and-black portfolio feel more immersive and alive without changing its content, visual identity, or single-page narrative.

## What will change
- Add a full-bleed interactive 3D scene to the opening: a dark sculptural core, metallic orbit rings, signal-red light, and a restrained particle field.
- Make the 3D object react subtly to pointer movement and scroll, with slow, weighty motion rather than game-like spinning.
- Add scroll-triggered reveals for chapter headings, inquiry rows, projects, quotes, books, and the closing statement.
- Add depth to the astronaut chapter with layered parallax and a moving light sweep.
- Enhance project rows and the bookshelf with dimensional hover/focus movement.
- Add a slim scroll-progress indicator so the journey feels continuous.
- Preserve reduced-motion behavior and provide a graceful non-WebGL visual fallback.

## Technical approach
- Use React Three Fiber and Drei for a client-only procedural scene; no external 3D assets or runtime downloads.
- Keep the 3D canvas unframed and integrated behind the opening typography.
- Use IntersectionObserver and CSS variables for reveal/parallax effects, avoiding per-frame React state updates.
- Cap rendering resolution and geometry density for mobile performance.
- Keep all current links, copy, imagery, sections, and route structure unchanged.

## Validation
- Check the opening scene, pointer response, scroll transitions, and interactive bookshelf in the live preview.
- Verify desktop and mobile layouts, reduced-motion behavior, no horizontal overflow, and clean console/build output.