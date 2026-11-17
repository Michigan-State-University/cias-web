import { Locator, Page, expect } from '@playwright/test';

const USER_SELECT_HACK_CLASS = 'react-draggable-transparent-selection';

export const TOLERANCE_PX = 2;

export type Box = { x: number; y: number; width: number; height: number };

type DragOptions = {
  steps?: number;
  modifier?: 'Control' | 'Shift' | 'Alt' | 'Meta';
  whileDragging?: () => Promise<void>;
};

export const expectSameAxis = (
  actual: number,
  expected: number,
  axis: string,
) =>
  expect(
    Math.abs(actual - expected),
    `${axis} moved from ${expected} to ${actual}, expected it to stay put`,
  ).toBeLessThanOrEqual(TOLERANCE_PX);

export const expectSamePosition = (actual: Box, expected: Box) => {
  expectSameAxis(actual.x, expected.x, 'x');
  expectSameAxis(actual.y, expected.y, 'y');
};

export const boxOf = async (locator: Locator): Promise<Box> => {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error(
      'Expected the element to have a bounding box, but it is not rendered or has no layout.',
    );
  }
  return box;
};

const centerOf = (box: Box) => ({
  x: box.x + box.width / 2,
  y: box.y + box.height / 2,
});

export const dragBy = async (
  page: Page,
  target: Locator,
  delta: { x: number; y: number },
  { steps = 10, modifier, whileDragging }: DragOptions = {},
): Promise<{ before: Box; after: Box }> => {
  const before = await boxOf(target);
  const start = centerOf(before);

  if (modifier) await page.keyboard.down(modifier);

  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + delta.x, start.y + delta.y, { steps });

  try {
    if (whileDragging) await whileDragging();
  } finally {
    await page.mouse.up();
    if (modifier) await page.keyboard.up(modifier);
  }

  const after = await boxOf(target);
  return { before, after };
};

export const moveMouseAway = (page: Page): Promise<void> =>
  page.mouse.move(0, 0);

export const isUserSelectHackActive = (page: Page): Promise<boolean> =>
  page.evaluate(
    (className) => document.body.classList.contains(className),
    USER_SELECT_HACK_CLASS,
  );

export const selectedText = (page: Page): Promise<string> =>
  page.evaluate(() => window.getSelection()?.toString() ?? '');

export const expectNoLingeringDragState = async (page: Page) => {
  await expect
    .poll(() => isUserSelectHackActive(page), {
      message:
        'document.body kept react-draggable-transparent-selection after the drag ended.',
      timeout: 2000,
    })
    .toBe(false);

  expect(await selectedText(page)).toBe('');
};

export const collectDraggableErrors = (page: Page): string[] => {
  const errors: string[] = [];
  const RELEVANT = /react-draggable|process is not defined|__webpack_nonce__/i;

  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    if (RELEVANT.test(message.text())) errors.push(message.text());
  });

  page.on('pageerror', (error) => {
    if (!RELEVANT.test(error.message)) return;
    const where = (error.stack ?? '').split('\n').slice(0, 4).join('\n');
    errors.push(where ? `${error.message}\n${where}` : error.message);
  });

  return errors;
};
