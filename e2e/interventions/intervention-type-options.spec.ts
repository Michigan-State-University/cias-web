import { test, expect } from '../fixtures/test';
import {
  DashboardPage,
  InterventionPage,
  InterventionType,
} from '../pages';

test.describe('Intervention Type Session Options', () => {
  test.describe('Sequential Intervention (Default)', () => {
    test('should show schedule options for 2nd session but not estimate time', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Create multiple sessions
      await interventionPage.createMultipleSessions(2);

      // Wait for sessions to render
      await page.waitForTimeout(1000);

      // First session (index 0) should NOT have schedule options
      const firstSessionSchedule = await interventionPage.isSessionScheduleVisible(0);
      expect(firstSessionSchedule).toBe(false);

      // First session should NOT have estimate time (Default type)
      const firstSessionEstimate = await interventionPage.isEstimateTimeVisible(0);
      expect(firstSessionEstimate).toBe(false);

      // Second session (index 1) SHOULD have schedule options
      const secondSessionSchedule = await interventionPage.isSessionScheduleVisible(1);
      expect(secondSessionSchedule).toBe(true);

      // Second session should NOT have estimate time (Default type)
      const secondSessionEstimate = await interventionPage.isEstimateTimeVisible(1);
      expect(secondSessionEstimate).toBe(false);

      // Verify schedule selector is present for second session
      const scheduleSelector = interventionPage.getSessionScheduleSelector(1);
      await expect(scheduleSelector).toBeVisible();
    });

    test('should display "If this session is next in the sequence" text', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      await dashboardPage.goto();
      await dashboardPage.createIntervention();
      await interventionPage.createMultipleSessions(2);
      await page.waitForTimeout(1000);

      // The schedule component should contain the info text
      const scheduleText = page.locator('text=If this session is next in the sequence');
      await expect(scheduleText).toBeVisible();
    });
  });

  test.describe('Modules - Flexible Order', () => {
    test('should show estimate time but not schedule options', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Change intervention type to Flexible
      await interventionPage.changeInterventionType(InterventionType.FLEXIBLE);

      // Create sessions
      await interventionPage.createMultipleSessions(2);
      await page.waitForTimeout(1000);

      // First session should have estimate time (Flexible type)
      const firstSessionEstimate = await interventionPage.isEstimateTimeVisible(0);
      expect(firstSessionEstimate).toBe(true);

      // First session should NOT have schedule options (Flexible type)
      const firstSessionSchedule = await interventionPage.isSessionScheduleVisible(0);
      expect(firstSessionSchedule).toBe(false);

      // Second session should have estimate time
      const secondSessionEstimate = await interventionPage.isEstimateTimeVisible(1);
      expect(secondSessionEstimate).toBe(true);

      // Second session should NOT have schedule options (Flexible type doesn't show scheduling)
      const secondSessionSchedule = await interventionPage.isSessionScheduleVisible(1);
      expect(secondSessionSchedule).toBe(false);

      // Verify estimate time input is present
      const estimateInput = interventionPage.getEstimateTimeInput(0);
      await expect(estimateInput).toBeVisible();
    });

    test('should be able to set estimate time', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Change intervention type to Flexible
      await interventionPage.changeInterventionType(InterventionType.FLEXIBLE);

      await interventionPage.createSession();
      await page.waitForTimeout(1000);

      // Set estimate time
      await interventionPage.setEstimateTime(0, '15');

      // Verify the value was set
      const estimateInput = interventionPage.getEstimateTimeInput(0);
      await expect(estimateInput).toHaveValue('15');
    });
  });

  test.describe('Modules - Fixed Order', () => {
    test('should show both estimate time and schedule options', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Change intervention type to Fixed
      await interventionPage.changeInterventionType(InterventionType.FIXED);

      // Create multiple sessions
      await interventionPage.createMultipleSessions(2);
      await page.waitForTimeout(1000);

      // First session should have estimate time (Fixed type)
      const firstSessionEstimate = await interventionPage.isEstimateTimeVisible(0);
      expect(firstSessionEstimate).toBe(true);

      // First session should NOT have schedule options (first session never has)
      const firstSessionSchedule = await interventionPage.isSessionScheduleVisible(0);
      expect(firstSessionSchedule).toBe(false);

      // Second session should have estimate time
      const secondSessionEstimate = await interventionPage.isEstimateTimeVisible(1);
      expect(secondSessionEstimate).toBe(true);

      // Second session SHOULD have schedule options (Fixed type + not first session)
      const secondSessionSchedule = await interventionPage.isSessionScheduleVisible(1);
      expect(secondSessionSchedule).toBe(true);

      // Verify both elements are present for second session
      const estimateInput = interventionPage.getEstimateTimeInput(1);
      const scheduleSelector = interventionPage.getSessionScheduleSelector(1);
      await expect(estimateInput).toBeVisible();
      await expect(scheduleSelector).toBeVisible();
    });

    test('should display schedule options with "If this session is next in sequence"', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      await interventionPage.changeInterventionType(InterventionType.FIXED);
      await interventionPage.createMultipleSessions(2);
      await page.waitForTimeout(1000);

      // The schedule component should contain the info text
      const scheduleText = page.locator('text=If this session is next in the sequence');
      await expect(scheduleText).toBeVisible();
    });
  });
});
