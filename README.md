## Prereqs
- [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- Node v22 `nvm install 22`
- [Mockoon](https://mockoon.com/download/) - run mocks for comics endpoints
- Docker or [podman](https://podman.io/) or [Rancher Desktop](https://rancherdesktop.io/)

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

## Set up the authentication (local mock)
```shell
cd local-dev
docker-compose up
```
This will launch a local openid [keycloak](https://www.keycloak.org/getting-started/getting-started-docker) server and allow you to log in with admin/potato-history

Copy `.env.sample` to `.env`
```shell
cp .env.sample .env
```
Edit `.env` and change any values for your system

## Start the development server on

```bash
# npm
npm run dev
```
Server should be running at http://localhost:4507

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

## Set environment vars on the deployed system
```dotenv
MARVEL_APIKEY=Your Marvel api key from https://developer.marvel.com/
MARVEL_PRIVATE_KEY=Your Marvel secret key from https://developer.marvel.com/
MARVEL_URL=https://gateway.marvel.com/
NUXT_AUTH_SECRET=set to a long string
AUTH_NAME=Login provider name (i.e. IBMid)
AUTH_ID=Login provider id (i.e. ibmid)
AUTH_DISCOVERY=Login provider discovery endpoint
AUTH_CLIENT_ID=Login provider client id
AUTH_CLIENT_SECRET=Login provider client secret
```
