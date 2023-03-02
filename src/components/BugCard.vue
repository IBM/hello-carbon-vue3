<template>
  <div class="bug-card">
    <div class="bug-card-inner" :class="{ 'bug-card-flip': flip }">
      <div class="bug-card-front">
        <div>
          <blur-image
            :src="bug.icon_uri"
            :alt="bug.key"
            :src-placeholder="placeholderImage"
            bug-card__image
          />
        </div>
        <div>
          <cv-tag :label="t(bug.availability.rarity)" :kind="rarity" />
        </div>
        <cv-icon-button
          kind="ghost"
          size="sm"
          :icon="FlipIcon"
          :label="t('flip')"
          tip-position="left"
          class="bug-card__button"
          @click="toggleFlip"
        />
      </div>
      <div class="bug-card-back">
        <div class="bug-card__name">{{ bugName }}</div>
        <div class="bug-card__museum">{{ bug["museum-phrase"] }}</div>
        <cv-icon-button
          kind="ghost"
          size="sm"
          :icon="FlipIcon"
          :label="t('flip')"
          tip-position="left"
          class="bug-card__button"
          @click="toggleFlip"
        />
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import { Redo32 as FlipIcon } from "@carbon/icons-vue";
import { computed, ref } from "vue";
import { useLanguageStore } from "@/stores/language";
import { useTranslation } from "i18next-vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "@/assets/bug-placeholder.jpg";

const props = defineProps({
  bug: {
    type: /** @type {BugData} **/ Object,
    required: true,
  },
});
const { t } = useTranslation();

const flip = ref(false);
function toggleFlip() {
  flip.value = !flip.value;
}

const langStore = useLanguageStore();
const bugName = computed(() => {
  const key = "name-" + langStore.languageObject.api;
  let name = props.bug.name[key];
  return name || props.bug.key;
});

const rarityMap = {
  Common: "gray",
  Uncommon: "green",
  Rare: "purple",
  "Ultra-rare": "magenta",
};
const rarity = computed(() => {
  return rarityMap[props.bug.availability?.rarity] || "gray";
});
</script>

<style scoped lang="scss">
@import "../styles/_theme.scss";

.bug-card {
  background-color: transparent;
  width: 100%;
  height: 200px;
  border: 1px solid $purple-60;
  padding: 0.5rem;
  perspective: 1000px;
  &__image {
    width: 100%;
    max-width: 128px;
  }
  &-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  &-front,
  &-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  &-front {
    background-color: $ui-04;
  }
  &-back {
    background-color: $ui-03;
    transform: rotateY(180deg);
  }
  &-flip {
    transform: rotateY(180deg);
  }
  &__button {
    position: absolute !important;
    right: 0.5rem;
    bottom: 0.5rem;
    z-index: 99;
  }
  &__name {
    @include carbon--type-style("productive-heading-02");
    color: $link-01;
  }
  &__museum {
    @include carbon--type-style("body-short-01");
    margin-top: 0.5rem;
    height: calc(100% - 5rem);
    overflow-y: scroll;
  }
}
</style>
