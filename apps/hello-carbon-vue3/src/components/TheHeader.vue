<script setup lang="ts">
import {
  Home16 as HomeIcon,
  Fish16 as FishIcon,
  Debug16 as BugsIcon,
  Events16 as VillagersIcon,
  Translate20 as LanguageIcon,
  Login20 as LoginIcon,
  UserAvatar20 as AvatarIcon,
  Switcher20 as SwitcherIcon,
  ColorPalette20 as ThemeIcon,
} from "@carbon/icons-vue";
import ThemeSelector from "@/components/Theme/Selector.vue";
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
function onLogin() {
  loggedIn.value = !loggedIn.value;
}

const otherApps = ref([
  {
    id: "hello-vue",
    name: "Hello Carbon Vue",
    link: "https://github.com/IBM/hello-carbon-vue3/apps/hello-carbon-vue3",
  },
  {
    id: "hello-nuxt",
    name: "Hello Carbon Nuxt",
    link: "https://github.com/IBM/hello-carbon-vue3/apps/hello-carbon-nuxt",
  },
  {
    id: "carbon-vue",
    name: "Carbon Vue Storybook",
    link: "https://vue.carbondesignsystem.com/",
  },
]);
</script>

<template>
  <cv-header
    aria-label="Carbon header"
    data-cy="header"
  >
    <cv-header-menu-button
      :aria-label="t('header-menu')"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content">
      {{
        t("skip-content")
      }}
    </cv-skip-to-content>
    <cv-header-name
      href="/"
      prefix="Carbon"
    >
      {{ t("hello") }} Vue3
    </cv-header-name>
    <template #header-global>
      <cv-header-global-action
        :aria-label="t('choose-theme')"
        :label="t('choose-theme')"
        aria-controls="choose-theme"
        tip-position="bottom"
        tip-alignment="end"
      >
        <ThemeIcon />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('choose-language')"
        :label="t('choose-language')"
        aria-controls="language-panel"
        tip-position="bottom"
        tip-alignment="start"
      >
        <LanguageIcon data-cy="language-icon" />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t(loggedIn ? 'logout' : 'login')"
        :label="t(loggedIn ? 'logout' : 'login')"
        aria-controls="user-panel"
        tip-position="bottom"
        tip-alignment="center"
        @click="onLogin"
      >
        <AvatarIcon v-if="loggedIn" />
        <LoginIcon v-else />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('other-apps')"
        :label="t('other-apps')"
        aria-controls="other-apps"
        tip-position="bottom"
        tip-alignment="end"
      >
        <SwitcherIcon />
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <cv-header-panel
        id="language-panel"
        v-model:expanded="languageExpanded"
      >
        <cv-switcher>
          <cv-switcher-item
            v-for="entry in langStore.languages"
            :key="entry.title"
          >
            <cv-switcher-item-link
              :selected="entry.language === langStore.language"
              :data-cy="`language-${entry.language}`"
              @click="changeLocale(entry.language)"
            >
              {{ entry.title }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
      <cv-header-panel id="other-apps">
        <cv-switcher>
          <cv-switcher-item
            v-for="app in otherApps"
            :key="app.id"
          >
            <cv-switcher-item-link
              :data-cy="`language-${app.id}`"
              :href="app.link"
              target="_blank"
            >
              {{ app.name }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
      <cv-header-panel id="choose-theme">
        <ThemeSelector />
      </cv-header-panel>
    </template>
    <template #left-panels>
      <cv-side-nav
        id="side-nav"
        :rail="true"
        :fixed="false"
        :expanded="false"
      >
        <cv-side-nav-items>
          <cv-side-nav-link :to="{ name: 'home' }">
            <template #nav-icon>
              <HomeIcon />
            </template>
            {{ t("home") }}
          </cv-side-nav-link>
          <cv-side-nav-menu-divider />
          <cv-side-nav-link :to="{ name: 'fish' }">
            <template #nav-icon>
              <FishIcon />
            </template>
            {{ t("fish") }}
          </cv-side-nav-link>
          <cv-side-nav-link :to="{ name: 'bugs' }">
            <template #nav-icon>
              <BugsIcon />
            </template>
            {{ t("bugs") }}
          </cv-side-nav-link>
          <cv-side-nav-link :to="{ name: 'villagers' }">
            <template #nav-icon>
              <VillagersIcon />
            </template>
            {{ t("villagers") }}
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>
