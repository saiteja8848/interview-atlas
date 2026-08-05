# Interview Atlas

A read-first, no-login interview-preparation library built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content architecture

`content/library.ts` is the initial typed content registry. Add a new question there to create a corresponding static question page automatically. Its shape is intentionally compatible with an MDX migration: each question includes metadata, narrative blocks, and language-keyed code snippets.

## Included experience

- Premium responsive landing page and subject navigation
- DSA discovery page with difficulty filter and question search
- Expandable question-reading experience, with brute-force and optimal solutions
- Java, Python, JavaScript, and C++ code tabs with copy action
- System Design subject hub
- Command-K / Ctrl-K global search
