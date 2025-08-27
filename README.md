<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/carbon-light.svg">
  <source media="(prefers-color-scheme: light)" srcset="./docs/carbon.svg">
  <img alt="IBM Carbon logo" src="./docs/carbon.svg" width="64" height="64">
</picture>
<img src="./docs/vue.svg" alt="Vue" width="64" height="64">
</p>


# Hello Carbon Vue – Monorepo


This repository brings together three example applications that demonstrate how to build modern, internationalized UIs with the Carbon Design System across the Vue ecosystem. The goal is to give you clear, working references for:
- A Vue 3 app using Carbon 10 Vue components
- A Vue 3 app using Carbon 11 Web Components
- A Nuxt app using Carbon 10 Vue components with server-side features

Each app is intentionally simple, focused on best practices, and ready to run so you can learn by example or use them as a starting point for your own projects.

## What’s Inside

- hello-carbon-vue3
    - Vue 3 + Carbon Vue components
    - Demonstrates component composition, i18n, state management, and basic REST integration

- hello-carbon11-vue3
    - Vue 3 + Carbon 11 Web Components
    - Shows how to use framework-agnostic Carbon Web Components in a Vue setup with theming and i18n

- hello-carbon-nuxt
    - Nuxt + Carbon Vue components
    - Adds server-side rendering, routing conventions, i18n module, authentication patterns, and logging, along with UI examples

## Demo deployments
- [top level page](https://ibm.github.io/hello-carbon-vue3/)

## Why three apps?

- Compare approaches: See the trade-offs between Carbon Vue components and Carbon Web Components.
- Learn incrementally: Start with Vue 3 and scale to Nuxt when you need SSR, auth, or server APIs.
- Reuse patterns: Shared ideas around state management, translations, testing, and theming.

## Quick Start

- Prerequisites
    - Node.js (LTS or the version specified by each app)
    - npm

- Install
    - From each app directory, install dependencies and start the dev server.

```shell script
# Navigate into an app and run:
npm install
npm run dev
```

Each app contains its own README with setup, scripts, and usage details.

## Contributing

Issues and pull requests that improve clarity, fix bugs, or enhance examples are welcome. If proposing UI/UX changes, please keep the focus on showcasing Carbon components and best practices.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
