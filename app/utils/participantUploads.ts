import axios from 'axios';

import {
  ParticipantUpload,
  ParticipantUploadConfig,
  ParticipantUploadErrorCode,
} from 'models/ParticipantUpload';

import { asEnumValue } from 'utils/asEnumValue';
import { getApiErrorReason } from 'utils/apiErrorCodes';
import objectToCamelCase from 'utils/objectToCamelCase';
import { jsonApiToObject, jsonApiToArray } from 'utils/jsonApiMapper';
import { sanitizeFilename } from 'utils/formatters';
import { md5Base64OfFile } from 'utils/md5';

const JSON_API_TYPE = 'participantUpload';

type DirectUpload = {
  url: string;
  headers: Record<string, string>;
};

type PresignResponse = {
  signedId: string;
  directUpload: DirectUpload;
};

const normalizeUpload = (upload: ParticipantUpload): ParticipantUpload => ({
  ...upload,
  originalFilename: sanitizeFilename(upload.originalFilename ?? ''),
});

const uploadsUrl = (userSessionId: string) =>
  `/v1/user_sessions/${userSessionId}/participant_uploads`;

const participantUploadUrl = (uploadId: string) =>
  `/v1/participant_uploads/${uploadId}`;

const participantUploadFileUrl = (uploadId: string) =>
  `${participantUploadUrl(uploadId)}/file`;

export const getParticipantUploadErrorCode = (
  error: unknown,
): Nullable<ParticipantUploadErrorCode> => {
  const reason = getApiErrorReason(error);

  return asEnumValue(ParticipantUploadErrorCode, reason);
};

let configRequest: Nullable<Promise<ParticipantUploadConfig>> = null;

export const fetchParticipantUploadConfig =
  (): Promise<ParticipantUploadConfig> => {
    configRequest ??= axios
      .get('/v1/participant_uploads/config')
      .then(({ data }) => objectToCamelCase(data))
      .catch((error) => {
        configRequest = null;
        throw error;
      });

    return configRequest;
  };

export const fetchParticipantUploads = async (
  userSessionId: string,
): Promise<ParticipantUpload[]> => {
  const { data } = await axios.get(uploadsUrl(userSessionId));
  const uploads: ParticipantUpload[] =
    jsonApiToArray(data, JSON_API_TYPE) ?? [];

  return uploads.map(normalizeUpload);
};

export const deleteParticipantUpload = async (
  userSessionId: string,
  uploadId: string,
): Promise<void> => {
  await axios.delete(`${uploadsUrl(userSessionId)}/${uploadId}`);
};

const presignParticipantUpload = async (
  userSessionId: string,
  questionId: string,
  file: File,
): Promise<PresignResponse> => {
  const { data } = await axios.post<{
    signed_id: string;
    direct_upload: DirectUpload;
  }>(`${uploadsUrl(userSessionId)}/presign`, {
    question_id: questionId,
    blob: {
      filename: file.name,
      byte_size: file.size,

      checksum: await md5Base64OfFile(file),
      content_type: file.type,
    },
  });

  return {
    signedId: data.signed_id,
    directUpload: data.direct_upload,
  };
};

const putFileToStorage = async (
  { url, headers }: DirectUpload,
  file: File,
): Promise<void> => {
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers,
    credentials: 'omit',
  });

  if (!response.ok) {
    throw new Error(`Storage upload failed with status ${response.status}`);
  }
};

const createParticipantUpload = async (
  userSessionId: string,
  questionId: string,
  signedId: string,
  file: File,
  description: Nullable<string>,
): Promise<ParticipantUpload> => {
  const { data } = await axios.post(uploadsUrl(userSessionId), {
    question_id: questionId,
    participant_upload: {
      signed_id: signedId,
      original_filename: file.name,
      description,
    },
  });

  return normalizeUpload(jsonApiToObject(data, JSON_API_TYPE));
};

export const uploadParticipantFile = async (
  userSessionId: string,
  questionId: string,
  file: File,
  description: Nullable<string>,
): Promise<ParticipantUpload> => {
  const { signedId, directUpload } = await presignParticipantUpload(
    userSessionId,
    questionId,
    file,
  );

  await putFileToStorage(directUpload, file);

  return createParticipantUpload(
    userSessionId,
    questionId,
    signedId,
    file,
    description,
  );
};

export const fetchParticipantUpload = async (
  uploadId: string,
): Promise<ParticipantUpload> => {
  const { data } = await axios.get(participantUploadUrl(uploadId));
  return normalizeUpload(jsonApiToObject(data, JSON_API_TYPE));
};

export const fetchParticipantUploadFileBlob = async (
  uploadId: string,
): Promise<Blob> => {
  const { data } = await axios.get(participantUploadFileUrl(uploadId), {
    responseType: 'blob',
  });

  return data;
};
