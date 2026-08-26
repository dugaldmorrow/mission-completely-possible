/**
 * Configuration for the Mission: Completely Possible Forge app.
 * Update these values when relocating the app to a different Atlassian instance.
 */
module.exports = {
  // The hostname of the Atlassian instance where the app is installed.
  confluenceHost: 'forgery.atlassian.net',

  // The key of the Confluence space where game pages will be created.
  spaceKey: 'FAT',

  // The ID of the parent page under which all game pages are created.
  // https://forgery.atlassian.net/wiki/spaces/FAT/pages/1839955969/Mission+Completely+Possible+Page+Tree
  parentPageId: '1839955969',

  // The correct Q3 revenue figure — shown in the Jira issues and used as the fix target.
  correctRevenue: '€3.6M',

  // The Jira project key where the three game issues are pre-loaded.
  // Default issues will be MCP-1, MCP-2, MCP-3.
  jiraProjectKey: 'MCP',
};
