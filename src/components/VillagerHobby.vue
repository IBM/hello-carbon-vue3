<template>
  <div data-cy="hobby">
    <div class="productive-heading-03">
      {{ t("hobby") }}:{{ t(hobbyists.hobby) }}
    </div>
    <div>
      <cv-grid :full-width="true">
        <cv-row>
          <cv-column
            v-for="villager in hobbyists.villagers"
            :key="villager.key"
            :lg="4"
          >
            <villager-card :villager="villager" />
          </cv-column>
        </cv-row>
      </cv-grid>
    </div>
  </div>
</template>

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

<style scoped lang="scss"></style>
