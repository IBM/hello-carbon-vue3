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
  ColorPalette20 as ThemeIcon,
  Error20 as ErrorIcon,
} from "@carbon/icons-vue";
import "@carbon/web-components/es/components/ui-shell/index.js";
import HeaderPanelThemeSelector from "@/components/HeaderPanels/ThemeSelector.vue";
import CvSideNavLink from "@/components/cv/SideNavLink.vue";
import HeadPanelOtherApps from "@/components/HeaderPanels/OtherApps.vue";
import HeaderPanelLanguageSwitcher from "@/components/HeaderPanels/LanguageSwitcher.vue";
import { ref } from "vue";
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();

const loggedIn = ref(false);

function onLogin() {
  loggedIn.value = !loggedIn.value;
}

</script>

<template>
  <cds-header aria-label="IBM Platform Name">
    <cds-header-menu-button
      button-label-active="Close menu"
      button-label-inactive="Open menu"
    />
    <cds-header-name
      href="/"
      prefix="Carbon 11"
    >
      {{ t("hello") }} Vue 3
    </cds-header-name>
    <div class="cds--header__global mr-1">
      <cds-header-global-action
        :aria-label="t('choose-theme')"
        :tooltip-text="t('choose-theme')"
        aria-controls="choose-theme"
        panel-id="choose-theme"
        tooltip-position="bottom"
        tooltip-alignment="end"
      >
        <theme-icon slot="icon" />
      </cds-header-global-action>
      <cds-header-global-action
        :aria-label="t('choose-language')"
        :tooltip-text="t('choose-language')"
        aria-controls="language-panel"
        panel-id="language-panel"
        tooltip-position="bottom"
        tooltip-alignment="end"
      >
        <language-icon
          slot="icon"
          data-cy="language-icon"
        />
      </cds-header-global-action>
      <cds-header-global-action
        :aria-label="t(loggedIn ? 'logout' : 'login')"
        :tooltip-text="t(loggedIn ? 'logout' : 'login')"
        aria-controls="user-panel"
        tooltip-position="bottom"
        tooltip-alignment="end"
        @click="onLogin"
      >
        <Transition
          name="fade"
          mode="out-in"
        >
          <avatar-icon
            v-if="loggedIn"
            slot="icon"
          />
          <login-icon
            v-else
            slot="icon"
          />
        </Transition>
      </cds-header-global-action>
      <cds-header-global-action
        :aria-label="t('other-apps')"
        :tooltip-text="t('other-apps')"
        aria-controls="other-apps"
        panel-id="other-apps"
        tooltip-position="bottom"
        tooltip-alignment="end"
      >
        <switcher-icon slot="icon" />
      </cds-header-global-action>
    </div>
    <HeaderPanelThemeSelector id="choose-theme" />
    <HeaderPanelLanguageSwitcher id="language-panel" />
    <HeadPanelOtherApps id="other-apps" />
  </cds-header>
  <cds-side-nav
    aria-label="Side navigation"
    collapse-mode="rail"
  >
    <cds-side-nav-items>
      <CvSideNavLink :to="{name: 'home'}">
        <template #title-icon>
          <HomeIcon />
        </template>
        {{ t('home') }}
      </CvSideNavLink>
      <cds-side-nav-divider />
      <CvSideNavLink :to="{name: 'fish'}">
        <template #title-icon>
          <FishIcon />
        </template>
        {{ t('fish') }}
      </CvSideNavLink>
      <CvSideNavLink :to="{name: 'bugs'}">
        <template #title-icon>
          <BugsIcon />
        </template>
        {{ t('bugs') }}
      </CvSideNavLink>
      <CvSideNavLink :to="{name: 'villagers'}">
        <template #title-icon>
          <VillagersIcon />
        </template>
        {{ t('villagers') }}
      </CvSideNavLink>
      <CvSideNavLink :to="{name: 'error-demo'}">
        <template #title-icon>
          <ErrorIcon />
        </template>
        {{ t('errorDemo') }}
      </CvSideNavLink>
    </cds-side-nav-items>
  </cds-side-nav>
</template>
<style scoped lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
