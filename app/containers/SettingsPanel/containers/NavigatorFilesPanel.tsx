import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  addNavigatorFileRequest,
  makeSelectNavigatorFiles,
  makeSelectNavigatorSetupLoader,
  removeNavigatorFileRequest,
} from 'global/reducers/navigatorSetup';

import FilesPanel from '../Components/FilesPanel';
import messages from '../messages';

export type Props = {
  interventionId: string;
};

const NavigatorFilesPanel = ({ interventionId }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const navigatorFiles = useSelector(makeSelectNavigatorFiles());

  const addFileForNavigator = (files: File[]) => {
    dispatch(addNavigatorFileRequest(interventionId, files));
  };

  const removeFileForNavigator = (fileId: string) => {
    dispatch(removeNavigatorFileRequest(interventionId, fileId));
  };

  const uploadingNavigatorFile = useSelector(
    makeSelectNavigatorSetupLoader('uploadingNavigatorFile'),
  );
  return (
    <FilesPanel
      title={formatMessage(messages.filesForNavigator)}
      uploadingFile={uploadingNavigatorFile}
      onUpload={addFileForNavigator}
      removeFile={removeFileForNavigator}
      value={navigatorFiles ?? []}
      multiple
    />
  );
};

export default NavigatorFilesPanel;