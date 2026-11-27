import React from 'react';
import { IntlProvider } from 'react-intl';
import { act, render, screen, waitFor } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';

import {
  ParticipantUpload,
  ParticipantUploadDeletionReason,
  ParticipantUploadModerationStatus,
  ParticipantUploadScanStatus,
} from 'models/ParticipantUpload';

import FileUploadQuestion from '../FileUploadQuestion';

jest.mock('utils/participantUploads');

// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
const participantUploads = require('utils/participantUploads');

const USER_SESSION_ID = 'user-session-1';
const QUESTION_ID = 'question-1';
const VARIABLE = 'uploaded_file';

const CONFIG = {
  allowedContentTypes: ['application/pdf'],
  acceptedExtensions: ['pdf', 'png'],
  inlinePreviewContentTypes: ['application/pdf'],
  maxSizeBytes: 104857600,
  maxFilesPerQuestion: 1,
};

const upload = (
  overrides: Partial<ParticipantUpload> = {},
): ParticipantUpload => ({
  id: 'upload-1',
  questionId: QUESTION_ID,
  userSessionId: USER_SESSION_ID,
  originalFilename: 'scan.pdf',
  description: null,
  contentTypeDetected: 'application/pdf',
  byteSize: 1024,
  scanStatus: ParticipantUploadScanStatus.PENDING,
  inlinePreview: false,
  deletionReason: null,

  ...overrides,
});

const question = {
  id: QUESTION_ID,
  body: { variable: { name: VARIABLE }, data: [{ payload: '' }] },
  settings: { show_file_description: false },
} as any;

const byCy = (value: string) => document.querySelector(`[data-cy="${value}"]`);

const renderScreen = (selectAnswer = jest.fn()) => {
  render(
    <IntlProvider locale={DEFAULT_LOCALE}>
      <FileUploadQuestion
        question={question}
        selectAnswer={selectAnswer}
        userSessionId={USER_SESSION_ID}
      />
    </IntlProvider>,
  );
  return selectAnswer;
};

beforeEach(() => {
  jest.clearAllMocks();
  participantUploads.fetchParticipantUploadConfig.mockResolvedValue(CONFIG);
  participantUploads.fetchParticipantUploads.mockResolvedValue([]);
});

describe('FileUploadQuestion', () => {
  it('publishes no answer while the scanner has not cleared the file', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([upload()]);

    const selectAnswer = renderScreen();

    await waitFor(() =>
      expect(byCy('participant-upload-pending')).toBeTruthy(),
    );

    expect(selectAnswer).toHaveBeenCalledWith([]);
    expect(selectAnswer).not.toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ var: VARIABLE })]),
    );
  });

  it('publishes the upload id once the scan comes back clean', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({ scanStatus: ParticipantUploadScanStatus.CLEAN }),
    ]);

    const selectAnswer = renderScreen();

    await waitFor(() =>
      expect(selectAnswer).toHaveBeenCalledWith([
        { var: VARIABLE, value: ['upload-1'] },
      ]),
    );

    expect(byCy('participant-upload-clean')).toBeTruthy();
  });

  it('shows which file the scanner rejected and why, and answers nothing', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({
        scanStatus: ParticipantUploadScanStatus.DELETED,
        deletionReason: ParticipantUploadDeletionReason.MALWARE_DETECTED,
      }),
    ]);

    const selectAnswer = renderScreen();

    await waitFor(() =>
      expect(byCy('participant-upload-rejected')).toBeTruthy(),
    );

    expect(screen.getByText(/scan\.pdf/)).toBeTruthy();
    expect(screen.getByText(/found a threat/)).toBeTruthy();
    expect(selectAnswer).toHaveBeenCalledWith([]);
    expect(selectAnswer).not.toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ var: VARIABLE })]),
    );
  });

  it('blames the system, not the file, when our scanner could not run', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({
        scanStatus: ParticipantUploadScanStatus.DELETED,
        deletionReason:
          ParticipantUploadDeletionReason.SCANNER_CONFIGURATION_ERROR,
      }),
    ]);

    renderScreen();

    await waitFor(() =>
      expect(byCy('participant-upload-rejected')).toBeTruthy(),
    );

    expect(screen.getByText(/problem on our side/)).toBeTruthy();
  });

  it('falls back to a neutral wording for a reason it does not know', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({
        scanStatus: ParticipantUploadScanStatus.DELETED,

        deletionReason: 'SOMETHING_NEW' as ParticipantUploadDeletionReason,
      }),
    ]);

    renderScreen();

    await waitFor(() =>
      expect(byCy('participant-upload-rejected')).toBeTruthy(),
    );

    expect(screen.getByText(/could not check it/)).toBeTruthy();
  });

  it('keeps a rejected file visible, so a re-upload can be offered alongside it', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({
        scanStatus: ParticipantUploadScanStatus.DELETED,
        deletionReason: ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT,
      }),
    ]);

    renderScreen();

    await waitFor(() =>
      expect(byCy('participant-upload-rejected')).toBeTruthy(),
    );

    expect(byCy('participant-upload-dropzone')).toBeTruthy();
  });

  it('hides the dropzone once the per-question limit is taken', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({ scanStatus: ParticipantUploadScanStatus.CLEAN }),
    ]);

    renderScreen();

    await waitFor(() => expect(byCy('participant-upload-clean')).toBeTruthy());

    expect(byCy('participant-upload-dropzone')).toBeNull();
  });

  it('ignores uploads belonging to another question in the same session', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({
        id: 'other-question-upload',
        questionId: 'question-2',
        scanStatus: ParticipantUploadScanStatus.CLEAN,
      }),
    ]);

    const selectAnswer = renderScreen();

    await act(async () => {});

    expect(selectAnswer).toHaveBeenCalledWith([]);
    expect(byCy('participant-upload-clean')).toBeNull();
  });

  it('shows the participant nothing of the content moderation', async () => {
    participantUploads.fetchParticipantUploads.mockResolvedValue([
      upload({
        scanStatus: ParticipantUploadScanStatus.CLEAN,
        moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
        moderationLabels: [
          { name: 'Violence', confidence: 92.4 },
          { name: 'Drugs & Tobacco', confidence: 85 },
        ],
      }),
    ]);

    renderScreen();

    await waitFor(() => expect(byCy('participant-upload-clean')).toBeTruthy());

    expect(document.body.textContent).not.toContain('Violence');
    expect(document.body.textContent).not.toContain('Drugs');
    expect(document.body.textContent).not.toContain('92.4');
    expect(byCy('participant-upload-moderation')).toBeNull();
  });
});
