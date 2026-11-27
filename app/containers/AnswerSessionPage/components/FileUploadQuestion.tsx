import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  ParticipantUpload,
  ParticipantUploadFailure,
  UPLOAD_FAILED,
  isUploadClean,
  isUploadPending,
} from 'models/ParticipantUpload';
import { FileUploadQuestionDTO } from 'models/Question';

import {
  deleteParticipantUpload,
  fetchParticipantUploads,
  getParticipantUploadErrorCode,
  uploadParticipantFile,
} from 'utils/participantUploads';
import { useParticipantUploadConfig } from 'utils/useParticipantUploadConfig';

import FileUploadQuestionLayout from '../layouts/FileUploadQuestionLayout';
import { useParticipantUploadScanPolling } from '../useParticipantUploadScanPolling';

export type Props = {
  question: FileUploadQuestionDTO;
  selectAnswer: (answerBody: unknown[]) => void;
  userSessionId?: string;
  disabled?: boolean;
};

const FileUploadQuestion: FC<Props> = ({
  question,
  selectAnswer,
  userSessionId,
  disabled,
}) => {
  const {
    id: questionId,
    body: {
      variable: { name: variableName },
    },
    settings: { show_file_description: showFileDescription },
  } = question;

  const config = useParticipantUploadConfig();
  const [uploads, setUploads] = useState<ParticipantUpload[]>([]);
  const [uploading, setUploading] = useState(false);
  const [removingId, setRemovingId] = useState<Nullable<string>>(null);
  const [errorCode, setErrorCode] =
    useState<Nullable<ParticipantUploadFailure>>(null);

  const refreshing = useRef(false);

  const refresh = useCallback(async () => {
    if (!userSessionId || refreshing.current) return;

    refreshing.current = true;
    try {
      const sessionUploads = await fetchParticipantUploads(userSessionId);
      setUploads(
        sessionUploads.filter((upload) => upload.questionId === questionId),
      );
      // eslint-disable-next-line no-empty
    } catch {
    } finally {
      refreshing.current = false;
    }
  }, [userSessionId, questionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const hasPendingUpload = uploads.some(isUploadPending);
  const scanTakingLong = useParticipantUploadScanPolling(
    hasPendingUpload,
    refresh,
  );

  const selectAnswerRef = useRef(selectAnswer);
  selectAnswerRef.current = selectAnswer;

  const cleanUploadKey = uploads
    .filter(isUploadClean)
    .map(({ id }) => id)
    .join(',');

  useEffect(() => {
    const cleanUploadIds = cleanUploadKey ? cleanUploadKey.split(',') : [];

    selectAnswerRef.current(
      cleanUploadIds.length
        ? [{ var: variableName, value: cleanUploadIds }]
        : [],
    );
  }, [cleanUploadKey, variableName]);

  const handleUpload = async (file: File, description: string) => {
    if (!userSessionId) return;

    setUploading(true);
    setErrorCode(null);

    try {
      const upload = await uploadParticipantFile(
        userSessionId,
        questionId,
        file,
        description.trim() || null,
      );
      setUploads((current) => [...current, upload]);
    } catch (error) {
      setErrorCode(getParticipantUploadErrorCode(error) ?? UPLOAD_FAILED);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (uploadId: string) => {
    if (!userSessionId) return;

    setRemovingId(uploadId);
    setErrorCode(null);

    try {
      await deleteParticipantUpload(userSessionId, uploadId);
      setUploads((current) =>
        current.filter((upload) => upload.id !== uploadId),
      );
    } catch (error) {
      setErrorCode(getParticipantUploadErrorCode(error) ?? UPLOAD_FAILED);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <FileUploadQuestionLayout
      config={config}
      uploads={uploads}
      showFileDescription={!!showFileDescription}
      onUpload={handleUpload}
      onRemove={handleRemove}
      uploading={uploading}
      removingId={removingId}
      errorCode={errorCode}
      scanTakingLong={scanTakingLong}
      disabled={disabled}
    />
  );
};

export default FileUploadQuestion;
