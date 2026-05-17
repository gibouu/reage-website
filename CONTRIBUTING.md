# Contributing to the REAGE website

Standard, lightweight workflow. `main` is protected — never push to it directly.

## Workflow

1. **Open an issue** describing the new thing or edit (use the Feature or Bug
   template). One issue per change.
2. **Branch off `main`**: `feat/<n>-slug` or `fix/<n>-slug` (`<n>` = issue number).
3. **Make the change.** Keep it focused on the issue.
4. **Verify**: `npm run build` passes; check mobile + desktop; the 5 languages
   render (French is the default and source of truth — other locales fall back
   to French for any untranslated string).
5. **Open a PR** with `Closes #<n>` and the test-plan checklist.
6. **Review the diff**, then **squash-merge** and delete the branch.
7. **Pull `main`** before starting the next thing.

## Project layout

- App lives in `reage-app/` (Next.js 16, App Router, Tailwind v4, next-intl).
- UI copy is in `reage-app/messages/<locale>.json` (`fr` is complete; add keys
  there first, then translate others as you go).
- Site config (nav, groups, universities, links) is in `reage-app/lib/site.ts`.

## Run locally

```bash
cd reage-app
npm install
npm run dev   # http://localhost:3000
```
