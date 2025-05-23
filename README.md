# Hello carbon vue3

This repository is designed to help you get started with integrating Carbon into a Vue 3 application. It showcases best practices for setting up a new Vue 3 app with Carbon, providing a solid foundation for your project.

If you are looking for a Nuxt example, checkout [Hello carbon nuxt](https://github.com/davidnixon/hello-carbon-nuxt)

If you are looking for a Carbon 11 with Vue, checkout [Hello carbon 11 web components with Vue 3](https://github.com/davidnixon/hello-carbon11-vue3/tree/main?tab=readme-ov-file)

## Packages used

- Carbon Vue3
- [Vite](https://vitejs.dev/) - this is the default for new Vue3 projects instead of WebPack
- [Pinia](https://pinia.vuejs.org/) - this replaces Vuex store
- [i18next](https://www.i18next.com/) - this repo demonstrates how to include translations using i18next. All UI elements are translated and most content is translated.
- [superagent](https://www.npmjs.com/package/superagent) - I like this package better than axios and use it here to demo making REST calls
- [v-lazy-image](https://www.npmjs.com/package/v-lazy-image) - All images are lazy loaded via this package
- [Husky](https://www.npmjs.com/package/husky) - pre-commit hooks
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Run linters against staged git files
- [commit-lint](https://commitlint.js.org/#/) - Helps your team adhere to a commit convention
- [cypress](https://www.cypress.io/) - Implement e2e tests with cypress to help screen PRs

## Carbon styles

The carbon styles are imported as a pre-compiled css file. The fie is created by using sass on the command line to generate the css.
See [\_carbon-90.scss](./src/styles/_carbon-90.scss) for instructions on creating the css file.

## Pages & Components

[This repo demo site](https://ibm.github.io/hello-carbon-vue3/)

- Header with Side nav ![header](docs/header-bar.jpg)
  - Side nav with divider
  - Language selection in the header bar, login and switcher buttons are also included
- Home page
  - cv-grid,cv-row,cv-column
  - cv-aspect-ratio
  - REST API examples integrated with Pinia store
- Fish page
  - Fully translatable data table including controls and aria labels
  - Slotted data & headings
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
  - Fun animated icons & chat bubbles
- Includes tailwind with basic Carbon colors theme

## Coding guide

- [Vue style guide](https://vuejs.org/style-guide/) The style guide is enforced with [eslint-plugin-vue - Recommended](https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns).
- Prettier and eslint rules are enforced as pre-commit hooks via husky.

## Recommended IDE Setup

[WebStorm](https://www.jetbrains.com/webstorm/)

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
nvm use 18
npm add -g pnpm
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Build and test locally

```sh
pnpm run local-build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

## Update dependencies

```shell
pnpm update --interactive
```
