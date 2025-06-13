<script setup>
import VillagerCard from "@/components/VillagerCard.vue";
import { useTranslation } from "i18next-vue";

defineProps({
  hobbyists: {
    type: /** @type {HobbyistData} **/ Object,
    required: true,
  },
});
const { t } = useTranslation();
</script>

<template>
  <div data-cy="hobby">
    <div class="productive-heading-03">
      {{ t("hobby") }}:{{ t(hobbyists.hobby) }}
    </div>
    <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
      <villager-card
        v-for="villager in hobbyists.villagers"
        :key="villager.key"
        :villager="villager"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
