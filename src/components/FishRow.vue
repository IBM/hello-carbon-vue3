<script setup>
import { useLanguageStore } from "../stores/language";
import { computed, inject, ref } from "vue";
import {
  StarFilled16 as RareIcon,
  CircleFilled16 as LocationIcon,
  EarthFilled16 as RiverIcon,
  EarthAmericasFilled16 as SeaIcon,
  EarthEuropeAfricaFilled16 as PondIcon,
  EarthSoutheastAsiaFilled16 as PierIcon,
} from "@carbon/icons-vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "../assets/fish.svg";
import { useTranslation } from "i18next-vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
const { t } = useTranslation();

const props = defineProps({
  fish: {
    type: /** @type {FishData} **/ Object,
    required: true,
  },
  expandable: { type: Boolean, default: false },
});
const langStore = useLanguageStore();
const fishName = computed(() => {
  const key = "name-" + langStore.languageObject.api;
  let name = props.fish.name[key];
  return name || props.fish.key;
});
const fishPrice = computed(() => {
  return langStore.currencyFormat.format(props.fish.price);
});
const cjFishPrice = computed(() => {
  return langStore.currencyFormat.format(props.fish["price-cj"]);
});
const rarityMap = {
  "Common": 1,
  "Uncommon": 2,
  "Rare": 3,
  "Ultra-rare": 4,
};
const rarity = computed(() => {
  return rarityMap[props.fish.availability?.rarity] || -1;
});
const location = computed(() => {
  const location = props.fish.availability?.location || "Pond";
  if (location.startsWith("Pond")) return "pond";
  else if (location.startsWith("River")) return "river";
  else if (location.startsWith("Sea")) return "sea";
  else if (location.startsWith("Pier")) return "pier";
  else return "";
});

const showCatchPhrases = inject("show-catch-phrases", ref(false));

const { md } = useBreakpoints();
</script>

<template>
  <cv-data-table-row
    :value="fish.key"
    :aria-label-for-batch-checkbox="t('select-row', { name: fishName })"
  >
    <cv-data-table-cell>{{ fishName }}</cv-data-table-cell>
    <cv-data-table-cell>
      <blur-image
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
      <pond-icon
        v-if="location === 'pond'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-blue-40"
      />
      <river-icon
        v-else-if="location === 'river'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-blue-60"
      />
      <sea-icon
        v-else-if="location === 'sea'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-teal-30"
      />
      <pier-icon
        v-else-if="location === 'pier'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-green-20"
      />
      <location-icon
        v-else
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-yellow-40"
      />
    </cv-data-table-cell>
    <cv-data-table-cell v-if="md">
      <div
        class="flex"
        :class="{
          'text-carbon-purple-30': rarity === 1,
          'text-carbon-purple-40': rarity === 2,
          'text-carbon-purple-50': rarity === 3,
          'text-carbon-purple-60': rarity === 4,
          'text-carbon-magenta-30': rarity > 4 || rarity < 1,
        }"
      >
        <rare-icon v-if="rarity >= 1" />
        <rare-icon v-if="rarity >= 2" />
        <rare-icon v-if="rarity >= 3" />
        <rare-icon v-if="rarity >= 4" />
      </div>
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
