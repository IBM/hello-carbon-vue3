<script>
</script>
<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { computed, ref, nextTick } from "vue";
import { useTranslation } from "i18next-vue";
import { availableThemes } from "@/composables/useTheme.js";

const { t } = useTranslation();
const theme = useStorage("theme", "g90-theme");

const themes = computed(() => availableThemes.map((item) => {
  return { ...item, name: t(item.name) };
}));

const expanded = ref(false);
function changeTheme(id) {
  theme.value = id;
  expanded.value = true;
  nextTick(() => expanded.value = false);
}
</script>

<template>
  <cds-header-panel :expanded="expanded">
    <cds-switcher class="mt-10">
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
