<script setup>
import { Music20 as EighthNote } from "@carbon/icons-vue";
import IconTrebleClef from "@/components/icons/IconTrebleClef.vue";
defineProps({
  iconColor: { type: String, default: "#8a3ffc" }, // purple 60
});
</script>

<template>
  <div class="container">
    <div class="container__staff">
      <div class="container__staff__line" />
      <div class="container__staff__line" />
      <div class="container__staff__line" />
      <div class="container__staff__line" />
      <div class="container__staff__line" />
    </div>
    <div class="container__icon">
      <slot><eighth-note /></slot>
    </div>
    <icon-treble-clef class="container__treble" />
  </div>
</template>

<style scoped lang="scss">
@keyframes music-scroll {
  from {
    left: -17px;
    top: -1.5px; // D note
  }
  70% {
    top: -1.5px;
  }
  75% {
    top: 5.5px; // B note
  }
  to {
    top: 5.5px;
    left: 100%;
  }
}
.container {
  width: 100%;
  height: 100%;
  &__treble {
    position: absolute;
    bottom: -1px;
    height: 36px;
    color: var(--cds-border-strong);
  }
  &__icon {
    color: v-bind(iconColor);
    z-index: 10;
    position: absolute;
    top: -1.5px;
    left: -17px;
    animation-name: music-scroll;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  &__staff {
    width: 100%;
    margin: 0;
    padding-left: 0.5rem;
    z-index: -3;
    position: absolute;
    padding-right: 0.5rem;
    top: 0;
    height: 100%;
    &__line {
      height: 1px;
      border-bottom-width: 1px;
      border-style: solid;
      border-color: var(--cds-border-strong);
      margin-bottom: 6px;
      margin-top: 6px;
    }
  }
}
</style>
