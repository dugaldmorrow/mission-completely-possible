# MCP: Mission Completely Possible

A conference game that teaches AI agent capabilities through a live 4-prompt challenge. A visitor uses an AI agent connected to the Atlassian Rovo MCP server to find and fix a bad revenue figure hidden in a Confluence page — racing against the clock.

**Time per game:** 3–5 minutes  
**Players:** One at a time (multiple simultaneous games supported)  
**Reset between games:** None required

---

## How the Game Works

At the start of each game, the AI agent calls a Forge webtrigger that creates a unique Confluence page with a randomly generated incorrect revenue figure. The player works through 4 structured prompts to:

1. **Discover** what tools the AI agent has available
2. **Find** the specific search tool using the `discover` capability
3. **Locate** the incorrect figure in Confluence
4. **Fix** the Confluence page with the correct value

Each prompt has a template with blanks to fill in — the player must choose the right options to progress.

![Mission: Completely Possible — diagram showing a user giving an AI agent a high-level instruction (crossed out with a red squiggle) and a dashed arrow showing the player stepping into the agent's role to issue the 4 MCP prompts directly to the Rovo MCP server](image/mission-completely-possible@2x.png)

> **At the booth:** Print and display this diagram so visitors understand that in this game *they* play the role of the AI agent — issuing the 4 structured MCP prompts directly, rather than giving a single high-level instruction and watching an agent do the work.

---

## Setup (one-time, before the conference)

### 1. Deploy the Forge App

The Forge app creates a fresh Confluence page for each game session.

```bash
cd mission-completely-possible-app
npm install
forge deploy
forge install --site <your-confluence-site> --product confluence
```

Before deploying, update `mission-completely-possible-app/src/config.js` with your instance details:

```js
module.exports = {
  confluenceHost: 'your-site.atlassian.net',  // your Confluence instance
  spaceKey: 'FAT',                             // space where game pages are created
  parentPageId: '1839955969',                  // ID of the parent page for game pages
  correctRevenue: '€3.6M',                     // the correct answer players must find
};
```

The parent page should be a dedicated page in your Confluence space to keep game pages organised. Create it manually before deploying.

### 2. Create a Short Link for the Webtrigger

After deploying, Forge will give you a webtrigger URL. Create a short link for it (e.g. `go.atlassian.com/init-mission-completely-possible`) and update the URL in `.agents/skills/mission-completely-possible/SKILL.md`.

### 3. Load the Game Skill

Copy the contents of `.agents/skills/mission-completely-possible/SKILL.md` into your AI agent session as a Project Instruction (Claude Desktop) or add it to `.claude/AGENTS.md` in your demo workspace.

### 4. Print Player Cards

The player card is embedded in the skill's `assets/player-card.md`. Print one copy per expected visitor — players refer to it throughout the game.

---

## Running a Game

For each new player:

1. Start a **new agent session** in Claude Desktop (or claude.ai)
2. Ensure the game skill is loaded as a Project Instruction
3. Type: `new game`

The agent calls the webtrigger, creates a unique Confluence page, displays the mission briefing and player card, then waits for the player to begin. Hand the keyboard to the visitor.

---

## Scoring

| Prompt | Max points |
|---|---|
| Prompt 1 — Reveal tools | 1 |
| Prompt 2 — Discover search capability | 1 (0.5 with a hint) |
| Prompt 3 — Find the incorrect figure | 1 |
| Prompt 4 — Fix the record | 1 (+0.5 bonus for a well-written reason) |
| **Total** | **3.5 + 0.5 bonus** |

- 🏆 **3.5–4.0** — Perfect
- ⭐ **2.5–3.0** — Great
- 👍 **1.5–2.0** — Good

---

## Repository Structure

```
├── README.md                            ← this file
├── AGENTS.md                            ← guidance for AI agents working in this repo
├── .agents/
│   └── skills/
│       └── mission-completely-possible/
│           ├── SKILL.md                 ← game skill
│           └── assets/
│               ├── mission-briefing.md  ← mission briefing template
│               └── player-card.md       ← player card template
└── mission-completely-possible-app/     ← Forge webtrigger app
    ├── manifest.yml
    ├── package.json
    └── src/
        ├── config.js                    ← instance configuration
        └── index.js                     ← webtrigger handler
```

---

## Relocating to a Different Atlassian Instance

Update `mission-completely-possible-app/src/config.js` with the new instance values, redeploy the Forge app, update the short link in `SKILL.md`, and you're done. No other files need changing.
