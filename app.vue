<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const title = "Hello Carbon Nuxt";
const description =
  "An example application showing Carbon with Vue";
const imageUrl = "/images/site.jpg";
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  twitterCard: "summary_large_image",
  twitterDescription: description,
  twitterTitle: title,
});
</script>
