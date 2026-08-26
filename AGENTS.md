# AGENTS.md — Mission: Completely Possible

This repository contains everything needed to run the **MCP: Mission Completely Possible** conference game. The game is a 4-prompt challenge where a visitor uses an AI agent connected to Rovo MCP to find and fix a bad revenue figure in a live Atlassian demo environment.

## Repository Structure

```
mission-completely-possible/
├── AGENTS.md                          ← you are here
├── README.md                          ← setup and run guide for Atlassian staff
├── .agents/
│   └── skills/
│       └── mission-completely-possible/
│           ├── SKILL.md               ← game skill (load into your AI agent session)
│           └── assets/
│               ├── mission-briefing.md  ← mission briefing template
│               └── player-card.md       ← player card template
└── mission-completely-possible-app/   ← Forge webtrigger app
    ├── manifest.yml
    ├── package.json
    └── src/
        ├── config.js                  ← update this when relocating to a new instance
        └── index.js                   ← webtrigger handler
```

## Key Concepts for AI Agents Working in This Repo

- The **game skill** lives in `.agents/skills/mission-completely-possible/SKILL.md`. This is the authoritative source of the game rules and should be kept in sync with the asset files.
- The **mission briefing** and **player card** are templates in `.agents/skills/mission-completely-possible/assets/`. The skill references them by path.
- The **Forge app** in `mission-completely-possible-app/` creates a unique Confluence page for each game session. All instance-specific values (host, space key, parent page ID, correct revenue) are in `src/config.js`.
- The game is **Confluence-only** — there are no Jira dependencies.
- Do not hardcode instance-specific values (hostnames, page IDs, space keys) anywhere except `src/config.js`.
