<script setup>
import { useLanguageStore } from "../../stores/language.js";
import {
  Money20 as SellIcon,
  ShoppingCartPlus20 as BuyIcon,
} from "@carbon/icons-vue";
import placeholderImage from "@/assets/song-placeholder.jpg";
import { computed } from "vue";
import BlurImage from "@/components/BlurImage.vue";

const props = defineProps({
  song: { type: Object, required: true },
});
const langStore = useLanguageStore();
const songName = computed(() => {
  const key = "name-" + langStore.languageObject.api;
  let name = props.song?.name[key];
  return name || "unknown";
});
const buyPrice = computed(() => {
  return langStore.currencyFormat.format(props.song["buy-price"]);
});
const sellPrice = computed(() => {
  return langStore.currencyFormat.format(props.song["sell-price"]);
});
</script>

<template>
  <div data-cy="song-card">
    <h6>{{ songName }}</h6>
    <div style="width: 100%">
      <div class="aspect-square">
        <blur-image
          :src="song['image_uri']"
          :src-placeholder="placeholderImage"
          :alt="songName"
          class="object-cover w-full max-w-lg"
        />
      </div>
    </div>
    <div class="text-sm flex flex-row justify-between mb-4">
      <div>
        <div>{{ buyPrice }}</div>
        <buy-icon />
      </div>
      <div>
        <div class="mr-2">
          {{ sellPrice }}
        </div>
        <sell-icon />
      </div>
    </div>
  </div>
</template>
