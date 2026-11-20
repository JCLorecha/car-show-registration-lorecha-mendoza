# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# Car Show 2027 Registration Dashboard

React and Tailwind CSS dashboard for browsing car show registrations.

## Run locally

```bash
npm install
npm run dev
```

## Data source switching

The dashboard currently imports `getRegistrations` and `getSummary` from `src/api/sample-data.js` in `src/pages/RegistrationsPage.jsx`.

To use the real API:

1. Create a `.env` file and set `VITE_API_BASE_URL`, for example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

2. Replace the import in `src/pages/RegistrationsPage.jsx`:

```js
import { getRegistrations, getSummary } from '../api/registrationsApi.js';
```

The API adapter expects matching pagination fields and summary fields from the backend. Update backend routes if necessary to expose `GET /registrations` and `GET /registrations/summary`.
