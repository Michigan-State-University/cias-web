import { BrowserContext, Page } from '@playwright/test';

import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage, SessionPage } from '../pages';
import { waitForApiResponse } from '../utils/waitForApiResponse';

const CONFIG_URL = /\/v1\/participant_uploads\/config/;

const UPLOADS_URL = /\/v1\/user_sessions\/[^/]+\/participant_uploads(\?|$)/;
const PRESIGN_URL = /\/v1\/user_sessions\/[^/]+\/participant_uploads\/presign/;
const ANSWERS_URL = /\/v1\/user_sessions\/[^/]+\/answers/;

const STORAGE_URL = 'https://storage.example.test/participant-uploads/stub';

const CONFIG_BODY = {
  allowed_content_types: ['application/pdf', 'image/png'],
  accepted_extensions: ['pdf', 'png'],
  inline_preview_content_types: ['application/pdf', 'image/png'],
  max_size_bytes: 104857600,
  max_files_per_question: 1,
};

const uploadResource = (overrides: Record<string, unknown> = {}) => ({
  data: {
    id: String(overrides.id ?? 'upload-1'),
    type: 'participant_upload',
    attributes: {
      question_id: overrides.question_id ?? 'question-1',
      user_session_id: 'user-session-1',
      original_filename: 'report.pdf',
      description: null,
      content_type_detected: 'application/pdf',
      byte_size: 2048,
      scan_status: 'pending',
      url: null,
      inline_preview: false,
      deletion_reason: null,
      ...overrides,
    },
  },
});

const uploadCollection = (uploads: Record<string, unknown>[]) => ({
  data: uploads.map((upload) => uploadResource(upload).data),
});

const json = (body: unknown, status = 200) => ({
  status,
  contentType: 'application/json',
  body: JSON.stringify(body),
});

const stubConfig = (
  context: BrowserContext,
  overrides: Record<string, unknown> = {},
) =>
  context.route(CONFIG_URL, (route) =>
    route.fulfill(json({ ...CONFIG_BODY, ...overrides })),
  );

const stubStorage = (context: BrowserContext) =>
  context.route(STORAGE_URL, (route) => {
    const contentType = route.request().headers()['content-type'];
    return contentType === 'application/octet-stream'
      ? route.fulfill({ status: 204, body: '' })
      : route.fulfill({ status: 422, body: '' });
  });

const stubPresign = (context: BrowserContext) =>
  context.route(PRESIGN_URL, (route) =>
    route.fulfill(
      json({
        signed_id: 'signed-id-1',
        direct_upload: {
          url: STORAGE_URL,
          headers: { 'Content-Type': 'application/octet-stream' },
        },
      }),
    ),
  );

const stubUploadCollection = async (
  context: BrowserContext,
  {
    index,
    onCreate,
  }: {
    index: () => Record<string, unknown>[];
    onCreate?: () => [unknown, number];
  },
) => {
  let questionId: Nullable<string> = null;
  let creates = 0;

  const withQuestionId = (upload: Record<string, unknown>) => ({
    ...upload,
    question_id: questionId,
  });

  await context.route(UPLOADS_URL, (route) => {
    if (route.request().method() === 'POST') {
      creates += 1;
      questionId = route.request().postDataJSON()?.question_id ?? null;

      const [body, status] = onCreate?.() ?? [uploadResource(), 201];
      const created = (body as ReturnType<typeof uploadResource>)?.data
        ? uploadResource(
            withQuestionId(
              (body as ReturnType<typeof uploadResource>).data.attributes,
            ),
          )
        : body;

      return route.fulfill(json(created, status));
    }

    return route.fulfill(
      json(uploadCollection(questionId ? index().map(withQuestionId) : [])),
    );
  });

  return { creates: () => creates };
};

const attachFile = async (
  page: Page,
  name = 'report.pdf',
  buffer = Buffer.from('%PDF-1.4 stub'),
) => {
  await page
    .locator('[data-cy="participant-upload-dropzone"] input[type="file"]')
    .setInputFiles({ name, mimeType: 'application/pdf', buffer });
};

const continueButton = (page: Page) =>
  page.getByRole('button', { name: /continue|next/i }).first();

const createFileUploadSession = async (page: Page) => {
  const dashboardPage = new DashboardPage(page);
  const interventionPage = new InterventionPage(page);
  const sessionPage = new SessionPage(page);

  await dashboardPage.goto();
  await dashboardPage.createIntervention();
  const interventionId = await dashboardPage.getInterventionIdFromUrl();

  const sessionResponse = await interventionPage.createSession('classic');
  const sessionId = (await sessionResponse.json()).data.id;

  await page.goto(
    `/interventions/${interventionId}/sessions/${sessionId}/edit`,
  );
  await sessionPage.verifySessionPageLoaded();

  await sessionPage.addScreen('fileupload');

  return { interventionId, sessionId, sessionPage };
};

const openParticipantScreen = async (
  page: Page,
  stubs: Parameters<typeof stubUploadCollection>[1],
  config: Record<string, unknown> = {},
) => {
  await createFileUploadSession(page);

  const context = page.context();
  await stubConfig(context, config);
  await stubPresign(context);
  await stubStorage(context);
  const { creates } = await stubUploadCollection(context, stubs);

  const previewButton = page.locator('[data-cy="open-preview-button"]');
  await expect(previewButton).toBeVisible();

  const [previewPage] = await Promise.all([
    page.context().waitForEvent('page'),
    previewButton.click(),
  ]);
  await previewPage.waitForLoadState('domcontentloaded');

  const startButton = previewPage.locator('[data-cy="start-preview-button"]');
  await expect(startButton).toBeVisible({ timeout: 30_000 });
  await startButton.click();

  await expect(
    previewPage.locator('[data-cy="participant-upload-dropzone"]'),
  ).toBeVisible({ timeout: 30_000 });

  return { previewPage, creates };
};

test.describe('File Upload screen — researcher', () => {
  test('adds a File Upload screen and offers the file description setting', async ({
    page,
  }) => {
    const { sessionPage } = await createFileUploadSession(page);

    await expect(page.getByText('File Upload').first()).toBeVisible();

    const settingsPanel = page.locator('[data-cy="settings-panel"]');
    await expect(settingsPanel).toBeVisible();

    await expect(
      settingsPanel.getByText('Ask for a file description'),
    ).toBeVisible();
    const descriptionToggle = settingsPanel.locator(
      'label[for="show_file_description"]',
    );

    const settingSaved = waitForApiResponse(page, {
      urlIncludes: '/questions/',
      method: 'PATCH',
      status: 200,
    });
    await descriptionToggle.click();
    const saved = await (await settingSaved).json();

    expect(saved.data.attributes.settings.show_file_description).toBe(true);

    await sessionPage.verifySessionPageLoaded();
  });
});

test.describe('File Upload screen — participant', () => {
  test.describe.configure({ timeout: 120000 });

  test('attaches a file, waits out the scan and only then may continue', async ({
    page,
  }) => {
    let scanFinished = false;
    const { previewPage } = await openParticipantScreen(page, {
      index: () => [
        {
          scan_status: scanFinished ? 'clean' : 'pending',
          url: scanFinished ? '/v1/participant_uploads/upload-1/file' : null,
        },
      ],
    });

    await attachFile(previewPage);

    await expect(
      previewPage.locator('[data-cy="participant-upload-pending"]'),
    ).toBeVisible();
    await expect(continueButton(previewPage)).toBeDisabled();

    scanFinished = true;

    await expect(
      previewPage.locator('[data-cy="participant-upload-clean"]'),
    ).toBeVisible({ timeout: 20_000 });
    await expect(continueButton(previewPage)).toBeEnabled();

    const submitted = previewPage.waitForRequest(ANSWERS_URL);
    await previewPage.route(ANSWERS_URL, (route) =>
      route.fulfill(json({ data: [] }, 201)),
    );

    await continueButton(previewPage).click();
    const answerBody = (await submitted).postDataJSON();

    expect(answerBody.answer.type).toBe('Answer::FileUpload');
    expect(answerBody.answer.body.data[0].value).toEqual(['upload-1']);
    expect(answerBody.skipped).toBe(false);
  });

  test('tells the participant which file the scanner rejected, and keeps them on the screen', async ({
    page,
  }) => {
    let rejected = false;
    const { previewPage } = await openParticipantScreen(page, {
      index: () => [
        {
          original_filename: 'infected.pdf',
          ...(rejected
            ? { scan_status: 'deleted', deletion_reason: 'MALWARE_DETECTED' }
            : { scan_status: 'pending' }),
        },
      ],
      onCreate: () => [
        uploadResource({ original_filename: 'infected.pdf' }),
        201,
      ],
    });

    await attachFile(previewPage, 'infected.pdf');

    await expect(
      previewPage.locator('[data-cy="participant-upload-pending"]'),
    ).toBeVisible();

    rejected = true;

    const rejection = previewPage.locator(
      '[data-cy="participant-upload-rejected"]',
    );

    await expect(rejection).toBeVisible({ timeout: 20_000 });

    await expect(rejection).toContainText('infected.pdf');
    await expect(rejection).toContainText(/threat/i);

    await expect(continueButton(previewPage)).toBeDisabled();
    await expect(
      previewPage.locator('[data-cy="participant-upload-dropzone"]'),
    ).toBeVisible();
  });

  test('refuses a file larger than the configured cap, before any upload', async ({
    page,
  }) => {
    const { previewPage, creates } = await openParticipantScreen(
      page,
      { index: () => [] },
      { max_size_bytes: 1024 },
    );

    await attachFile(previewPage, 'huge.pdf', Buffer.alloc(4096, 0x20));

    await expect(previewPage.getByText(/cannot be larger than/i)).toBeVisible();

    expect(creates()).toBe(0);
    await expect(continueButton(previewPage)).toBeDisabled();
  });

  test('refuses a file type the API does not accept, naming the reason', async ({
    page,
  }) => {
    const { previewPage } = await openParticipantScreen(page, {
      index: () => [],

      onCreate: () => [
        {
          message: 'The file was rejected',
          details: { reason: 'FILE_TYPE_NOT_ALLOWED' },
        },
        422,
      ],
    });

    await attachFile(previewPage);

    await expect(
      previewPage.getByText(/file type is not accepted/i),
    ).toBeVisible();
    await expect(continueButton(previewPage)).toBeDisabled();
  });
});
