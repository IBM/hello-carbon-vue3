<script setup>
import { Logout16 as LogoutIcon } from '@carbon/icons-vue'

const { data, signOut, status } = useAuth()
</script>

<template>
  <div class="p-2">
    <div v-if="status==='authenticated'">
      <div class="my-2 text-2xl">
        {{ data.user.name }}
      </div>
      <div class="my-2">
        {{ data.user.email }}
      </div>
      <cv-button
        :icon="LogoutIcon"
        kind="secondary"
        @click="signOut('ibmid', { callbackUrl: '/', redirect: true })"
      >
        {{ $t("logout") }}
      </cv-button>
    </div>
    <div v-else>
      {{ $t("unauthenticated") }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
