<template>
  <div>
    <div class="songs__name">{{ songName }}</div>
    <div style="width: 100%">
      <cv-aspect-ratio>
        <img :src="song.image_uri" :alt="songName" class="songs__cover-art" />
      </cv-aspect-ratio>
    </div>
    <div class="songs__price">
      <div>
        <div>{{ buyPrice }}</div>
        <buy-icon />
      </div>
      <div>
        <div>{{ sellPrice }}</div>
        <sell-icon />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from "../stores/language";
import {
  Money20 as SellIcon,
  ShoppingCartPlus20 as BuyIcon,
} from "@carbon/icons-vue";
import { computed } from "vue";

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

<style scoped lang="scss">
@import "../styles/theme";
.songs {
  &__name {
    @include carbon--type-style("productive-heading-01");
  }
  &__price {
    @include carbon--type-style("body-short-02");
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
