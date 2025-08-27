<script setup>
const error = useError()
function home() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="text-9xl">
      {{ error.statusCode }}
    </h1>
    <p class="mt-7 text-4xl">
      {{ error.message }}
    </p>
    <cv-button @click="home">
      {{ $t('home') }}
    </cv-button>
  </div>
</template>
