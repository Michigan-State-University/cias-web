import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  addParticipantFileRequest,
  makeSelectNavigatorSetupLoader,
  makeSelectParticipantFiles,
  removeParticipantFileRequest,
} from 'global/reducers/navigatorSetup';

import FilesPanel from '../Components/FilesPanel';
import messages from '../messages';

export type Props = {
  interventionId: string;
  disabled: boolean;
};

const ParticipantFilesPanel = ({ interventionId, disabled }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const participantFiles = useSelector(makeSelectParticipantFiles());

  const addFileForParticipant = (files: File[]) => {
    dispatch(addParticipantFileRequest(interventionId, files));
  };

  const removeFileForParticipant = (fileId: string) => {
    dispatch(removeParticipantFileRequest(interventionId, fileId));
  };

  const uploadingParticipantFile = useSelector(
    makeSelectNavigatorSetupLoader('uploadingParticipantFile'),
  );
  return (
    <FilesPanel
      title={formatMessage(messages.filesForParticipant)}
      loading={uploadingParticipantFile}
      onUpload={addFileForParticipant}
      onRemoveFile={removeFileForParticipant}
      value={participantFiles ?? []}
      multiple
      disabled={disabled}
    />
  );
};

export default ParticipantFilesPanel;
