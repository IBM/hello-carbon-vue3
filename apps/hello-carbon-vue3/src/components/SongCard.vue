<script setup lang="ts">
import { useLanguageStore } from "../stores/language";
import {
  Money20 as SellIcon,
  ShoppingCartPlus20 as BuyIcon,
} from "@carbon/icons-vue";
import placeholderImage from "@/assets/song-placeholder.jpg";
import { computed } from "vue";
import BlurImage from "@/components/BlurImage.vue";

import type { SongItem } from "@/types/songs";

const props = defineProps<{ song: SongItem }>();
const langStore = useLanguageStore();
const songName = computed(() => {
  const key = "name-" + langStore.languageObject.api;
  const name = props.song?.name[key];
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
    <div class="productive-heading-01">
      {{ songName }}
    </div>
    <div style="width: 100%">
      <cv-aspect-ratio>
        <BlurImage
          :src="song['image_uri']"
          :src-placeholder="placeholderImage"
          :alt="songName"
          class="songs__cover-art"
        />
      </cv-aspect-ratio>
    </div>
    <div class="songs__price body-short-02">
      <div>
        <div>{{ buyPrice }}</div>
        <BuyIcon />
      </div>
      <div>
        <div>{{ sellPrice }}</div>
        <SellIcon />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.songs {
  &__price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    div {
      display: flex;
      margin-right: 0.5rem;
    }
  }
  &__cover-art {
    width: 100%;
    max-width: 512px;
  }
}
</style>
