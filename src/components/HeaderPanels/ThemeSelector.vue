<script>
</script>
<script setup>
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();
const theme = useStorage("theme", "g90-theme");

const themes = computed(() => [
  { id: "white-theme", name: t("theme-white") },
  { id: "g10-theme", name: t("theme-g10") },
  { id: "g90-theme", name: t("theme-g90") },
  { id: "g100-theme", name: t("theme-g100") },
]);
function changeTheme(id) {
  theme.value = id;
  document.activeElement.blur();
}
</script>

<template>
  <cds-header-panel>
    <cds-switcher>
      <cds-switcher-item
        v-for="entry in themes"
        :key="entry.id"
        href="#"
        :class="{'selected-theme': entry.id === theme}"
      >
        <div
          :data-cy="`theme-${entry.id}`"
          @click="changeTheme(entry.id)"
        >
          {{ entry.name }}
        </div>
      </cds-switcher-item>
    </cds-switcher>
  </cds-header-panel>
</template>
<style scoped lang="css">
.selected-theme {
  background-color: var(--cds-layer-active);
}
</style>
