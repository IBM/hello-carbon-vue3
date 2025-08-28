<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goHome() {
  router.push({ name: "home" });
}
</script>

<template>
  <cv-grid class="my-8">
    <cv-row>
      <cv-column
        :lg="8"
        :md="6"
        :sm="4"
      >
        <div class="productive-heading-03 mb-4">
          Page not found
        </div>
        <p class="body-long-01 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <cv-button
          kind="primary"
          @click="goHome"
        >
          Go home
        </cv-button>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
