<template>
  <div>
    <div class="songs__name">{{ songName(song) }}</div>
    <div style="width: 100%">
      <cv-aspect-ratio>
        <img
          :src="song.image_uri"
          :alt="songName(song)"
          class="songs__cover-art"
        />
      </cv-aspect-ratio>
    </div>
    <div class="songs__price">
      <shopping-cart-plus32 />
      <div>{{ currency(song["buy-price"]) }}</div>
      <money32 />
      <div>{{ currency(song["sell-price"]) }}</div>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from "../stores/language";
import { Money32, ShoppingCartPlus32 } from "@carbon/icons-vue";

defineProps({
  song: { type: Object, required: true },
});
const langStore = useLanguageStore();
function songName(song) {
  const key = "name-" + langStore.languageObject.api;
  let name = song?.name[key];
  return name || "unknown";
}
const currency = (number) => langStore.currencyFormat.format(number);
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
  }
  &__cover-art {
    width: 100%;
    max-width: 512px;
  }
}
</style>
