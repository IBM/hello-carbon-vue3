<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { prefix } from "@carbon/web-components/lib/globals/settings";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  ...RouterLink.props,
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
    :class="`${prefix}--side-nav__link`"
  >
    <div :class="`${prefix}--side-nav__icon`">
      <slot name="title-icon" />
    </div>
    <span :class="`${prefix}--side-nav__link-text`">
      <slot>${title}</slot>
    </span>
  </a>
  <RouterLink
    v-else
    v-slot="{ isActive, href, navigate }"
    v-bind="$props"
    custom
  >
    <a
      v-bind="$attrs"
      :href="href"
      :class="{
        [`${prefix}--side-nav__link`]: true,
        [`${prefix}--side-nav__link--current`]: isActive}"
      @click="navigate"
    >
      <div class="cds--side-nav__icon">
        <slot name="title-icon" />
      </div>
      <span :class="`${prefix}--side-nav__link-text`">
        <slot>${title}</slot>
      </span>
    </a>
  </RouterLink>
</template>
