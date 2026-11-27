import axios from 'axios';

import {
  fetchParticipantUpload,
  fetchParticipantUploads,
} from '../participantUploads';

jest.mock('axios');

const mockedGet = axios.get as jest.Mock;

const jsonApiUpload = (originalFilename: string, id = 'upload-1') => ({
  id,

  type: 'participant_upload',
  attributes: {
    question_id: 'question-1',
    user_session_id: 'user-session-1',
    original_filename: originalFilename,
    description: null,
    content_type_detected: 'image/png',
    byte_size: 1024,
    scan_status: 'clean',
    inline_preview: true,
    deletion_reason: null,
  },
});

describe('participant uploads enter the app with a safe file name', () => {
  beforeEach(() => jest.clearAllMocks());

  it('cleans the name coming from the single-upload endpoint', async () => {
    mockedGet.mockResolvedValue({
      data: { data: jsonApiUpload('raport‮gnp.exe') },
    });

    const upload = await fetchParticipantUpload('upload-1');

    expect(upload.originalFilename).toBe('raportgnp.exe');
  });

  it('cleans every name coming from the session listing', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [
          jsonApiUpload('../../etc/passwd', 'upload-1'),
          jsonApiUpload('wyniki badania.png', 'upload-2'),
        ],
      },
    });

    const uploads = await fetchParticipantUploads('user-session-1');

    expect(uploads.map(({ originalFilename }) => originalFilename)).toEqual([
      'passwd',
      'wyniki badania.png',
    ]);
  });
});
