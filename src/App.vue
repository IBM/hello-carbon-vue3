<template>
  <the-header />
  <router-view />
</template>

<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import "./styles/_carbon.scss";
</script>
