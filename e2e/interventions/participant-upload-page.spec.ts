import { Page } from '@playwright/test';

import { test, expect } from '../fixtures/test';

const UPLOAD_ID = '11111111-2222-3333-4444-555555555555';

const METADATA_URL = /\/v1\/participant_uploads\/[^/]+(\?|$)/;
const CONFIG_URL = /\/v1\/participant_uploads\/config/;
const FILE_URL = /\/v1\/participant_uploads\/[^/]+\/file/;

const PNG_BYTES = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const metadata = (attributes: Record<string, unknown>) => ({
  data: {
    id: UPLOAD_ID,
    type: 'participant_upload',
    attributes: {
      question_id: 'question-1',
      user_session_id: 'user-session-1',
      original_filename: 'report.png',
      description: null,
      content_type_detected: 'image/png',
      byte_size: PNG_BYTES.length,
      scan_status: 'clean',
      inline_preview: true,
      deletion_reason: null,

      moderation_status: 'completed',
      moderation_labels: [],
      moderation_skip_reason: null,
      moderation_model_version: '7.0',
      ...attributes,
    },
  },
});

const openUploadPage = async (
  page: Page,
  attributes: Record<string, unknown>,
  file?: Parameters<Page['route']>[1],
) => {
  let fileRequests = 0;

  await page.route(FILE_URL, (route, request) => {
    fileRequests += 1;
    return file ? file(route, request) : route.abort();
  });
  await page.route(METADATA_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(metadata(attributes)),
    }),
  );

  await page.route(CONFIG_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        allowed_content_types: ['image/png', 'application/pdf'],
        accepted_extensions: ['png', 'pdf', 'docx', 'csv', 'txt'],
        inline_preview_content_types: ['image/png', 'application/pdf'],
        max_size_bytes: 104857600,
        max_files_per_question: 1,
      }),
    }),
  );

  await page.goto(`/participant-uploads/${UPLOAD_ID}`);

  return { fileRequests: () => fileRequests };
};

test.describe('Participant upload page', () => {
  test('previews an image inline and offers it for download', async ({
    page,
  }) => {
    const { fileRequests } = await openUploadPage(page, {}, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'image/png',
        body: PNG_BYTES,
      }),
    );

    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toBeVisible();

    await expect(page.getByText('report.png')).toBeVisible();

    const preview = page.locator(
      '[data-cy="participant-upload-image-preview"]',
    );
    await expect(preview).toBeVisible();

    await expect(preview).toHaveAttribute('src', /^blob:/);

    const download = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-cy="participant-upload-download"]').click(),
    ]).then(([event]) => event);

    expect(download.suggestedFilename()).toBe('report.png');
    expect(fileRequests()).toBe(1);
  });

  test('previews a PDF inline', async ({ page }) => {
    await openUploadPage(
      page,
      {
        original_filename: 'scan.pdf',
        content_type_detected: 'application/pdf',
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/pdf',
          body: Buffer.from('%PDF-1.4 stub'),
        }),
    );

    const preview = page.locator('[data-cy="participant-upload-pdf-preview"]');
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute('src', /^blob:/);

    await expect(
      page.locator('[data-cy="participant-upload-image-preview"]'),
    ).toHaveCount(0);
  });

  test('offers a non-previewable type for download only', async ({ page }) => {
    const { fileRequests } = await openUploadPage(
      page,
      {
        original_filename: 'notes.docx',
        content_type_detected:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        inline_preview: false,
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          body: Buffer.from('PK stub'),
        }),
    );

    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toBeVisible();

    await expect(
      page.locator('[data-cy="participant-upload-image-preview"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-cy="participant-upload-pdf-preview"]'),
    ).toHaveCount(0);
    await expect(page.getByText(/not shown in the browser/i)).toBeVisible();

    expect(fileRequests()).toBe(0);

    const download = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-cy="participant-upload-download"]').click(),
    ]).then(([event]) => event);

    expect(download.suggestedFilename()).toBe('notes.docx');
    expect(fileRequests()).toBe(1);
  });

  test('explains a file the security scanner removed, and why', async ({
    page,
  }) => {
    await openUploadPage(page, {
      original_filename: 'infected.pdf',
      scan_status: 'deleted',
      deletion_reason: 'MALWARE_DETECTED',
      url: null,
      inline_preview: false,
    });

    const removed = page.locator('[data-cy="participant-upload-removed"]');
    await expect(removed).toBeVisible();
    await expect(removed).toContainText(/removed by the security scanner/i);
    await expect(removed).toContainText(/found a threat/i);
    await expect(removed).toContainText('infected.pdf');

    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toHaveCount(0);
  });

  test('says the file is still being scanned rather than failing', async ({
    page,
  }) => {
    await openUploadPage(page, {
      scan_status: 'pending',
      url: null,
      inline_preview: false,
    });

    await expect(
      page.locator('[data-cy="participant-upload-pending"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toHaveCount(0);
  });
});

test.describe('Participant upload page — content moderation', () => {
  const moderation = (page: Page) =>
    page.locator('[data-cy="participant-upload-moderation"]');

  test('says the content check is still running', async ({ page }) => {
    await openUploadPage(
      page,
      {
        moderation_status: 'pending',
        moderation_labels: [],
        moderation_model_version: null,
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'image/png',
          body: PNG_BYTES,
        }),
    );

    await expect(
      page.locator('[data-cy="participant-upload-moderation-pending"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-cy="participant-upload-moderation-clear"]'),
    ).toHaveCount(0);

    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toBeVisible();
  });

  test('says plainly that the image was checked and nothing was found', async ({
    page,
  }) => {
    await openUploadPage(page, {}, (route) =>
      route.fulfill({ status: 200, contentType: 'image/png', body: PNG_BYTES }),
    );

    await expect(
      page.locator('[data-cy="participant-upload-moderation-clear"]'),
    ).toBeVisible();
    await expect(moderation(page)).toContainText('no sensitive content');
  });

  test('lists each detected category with its confidence', async ({ page }) => {
    await openUploadPage(
      page,
      {
        moderation_status: 'completed',
        moderation_labels: [
          { name: 'Violence', confidence: 92.4 },
          { name: 'Drugs & Tobacco', confidence: 85 },
        ],
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'image/png',
          body: PNG_BYTES,
        }),
    );

    const flagged = page.locator(
      '[data-cy="participant-upload-moderation-flagged"]',
    );

    await expect(flagged).toBeVisible();
    await expect(flagged).toContainText('Violence');
    await expect(flagged).toContainText('92.4');
    await expect(flagged).toContainText('Drugs & tobacco');

    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-cy="participant-upload-image-preview"]'),
    ).toBeVisible();
  });

  test('never shows a skipped check as a clean result', async ({ page }) => {
    await openUploadPage(
      page,
      {
        content_type_detected: 'application/pdf',
        original_filename: 'report.pdf',
        inline_preview: false,
        moderation_status: 'skipped',
        moderation_labels: [],
        moderation_skip_reason: 'UNSUPPORTED_FORMAT',
        moderation_model_version: null,
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/pdf',
          body: Buffer.from('%PDF-1.4'),
        }),
    );

    const unchecked = page.locator(
      '[data-cy="participant-upload-moderation-unchecked"]',
    );

    await expect(unchecked).toBeVisible();
    await expect(unchecked).toContainText('was not checked');
    await expect(unchecked).toContainText('only reads JPEG and PNG');
    await expect(
      page.locator('[data-cy="participant-upload-moderation-clear"]'),
    ).toHaveCount(0);
  });

  test('says a failed check errored, not that it was never run', async ({
    page,
  }) => {
    await openUploadPage(
      page,
      {
        moderation_status: 'failed',
        moderation_labels: [],
        moderation_skip_reason: null,
        moderation_model_version: null,
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'image/png',
          body: PNG_BYTES,
        }),
    );

    const unchecked = page.locator(
      '[data-cy="participant-upload-moderation-unchecked"]',
    );

    await expect(unchecked).toBeVisible();
    await expect(unchecked).toContainText('ran into an error');
    await expect(
      page.locator('[data-cy="participant-upload-moderation-clear"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-cy="participant-upload-download"]'),
    ).toBeVisible();
  });

  test('names a category it has no wording for in general terms', async ({
    page,
  }) => {
    await openUploadPage(
      page,
      {
        moderation_status: 'completed',
        moderation_labels: [
          { name: 'Something AWS Added Later', confidence: 99 },
        ],
      },
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'image/png',
          body: PNG_BYTES,
        }),
    );

    const flagged = page.locator(
      '[data-cy="participant-upload-moderation-flagged"]',
    );

    await expect(flagged).toBeVisible();
    await expect(flagged).toContainText('Other sensitive content');
    await expect(flagged).not.toContainText('Something AWS Added Later');
  });

  test('shows no moderation at all for a file the scanner removed', async ({
    page,
  }) => {
    await openUploadPage(page, {
      scan_status: 'deleted',
      inline_preview: false,
      deletion_reason: 'MALWARE_DETECTED',
      moderation_status: 'skipped',
      moderation_labels: [],
      moderation_skip_reason: 'FILE_REMOVED_BY_SECURITY_SCAN',
      moderation_model_version: null,
    });

    await expect(
      page.locator('[data-cy="participant-upload-removed"]'),
    ).toBeVisible();
    await expect(moderation(page)).toHaveCount(0);
  });
});
