import { test } from '../fixtures/test';
import { DashboardPage } from '../pages';

// The MCP server runs this first, so specs start signed in on the dashboard.
test('seed', async ({ page }) => {
  await new DashboardPage(page).goto();
});
