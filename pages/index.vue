<template>
  <div>
    <cv-grid
      :full-width="true"
      class="h-[calc(100vh-3rem)] w-screen bg-gradient-to-tl from-vermilion to-yellow-orange"
    >
      <cv-row>
        <cv-column>
          <div class="flex h-[calc(100vh-3rem)] flex-col items-center justify-center">
            <cv-tile v-if="status==='authenticated'">
              <div class="my-2 text-2xl">
                {{ $t("hello") }} <br>
                {{ data.user.name }} <br>
              </div>
            </cv-tile>
            <cv-tile v-if="status==='unauthenticated'">
              <div class="my-2 text-2xl">
                {{ $t("home-login-label") }}
              </div>
              <cv-button
                id="home-login-btn"
                :icon="IBMIDIcon"
                @click="signIn(defaultProviderId, { callbackUrl: '/', redirect: false })"
              >
                {{ $t("home-login-button", { provider: defaultProvider }) }}
              </cv-button>
            </cv-tile>
          </div>
        </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<script setup>
import { Bee16 as IBMIDIcon } from '@carbon/icons-vue'

definePageMeta({
  auth: false,
})

const { signIn, status, data, getProviders } = useAuth()
const providers = await getProviders()
const defaultProvider = computed(() => {
  return Object.values(providers)[0].name
})
const defaultProviderId = computed(() => {
  return Object.values(providers)[0].id
})
</script>

<style scoped lang="scss"></style>
