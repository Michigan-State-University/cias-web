import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import FileUpload from 'components/FileUpload';
import H2 from 'components/H2';
import messages from '../messages';

type Props = {
  addFileForParticipant: (files: File[]) => void;
  fileUploadLoading: boolean;
};

export const FilesForParticipant = ({
  addFileForParticipant,
  fileUploadLoading,
}: Props) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <H2 fontSize={16} lineHeight="24px" mb={24}>
        <FormattedMessage {...messages.filesForParticipant} />
      </H2>
      <FileUpload
        onAddFile={addFileForParticipant}
        loading={fileUploadLoading}
        label={formatMessage(messages.importFile)}
      />
    </>
  );
};

export default FilesForParticipant;
