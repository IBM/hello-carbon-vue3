<script>
export default {
  name: "ThemeSwitcher",
};
</script>
<script setup>
import { useStorage } from "@vueuse/core";
import white from "../../styles/carbon-white.css?url";
import g10 from "../../styles/carbon-g10.css?url";
import g90 from "../../styles/carbon-g90.css?url";
import g100 from "../../styles/carbon-g100.css?url";
import { computed } from "vue";

const theme = useStorage("theme", "g90");
const cssLink = computed(() => {
  if (theme.value === "white") return white;
  else if (theme.value === "g10") return g10;
  else if (theme.value === "g100") return g100;
  else return g90;
});
</script>

<template>
  <Teleport to="head">
    <link
      rel="stylesheet"
      type="text/css"
      :href="cssLink"
    >
  </Teleport>
</template>
