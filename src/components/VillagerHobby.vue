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
    <div class="text-xl! py-2">
      {{ t("hobby") }}:{{ t(hobbyists.hobby) }}
    </div>
    <div>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="villager in hobbyists.villagers"
          :key="villager.key"
        >
          <villager-card :villager="villager" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
