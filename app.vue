<script setup>
// import "@/assets/css/carbon-gray-10.css";
import '@/assets/css/carbon-gray-90.css'

const title = 'Hello Carbon Nuxt'
const description
  = 'An example application showing Carbon with Vue'
const imageUrl = '/images/site.jpg'
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  twitterCard: 'summary_large_image',
  twitterDescription: description,
  twitterTitle: title,
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <CarbonLoading />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
