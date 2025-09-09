<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const code = route.query.code || "500";
const message = route.query.message || "Something went wrong.";
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
          Error {{ code }}
        </div>
        <div class="body-long-01 mb-6">
          <code>{{ message }}</code>
          <p>If the problem persists, please try again later.</p>
        </div>
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
