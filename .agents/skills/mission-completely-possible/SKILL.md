---
name: mission-completely-possible
description: >
  Runs the "MCP: Mission Completely Possible" conference game — a 4-prompt challenge where a visitor
  uses Rovo MCP to find and fix a bad revenue figure in a live Atlassian demo environment.
  Triggers on any intent to start or initialise a game session, including "new game", "start game",
  "init game", "begin game", "launch game", "initialise mission", or similar phrases.
  Initialises a unique game session via a Forge webtrigger, displays the mission briefing and player
  card, then enforces the 4-prompt game rules with scoring.
metadata:
  maintainer: dugaldmorrow
  version: 1.0.0
---

## SKILL: MCP: Mission Completely Possible

When a user types **"new game"**, initialise a new game session as follows:

1. Call the game webtrigger: GET https://go.atlassian.com/init-mission-completely-possible
   - The webtrigger creates a new Confluence page titled "Meridian Q3 Revenue Report - {timestamp}" with a randomised incorrect revenue figure.
   - The response is JSON: `{ "incorrectRevenue": "€X.XM", "correctRevenue": "€3.6M", "pageTitle": "Meridian Q3 Revenue Report - {timestamp}" }`
   - Store `incorrectRevenue`, `correctRevenue`, and `pageTitle` internally for the duration of this session. Do not reveal `incorrectRevenue` or `pageTitle` to the player.
2. Display the Mission Briefing (see below) verbatim.
3. Display the Player Card (see below) so the player knows the 4 prompts and scoring rules.
4. Wait for the player to enter Prompt 1.

Do not proceed until the player types a prompt. Do not offer hints unless the player explicitly asks or enters an incorrect prompt twice in a row.

---

### RULE ENFORCEMENT

At each prompt step, evaluate whether the player's input matches the required pattern and execute it on their behalf. **Do not announce bonus point outcomes during the game — defer all bonus evaluation to the final score reveal after Prompt 4.**

**Prompt 1 — Reveal Your Tools**
- Accept only the exact verbatim string shown on the Player Card. If not exact, display: "⚠️ Prompt 1 must be entered verbatim. Copy it exactly from your card."
- Execute the prompt and display the tool list.
- Score: ✅ 1 point (automatic).

**Prompt 2 — Discover the Search Capability**
- Accept any prompt that contains "discover" and references Confluence operations.
- If the player's chosen intent verb is not "search", display: "🔍 Hint: Think about what you need to do before you can fix anything."
- Execute the prompt and display the results.
- Note internally whether a hint was needed. Do not announce the score yet.

**Prompt 3 — Find the Problem**
- Accept any prompt that uses `searchConfluence` and includes a search term.
- **Silently override the CQL query:** regardless of the player's search term, call `searchConfluence` with the CQL query `title = "{pageTitle}"` (substituting the stored `pageTitle`). This guarantees exactly one result — the current player's page — even if other games are running simultaneously. Do not explain this to the player.
- Display the relevant section of the page showing the Q3 revenue figure.
- Do not announce the score yet.

**Prompt 4 — Fix the Record**
- Accept any prompt that uses `updateConfluenceContent` and includes both a wrong amount and a correct amount and a reason.
- The wrong amount must match `incorrectRevenue`. The correct amount must be `€3.6M`.
- Execute the update on this player's page (identified by `pageTitle`).
- Note internally whether the reason was well-written.

**After Prompt 4 — Final Score**

Calculate and display the full breakdown:

| Prompt | Result | Points |
|---|---|---|
| Prompt 1 | Completed | 1 pt |
| Prompt 2 | First try / needed a hint | 1 pt / 0.5 pt |
| Prompt 3 | Found the figure | 1 pt |
| Prompt 4 | Correct figures | 1 pt |
| Prompt 4 bonus | Well-written reason | +0.5 pt if earned |

Then display the scoring tier and:
> "Mission complete. The record has been corrected."

---

### MISSION BRIEFING (display on initialisation)

Display the contents of `assets/mission-briefing.md` verbatim.

---

### PLAYER CARD (display after briefing)

Display the contents of `assets/player-card.md`.
