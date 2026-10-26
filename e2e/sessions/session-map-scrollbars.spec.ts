import { Locator } from '@playwright/test';

import { test, expect } from '../fixtures/test';
import type { Page } from '../fixtures/test';
import {
  DashboardPage,
  InterventionPage,
  SessionMapPage,
  SessionPage,
} from '../pages';
import {
  boxOf,
  collectDraggableErrors,
  dragBy,
  expectNoLingeringDragState,
  expectSameAxis,
  isUserSelectHackActive,
  moveMouseAway,
  selectedText,
  TOLERANCE_PX,
} from '../utils/drag';

test.describe.serial('Session map — scrollbars', () => {
  let interventionId: string;
  let sessionId: string;

  const backgroundOf = (locator: Locator) =>
    locator.evaluate((node) => getComputedStyle(node).backgroundColor);

  const openMap = async (page: Page) => {
    await page.setViewportSize({ width: 900, height: 500 });

    const mapPage = new SessionMapPage(page);
    await mapPage.goto(interventionId, sessionId);
    await mapPage.zoomInFully();
    await mapPage.expectScrollbarsUsable();
    return mapPage;
  };

  test('creates the intervention and session used by this file', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse =
      await interventionPage.createSession('classic');
    sessionId = (await createSessionResponse.json()).data.id;
    expect(sessionId).toBeTruthy();

    await sessionPage.goto(interventionId, sessionId);

    await sessionPage.addScreen('single');
    await sessionPage.addScreen('single');
    await sessionPage.addScreen('single');
  });

  test('vertical scrollbar moves only on its own axis and pans the graph', async ({
    page,
  }) => {
    const errors = collectDraggableErrors(page);
    const mapPage = await openMap(page);

    const thumb = mapPage.scrollbarThumb('vertical');
    const nodeBefore = await boxOf(mapPage.firstNode());
    const idleBackground = await backgroundOf(thumb);

    const { before, after } = await dragBy(
      page,
      thumb,
      { x: 80, y: 120 },
      {
        whileDragging: async () => {
          await expect(thumb).toHaveClass(/react-draggable-dragging/);
          await expect(thumb).not.toHaveCSS('background-color', idleBackground);
        },
      },
    );

    expect(after.y).toBeGreaterThan(before.y);
    expectSameAxis(after.x, before.x, 'x');

    await expect(thumb).not.toHaveClass(/react-draggable-dragging/);

    await moveMouseAway(page);
    await expect(thumb).toHaveCSS('background-color', idleBackground);

    const nodeAfter = await boxOf(mapPage.firstNode());
    expect(Math.abs(nodeAfter.y - nodeBefore.y)).toBeGreaterThan(TOLERANCE_PX);

    expect(errors).toEqual([]);
  });

  test('horizontal scrollbar moves only on its own axis', async ({ page }) => {
    const mapPage = await openMap(page);

    const thumb = mapPage.scrollbarThumb('horizontal');
    const { before, after } = await dragBy(page, thumb, { x: 140, y: 90 });

    expect(after.x).toBeGreaterThan(before.x);
    expectSameAxis(after.y, before.y, 'y');
  });

  test('a thumb stays inside its track when dragged far past the end', async ({
    page,
  }) => {
    const mapPage = await openMap(page);

    const thumb = mapPage.scrollbarThumb('vertical');
    const track = await boxOf(mapPage.verticalScrollbar);

    const { after } = await dragBy(
      page,
      thumb,
      { x: 0, y: 4000 },
      { steps: 1 },
    );

    expect(after.y).toBeGreaterThanOrEqual(track.y - TOLERANCE_PX);
    expect(after.y + after.height).toBeLessThanOrEqual(
      track.y + track.height + TOLERANCE_PX,
    );
  });

  test('dragging a scrollbar selects no text on the page', async ({ page }) => {
    const mapPage = await openMap(page);

    expect(await isUserSelectHackActive(page)).toBe(false);

    await dragBy(
      page,
      mapPage.scrollbarThumb('horizontal'),
      { x: 160, y: 0 },
      {
        whileDragging: async () => {
          expect(await isUserSelectHackActive(page)).toBe(true);
          expect(await selectedText(page)).toBe('');
        },
      },
    );

    await expectNoLingeringDragState(page);
  });

  test('ctrl+drag does not move a scrollbar', async ({ page }) => {
    const mapPage = await openMap(page);

    const thumb = mapPage.scrollbarThumb('vertical');

    const { before, after } = await dragBy(
      page,
      thumb,
      { x: 0, y: 120 },
      { modifier: 'Control' },
    );

    expectSameAxis(after.y, before.y, 'y');
  });
});
