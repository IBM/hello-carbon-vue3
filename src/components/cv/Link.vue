<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { prefix } from "@carbon/web-components/lib/globals/settings";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  ...RouterLink.props,
  size: { type: String, default: "md", validator: val => !["sm", "md", "lg"].includes(val) },
});
const isExternalLink = computed(() => {
  return typeof props.to === "string" && props.to.startsWith("http");
});
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to"
    target="_blank"
    :class="`${prefix}--link ${prefix}--link--${size}`"
  >
    <slot>${title}</slot>
  </a>
  <RouterLink
    v-else
    v-slot="{ href, navigate }"
    v-bind="$props"
    custom
  >
    <a
      v-bind="$attrs"
      :href="href"
      :class="{
        [`${prefix}--link ${prefix}--link--${size}`]: true}"
      @click="navigate"
    >
      <slot>${title}</slot>
    </a>
  </RouterLink>
</template>
