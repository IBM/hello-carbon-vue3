<script setup>
import { ref } from "vue";

const otherApps = ref([
  {
    id: "hello-vue",
    name: "Hello Carbon Vue",
    link: "https://github.com/IBM/hello-carbon-vue3",
  },
  {
    id: "hello-nuxt",
    name: "Hello Carbon Nuxt",
    link: "https://github.com/davidnixon/hello-carbon-nuxt",
  },
  {
    id: "carbon-vue",
    name: "Carbon 10 Vue Storybook",
    link: "https://vue.carbondesignsystem.com/",
  },
]);

</script>

<template>
  <cds-header-panel>
    <cds-switcher>
      <cds-switcher-item
        v-for="app in otherApps"
        :key="app.id"
        :data-cy="`language-${app.id}`"
        :href="app.link"
        target="_blank"
      >
        {{ app.name }}
      </cds-switcher-item>
    </cds-switcher>
  </cds-header-panel>
</template>
