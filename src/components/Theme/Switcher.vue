<script>
export default {
  name: "ThemeSwitcher",
};
</script>
<script setup>
import { useStorage } from "@vueuse/core";
import { watch } from "vue";

const theme = useStorage("theme", "g90-theme");
watch(theme, () => {
  console.log("switcher theme");
  // document.querySelector("#app").classList.add(`world-${theme.value}`);
})
</script>

<template>
  <Teleport to="#app">
    <div>{{ theme }}</div>
  </Teleport>
</template>