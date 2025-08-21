# Hello carbon 11 web components with Vue 3

This repository is designed to help you get started with integrating Carbon Web Components into a Vue 3 application. It
showcases best practices for setting up a new Vue 3, providing a solid foundation for your project.

If you are looking for a Nuxt example, checkout [Hello carbon nuxt](https://github.com/davidnixon/hello-carbon-nuxt)

If you are looking for a Vue 3 example with Carbon Vue components,
checkout [Hello carbon Vue 3](https://github.com/IBM/hello-carbon-vue3)

## Packages used

- [Carbon 11 Web components](https://web-components.carbondesignsystem.com/)
- [Vite](https://vitejs.dev/) - this is the default for new Vue3 projects instead of WebPack
- [Pinia](https://pinia.vuejs.org/) - this replaces Vuex store
- [i18next](https://www.i18next.com/) - this repo demonstrates how to include translations using i18next. All UI
  elements are translated and most content is translated.
- [superagent](https://www.npmjs.com/package/superagent) - I like this package better than axios and use it here to demo
  making REST calls
- [v-lazy-image](https://www.npmjs.com/package/v-lazy-image) - All images are lazy loaded via this package
- [Husky](https://www.npmjs.com/package/husky) - pre-commit hooks
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Run linters against staged git files
- [commit-lint](https://commitlint.js.org/#/) - Helps your team adhere to a commit convention
- [cypress](https://www.cypress.io/) - Implement e2e tests with cypress to help screen PRs

## Carbon styles

The carbon styles are imported as a pre-compiled css file. The fie is created by using sass on the command line to
generate the css.
See [carbon-white.scss](./src/styles/_carbon-white.scss) for instructions on creating the css file.

## Pages & Components

[This repo demo site](https://ibm.github.io/hello-carbon-vue3/hello-carbon11-vue3/)

- Header with Side nav
    - Side nav with divider
    - Language selection in the header bar, login and switcher buttons are also included
    - Theme switcher for white, g10, g90, and g100 themes
- Home page
    - REST API examples integrated with Pinia store
- Fish page
    - Fully translatable data table including controls and aria labels
    - cds-data-table-skeleton
    - cds-data-table
    - cds-table-row
    - cds-button
    - cds-toggle
    - REST API examples integrated with Pinia store
- Bugs page
    - cds-accordion-skeleton
    - cv-accordion, cds-accordion-item
    - cds-tag
    - cds-icon-button
    - REST API examples integrated with Pinia store
    - Fun 3D card flipper css
- Build-a-bug
    - cds-progress-indicator
    - cds-icon-button
- Villagers page
    - cds-content-switcher
    - REST API examples integrated with Pinia store
    - Fun chat bubbles
- Includes tailwind with basic Carbon colors theme

## Coding guide

- [Vue style guide](https://vuejs.org/style-guide/) The style guide is enforced with eslint.
- The eslint rules are enforced as pre-commit hooks via husky.

## Recommended IDE Setup

[WebStorm](https://www.jetbrains.com/webstorm/)

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable
Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
nvm use 22
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
