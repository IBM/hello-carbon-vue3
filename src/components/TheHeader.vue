<template>
  <cv-header aria-label="Carbon header">
    <cv-header-menu-button
      :aria-label="t('header-menu')"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content">{{
      t("skip-content")
    }}</cv-skip-to-content>
    <cv-header-name href="/" prefix="Carbon"
      >{{ t("hello") }} Vue3</cv-header-name
    >
    <template v-slot:header-global>
      <cv-header-global-action
        :aria-label="t('choose-language')"
        :label="t('choose-language')"
        aria-controls="language-panel"
        tipPosition="bottom"
        tipAlignment="start"
      >
        <language-icon />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('login')"
        :label="t('login')"
        aria-controls="user-panel"
        tipPosition="bottom"
        tipAlignment="center"
      >
        <avatar-icon v-if="loggedIn" />
        <login-icon v-else />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('other-apps')"
        :label="t('other-apps')"
        aria-controls="switcher-panel"
        tipPosition="bottom"
        tipAlignment="end"
      >
        <switcher-icon />
      </cv-header-global-action>
    </template>
    <template v-slot:right-panels>
      <cv-header-panel id="language-panel" v-model:expanded="languageExpanded">
        <cv-switcher>
          <cv-switcher-item
            v-for="entry in langStore.languages"
            :key="entry.title"
          >
            <cv-switcher-item-link
              @click="changeLocale(entry.language)"
              :selected="entry.language === langStore.language"
            >
              {{ entry.title }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
    </template>
    <template v-slot:left-panels>
      <cv-side-nav id="side-nav" :rail="true" :fixed="false" :expanded="false">
        <cv-side-nav-items>
          <cv-side-nav-link :to="{ name: 'home' }">
            <template v-slot:nav-icon><home-icon /></template>
            {{ t("home") }}
          </cv-side-nav-link>
          <cv-side-nav-menu-divider />
          <cv-side-nav-link :to="{ name: 'fish' }">
            <template v-slot:nav-icon><fish-icon /></template>
            {{ t("fish") }}
          </cv-side-nav-link>
          <cv-side-nav-link :to="{ name: 'bugs' }">
            <template v-slot:nav-icon><bugs-icon /></template>
            {{ t("bugs") }}
          </cv-side-nav-link>
          <cv-side-nav-link :to="{ name: 'villagers' }">
            <template v-slot:nav-icon><villagers-icon /></template>
            {{ t("villagers") }}
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<script setup>
import {
  Home16 as HomeIcon,
  Fish16 as FishIcon,
  Debug16 as BugsIcon,
  Events16 as VillagersIcon,
  Translate20 as LanguageIcon,
  Login20 as LoginIcon,
  UserAvatar20 as AvatarIcon,
  Switcher20 as SwitcherIcon,
} from "@carbon/icons-vue";
import { ref } from "vue";
import { useLanguageStore } from "../stores/language";
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();

const loggedIn = ref(false);

const langStore = useLanguageStore();
const languageExpanded = ref(false);
function changeLocale(language) {
  langStore.setLanguage(language);
  languageExpanded.value = false;
  document?.activeElement?.blur();
}
</script>

<style scoped></style>
