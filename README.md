## Prereqs
- [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- Node v22 `nvm install 22`
- [Mockoon](https://mockoon.com/download/) - run mocks for comics endpoints

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Getting Started

A mock version of the comics endpoints is in [mock-api.json](./local-dev/mock/mock-api.json).
Load this in the Mockoon desktop app or start in the command line.
```shell
npm install -g @mockoon/cli
mockoon-cli start --data ./local-dev/mock/mock-api.json
```

Start the development server on `http://localhost:4507`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
