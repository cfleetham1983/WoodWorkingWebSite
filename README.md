# WoodWorking Website

React + Vite site for woodworking resources, including shop supplier pages that now load from a SQLite database through a local API.

## Requirements

- Node.js 18+ (or newer LTS)
- npm

## Install

```bash
npm install
```

## Run In Development

```bash
npm run dev
```

This starts:

- Vite frontend on `http://localhost:5173`
- API server on `http://localhost:3001`

The frontend calls `/api/*`, and Vite proxies those requests to the API server.

## API

- `GET /api/health`
- `GET /api/shop-suppliers?type=wood`
- `GET /api/shop-suppliers?type=tools`

`shop-suppliers` reads from `database/shop_suppliers.db` and includes rows with `supply_type='both'` in both wood and tools results.

## Database Files

- `database/shop_suppliers.db`: SQLite file used by the API.
- `database/shop_suppliers.sql`: schema and seed script.

## Other Scripts

```bash
npm run build
npm run preview
npm run lint
```
