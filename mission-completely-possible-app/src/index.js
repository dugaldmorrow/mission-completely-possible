const api = require('@forge/api');
const { confluenceHost, spaceKey: SPACE_KEY, parentPageId: PARENT_PAGE_ID, correctRevenue: CORRECT_REVENUE } = require('./config');

/**
 * Generate a random revenue figure in the range €2.1M–€5.9M (one decimal place),
 * excluding the correct answer of €3.6M.
 * @returns {string} e.g. "€4.7M"
 */
function generateIncorrectRevenue() {
  let value;
  do {
    // Random integer from 21 to 59, then divide by 10 to get one decimal place
    const raw = Math.floor(Math.random() * 39) + 21; // 21..59
    value = raw / 10; // 2.1..5.9
  } while (value === 3.6);
  return `€${value.toFixed(1)}M`;
}

/**
 * Build the Confluence page body content for the game page.
 * @param {string} incorrectRevenue e.g. "€4.7M"
 * @returns {object} Confluence storage format ADF body
 */
function buildPageBody(incorrectRevenue) {
  // Use Confluence wiki storage format (XHTML)
  return `<p>Q3 2026 Engineering Completion Report — Meridian Technologies</p>
<p><strong>Overall Q3 Revenue: ${incorrectRevenue}</strong></p>
<p>Projects completed on time: 17 of 18<br/>
Projects carried over to Q4: 1</p>
<p>Sprint velocity (8-week average): 42 points<br/>
Team satisfaction score: 4.2 / 5</p>
<p><em>Note: This report was generated automatically from project tracking data on 1 August 2026.</em></p>`;
}

/**
 * @param {import('@forge/api').WebTriggerRequest} event
 * @param {import('@forge/api').WebTriggerContext} context
 * @returns {Promise<import('@forge/api').WebTriggerResponse>}
 */
exports.runAsync = async (event, context) => {
  const incorrectRevenue = generateIncorrectRevenue();
  const timestamp = new Date().toISOString();
  const pageTitle = `Meridian Q3 Revenue Report - ${timestamp}`;

  try {
    const response = await api.asApp().requestConfluence(api.route`/wiki/api/v2/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spaceId: await getSpaceId(SPACE_KEY),
        status: 'current',
        title: pageTitle,
        parentId: PARENT_PAGE_ID,
        body: {
          representation: 'storage',
          value: buildPageBody(incorrectRevenue),
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return buildErrorResponse(response.status, `Failed to create Confluence page: ${errorText}`);
    }

    const page = await response.json();

    return {
      body: JSON.stringify({
        incorrectRevenue,
        correctRevenue: CORRECT_REVENUE,
        pageTitle,
        pageId: page.id,
        pageUrl: `https://${confluenceHost}/wiki/spaces/${SPACE_KEY}/pages/${page.id}`,
      }),
      headers: { 'Content-Type': ['application/json'] },
      statusCode: 200,
      statusText: 'OK',
    };
  } catch (err) {
    return buildErrorResponse(500, `Unexpected error: ${err.message}`);
  }
};

/**
 * Look up the numeric space ID for a given space key.
 * @param {string} spaceKey
 * @returns {Promise<string>}
 */
async function getSpaceId(spaceKey) {
  const response = await api.asApp().requestConfluence(api.route`/wiki/api/v2/spaces?keys=${spaceKey}&limit=1`);
  if (!response.ok) {
    throw new Error(`Failed to fetch space: ${response.status}`);
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Space with key "${spaceKey}" not found`);
  }
  return data.results[0].id;
}

/**
 * Build a JSON error response.
 * @param {number} statusCode
 * @param {string} message
 * @returns {import('@forge/api').WebTriggerResponse}
 */
function buildErrorResponse(statusCode, message) {
  return {
    body: JSON.stringify({ error: message }),
    headers: { 'Content-Type': ['application/json'] },
    statusCode,
    statusText: statusCode === 500 ? 'Internal Server Error' : 'Error',
  };
}
