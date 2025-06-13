<script setup>
import {
  Book20 as Book,
  Education20 as EducationIcon,
} from "@carbon/icons-vue";
defineProps({
  iconColor: { type: String, default: "#0072c3" }, // cyan 60
});
</script>

<template>
  <div class="container">
    <div class="container__reading">
      <div class="container__education">
        <slot name="education">
          <education-icon />
        </slot>
      </div>
      <div class="container__book">
        <slot name="book">
          <book />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes reading {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(24px);
  }
}

@keyframes bouncing {
  from {
    transform: translateX(-20px);
  }
  to {
    transform: translateX(6px);
  }
}

.container {
  width: 100%;
  height: 20px;

  &__education {
    color: v-bind(iconColor);
    animation-name: reading;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
    animation-direction: alternate;
    position: absolute;
    z-index: 10;
    top: 8px;
    opacity: 1;
  }
  &__book {
    color: v-bind(iconColor);
    height: 16px;
    width: 16px;
    animation-name: bouncing;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
    animation-direction: alternate;
    position: absolute;
    top: 8px;
  }
}
</style>
