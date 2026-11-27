import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import fileDownload from 'js-file-download';

import {
  ParticipantUpload,
  getUploadDeletionReason,
  ParticipantUploadErrorCode,
  isUploadClean,
  isUploadPending,
  isUploadRemoved,
} from 'models/ParticipantUpload';

import {
  fetchParticipantUpload,
  fetchParticipantUploadFileBlob,
} from 'utils/participantUploads';
import { getApiErrorStatus } from 'utils/apiErrorCodes';
import { HttpStatusCodes } from 'utils/constants';
import { ensureFilenameMatchesType } from 'utils/formatters';
import { useParticipantUploadConfig } from 'utils/useParticipantUploadConfig';

import { Alert, AlertType } from 'components/Alert';
import AppContainer from 'components/Container';
import Box from 'components/Box';
import Column from 'components/Column';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Text from 'components/Text';
import Button from 'components/Button';

import { fileUploadErrorMessages } from 'containers/AnswerSessionPage/layouts/fileUploadMessages';

import ModerationPanel from './ModerationPanel';

import messages, { deletionReasonMessages } from './messages';

const PDF_CONTENT_TYPE = 'application/pdf';

type PageState =
  | { kind: 'loading' }
  | { kind: 'loaded'; upload: ParticipantUpload }
  | { kind: 'missing' }
  | { kind: 'error' };

const isMissing = (error: unknown) =>
  getApiErrorStatus(error) === HttpStatusCodes.NOT_FOUND;

const ParticipantUploadPage = () => {
  const { formatMessage } = useIntl();
  const { uploadId } = useParams<{ uploadId: string }>();

  const config = useParticipantUploadConfig();

  const loadErrorAlert = (
    <Alert
      type={AlertType.WARNING}
      content={formatMessage(messages.loadError)}
      data-cy="participant-upload-error"
    />
  );
  const loadingRow = (
    <Row align="center" gap={12}>
      <Loader type="inline" size={20} />
      <Text>{formatMessage(messages.loading)}</Text>
    </Row>
  );

  const [state, setState] = useState<PageState>({ kind: 'loading' });
  const [previewBlob, setPreviewBlob] = useState<Nullable<Blob>>(null);
  const [fileFailed, setFileFailed] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setState({ kind: 'loading' });
      setPreviewBlob(null);
      setFileFailed(false);

      try {
        const upload = await fetchParticipantUpload(uploadId);
        if (!cancelled) setState({ kind: 'loaded', upload });
      } catch (error) {
        if (!cancelled)
          setState({ kind: isMissing(error) ? 'missing' : 'error' });
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [uploadId]);

  const upload = state.kind === 'loaded' ? state.upload : null;

  const previewable = !!upload && isUploadClean(upload) && upload.inlinePreview;

  useEffect(() => {
    if (!previewable) return undefined;

    let cancelled = false;

    const loadBytes = async () => {
      try {
        const blob = await fetchParticipantUploadFileBlob(uploadId);
        if (!cancelled) setPreviewBlob(blob);
      } catch {
        if (!cancelled) setFileFailed(true);
      }
    };

    loadBytes();

    return () => {
      cancelled = true;
    };
  }, [previewable, uploadId]);

  const objectUrl = useMemo(() => {
    if (!previewBlob) return null;

    const typed = upload?.contentTypeDetected
      ? new Blob([previewBlob], { type: upload.contentTypeDetected })
      : previewBlob;

    return URL.createObjectURL(typed);
  }, [previewBlob, upload?.contentTypeDetected]);

  useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
    [objectUrl],
  );

  const handleDownload = async () => {
    if (!upload) return;

    setDownloading(true);
    setFileFailed(false);

    try {
      const blob =
        previewBlob ?? (await fetchParticipantUploadFileBlob(uploadId));

      fileDownload(
        blob,
        ensureFilenameMatchesType(
          upload.originalFilename,
          upload.contentTypeDetected,
          config?.acceptedExtensions,
        ),
      );
    } catch {
      setFileFailed(true);
    } finally {
      setDownloading(false);
    }
  };

  const renderPreview = () => {
    if (!previewable) {
      return (
        <Text fontSize={14} lineHeight={1.3}>
          {formatMessage(messages.noPreview)}
        </Text>
      );
    }

    if (!objectUrl) {
      return loadingRow;
    }

    if (upload?.contentTypeDetected === PDF_CONTENT_TYPE) {
      return (
        <Box
          as="iframe"
          src={objectUrl}
          title={upload.originalFilename}
          width="100%"
          height="70vh"
          border="none"
          data-cy="participant-upload-pdf-preview"
        />
      );
    }

    return (
      <Box
        as="img"
        src={objectUrl}
        alt={upload?.originalFilename}
        maxWidth="100%"
        data-cy="participant-upload-image-preview"
      />
    );
  };

  const renderUpload = (loadedUpload: ParticipantUpload) => {
    if (isUploadPending(loadedUpload)) {
      return (
        <Alert
          type={AlertType.INFO}
          content={formatMessage(messages.pending)}
          data-cy="participant-upload-pending"
        />
      );
    }

    if (isUploadRemoved(loadedUpload)) {
      return (
        <Column gap={8} data-cy="participant-upload-removed">
          <Alert
            type={AlertType.WARNING}
            content={`${formatMessage(
              fileUploadErrorMessages[
                ParticipantUploadErrorCode.FILE_REMOVED_BY_SECURITY_SCAN
              ],
            )} ${formatMessage(
              deletionReasonMessages[getUploadDeletionReason(loadedUpload)],
            )}`}
          />
          <Text fontSize={13} lineHeight={1.3} textOpacity={0.6}>
            {loadedUpload.originalFilename}
          </Text>
        </Column>
      );
    }

    if (!isUploadClean(loadedUpload)) {
      return loadErrorAlert;
    }

    return (
      <Column gap={16} data-cy="participant-upload-file">
        <Text fontSize={15} fontWeight="bold">
          {loadedUpload.originalFilename}
        </Text>
        {!!loadedUpload.description && (
          <Text fontSize={14} lineHeight={1.3}>
            {loadedUpload.description}
          </Text>
        )}
        {fileFailed && loadErrorAlert}
        <Row>
          <Button
            width="auto"
            px={24}
            loading={downloading}
            onClick={handleDownload}
            data-cy="participant-upload-download"
          >
            {formatMessage(messages.download)}
          </Button>
        </Row>
        <ModerationPanel upload={loadedUpload} />
        {renderPreview()}
      </Column>
    );
  };

  const renderContent = () => {
    switch (state.kind) {
      case 'loading':
        return loadingRow;

      case 'loaded':
        return renderUpload(state.upload);

      case 'missing':
        return (
          <Alert
            type={AlertType.WARNING}
            content={formatMessage(messages.missing)}
            data-cy="participant-upload-missing"
          />
        );

      default:
        return loadErrorAlert;
    }
  };

  return (
    <AppContainer>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Column gap={24} py={32}>
        <H1>{formatMessage(messages.pageTitle)}</H1>
        {renderContent()}
      </Column>
    </AppContainer>
  );
};

export default ParticipantUploadPage;
