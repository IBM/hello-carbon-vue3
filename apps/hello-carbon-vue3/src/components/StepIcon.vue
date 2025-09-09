<script setup lang="ts">
import type { Component } from "vue";

const props = defineProps<{ complete: boolean; completeIcon: Component; incompleteIcon: Component }>();
</script>

<template>
  <component :is="props.complete ? props.completeIcon : props.incompleteIcon" />
</template>

<style scoped></style>
