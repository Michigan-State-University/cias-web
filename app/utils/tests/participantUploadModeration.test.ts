import axios from 'axios';

import {
  ParticipantUploadModerationCategory,
  ParticipantUploadModerationOutcome,
  ParticipantUploadModerationSkipReason,
  ParticipantUploadModerationStatus,
  getModerationCategory,
  getModerationOutcome,
  getModerationSkipReason,
} from 'models/ParticipantUpload';

import {
  moderationCategoryMessages,
  moderationSkipReasonMessages,
} from 'containers/ParticipantUploadPage/messages';

import { fetchParticipantUpload } from '../participantUploads';

jest.mock('axios');

const mockedGet = axios.get as jest.Mock;

type ModerationAttributes = {
  moderation_status: string;
  moderation_labels: Array<{ name: string; confidence: number }>;
  moderation_skip_reason: Nullable<string>;
  moderation_model_version: Nullable<string>;
};

const fetchWith = (attributes: Partial<ModerationAttributes>) => {
  mockedGet.mockResolvedValue({
    data: {
      data: {
        id: 'upload-1',
        type: 'participant_upload',
        attributes: {
          question_id: 'question-1',
          user_session_id: 'user-session-1',
          original_filename: 'zdjecie.png',
          description: null,
          content_type_detected: 'image/png',
          byte_size: 1024,
          scan_status: 'clean',
          inline_preview: true,
          deletion_reason: null,
          ...attributes,
        },
      },
    },
  });

  return fetchParticipantUpload('upload-1');
};

beforeEach(() => jest.clearAllMocks());

describe('the moderation payload reaches the app intact', () => {
  it('carries the labels through the mapper as objects, not as a string', async () => {
    const upload = await fetchWith({
      moderation_status: 'completed',
      moderation_labels: [
        { name: 'Violence', confidence: 92.4 },
        { name: 'Drugs & Tobacco', confidence: 85 },
      ],
      moderation_skip_reason: null,
      moderation_model_version: '7.0',
    });

    expect(upload.moderationStatus).toBe(
      ParticipantUploadModerationStatus.COMPLETED,
    );
    expect(upload.moderationLabels).toEqual([
      { name: 'Violence', confidence: 92.4 },
      { name: 'Drugs & Tobacco', confidence: 85 },
    ]);
    expect(upload.moderationModelVersion).toBe('7.0');
  });

  it('keeps an empty list an empty list, never a missing field', async () => {
    const upload = await fetchWith({
      moderation_status: 'completed',
      moderation_labels: [],
      moderation_skip_reason: null,
      moderation_model_version: '7.0',
    });

    expect(upload.moderationLabels).toEqual([]);
    expect(getModerationOutcome(upload)).toBe(
      ParticipantUploadModerationOutcome.CLEAR,
    );
  });

  it('reads the skip reason the API attaches to a skipped check', async () => {
    const upload = await fetchWith({
      moderation_status: 'skipped',
      moderation_labels: [],
      moderation_skip_reason: 'UNSUPPORTED_FORMAT',
      moderation_model_version: null,
    });

    expect(getModerationSkipReason(upload)).toBe(
      ParticipantUploadModerationSkipReason.UNSUPPORTED_FORMAT,
    );
  });
});

describe('an unexamined image is never reported as a clean one', () => {
  it.each([
    ['completed', ParticipantUploadModerationOutcome.CLEAR],
    ['pending', ParticipantUploadModerationOutcome.PENDING],
    ['skipped', ParticipantUploadModerationOutcome.UNCHECKED],
    ['failed', ParticipantUploadModerationOutcome.UNCHECKED],
  ])('reports %s with no labels as %s', (moderationStatus, expected) => {
    expect(
      getModerationOutcome({
        moderationStatus: moderationStatus as ParticipantUploadModerationStatus,
        moderationLabels: [],
      }),
    ).toBe(expected);
  });

  it.each([
    [
      'a status this release does not know',
      { moderationStatus: 'reviewed' as ParticipantUploadModerationStatus },
    ],

    ['an API that predates moderation', {}],
    [
      'labels that are not a list',
      {
        moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
        moderationLabels: null as unknown as [],
      },
    ],
    [
      'labels the mapper lost',
      { moderationStatus: ParticipantUploadModerationStatus.COMPLETED },
    ],
  ])('reports %s as unchecked rather than clear', (_label, upload) => {
    const outcome = getModerationOutcome(upload);

    expect(outcome).not.toBe(ParticipantUploadModerationOutcome.CLEAR);
    expect(outcome).toBe(ParticipantUploadModerationOutcome.UNCHECKED);
  });

  it('stays flagged for a category it has no wording for', () => {
    const outcome = getModerationOutcome({
      moderationStatus: ParticipantUploadModerationStatus.COMPLETED,
      moderationLabels: [{ name: 'Something AWS Added Later', confidence: 99 }],
    });

    expect(outcome).toBe(ParticipantUploadModerationOutcome.FLAGGED);
  });
});

describe('the reason an unchecked image is explained by', () => {
  it('is given only for a skipped check, never for a failed one', () => {
    expect(
      getModerationSkipReason({
        moderationStatus: ParticipantUploadModerationStatus.FAILED,
        moderationSkipReason: ParticipantUploadModerationSkipReason.TOO_LARGE,
      }),
    ).toBeNull();
  });

  it('is dropped when the API sends a reason this release cannot word', () => {
    expect(
      getModerationSkipReason({
        moderationStatus: ParticipantUploadModerationStatus.SKIPPED,
        moderationSkipReason:
          'REKOGNITION_QUOTA_EXCEEDED' as ParticipantUploadModerationSkipReason,
      }),
    ).toBeNull();
  });

  it.each(Object.values(ParticipantUploadModerationSkipReason))(
    'has wording for %s',
    (reason) => {
      expect(moderationSkipReasonMessages[reason]).toBeTruthy();
    },
  );
});

describe('the taxonomy the researcher is shown', () => {
  const API_CATEGORIES = [
    'Alcohol',
    'Drugs & Tobacco',
    'Explicit',
    'Gambling',
    'Hate Symbols',
    'Non-Explicit Nudity of Intimate parts and Kissing',
    'Rude Gestures',
    'Swimwear or Underwear',
    'Violence',
    'Visually Disturbing',
  ];

  it('matches the list the API validates against, with no gap either way', () => {
    expect(Object.values(ParticipantUploadModerationCategory).sort()).toEqual(
      [...API_CATEGORIES].sort(),
    );
  });

  it.each(API_CATEGORIES)('has wording for %s', (name) => {
    const category = getModerationCategory(name);

    expect(category).toBeTruthy();
    expect(moderationCategoryMessages[category!]).toBeTruthy();
  });

  it('sends a name outside the taxonomy to the generic wording', () => {
    expect(getModerationCategory('Smoking')).toBeNull();
  });
});

describe('a file the security scanner took away', () => {
  it('arrives as a skipped check that names the removal', async () => {
    const upload = await fetchWith({
      moderation_status: 'skipped',
      moderation_labels: [],
      moderation_skip_reason: 'FILE_REMOVED_BY_SECURITY_SCAN',
      moderation_model_version: null,
    });

    expect(getModerationOutcome(upload)).toBe(
      ParticipantUploadModerationOutcome.UNCHECKED,
    );
    expect(getModerationSkipReason(upload)).toBe(
      ParticipantUploadModerationSkipReason.FILE_REMOVED_BY_SECURITY_SCAN,
    );
  });

  it('is never mistaken for a check that ran and errored', async () => {
    const upload = await fetchWith({
      moderation_status: 'skipped',
      moderation_labels: [],
      moderation_skip_reason: 'FILE_REMOVED_BY_SECURITY_SCAN',
      moderation_model_version: null,
    });

    expect(upload.moderationStatus).not.toBe(
      ParticipantUploadModerationStatus.FAILED,
    );
    expect(
      moderationSkipReasonMessages[
        ParticipantUploadModerationSkipReason.FILE_REMOVED_BY_SECURITY_SCAN
      ].defaultMessage,
    ).not.toContain('error');
  });
});
