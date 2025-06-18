<script setup lang="ts">
// Example in Vue
import { useTranslation } from "i18next-vue";

const simulateError = async () => {
  throw new Error("Simulated error");
};
const { t } = useTranslation();

</script>

<template>
  <div class="max-w-xl mx-auto mt-20 text-center">
    <h1 class="text-2xl font-bold mb-4">
      {{ t("errorDemo") }}
    </h1>
    <p class="mb-6">
      {{ t("errorDemoDescription") }}
    </p>
    <div class="space-y-6">
      <div>
        <RouterLink
          id="some-fake-page"
          to="/some-fake-page"
          class="hover:underline"
        >
          🔍 {{ t("errorDemoTrigger404") }}
        </RouterLink>
      </div>
      <div>
        <button
          id="simulate-error"
          class="hover:underline"
          @click="simulateError"
        >
          💥 {{ t("errorDemoTrigger500") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
