import { test, expect } from '../fixtures/test';
import type { Page } from '../fixtures/test';
import { DashboardPage, InterventionPage, SessionPage } from '../pages';
import { waitForApiResponse } from '../utils/waitForApiResponse';
import {
  boxOf,
  collectDraggableErrors,
  dragBy,
  expectNoLingeringDragState,
  expectSamePosition,
  TOLERANCE_PX,
} from '../utils/drag';

test.describe.serial('Session editor — narrator drag', () => {
  let interventionId: string;
  let sessionId: string;

  const gotoQuestion = async (page: Page) => {
    const sessionPage = new SessionPage(page);
    await sessionPage.gotoViaIntervention(interventionId);
    return sessionPage;
  };

  test('creates the intervention, session and screen used by this file', async ({
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

    await expect(sessionPage.narratorHandle).toBeVisible();
  });

  test('character is not draggable until a narrator block is open', async ({
    page,
  }) => {
    const errors = collectDraggableErrors(page);
    const sessionPage = await gotoQuestion(page);

    const { before, after } = await dragBy(page, sessionPage.narratorHandle, {
      x: 120,
      y: 60,
    });

    expectSamePosition(after, before);
    expect(errors).toEqual([]);
  });

  test('dragging the character moves it and the position survives a reload', async ({
    page,
  }) => {
    const errors = collectDraggableErrors(page);
    const sessionPage = await gotoQuestion(page);

    await sessionPage.openNarratorTab();
    await sessionPage.openNarratorBlock(0);

    const character = sessionPage.narratorCharacter;

    const saved = waitForApiResponse(page, {
      urlIncludes: '/questions/',
      method: 'PATCH',
      status: 200,
      timeout: 20000,
    });

    const { before, after } = await dragBy(
      page,
      sessionPage.narratorHandle,
      { x: -90, y: -50 },
      {
        whileDragging: async () => {
          await expect(character).toHaveClass(/react-draggable-dragging/);
        },
      },
    );

    expect(after.x).toBeLessThan(before.x);
    expect(after.y).toBeLessThan(before.y);
    await expect(character).not.toHaveClass(/react-draggable-dragging/);

    await saved;
    await expectNoLingeringDragState(page);

    const droppedAt = await boxOf(character);

    await gotoQuestion(page);
    await sessionPage.openNarratorTab();
    await sessionPage.openNarratorBlock(0);

    expectSamePosition(await boxOf(sessionPage.narratorCharacter), droppedAt);

    expect(errors).toEqual([]);
  });

  test('character stays inside its container when dragged far past the edge', async ({
    page,
  }) => {
    const sessionPage = await gotoQuestion(page);

    await sessionPage.openNarratorTab();
    await sessionPage.openNarratorBlock(0);

    const parent = await boxOf(sessionPage.narratorCharacter.locator('..'));
    const character = await boxOf(sessionPage.narratorCharacter);

    await dragBy(
      page,
      sessionPage.narratorHandle,
      { x: -3000, y: -3000 },
      { steps: 1 },
    );

    const after = await boxOf(sessionPage.narratorCharacter);
    expect(after.x).toBeGreaterThanOrEqual(parent.x - TOLERANCE_PX);
    expect(after.y).toBeGreaterThanOrEqual(parent.y - TOLERANCE_PX);
    expect(after.x).toBeLessThan(character.x);
  });

  test('ctrl+drag does not move the character', async ({ page }) => {
    const sessionPage = await gotoQuestion(page);

    await sessionPage.openNarratorTab();
    await sessionPage.openNarratorBlock(0);

    const { before, after } = await dragBy(
      page,
      sessionPage.narratorHandle,
      { x: 100, y: 60 },
      { modifier: 'Control' },
    );

    expectSamePosition(after, before);
  });
});
