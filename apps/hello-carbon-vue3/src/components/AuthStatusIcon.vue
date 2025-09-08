<script setup lang="ts">
import { Login20 as LoginIcon, UserAvatar20 as AvatarIcon } from "@carbon/icons-vue";

const props = defineProps<{ loggedIn: boolean }>();
</script>

<template>
  <component :is="props.loggedIn ? AvatarIcon : LoginIcon" />
</template>

<style scoped></style>
