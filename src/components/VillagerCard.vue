<template>
  <div class="villager">
    <div class="villager__name">{{ name }}</div>
    <div class="villager__catch-phrase">
      <chat-bubble
        :text="catchPhrase"
        :bubble-color="villager['bubble-color']"
        :text-color="villager['text-color']"
        kind="top-right"
      />
    </div>
    <div class="villager__image">
      <blur-image
        :src="villager.icon_uri"
        :alt="name"
        :src-placeholder="placeholderImage"
      />
    </div>
    <div class="villager__saying">
      <chat-bubble
        :text="villager.saying"
        :bubble-color="villager['bubble-color']"
        :text-color="villager['text-color']"
      />
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from "@/stores/language";
import { computed } from "vue";
import ChatBubble from "@/components/ChatBubble.vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "@/assets/bug-placeholder.jpg";

const props = defineProps({
  villager: {
    type: /** @type {VillagerData} **/ Object,
    required: true,
  },
});
const langStore = useLanguageStore();
const name = computed(() => {
  const key = "name-" + langStore.languageObject.api;
  let name = props.villager.name[key];
  return name || props.villager.key;
});
const catchPhrase = computed(() => {
  const key = "catch-" + langStore.languageObject.api;
  let phrase = props.villager["catch-translations"][key];
  return phrase || props.villager["catch-phrase"];
});
</script>

<style scoped lang="scss">
@import "../styles/_theme.scss";
.villager {
  background-color: $ui-04;
  height: calc(100% - 1rem);
  padding: 0.5rem;
  margin: 0.5rem 0.5rem 1rem;
  border: 1px solid $purple-60;

  &__name {
    @include carbon--type-style("productive-heading-02");
  }
  &__image {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  &__catch-phrase {
    display: flex;
    justify-content: end;
  }
}
</style>
