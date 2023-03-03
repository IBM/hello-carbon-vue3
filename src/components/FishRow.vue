<template>
  <cv-data-table-row
    :value="fish.key"
    :aria-label-for-batch-checkbox="t('select-row', { name: fishName })"
  >
    <cv-data-table-cell>{{ fishName }}</cv-data-table-cell>
    <cv-data-table-cell>
      <blur-image
        class="fish__icon"
        :src="fish['icon_uri']"
        :src-placeholder="placeholderImage"
        :alt="fishName"
      />
    </cv-data-table-cell>
    <cv-data-table-cell>{{ fishPrice }}</cv-data-table-cell>
    <cv-data-table-cell>{{ cjFishPrice }}</cv-data-table-cell>
    <cv-data-table-cell
      ><location-icon
        :alt="fish.availability?.location"
        :title="fish.availability?.location"
        :class="`fish__location-${location}`"
      />
    </cv-data-table-cell>
    <cv-data-table-cell>
      <div :class="`fish__rarity-${rarity}`">
        <rare-icon v-if="rarity >= 1" />
        <rare-icon v-if="rarity >= 2" />
        <rare-icon v-if="rarity >= 3" />
        <rare-icon v-if="rarity >= 4" />
      </div>
    </cv-data-table-cell>
    <!-- Add optional expanding data here -->
  </cv-data-table-row>
</template>

<script setup>
import { useLanguageStore } from "../stores/language";
import { computed } from "vue";
import {
  StarFilled16 as RareIcon,
  CircleFilled16 as LocationIcon,
} from "@carbon/icons-vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "../assets/fish.svg";
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();

const props = defineProps({
  fish: {
    type: /** @type {FishData} **/ Object,
    required: true,
  },
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
  Common: 1,
  Uncommon: 2,
  Rare: 3,
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
</script>

<style scoped lang="scss">
@import "../styles/theme";
.fish {
  &__icon {
    height: 32px;
    width: 32px;
  }
  &__location-pond {
    color: $blue-40;
  }
  &__location-river {
    color: $blue-60;
  }
  &__location-sea {
    color: $teal-30;
  }
  &__location-pier {
    color: $green-20;
  }
  &__rarity-1 {
    color: $purple-30;
  }
  &__rarity-2 {
    color: $purple-40;
  }
  &__rarity-3 {
    color: $purple-50;
  }
  &__rarity-4 {
    color: $purple-60;
  }
}
</style>
