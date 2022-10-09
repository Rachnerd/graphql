# Webshop Monorepo

## Getting started

```
npm i
npm run bootstrap
```

React app development:

```
npm run react
```

## Packages

### Components

UI component library

Build components

```bash
npx lerna run build:lit --scope=components
```

Start Storybook (dev environment + docs)

```bash
npx lerna run start --scope=components
```

Lint

```bash
npx lerna run lint --scope=components
```

### React app

App that implements UI component library in React.

Start

```bash
npx lerna run start --scope=react-app
```

_React picks up UI component changes up after a Lit build and a npage refresh._
