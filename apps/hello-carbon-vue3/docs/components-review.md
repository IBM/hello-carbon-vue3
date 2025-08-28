# Components review and split suggestions

- FishView.vue: quite large, but most templating delegates to FishRow. Consider moving pagination and sorting logic into a feature module (features/fish/table) with a composable (useFishTable) and smaller presentational subcomponents.
- VillagersView.vue: contains hobby-specific icon logic and content-switcher wiring. Consider extracting:
  - entities/villager/ui/VillagerHobbyList.vue (renders the switcher and content)
  - features/villagers/special-icons (encapsulate animated icons rules)
  - a composable useVillagerGroups to compute groups and selected tab.
- TheHeader.vue: encapsulates multiple panels and static data. Consider:
  - widgets/header/model/useHeaderState.ts for language/login state
  - widgets/header/ui/HeaderNav.vue, HeaderPanels.vue for structure.
- SongCard.vue, BugCard.vue, FishRow.vue, VillagerCard.vue are reasonably focused; keep as entities/* UI.
- BlurImage.vue is shared UI primitive; move to shared/ui/BlurImage.vue.
