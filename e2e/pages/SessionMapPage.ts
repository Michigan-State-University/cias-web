import { Page, Locator, expect } from '@playwright/test';

import { boxOf } from '../utils/drag';

const MAX_ZOOM_CLICKS = 20;

export class SessionMapPage {
  readonly page: Page;
  readonly map: Locator;
  readonly zoomInButton: Locator;
  readonly zoomOutButton: Locator;
  readonly verticalScrollbar: Locator;
  readonly horizontalScrollbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.map = page.locator('#session-map');
    this.zoomInButton = page.getByRole('button', { name: 'Zoom In' });
    this.zoomOutButton = page.getByRole('button', { name: 'Zoom Out' });
    this.verticalScrollbar = page.locator('[data-cy="scrollbar-vertical"]');
    this.horizontalScrollbar = page.locator('[data-cy="scrollbar-horizontal"]');
  }

  async goto(interventionId: string, sessionId: string) {
    await this.page.goto(
      `/interventions/${interventionId}/sessions/${sessionId}/map`,
    );
    await this.waitForMapLoaded();
  }

  async waitForMapLoaded() {
    await expect(this.map).toBeVisible();
    await expect(this.firstNode()).toBeVisible();
  }

  firstNode(): Locator {
    return this.page.locator('.react-flow__node').first();
  }

  scrollbarTrack(axis: 'vertical' | 'horizontal'): Locator {
    return axis === 'vertical'
      ? this.verticalScrollbar
      : this.horizontalScrollbar;
  }

  scrollbarThumb(axis: 'vertical' | 'horizontal'): Locator {
    return this.scrollbarTrack(axis).locator('.react-draggable');
  }

  async zoomInFully() {
    await expect(this.zoomInButton).toBeVisible();

    for (let i = 0; i < MAX_ZOOM_CLICKS; i += 1) {
      if (await this.zoomInButton.isDisabled()) break;
      await this.zoomInButton.click();
    }

    await expect(this.zoomInButton).toBeDisabled();
  }

  async expectScrollbarsUsable() {
    for (const axis of ['vertical', 'horizontal'] as const) {
      const track = this.scrollbarTrack(axis);
      const thumb = this.scrollbarThumb(axis);

      await expect(
        thumb,
        `No ${axis} scrollbar thumb. The pan area still fits the map container ` +
          `at max zoom — add screens (they extend the graph to the right, the ` +
          `dagre layout is rankdir LR) or shrink the viewport.`,
      ).toBeVisible();

      const trackBox = await boxOf(track);
      const thumbBox = await boxOf(thumb);
      const alongAxis = axis === 'vertical' ? 'height' : 'width';

      expect(
        thumbBox[alongAxis],
        `The ${axis} thumb fills its whole track, so it has nowhere to move.`,
      ).toBeLessThan(trackBox[alongAxis]);
    }
  }
}
