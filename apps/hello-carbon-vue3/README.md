# Hello carbon vue3

This repository is designed to help you get started with integrating Carbon into a Vue 3 application. It showcases the best
practices for setting up a new Vue 3 app with Carbon, providing a solid foundation for your project.

If you are looking for a Nuxt example, checkout [Hello carbon nuxt](https://github.com/davidnixon/hello-carbon-nuxt)

If you are looking for Carbon 11 with Vue,
checkout [Hello carbon 11 web components with Vue 3](https://github.com/davidnixon/hello-carbon11-vue3/tree/main?tab=readme-ov-file)

## Packages used

- Carbon Vue3
- [Vite](https://vitejs.dev/) — this is the default for new Vue3 projects instead of WebPack
- [Pinia](https://pinia.vuejs.org/) — this replaces Vuex store
- [i18next](https://www.i18next.com/) — this repo demonstrates how to include translations using i18next. All UI
  elements are translated and most content is translated.
- [@vueuse](https://vueuse.org/) — Lazy image loading, manage local storage, useFetch wrapper for API with caching, and many other useful utilities
- [cypress](https://www.cypress.io/) — Implement e2e tests with cypress to help screen PRs

## Carbon styles

The carbon styles are imported as a pre-compiled CSS file. The fie is created by using sass on the command line to
generate the CSS.
See [\_carbon-90.scss](./src/styles/_carbon-90.scss) for instructions on creating the CSS file.

## Pages & Components

New in this iteration:
- API calls use a shared VueUse createFetch instance with in-memory TTL caching and simple retries (see src/shared/api/http.js). Pages now show loading skeletons and Carbon inline error notifications when API calls fail.
- Added dedicated Error and 404 pages styled in Carbon (routes: /error and catch-all).
- Suggestions for Feature-Sliced Design structure are documented in docs/feature-sliced.md.

[This repo demo site](https://ibm.github.io/hello-carbon-vue3/hello-carbon-vue3/)

- Header with Side nav ![header](../docs/header-bar.jpg)
  - Side nav with divider
  - Language selection in the header bar, login and switcher buttons are also included
- Home page
  - cv-grid,cv-row,cv-column
  - cv-aspect-ratio
  - REST API examples integrated with Pinia store
- Fish page
  - Fully translatable data table including controls and aria labels
  - Slotted data and headings
  - Searchable data
  - cv-data-table-skeleton
  - cv-data-table
  - cv-data-table-action, cv-data-table-heading
  - cv-data-table-row (expandable rows), cv-data-table-cell
  - cv-button
  - cv-toggle
  - REST API examples integrated with Pinia store
- Bugs page
  - cv-accordion-skeleton
  - cv-accordion, cv-accordion-item
  - cv-tag
  - cv-icon-button
  - slotted title and content for accordion
  - REST API examples integrated with Pinia store
  - Fun 3D card flipper css
- Build-a-bug
  - cv-progress with custom icons
- Villagers page
  - cv-content-switcher, cv-content-switcher-button
  - cv-content-switcher-content
  - REST API examples integrated with Pinia store
  - Fun animated icons and chat bubbles
- Includes tailwind with a basic Carbon colors theme

## Coding guide

- [Vue style guide](https://vuejs.org/style-guide/) The style guide is enforced
  with [eslint-plugin-vue - Recommended](https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns).
- Prettier and eslint rules are enforced as pre-commit hooks via husky.

## Recommended IDE Setup

[WebStorm](https://www.jetbrains.com/webstorm/)

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable
Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
nvm use
npm add -g npm
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build and test locally

```sh
npm run local-build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Update dependencies

```shell
npm update --interactive
```
