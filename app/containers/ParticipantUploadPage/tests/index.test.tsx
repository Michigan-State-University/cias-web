import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';

import {
  ParticipantUploadDeletionReason,
  ParticipantUploadModerationStatus,
  ParticipantUploadScanStatus,
} from 'models/ParticipantUpload';

import ParticipantUploadPage from '../index';

jest.mock('utils/participantUploads');
jest.mock('js-file-download');

// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
const participantUploads = require('utils/participantUploads');
// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
const fileDownload = require('js-file-download');

const UPLOAD_ID = 'upload-1';

const httpError = (status: number) => ({
  response: { status, data: {} },
});

const byCy = (value: string) => document.querySelector(`[data-cy="${value}"]`);

const renderPage = () =>
  render(
    <IntlProvider locale={DEFAULT_LOCALE}>
      <MemoryRouter initialEntries={[`/participant-uploads/${UPLOAD_ID}`]}>
        <Route path="/participant-uploads/:uploadId">
          <ParticipantUploadPage />
        </Route>
      </MemoryRouter>
    </IntlProvider>,
  );

beforeEach(() => {
  jest.clearAllMocks();
  participantUploads.fetchParticipantUploadFileBlob.mockResolvedValue(
    new Blob(['x']),
  );
  participantUploads.fetchParticipantUploadConfig.mockResolvedValue({
    allowedContentTypes: ['image/png'],
    acceptedExtensions: ['png', 'pdf', 'csv', 'txt'],
    inlinePreviewContentTypes: ['image/png', 'application/pdf'],
    maxSizeBytes: 104857600,
    maxFilesPerQuestion: 1,
  });
});

describe('ParticipantUploadPage', () => {
  it('says the file is gone when the API has no such upload', async () => {
    participantUploads.fetchParticipantUpload.mockRejectedValue(httpError(404));

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-missing')).toBeTruthy(),
    );

    expect(byCy('participant-upload-error')).toBeNull();
    expect(byCy('participant-upload-download')).toBeNull();
  });

  it('keeps the retry wording for a failure that may pass', async () => {
    participantUploads.fetchParticipantUpload.mockRejectedValue(httpError(500));

    renderPage();

    await waitFor(() => expect(byCy('participant-upload-error')).toBeTruthy());

    expect(byCy('participant-upload-missing')).toBeNull();
  });

  it('keeps the retry wording when the request never reached the API', async () => {
    participantUploads.fetchParticipantUpload.mockRejectedValue(
      new Error('Network Error'),
    );

    renderPage();

    await waitFor(() => expect(byCy('participant-upload-error')).toBeTruthy());

    expect(byCy('participant-upload-missing')).toBeNull();
  });

  it('builds the preview from the type the API detected, not the one it served', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      id: UPLOAD_ID,
      questionId: 'question-1',
      userSessionId: 'user-session-1',
      originalFilename: 'raport.pdf',
      description: null,
      contentTypeDetected: 'application/pdf',
      byteSize: 1024,
      scanStatus: ParticipantUploadScanStatus.CLEAN,
      inlinePreview: true,
      deletionReason: null,
    });
    participantUploads.fetchParticipantUploadFileBlob.mockResolvedValue(
      new Blob(['<script>stolen()</script>'], { type: 'text/html' }),
    );

    const createObjectURL = jest.fn<string, [Blob]>(() => 'blob:preview');
    Object.defineProperty(URL, 'createObjectURL', {
      value: createObjectURL,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });

    renderPage();

    await waitFor(() => expect(createObjectURL).toHaveBeenCalled());

    const [previewed] = createObjectURL.mock.calls[0];
    expect(previewed.type).toBe('application/pdf');
  });

  it('offers nothing for a status it does not recognise', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      id: UPLOAD_ID,
      questionId: 'question-1',
      userSessionId: 'user-session-1',
      originalFilename: 'raport.pdf',
      description: null,
      contentTypeDetected: 'application/pdf',
      byteSize: 1024,
      scanStatus: 'quarantined' as ParticipantUploadScanStatus,
      inlinePreview: false,
      deletionReason: null,
    });

    renderPage();

    await waitFor(() => expect(byCy('participant-upload-error')).toBeTruthy());

    expect(byCy('participant-upload-download')).toBeNull();
  });

  it('saves the file under a name that agrees with its content', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      id: UPLOAD_ID,
      questionId: 'question-1',
      userSessionId: 'user-session-1',
      originalFilename: 'raport.html',
      description: null,
      contentTypeDetected: 'image/png',
      byteSize: 1024,
      scanStatus: ParticipantUploadScanStatus.CLEAN,
      inlinePreview: false,
      deletionReason: null,
    });

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-download')).toBeTruthy(),
    );

    (byCy('participant-upload-download') as HTMLElement).click();

    await waitFor(() => expect(fileDownload).toHaveBeenCalled());

    expect(fileDownload).toHaveBeenCalledWith(
      expect.anything(),
      'raport.html.png',
    );
  });

  it('does not rename a file whose extension the API accepts', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      id: UPLOAD_ID,
      questionId: 'question-1',
      userSessionId: 'user-session-1',
      originalFilename: 'dane.csv',
      description: null,
      contentTypeDetected: 'text/plain',
      byteSize: 1024,
      scanStatus: ParticipantUploadScanStatus.CLEAN,
      inlinePreview: false,
      deletionReason: null,
    });

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-download')).toBeTruthy(),
    );

    (byCy('participant-upload-download') as HTMLElement).click();

    await waitFor(() => expect(fileDownload).toHaveBeenCalled());

    expect(fileDownload).toHaveBeenCalledWith(expect.anything(), 'dane.csv');
  });

  it('offers the file once the scan has cleared it', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      id: UPLOAD_ID,
      questionId: 'question-1',
      userSessionId: 'user-session-1',
      originalFilename: 'raport.pdf',
      description: null,
      contentTypeDetected: 'application/pdf',
      byteSize: 1024,
      scanStatus: ParticipantUploadScanStatus.CLEAN,
      inlinePreview: false,
      deletionReason: null,
    });

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-download')).toBeTruthy(),
    );

    expect(byCy('participant-upload-missing')).toBeNull();
    expect(byCy('participant-upload-error')).toBeNull();
  });

  it('explains the wait instead of erroring while the scan is running', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      id: UPLOAD_ID,
      questionId: 'question-1',
      userSessionId: 'user-session-1',
      originalFilename: 'raport.pdf',
      description: null,
      contentTypeDetected: 'application/pdf',
      byteSize: 1024,
      scanStatus: ParticipantUploadScanStatus.PENDING,
      inlinePreview: false,
      deletionReason: null,
    });

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-pending')).toBeTruthy(),
    );

    expect(byCy('participant-upload-download')).toBeNull();
    expect(byCy('participant-upload-error')).toBeNull();
    expect(
      participantUploads.fetchParticipantUploadFileBlob,
    ).not.toHaveBeenCalled();
  });

  it.each([
    [
      ParticipantUploadDeletionReason.MALWARE_DETECTED,
      'The scanner found a threat in the file.',
    ],

    [
      ParticipantUploadDeletionReason.SCANNER_CONFIGURATION_ERROR,
      'The scanner could not run because of a configuration problem on our side.',
    ],
  ])(
    'notes a file removed for %s in its own words, with nothing to download',
    async (deletionReason, wording) => {
      participantUploads.fetchParticipantUpload.mockResolvedValue({
        id: UPLOAD_ID,
        questionId: 'question-1',
        userSessionId: 'user-session-1',
        originalFilename: 'raport.pdf',
        description: null,
        contentTypeDetected: 'application/pdf',
        byteSize: 1024,
        scanStatus: ParticipantUploadScanStatus.DELETED,
        inlinePreview: false,
        deletionReason,
      });

      renderPage();

      await waitFor(() =>
        expect(byCy('participant-upload-removed')).toBeTruthy(),
      );

      expect(byCy('participant-upload-removed')?.textContent).toContain(
        wording,
      );
      expect(byCy('participant-upload-download')).toBeNull();
      expect(byCy('participant-upload-missing')).toBeNull();
      expect(byCy('participant-upload-error')).toBeNull();
      expect(
        participantUploads.fetchParticipantUploadFileBlob,
      ).not.toHaveBeenCalled();
    },
  );
});

describe('ParticipantUploadPage content moderation', () => {
  const cleanUpload = (moderation: object) => ({
    id: UPLOAD_ID,
    questionId: 'question-1',
    userSessionId: 'user-session-1',
    originalFilename: 'zdjecie.png',
    description: null,
    contentTypeDetected: 'image/png',
    byteSize: 1024,
    scanStatus: ParticipantUploadScanStatus.CLEAN,
    inlinePreview: false,
    deletionReason: null,
    moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
    moderationLabels: [],
    moderationSkipReason: null,
    moderationModelVersion: '7.0',
    ...moderation,
  });

  const renderWith = async (moderation: object) => {
    participantUploads.fetchParticipantUpload.mockResolvedValue(
      cleanUpload(moderation),
    );

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-moderation')).toBeTruthy(),
    );
  };

  it('says the check is still running while it is pending', async () => {
    await renderWith({
      moderationStatus: ParticipantUploadModerationStatus.PENDING,
      moderationModelVersion: null,
    });

    expect(byCy('participant-upload-moderation-pending')).toBeTruthy();
    expect(byCy('participant-upload-moderation-clear')).toBeNull();
    expect(byCy('participant-upload-moderation-unchecked')).toBeNull();
  });

  it('says plainly that nothing was found once the check has run', async () => {
    await renderWith({
      moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
      moderationLabels: [],
    });

    expect(byCy('participant-upload-moderation-clear')).toBeTruthy();
    expect(byCy('participant-upload-moderation-unchecked')).toBeNull();
    expect(byCy('participant-upload-moderation-flagged')).toBeNull();
  });

  it('lists every detected category with its confidence', async () => {
    await renderWith({
      moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
      moderationLabels: [
        { name: 'Violence', confidence: 92.4 },
        { name: 'Drugs & Tobacco', confidence: 85 },
      ],
    });

    const flagged = byCy('participant-upload-moderation-flagged');

    expect(flagged?.textContent).toContain('Violence');
    expect(flagged?.textContent).toContain('92.4');
    expect(flagged?.textContent).toContain('Drugs & tobacco');
    expect(flagged?.textContent).toContain('85');
    expect(byCy('participant-upload-moderation-clear')).toBeNull();
  });

  it('names a category it does not know in general terms, still flagged', async () => {
    await renderWith({
      moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
      moderationLabels: [{ name: 'Something AWS Added Later', confidence: 99 }],
    });

    const flagged = byCy('participant-upload-moderation-flagged');

    expect(flagged?.textContent).toContain('Other sensitive content');
    expect(flagged?.textContent).not.toContain('Something AWS Added Later');
    expect(byCy('participant-upload-moderation-clear')).toBeNull();
  });

  it.each([
    [
      'skipped',
      {
        moderationStatus: ParticipantUploadModerationStatus.SKIPPED,
        moderationSkipReason: 'UNSUPPORTED_FORMAT',
        moderationModelVersion: null,
      },
      'only reads JPEG and PNG',
    ],
    [
      'failed',
      {
        moderationStatus: ParticipantUploadModerationStatus.FAILED,
        moderationSkipReason: null,
        moderationModelVersion: null,
      },
      'ran into an error and did not finish',
    ],
  ])(
    'never shows a %s check as a clean result',
    async (_status, moderation, wording) => {
      await renderWith(moderation);

      const unchecked = byCy('participant-upload-moderation-unchecked');

      expect(unchecked).toBeTruthy();
      expect(unchecked?.textContent).toContain('was not checked');
      expect(unchecked?.textContent).toContain(wording);
      expect(byCy('participant-upload-moderation-clear')).toBeNull();
    },
  );

  it('survives an upload carrying no moderation fields at all', async () => {
    await renderWith({
      moderationStatus: undefined,
      moderationLabels: undefined,
      moderationSkipReason: undefined,
      moderationModelVersion: undefined,
    });

    expect(byCy('participant-upload-moderation-unchecked')).toBeTruthy();
    expect(byCy('participant-upload-moderation-clear')).toBeNull();
  });

  it.each([
    [
      'a flagged image',
      {
        moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
        moderationLabels: [{ name: 'Violence', confidence: 92.4 }],
      },
    ],
    [
      'a failed check',
      { moderationStatus: ParticipantUploadModerationStatus.FAILED },
    ],
  ])('still offers %s for download', async (_label, moderation) => {
    await renderWith(moderation);

    expect(byCy('participant-upload-download')).toBeTruthy();
    expect(byCy('participant-upload-error')).toBeNull();
  });

  it('shows no moderation block for a file the scanner removed', async () => {
    participantUploads.fetchParticipantUpload.mockResolvedValue({
      ...cleanUpload({
        moderationStatus: ParticipantUploadModerationStatus.SKIPPED,
        moderationLabels: [],
        moderationSkipReason: 'FILE_REMOVED_BY_SECURITY_SCAN',
        moderationModelVersion: null,
      }),
      scanStatus: ParticipantUploadScanStatus.DELETED,
      deletionReason: ParticipantUploadDeletionReason.MALWARE_DETECTED,
    });

    renderPage();

    await waitFor(() =>
      expect(byCy('participant-upload-removed')).toBeTruthy(),
    );

    expect(byCy('participant-upload-moderation')).toBeNull();
  });
});
