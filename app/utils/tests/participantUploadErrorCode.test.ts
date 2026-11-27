import {
  ParticipantUploadErrorCode,
  UPLOAD_FAILED,
} from 'models/ParticipantUpload';

import { getParticipantUploadErrorCode } from '../participantUploads';

const errorWithReason = (reason: string) => ({
  response: { data: { details: { reason } } },
});

describe('getParticipantUploadErrorCode', () => {
  it('returns a reason the frontend has wording for', () => {
    expect(
      getParticipantUploadErrorCode(errorWithReason('FILE_TOO_LARGE')),
    ).toBe(ParticipantUploadErrorCode.FILE_TOO_LARGE);
  });

  it('discards a reason the frontend has no wording for', () => {
    expect(
      getParticipantUploadErrorCode(errorWithReason('INTERVENTION_PAUSED')),
    ).toBeNull();
  });

  it('discards an unrecognised reason so the caller falls back', () => {
    const code =
      getParticipantUploadErrorCode(errorWithReason('SOMETHING_NEW')) ??
      UPLOAD_FAILED;

    expect(code).toBe(UPLOAD_FAILED);
  });

  it('returns null when the error carries no reason at all', () => {
    expect(getParticipantUploadErrorCode(new Error('network'))).toBeNull();
  });
});
