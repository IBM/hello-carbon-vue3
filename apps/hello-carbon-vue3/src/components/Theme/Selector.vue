<script>
export default {
  name: "ThemeSelector",
};
</script>
<script setup>
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();
const theme = useStorage("theme", "g90");

const themes = computed(() => [
  { id: "white", name: t("theme-white") },
  { id: "g10", name: t("theme-g10") },
  { id: "g90", name: t("theme-g90") },
  { id: "g100", name: t("theme-g100") },
]);
function changeTheme(id) {
  theme.value = id;
  document.activeElement.blur();
}
</script>

<template>
  <cv-switcher>
    <cv-switcher-item
      v-for="entry in themes"
      :key="entry.id"
    >
      <cv-switcher-item-link
        :selected="entry.id === theme"
        :data-cy="`theme-${entry.id}`"
        @click="changeTheme(entry.id)"
      >
        {{ entry.name }}
      </cv-switcher-item-link>
    </cv-switcher-item>
  </cv-switcher>
</template>

<style scoped lang="scss"></style>
