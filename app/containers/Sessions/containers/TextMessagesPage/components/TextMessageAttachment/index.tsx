import React from 'react';
import { useIntl } from 'react-intl';
import { AxiosError } from 'axios';

import { AppFile } from 'models/File';

import { MMS_ACCEPTED_FILE_FORMATS } from 'global/constants';

import FileUpload from 'components/FileUpload';

import messages from '../NoFormulaMessages/messages';

export type Props = {
  attachment: Nullable<AppFile>;
  loading: boolean;
  onAdd: (file: File) => void;
  onDelete: () => void;
  editingPossible: boolean;
  error: Nullable<AxiosError>;
};

export const TextMessageAttachment: React.FC<Props> = ({
  attachment,
  loading,
  onAdd,
  onDelete,
  editingPossible,
  error,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <FileUpload
        acceptedFormats={MMS_ACCEPTED_FILE_FORMATS}
        label={formatMessage(messages.attachmentLabel)}
        loading={loading}
        value={attachment}
        onUpload={onAdd}
        onRemoveFile={onDelete}
        error={error?.response?.data?.message}
        disabled={!editingPossible}
      />
    </>
  );
};
