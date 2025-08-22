<script setup>
import { Basketball20 as Basketball } from "@carbon/icons-vue";
defineProps({
  iconColor: { type: String, default: "#ba4e00" }, // orange 60
});
</script>

<template>
  <div class="container">
    <div class="container__bouncer">
      <div class="container__spinner">
        <slot><basketball /></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bouncing {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
}

.container {
  width: 100%;
  height: 20px;

  &__bouncer {
    animation-name: bouncing;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
    animation-direction: alternate;
    position: absolute;
    z-index: 10;
  }
  &__spinner {
    color: v-bind(iconColor);
    height: 16px;
    width: 16px;
    animation-name: spinning;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
</style>
