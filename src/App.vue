<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import ThemeSwitcher from "@/components/Theme/Switcher.vue";
</script>

<template>
  <div>
    <theme-switcher />
    <the-header />
    <router-view />
  </div>
</template>
