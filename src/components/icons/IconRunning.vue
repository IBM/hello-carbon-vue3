<script setup>
import { Soccer20 as Soccer } from "@carbon/icons-vue";
import { computed, onMounted, ref } from "vue";
const props = defineProps({
  iconColor: { type: String, default: "#d02670" }, // magenta 60
  runWidth: { type: Number, default: 200 },
});
const runPx = computed(() => `${props.runWidth}px`);
const runner = ref(null);
const turner = ref(null);
function toggleRunDirection(skipTurn) {
  runner.value?.classList?.toggle("container__runner--forward");
  if (!skipTurn) turner.value?.classList?.toggle("container__turner--turn");
}
function onAnimationEnd() {
  setTimeout(toggleRunDirection, 1500);
}
onMounted(() => setTimeout(() => toggleRunDirection(true), 250));
</script>

<template>
  <div class="container">
    <div
      ref="runner"
      class="container__runner"
      @transitionend.capture="onAnimationEnd"
    >
      <div
        ref="turner"
        class="container__turner"
      >
        <slot><soccer /></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 20px;

  &__runner {
    transition-duration: 1.5s;
    transition-timing-function: ease-out;
    transition-property: transform;
    transform: translateX(0);
    position: absolute;
    z-index: 10;
    &--forward {
      transform: translateX(v-bind(runPx));
    }
  }
  &__turner {
    color: v-bind(iconColor);
    height: 16px;
    width: 16px;
    transform: rotateY(0);
    &--turn {
      transform: rotateY(180deg);
    }
  }
}
</style>
