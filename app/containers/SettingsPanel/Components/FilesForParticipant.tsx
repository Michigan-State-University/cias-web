import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import FileUpload from 'components/FileUpload';
import H2 from 'components/H2';
import Column from 'components/Column';
import { ImageButton } from 'components/Button';
import Loader from 'components/Loader';

import binNoBg from 'assets/svg/bin-no-bg.svg';
import { ParticipantFile } from 'models/NavigatorSetup';

import FileBox from './FileBox';
import messages from '../messages';

type Props = {
  removeFileForParticipant: (fileId: string) => void;
  addFileForParticipant: (files: File[]) => void;
  fileUploadLoading: boolean;
  files: ParticipantFile[];
};

export const FilesForParticipant = ({
  addFileForParticipant,
  removeFileForParticipant,
  fileUploadLoading,
  files,
}: Props) => {
  const { formatMessage } = useIntl();

  const deleteIcon = (index: string, deleting?: boolean) =>
    deleting ? (
      <Loader type="inline" size={18} />
    ) : (
      <ImageButton
        src={binNoBg}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          removeFileForParticipant(index);
        }}
        title={formatMessage(messages.deleteFile)}
        disabled={false}
        iconProps={{
          width: 16,
          height: 16,
        }}
        showHoverEffect
      />
    );

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
          {files.map(({ url, name, id, deleting }) => (
            <FileBox
              name={name}
              url={url}
              key={id}
              extraIcons={[deleteIcon(id, deleting)]}
              maxHeight={44}
              minHeight={44}
            />
          ))}
        </Column>
      )}
    </>
  );
};

export default FilesForParticipant;
