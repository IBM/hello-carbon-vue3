<script setup>
import { CameraAction20 as CameraAction } from "@carbon/icons-vue";
defineProps({
  iconColor: { type: String, default: "#0f62fe" }, // blue 60
});
</script>

<template>
  <div class="container">
    <div class="container__icon">
      <slot><camera-action class="container__svg" /></slot>
      <div class="container__flasher" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes flashing {
  from {
    transform: scale(0);
  }
  20%,
  40% {
    transform: scale(1);
  }
  60%,
  100% {
    transform: scale(0);
  }
}
.container {
  width: 100%;
  height: 20px;

  &__icon {
    position: absolute;
    z-index: 10;
    color: v-bind(iconColor);
  }
  &__flasher {
    height: 7px;
    width: 7px;
    background-color: var(--carbon-yellow-30);
    left: 10.5px;
    top: 3px;
    position: absolute;
    transform: scale(0);
    border-radius: 50%;
    animation-name: flashing;
    animation-iteration-count: 10;
    animation-duration: 750ms;
    animation-delay: 2s;
    animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0);
  }
}
</style>
