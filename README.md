# Abiodun Idowu — Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Live at [biodunidowu.xyz](https://www.biodunidowu.xyz).

## Run locally

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Checks

```bash
pnpm lint     # ESLint
pnpm build    # production build + type check
pnpm start    # serve the production build locally
```

## Deploy

Vercel builds production from `main`. Work happens on `dev` and reaches `main` through a pull request; other branches get preview URLs. No environment variables are needed.
