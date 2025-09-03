<script setup lang="ts">
import { useLanguageStore } from "@/stores/language.js";
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
import placeholderImage from "../../assets/fish.svg";
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
  <cds-table-row
    :selection-value="fish.key"
    :selection-name="fish.key"
    :aria-label-for-batch-checkbox="t('select-row', { name: fishName })"
  >
    <cds-table-cell class="pl-2">
      {{ fishName }}
    </cds-table-cell>
    <cds-table-cell>
      <BlurImage
        class="size-12 object-contain max-w-none"
        :src="fish['icon_uri']"
        :src-placeholder="placeholderImage"
        :alt="fishName"
      />
    </cds-table-cell>
    <cds-table-cell v-if="md">
      {{ fishPrice }}
    </cds-table-cell>
    <cds-table-cell v-if="md">
      {{ cjFishPrice }}
    </cds-table-cell>
    <cds-table-cell>
      <PondIcon
        v-if="location === 'pond'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-blue-40"
      />
      <RiverIcon
        v-else-if="location === 'river'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-blue-60"
      />
      <SeaIcon
        v-else-if="location === 'sea'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-teal-30"
      />
      <PierIcon
        v-else-if="location === 'pier'"
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-green-20"
      />
      <LocationIcon
        v-else
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        class="fill-carbon-yellow-40"
      />
    </cds-table-cell>
    <cds-table-cell v-if="md">
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
        <RareIcon v-if="rarity >= 1" />
        <RareIcon v-if="rarity >= 2" />
        <RareIcon v-if="rarity >= 3" />
        <RareIcon v-if="rarity >= 4" />
      </div>
    </cds-table-cell>
    <!-- Add optional expanding data here -->
  </cds-table-row>
  <cds-table-expanded-row v-if="showCatchPhrases">
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
  </cds-table-expanded-row>
</template>

<style scoped lang="scss"></style>
