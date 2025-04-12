<script setup>
import { useLanguageStore } from "@/stores/language.js";
import { nextTick, ref } from "vue";

const langStore = useLanguageStore();
const expanded = ref(false);
function changeLocale(language) {
  langStore.setLanguage(language);
  expanded.value = true;
  nextTick(() => expanded.value = false);
}
</script>

<template>
  <cds-header-panel :expanded="expanded">
    <cds-switcher>
      <cds-switcher-item
        v-for="entry in langStore.languages"
        :key="entry.title"
        :class="{'selected-language': entry.language === langStore.language}"
        href="#"
      >
        <div

          :data-cy="`language-${entry.language}`"
          @click="changeLocale(entry.language)"
        >
          {{ entry.title }}
        </div>
      </cds-switcher-item>
    </cds-switcher>
  </cds-header-panel>
</template>
<style scoped lang="css">
.selected-language {
  background-color: var(--cds-layer-active);
}
</style>
