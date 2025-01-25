<script setup>
import { Home16 as HomeIcon,
  Group16 as CharactersIcon,
  Book16 as ComicsIcon,
  Event16 as EventsIcon,
  Translate16 as LanguageIcon,
  Login16 as LoginIcon,
  UserAvatar20 as AvatarIcon,
  ProgressBarRound16 as LoginLoadingIcon,
  Switcher16 as SwitcherIcon } from '@carbon/icons-vue'

const { locale, locales, setLocale } = useI18n()
const { signIn, status, getProviders } = useAuth()
const providers = await getProviders()
const defaultProviderId = computed(() => {
  return Object.values(providers)[0].id
})

const languageExpanded = ref(false)
function changeLocale(language) {
  setLocale(language)
  languageExpanded.value = false
  document?.activeElement?.blur()
}

const otherAppsExpanded = ref(false)
const otherApps = ref([
  { id: 'github', name: 'Hello Carbon Nuxt', link: 'https://github.com/davidnixon/hello-carbon-nuxt' },
  { id: 'hello-vue', name: 'Hello Carbon Vue', link: 'https://github.com/IBM/hello-carbon-vue3' },
  { id: 'carbon-vue', name: 'Carbon Vue Storybook', link: 'https://vue.carbondesignsystem.com/' },
])

// close the sideNav if somethihg is clicked there.
function sideNav() {
  document?.activeElement?.blur()
}
</script>

<template>
  <cv-header
    id="app-header"
    aria-label="Hello carbon nuxt header"
  >
    <cv-header-menu-button
      id="header-menu-button"
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content" />
    <cv-header-name
      to="/"
      prefix=""
    >
      {{ $t("hello") }} Carbon Nuxt
    </cv-header-name>
    <cv-header-nav aria-label="Hello carbon nuxt navigation">
      <cv-header-menu-item
        v-if="status==='authenticated'"
        id="header-menu-item-characters"
        to="/characters"
      >
        {{ $t('characters') }}
      </cv-header-menu-item>
      <cv-header-menu-item
        v-if="status==='authenticated'"
        id="header-menu-item-comics"
        to="/comics"
      >
        {{ $t("comics") }}
      </cv-header-menu-item>
      <cv-header-menu-item
        v-if="status==='authenticated'"
        id="header-menu-item-events"
        to="/events"
      >
        {{ $t("events") }}
      </cv-header-menu-item>
    </cv-header-nav>
    <template #header-global>
      <cv-header-global-action
        v-if="status==='unauthenticated'"
        id="header-menu-button-login"
        :aria-label="$t('login')"
        :label="$t('login')"
        tip-position="bottom"
        tip-alignment="end"
        @click="signIn(defaultProviderId, { callbackUrl: '/', redirect: true })"
      >
        <login-icon />
      </cv-header-global-action>
      <cv-header-global-action
        v-else-if="status==='authenticated'"
        id="header-menu-button-logout"
        :aria-label="$t('profile')"
        :label="$t('profile')"
        aria-controls="user-panel"
        tip-position="bottom"
        tip-alignment="end"
      >
        <avatar-icon />
      </cv-header-global-action>
      <cv-header-global-action
        v-else
        :aria-label="$t('profile')"
        :label="$t('profile')"
        aria-controls="user-panel"
        tip-position="bottom"
        tip-alignment="end"
      >
        <login-loading-icon />
      </cv-header-global-action>
      <cv-header-global-action
        id="header-menu-button-language"
        :aria-label="$t('choose-language')"
        :label="$t('choose-language')"
        aria-controls="language-panel"
        tip-position="bottom"
        tip-alignment="end"
      >
        <language-icon />
      </cv-header-global-action>
      <cv-header-global-action
        id="header-menu-button-apps"
        :aria-label="$t('other-apps')"
        :label="$t('other-apps')"
        aria-controls="other-apps"
        tip-position="bottom"
        tip-alignment="end"
      >
        <switcher-icon />
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <cv-header-panel
        id="user-panel"
      >
        <user-panel />
      </cv-header-panel>

      <cv-header-panel
        id="language-panel"
        v-model:expanded="languageExpanded"
      >
        <cv-switcher>
          <cv-switcher-item
            v-for="lng in locales"
            :key="lng.code"
          >
            <cv-switcher-item-link
              :selected="lng.code === locale"
              :data-cy="`language-${lng.code}`"
              @click="changeLocale(lng.code)"
            >
              {{ lng.name }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
      <cv-header-panel
        id="other-apps"
        v-model:expanded="otherAppsExpanded"
      >
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
    </template>
    <template #left-panels>
      <cv-side-nav
        id="side-nav"
        :rail="false"
        :fixed="true"
        :expanded="false"
      >
        <cv-side-nav-items @click="sideNav">
          <cv-side-nav-link
            id="header-side-nav-home"
            to="/"
          >
            <template #nav-icon>
              <home-icon />
            </template>
            {{ $t("home") }}
          </cv-side-nav-link>

          <cv-side-nav-link
            v-if="status==='authenticated'"
            id="header-side-nav-characters"
            to="/characters"
          >
            <template #nav-icon>
              <characters-icon />
            </template>
            {{ $t("characters") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            v-if="status==='authenticated'"
            id="header-side-nav-comics"
            to="/comics"
          >
            <template #nav-icon>
              <comics-icon />
            </template>
            {{ $t("comics") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            v-if="status==='authenticated'"
            id="header-side-nav-events"
            to="/events"
          >
            <template #nav-icon>
              <EventsIcon />
            </template>
            {{ $t("events") }}
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<style lang="scss"></style>
