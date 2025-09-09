<script setup lang="ts">
import { useLanguageStore } from "@/stores/language";
import { computed, inject, ref } from "vue";
// star icons handled by RarityStars component
import RarityStars from "@/components/RarityStars.vue";
import LocationIconByWater from "@/components/LocationIconByWater.vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "../assets/fish.svg";
import { useTranslation } from "i18next-vue";
import { useBreakpoints } from "@/composables/useBreakpoints";
const { t } = useTranslation();

import type { FishItem } from "@/types/fish";

const props = defineProps<{ fish: FishItem; expandable?: boolean }>();
const langStore = useLanguageStore();
import { useI18nName } from "@/composables/useI18nName";
const fishName = useI18nName(() => props.fish.name, props.fish["file-name"]);
const fishPrice = computed(() => {
  return langStore.currencyFormat.format(props.fish.price);
});
const cjFishPrice = computed(() => {
  return langStore.currencyFormat.format(props.fish["price-cj"]);
});
import { useRarity } from "@/composables/useRarity";
const { fishStars } = useRarity();
const fishRarity: number = fishStars(props.fish.availability?.rarity);

const showCatchPhrases = inject("show-catch-phrases", ref(false));

const { md } = useBreakpoints();
</script>

<template>
  <cv-data-table-row
    :value="fish['file-name']"
    :aria-label-for-batch-checkbox="t('select-row', { name: fishName })"
  >
    <cv-data-table-cell>{{ fishName }}</cv-data-table-cell>
    <cv-data-table-cell>
      <BlurImage
        class="w-4 h-4 md:w-12 md:h-12 object-contain max-w-none"
        :src="fish['icon_uri']"
        :src-placeholder="placeholderImage"
        :alt="fishName"
      />
    </cv-data-table-cell>
    <cv-data-table-cell v-if="md">
      {{ fishPrice }}
    </cv-data-table-cell>
    <cv-data-table-cell v-if="md">
      {{ cjFishPrice }}
    </cv-data-table-cell>
    <cv-data-table-cell>
      <LocationIconByWater
        :location-text="fish.availability?.location"
        :title="fish.availability?.location"
        :alt="fish.availability?.location"
      />
    </cv-data-table-cell>
    <cv-data-table-cell v-if="md">
      <RarityStars :count="fishRarity"/>
    </cv-data-table-cell>
    <!-- Add optional expanding data here -->
    <template
      v-if="showCatchPhrases"
      #expandedContent
    >
      <div class="flex justify-around gap-4">
        <div
          class="bg-[url(@/assets/fish-bowl.png)] bg-contain bg-no-repeat bg-carbon-blue-40 text-black text-2xl p-1"
        >
          {{ fish["catch-phrase"] }}
        </div>
        <div class="bg-[url(@/assets/museum-tile.png)] text-black text-2xl p-1">
          {{ fish["museum-phrase"] }}
        </div>
      </div>
    </template>
  </cv-data-table-row>
</template>

<style scoped lang="scss"></style>
