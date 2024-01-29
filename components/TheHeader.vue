<template>
  <cv-header aria-label="Hello carbon nuxt header">
    <cv-header-menu-button
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content"></cv-skip-to-content>
    <cv-header-name href="/" prefix=""
      >
      Hello Carbon Nuxt</cv-header-name
    >
    <cv-header-nav aria-label="Hello carbon nuxt navigation">
      <cv-header-menu-item href="/accordion">
        Accordion
      </cv-header-menu-item>
    </cv-header-nav>
    <template #left-panels>
      <cv-side-nav id="side-nav" :rail="false" :fixed="true" :expanded="false">
        <cv-side-nav-items>
          <cv-side-nav-link href="/">
            <template #nav-icon><home-icon /></template>
            Home
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<script setup>
import {
  Home16 as HomeIcon,
} from "@carbon/icons-vue";
</script>

<style lang="scss">
</style>
