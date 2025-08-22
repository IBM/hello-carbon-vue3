<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import ThemeSwitcher from "@/components/Theme/Switcher.vue";
</script>

<template>
  <theme-switcher />
  <the-header />
  <router-view />
</template>
