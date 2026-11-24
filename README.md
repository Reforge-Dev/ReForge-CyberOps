# Ghost in the Machine

A cybersecurity incident-response simulator on a fictional company network: investigate logs, diagnose the haunting, and respond before the breach meter fills.

> Part of **ReForge**, our Kiroween 2026 *Skeleton Crew* entry. This game is **pure data**: `game.json` + assets, running on the shared engine. There is no custom game code in this repo.
> Engine, editor and the submission repo: <https://github.com/Reforge-Dev/ReForge-Engine>

**Owner:** Rakhmonjon Karimov · **Plan and day-by-day tasks:** [PLAN.md](https://github.com/Reforge-Dev/ReForge-Engine/blob/main/docs/PLAN.md) · **Data format:** [CONTRACT.md](https://github.com/Reforge-Dev/ReForge-Engine/blob/main/docs/CONTRACT.md)

## Run it

```bash
node scripts/update-engine.mjs latest   # downloads the engine release into ./vendor (Node 18+)
npx serve .                             # or any static server; then open the printed URL
```

## Layout

| Path | What |
|---|---|
| `index.html` | Canvas + the 3-line `createGame` bootstrap (the only script) |
| `game.json` | The whole game: entity types, scenes, rules, UI |
| `assets/` | CC0 art and audio; licenses in `assets/CREDITS.md` |
| `theme.css` | CSS-variable overrides only |
| `vendor/` | Pinned engine release (`vendor/VERSION`), refreshed with `update-engine.mjs` |
| `.kiro/` | Specs, steering and hooks used to build this game (**never gitignore**) |

## Rules for this repo

1. No custom engine/game code. Missing capability? Open an `engine-gap` issue on the Engine repo; the engine owner adds it as a generic behavior.
2. Only CC0 / properly licensed assets; record each in `assets/CREDITS.md`.
3. Plain commits, small PRs, one approval. Log Kiro usage in the Engine repo's `KIRO_LOG.md`.
4. Commit `vendor/` (the engine copy the game was tested with) so the repo runs offline.

License: MIT
