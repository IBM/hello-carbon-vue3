<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useErrorStore } from "@/stores/useErrorStore";
import CvLink from "@/components/cv/Link.vue";
import imgOther from "@/assets/error/Other.png?url";
import imgQuestion from "@/assets/error/Question.png?url";
import { computed, ref } from "vue";
import { useTranslation } from "i18next-vue";

const { t } = useTranslation();

const errorStore = useErrorStore();

onBeforeRouteLeave(() => {
  errorStore.$reset();
});
const showDebug = ref(false);
const errorCode = computed(() => errorStore.info === "not found" ? 404 : 500);
const location = useRoute();
</script>

<template>
  <div class="flex flex-col gap-6 items-center ml-12 mt-16">
    <div
      class="h-screen w-screen bg-no-repeat bg-contain bg-bottom-left absolute top-0 left-0 -z-1"
      :style="{backgroundImage: `url(${errorCode === 404 ? imgQuestion : imgOther})`}"
    />
    <div class="text-lg! font-bold!">
      {{ t(`error${errorCode}header`) }}
    </div>
    <div class="text-sm">
      {{ t(`error${errorCode}description`) }}
    </div>
    <CvLink
      id="home-link"
      :to="{name: 'home'}"
      class="!text-white bg-blue-600 rounded p-4! max-w-48"
    >
      Return to home
    </CvLink>

    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input
          v-model="showDebug"
          type="checkbox"
          class="sr-only peer"
          :checked="showDebug"
        >
        <div
          id="show-debug"
          class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors relative"
        >
          <span
            class="absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition-transform transform"
            :class="{'translate-x-5': showDebug}"
          />
        </div>
        <span class="ml-2 text-sm text-white">Show debug</span>
      </label>
    </div>

    <Transition>
      <div
        v-if="showDebug"
        id="debug-details"
        class="bg-(--cds-layer-active) p-2 rounded w-auto grid grid-cols-1 gap-6 mr-6"
      >
        <div
          v-if="errorStore.info"
          class="font-mono"
        >
          Info: {{ errorStore.info }}
        </div>
        <div
          v-if="errorStore.err"
          class="font-mono"
        >
          Error: {{ errorStore.err }}
        </div>
        <div
          v-if="errorStore.err"
          class="max-h-32 overflow-scroll text-xs! font-mono"
        >
          {{ errorStore.err.stack }}
        </div>
        <pre v-if="errorCode === 404">Unknown page: {{ location.path }}</pre>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
