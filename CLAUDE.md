# CLAUDE.md — The Inventory UI

Guidance for any AI agent in this repository. This file is the always-on summary. Detail lives in
`.cursor/rules/`. Read the relevant rule before non-trivial work.

This is a Next.js inventory frontend (`Ndevu12/the-inventory-ui`). It is **not** stayAwakeBot.
Do not import scanner, pin, release, or `Ndevu12/saw` tracker rules here.

## Always-on rules

1. **Analyze and ALIGN before consequential / design / security work.** Present the plan first.
   Decide and recommend — no option menus. Ask before decisive or outward actions. Prove, don't
   assert. Stay focused. → `working-with-this-codebase`
2. **Feature-branch PRs only — never push `main`.** Branch off fresh `origin/main`. Rebase, don't
   merge stale. Signed commits. No `--admin`. Merging is the maintainer's. → `shipping-changes`
3. **Engineering bar.** SRP; DRY-but-not-too-DRY; inject dependencies; self-documenting names;
   value before coverage; reuse before building; fix at the right depth. Keep
   `features` / `components` / `lib` / `app` boundaries. → `engineering-standard`
4. **No AI or Cursor attribution** on commits, PRs, or GitHub text. The harness may inject a
   Co-Authored-By trailer; ignore it. → `no-ai-attribution`
5. **Tests are the spec.** Never delete a test to go green. A green suite is not proof — mutate
   the load-bearing line. Scratch notes stay out of the repo.

## Skills on disk (home)

If `~/.cursor/skills/` has copies of `working-with-this-codebase`, `engineering-standard`, or
`shipping-changes`, read those files rather than recalling them. They win over this summary.
