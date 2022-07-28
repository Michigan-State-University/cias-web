import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import FileUpload from 'components/FileUpload';
import H2 from 'components/H2';
import Column from 'components/Column';

import { ParticipantFile } from 'models/NavigatorSetup';

import FileBox from '../Components/FileBox';
import messages from '../messages';

type Props = {
  addFileForParticipant: (files: File[]) => void;
  fileUploadLoading: boolean;
  files: ParticipantFile[];
};

export const FilesForParticipant = ({
  addFileForParticipant,
  fileUploadLoading,
  files,
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
      {!isEmpty(files) && (
        <Column
          width="calc(100% + 16px)"
          maxHeight={115}
          overflow="auto"
          pr={16}
          mt={16}
          gap={8}
        >
          {files.map(({ url, name, id }) => (
            <FileBox name={name} url={url} key={id} />
          ))}
        </Column>
      )}
    </>
  );
};
