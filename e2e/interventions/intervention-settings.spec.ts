import { test, expect } from '../fixtures/test';
import {
  DashboardPage,
  InterventionPage,
  InterventionAccessType,
} from '../pages';

test.describe('Intervention Settings', () => {
  test.describe('Intervention Note', () => {
    test('should add a note to an intervention', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Add a note to the intervention
      const noteText = 'This is a test note for the intervention';
      await interventionPage.addNote(noteText);

      // Verify the note was saved
      const savedNote = await interventionPage.getNoteText();
      expect(savedNote.trim()).toBe(noteText);
    });

    test('should update an existing note', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Add initial note
      const initialNote = 'Initial note';
      await interventionPage.addNote(initialNote);

      // Update the note
      const updatedNote = 'Updated note content';
      await interventionPage.addNote(updatedNote);

      // Verify the note was updated
      const savedNote = await interventionPage.getNoteText();
      expect(savedNote.trim()).toBe(updatedNote);
    });
  });

  test.describe('Access Settings', () => {
    test('should change access to "Anyone with the link"', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Change access settings to "Anyone"
      await interventionPage.changeAccessSettings(InterventionAccessType.ANYONE);

      // Verify the access setting is selected
      const selectedAccess = await interventionPage.getSelectedAccessSetting();
      expect(selectedAccess).toBe(InterventionAccessType.ANYONE);
    });

    test('should change access to "Any registered participant"', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Change access settings to "Registered"
      await interventionPage.changeAccessSettings(
        InterventionAccessType.REGISTERED,
      );

      // Verify the access setting is selected
      const selectedAccess = await interventionPage.getSelectedAccessSetting();
      expect(selectedAccess).toBe(InterventionAccessType.REGISTERED);
    });

    test('should change access to "Only invited participants"', async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Change access settings to "Invited"
      await interventionPage.changeAccessSettings(
        InterventionAccessType.INVITED,
      );

      // Verify the access setting is selected
      const selectedAccess = await interventionPage.getSelectedAccessSetting();
      expect(selectedAccess).toBe(InterventionAccessType.INVITED);
    });

    test('should cycle through all access settings', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const interventionPage = new InterventionPage(page);

      // Navigate to dashboard and create intervention
      await dashboardPage.goto();
      await dashboardPage.createIntervention();

      // Test all access settings in sequence
      const accessTypes = [
        InterventionAccessType.REGISTERED,
        InterventionAccessType.INVITED,
        InterventionAccessType.ANYONE,
      ];

      for (const accessType of accessTypes) {
        await interventionPage.changeAccessSettings(accessType);
        const selectedAccess = await interventionPage.getSelectedAccessSetting();
        expect(selectedAccess).toBe(accessType);
      }
    });
  });
});
