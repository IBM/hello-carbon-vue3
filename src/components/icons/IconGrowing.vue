<script setup>
import { Sprout20 as NatureIcon } from "@carbon/icons-vue";
defineProps({
  iconColor: { type: String, default: "#198038" }, // green 60
});
</script>

<template>
  <div class="container">
    <div class="container__grower">
      <div class="container__widener">
        <slot><nature-icon /></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes growing {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(-8px);
  }
}
@keyframes widening {
  from {
    transform: scaleX(0.55);
  }
  to {
    transform: scaleX(1);
  }
}

.container {
  width: 100%;
  height: 20px;

  &__grower {
    position: absolute;
    z-index: 10;
    animation-name: growing;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  &__widener {
    color: v-bind(iconColor);
    height: 16px;
    width: 16px;
    animation-name: widening;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
    animation-direction: alternate;
  }
}
</style>
