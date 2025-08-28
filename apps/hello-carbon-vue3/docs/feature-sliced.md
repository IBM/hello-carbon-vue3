# Feature-Sliced Design (FSD) suggestions

This app is small, but adopting a few FSD ideas will keep it scalable.

## Current structure (selected)
- src/components/* — presentational widgets and feature bits are mixed
- src/views/* — route pages
- src/stores/* — Pinia stores
- src/shared/api/http.js — API helper
- src/composables/* — breakpoints, etc.

## Suggested structure

- src/app/
  - index (main.js), App.vue, router, providers, global styles
- src/pages/
  - Home, Fish, Bugs, Villagers, Error, NotFound (page-level components only)
- src/widgets/
  - Header, ThemeSwitcher, MobileTablePagination (can compose features and entities)
- src/features/
  - fish/hide-fish (buttons and logic to hide fish)
  - villagers/switcher (content switcher controls)
- src/entities/
  - fish, bug, villager, song (cards, rows, basic UI bound to an entity)
- src/shared/
  - api (createFetch, fetchJsonCached)
  - ui (primitive shared UI, e.g., BlurImage)
  - lib (composables, utils: useBreakpoints)
  - config (constants, env)

Migration can be incremental: introduce folders and move the most entangled pieces as you touch them. Keep import aliases (@/app, @/pages, etc.) in vite.config.

## Additional notes
- Keep stores under entities, e.g., src/entities/fish/model (Pinia store)
- Page components should orchestrate, not host complex logic: move logic into features/entities.
- Reusability ladder: shared < entities < features < widgets < pages < app.
