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
  "Common": "gray",
  "Uncommon": "green",
  "Rare": "purple",
  "Ultra-rare": "magenta",
};
const rarity = computed(() => {
  return rarityMap[props.bug.availability?.rarity] || "gray";
});
</script>

<template>
  <div class="bug-card border border-solid border-carbon-purple-60 mb-2">
    <div
      class="bug-card-inner"
      :class="{ 'bug-card-flip': flip }"
    >
      <div class="bug-card-front bg-carbon-gray-50">
        <div>
          <blur-image
            :src="bug.icon_uri"
            :alt="bug.key"
            :src-placeholder="placeholderImage"
            class="bug-card__image"
          />
        </div>
        <div>
          <cv-tag
            :label="t(bug.availability.rarity)"
            :kind="rarity"
          />
        </div>
        <cv-icon-button
          v-if="!flip"
          kind="ghost"
          size="sm"
          :icon="FlipIcon"
          :label="t('flip')"
          tip-position="left"
          class="bug-card__button"
          @click="toggleFlip"
        />
      </div>
      <div class="bug-card-back bg-carbon-gray-70">
        <div class="bug-card__name productive-heading-02 text-carbon-blue-60">
          {{ bugName }}
        </div>
        <div class="bug-card__museum body-short-01">
          {{ bug["museum-phrase"] }}
        </div>
        <cv-icon-button
          v-if="flip"
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
  <div />
</template>

<style scoped lang="scss">
.bug-card {
  background-color: transparent;
  width: 100%;
  height: 200px;
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
  &-back {
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
  &__museum {
    margin-top: 0.5rem;
    height: calc(100% - 5rem);
    overflow-y: scroll;
  }
}
</style>
