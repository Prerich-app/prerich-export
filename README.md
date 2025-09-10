# Prerich Export

Shutdown notice page for Prerich trading platform.

## Setup

```bash
yarn install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
```

## Development

```bash
yarn dev     # Development server
yarn build   # Production build
```

## What it does

- Shows shutdown notice
- Lets users login and export wallet data
- Clears old PWA caches
- Redirects all routes to homepage
