import axios from 'axios';

import {
  ParticipantUploadDeletionReason,
  ParticipantUploadScanStatus,
  getUploadDeletionReason,
  isUploadClean,
  isUploadPending,
  isUploadRemoved,
} from 'models/ParticipantUpload';

import { deletionReasonMessages } from 'containers/ParticipantUploadPage/messages';
import { fileUploadErrorMessages } from 'containers/AnswerSessionPage/layouts/fileUploadMessages';

import { fetchParticipantUpload } from '../participantUploads';

jest.mock('axios');

const mockedGet = axios.get as jest.Mock;

type SerializedAttributes = {
  scan_status: string;
  deletion_reason: Nullable<string>;
  inline_preview: boolean;
};

const moderationFor = (scanStatus: string) =>
  scanStatus === 'deleted'
    ? {
        moderation_status: 'skipped',
        moderation_labels: [],
        moderation_skip_reason: 'FILE_REMOVED_BY_SECURITY_SCAN',
        moderation_model_version: null,
      }
    : {
        moderation_status: 'pending',
        moderation_labels: [],
        moderation_skip_reason: null,
        moderation_model_version: null,
      };

const serializedUpload = (attributes: SerializedAttributes) => ({
  data: {
    id: 'upload-1',

    type: 'participant_upload',
    attributes: {
      question_id: 'question-1',
      user_session_id: 'user-session-1',
      original_filename: 'skan.pdf',
      description: null,
      content_type_detected: 'application/pdf',
      byte_size: 1024,
      ...moderationFor(attributes.scan_status),
      ...attributes,
    },
  },
});

const VERDICTS: Array<{
  source: string;
  attributes: SerializedAttributes;
  expected: {
    scanStatus: ParticipantUploadScanStatus;
    deletionReason: Nullable<ParticipantUploadDeletionReason>;
  };
}> = [
  {
    source: 'the object carries no scan tag yet',
    attributes: {
      scan_status: 'pending',
      deletion_reason: null,
      inline_preview: false,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.PENDING,
      deletionReason: null,
    },
  },
  {
    source: 'NO_THREATS_FOUND',
    attributes: {
      scan_status: 'clean',
      deletion_reason: null,
      inline_preview: true,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.CLEAN,
      deletionReason: null,
    },
  },
  {
    source: 'THREATS_FOUND',
    attributes: {
      scan_status: 'deleted',
      deletion_reason: 'MALWARE_DETECTED',
      inline_preview: false,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.DELETED,
      deletionReason: ParticipantUploadDeletionReason.MALWARE_DETECTED,
    },
  },
  {
    source: 'UNSUPPORTED',
    attributes: {
      scan_status: 'deleted',
      deletion_reason: 'SCANNER_CANNOT_INSPECT',
      inline_preview: false,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.DELETED,
      deletionReason: ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT,
    },
  },
  {
    source: 'FAILED',
    attributes: {
      scan_status: 'deleted',
      deletion_reason: 'SCANNER_CANNOT_INSPECT',
      inline_preview: false,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.DELETED,
      deletionReason: ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT,
    },
  },
  {
    source: 'ACCESS_DENIED',
    attributes: {
      scan_status: 'deleted',
      deletion_reason: 'SCANNER_CONFIGURATION_ERROR',
      inline_preview: false,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.DELETED,
      deletionReason:
        ParticipantUploadDeletionReason.SCANNER_CONFIGURATION_ERROR,
    },
  },
  {
    source: 'the scan never settled and the job closed it',
    attributes: {
      scan_status: 'deleted',
      deletion_reason: 'SCANNER_CANNOT_INSPECT',
      inline_preview: false,
    },
    expected: {
      scanStatus: ParticipantUploadScanStatus.DELETED,
      deletionReason: ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT,
    },
  },
];

const fetchWith = (attributes: SerializedAttributes) => {
  mockedGet.mockResolvedValue({ data: serializedUpload(attributes) });
  return fetchParticipantUpload('upload-1');
};

beforeEach(() => jest.clearAllMocks());

describe('every scanner outcome the API can report', () => {
  it.each(VERDICTS)(
    'maps $source onto $expected.scanStatus',
    async ({ attributes, expected }) => {
      const upload = await fetchWith(attributes);

      expect(upload.scanStatus).toBe(expected.scanStatus);
      expect(upload.deletionReason ?? null).toBe(expected.deletionReason);
    },
  );

  it.each(VERDICTS)(
    'answers exactly one of pending / clean / removed for $source',
    async ({ attributes }) => {
      const upload = await fetchWith(attributes);

      const answers = [
        isUploadPending(upload),
        isUploadClean(upload),
        isUploadRemoved(upload),
      ].filter(Boolean);

      expect(answers).toHaveLength(1);
    },
  );

  it('treats only the clean verdict as servable', async () => {
    const servable = await Promise.all(
      VERDICTS.map(async ({ source, attributes }) => ({
        source,
        clean: isUploadClean(await fetchWith(attributes)),
      })),
    );

    expect(
      servable.filter(({ clean }) => clean).map(({ source }) => source),
    ).toEqual(['NO_THREATS_FOUND']);
  });
});

describe('the wording a removed upload is explained by', () => {
  it.each(
    VERDICTS.filter(
      ({ expected }) =>
        expected.scanStatus === ParticipantUploadScanStatus.DELETED,
    ),
  )(
    'is chosen from the reason for $source',
    async ({ attributes, expected }) => {
      const upload = await fetchWith(attributes);

      expect(getUploadDeletionReason(upload)).toBe(expected.deletionReason);
    },
  );

  it.each([null, 'CONTENT_POLICY_VIOLATION', ''])(
    'falls back to the neutral reason for %p',
    async (deletion_reason) => {
      const upload = await fetchWith({
        scan_status: 'deleted',
        deletion_reason: deletion_reason as Nullable<string>,
        inline_preview: false,
      });

      expect(getUploadDeletionReason(upload)).toBe(
        ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT,
      );
    },
  );

  it.each(Object.values(ParticipantUploadDeletionReason))(
    'has participant and researcher wording for %s',
    (reason) => {
      expect(fileUploadErrorMessages[reason]).toBeTruthy();
      expect(deletionReasonMessages[reason]).toBeTruthy();
    },
  );
});
