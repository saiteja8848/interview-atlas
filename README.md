# AlgoCraft

A read-first, no-login interview-preparation library built with React, Vite, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Content architecture

`content/library.ts` is the typed curriculum registry. The linked repository's 254 executable Java implementations are imported into `content/repository-solutions.ts`, giving the course 303 discoverable DSA problems with repository-backed Java implementations.

## Included experience

- Premium responsive landing page and subject navigation
- DSA discovery page with difficulty filter and question search
- LeetCode-style problem, editorial, and code tabs
- Java-only solution tabs with copy action
- System Design subject hub
- Command-K / Ctrl-K global search
