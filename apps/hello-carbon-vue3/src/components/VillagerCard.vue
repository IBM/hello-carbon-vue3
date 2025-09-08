<script setup lang="ts">
import { useLanguageStore } from "@/stores/language";
import { computed } from "vue";
import ChatBubble from "@/components/ChatBubble.vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "@/assets/bug-placeholder.jpg";

import type { VillagerItem } from "@/types/villagers";

const props = defineProps<{ villager: VillagerItem }>();
const langStore = useLanguageStore();
import { useI18nName } from "@/composables/useI18nName";
const name = useI18nName(() => props.villager.name, props.villager["file-name"]);
const catchPhrase = computed(() => {
  const key = "catch-" + langStore.languageObject.api;
  const phrase = props.villager["catch-translations"][key];
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
      <ChatBubble
        :text="catchPhrase"
        :bubble-color="villager['bubble-color']"
        :text-color="villager['text-color']"
        kind="top-right"
        class="text-center"
      />
    </div>
    <div class="flex justify-around my-4!">
      <BlurImage
        :src="villager.icon_uri"
        :alt="name"
        :src-placeholder="placeholderImage"
        class="size-32"
      />
    </div>
    <div class="villager__saying">
      <ChatBubble
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
