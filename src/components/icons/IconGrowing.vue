<template>
  <div class="container">
    <div class="container__grower">
      <div class="container__widener">
        <slot><nature-icon /></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Sprout16 as NatureIcon } from "@carbon/icons-vue";
defineProps({
  iconColor: { type: String, default: "#198038" }, // green 60
});
</script>

<style scoped lang="scss">
@keyframes growing {
  from {
    transform: translateY(19px);
  }
  to {
    transform: translateY(-6px);
  }
}
@keyframes widening {
  from {
    transform: scaleX(0);
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
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }
  &__widener {
    color: v-bind(iconColor);
    height: 16px;
    width: 16px;
    animation-name: widening;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
    animation-direction: alternate;
  }
}
</style>
