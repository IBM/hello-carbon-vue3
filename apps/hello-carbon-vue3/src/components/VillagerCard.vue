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

<template>
  <div
    class="p-2! bg-carbon-gray-50 border border-solid border-carbon-purple-60"
  >
    <div class="font-semibold text-base">
      {{ name }}
    </div>
    <div class="flex justify-end">
      <chat-bubble
        :text="catchPhrase"
        :bubble-color="villager['bubble-color']"
        :text-color="villager['text-color']"
        kind="top-right"
        class="text-center"
      />
    </div>
    <div class="flex justify-around my-4!">
      <blur-image
        :src="villager.icon_uri"
        :alt="name"
        :src-placeholder="placeholderImage"
        class="size-32"
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

<style scoped lang="scss">
.xxvillager {
  height: calc(100% - 1rem);
}
</style>
