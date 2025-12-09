import { test as base, expect } from '@playwright/test';
import path from 'path';

// Extend the base test with authentication
export const test = base.extend<object>({
  // Use the authenticated state for all tests
  storageState: path.join(__dirname, '../.auth/admin.json'),
});

export { expect };

// Re-export Page type for convenience
export type { Page, Locator } from '@playwright/test';
