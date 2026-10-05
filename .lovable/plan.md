# Library and Mind Scene Redesign

## Goal
Replace the artificial-looking orbit image and generic bookshelf backdrop with two distinctive scenes that belong to the portfolio’s red, black, and warm-paper visual world.

## What will change
- Rebuild the Mind section as a procedural kinetic “thought machine”: a dimensional black core, red orbital tracks, moving signal points, and six interests arranged as an editorial instrument rather than pasted over an image.
- Replace the library photograph with an abstract architectural archive scene built around thirteen monumental book spines, hard shadows, red light, and tactile paper textures.
- Keep the existing book titles, active-book interaction, chapter order, and single-page journey unchanged.
- Add restrained depth, pointer response, and scroll reveals while preserving reduced-motion behavior.
- Rework both scenes for mobile so labels remain readable and the compositions do not feel cramped.

## Technical approach
- Remove the current library and orbit background-image dependencies from these sections.
- Use CSS perspective, layered pseudo-elements, and lightweight procedural React markup for the visual structures.
- Reuse the existing signal-red, ink, paper, and blood-red design tokens.

## Validation
- Check both redesigned scenes on desktop and mobile.
- Verify all thirteen books and six interests remain usable and readable.
- Confirm no overflow, console errors, or broken reduced-motion behavior.
