## 🕵️ MCP: Mission Completely Possible
### Can you find and fix the bad data?

---

#### PROMPT 1 — type this exactly:

> List every tool currently registered in your Atlassian MCP session — names and one-line descriptions only, sourced from the server declarations. For the discover tool only, also list its parameters. Return results as a numbered list. Do not add commentary or observations.

---

#### PROMPT 2 — fill in the blanks, then enter your prompt:

> Use the discover tool to [INTENT VERB] [ENTITY] operations available to you. Return results as a numbered list: tool name and description only. Nothing else.

Choose one from each column:

| | INTENT VERB | ENTITY |
|---|---|---|
| A | search ← ? | Confluence page ← ? |
| B | create | Jira issue |
| C | delete | Loom video |
| D | export | Jira project |

💡 *Hint: you want to FIND something, not make something new*

---

#### PROMPT 3 — fill in the blank, then enter your prompt:

> Use searchConfluence to find pages mentioning [SEARCH TERM] and show me the section containing the Q3 revenue figure.

Choose one:
- A) Q3 Revenue Report ← ?
- B) sprint velocity
- C) invoice reconciliation
- D) project completion

💡 *Hint: you're looking for a revenue document, not a process or activity*

---

#### PROMPT 4 — fill in all blanks from what you found, then enter your prompt:

> Use updateConfluenceContent to correct the Q3 revenue figure in the Meridian Q3 Revenue Report from [WRONG AMOUNT] to [CORRECT AMOUNT] and add a note explaining the figure was updated to reflect [REASON].

- **WRONG** = €_______ *(you found this in Prompt 3)*
- **RIGHT** = €3.6M *(from the Jira issues)*

---

#### Scoring

| Prompt | Points |
|---|---|
| Prompt 1 | ✅ 1 pt — automatic |
| Prompt 2 | ✅ 1 pt first try · 0.5 pt with a hint |
| Prompt 3 | ✅ 1 pt find the figure |
| Prompt 4 | ✅ 1 pt correct numbers · +0.5 pt good reason |

**Max score: 4 points · Target time: 4 minutes**

🏆 4.0 Perfect · ⭐ 3.0–3.5 Great · 👍 2.0–2.5 Good
