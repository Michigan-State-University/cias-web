import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Column from 'components/Column';
import H2 from 'components/H2';

import {
  uploadFilledScriptTemplateRequest,
  makeSelectFilledScriptFile,
  makeSelectNavigatorSetupLoader,
  removeFilledScriptTemplateRequest,
} from 'global/reducers/navigatorSetup';

import DownloadScriptTemplatePanel from '../Components/DownloadScriptTemplatePanel';
import FilesPanel from '../Components/FilesPanel';
import messages from '../messages';

type Props = {
  interventionId: string;
};

export const NavigatorScripts = ({ interventionId }: Props) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const filledNavigatorScript = useSelector(makeSelectFilledScriptFile());

  const uploadFilledScriptFile = (file: File) => {
    dispatch(uploadFilledScriptTemplateRequest(interventionId, file));
  };

  const removeFilledNavigatorScript = () => {
    dispatch(removeFilledScriptTemplateRequest(interventionId));
  };

  const updatingFilledNavigatorScript = useSelector(
    makeSelectNavigatorSetupLoader('updatingFilledNavigatorScript'),
  );

  return (
    <Column gap={24}>
      <H2 fontSize={16} lineHeight="24px">
        <FormattedMessage {...messages.scriptsForNavigator} />
      </H2>
      <DownloadScriptTemplatePanel />
      <FilesPanel
        onUpload={uploadFilledScriptFile}
        removeFile={removeFilledNavigatorScript}
        uploadingFile={updatingFilledNavigatorScript}
        label={formatMessage(messages.filledTemplate)}
        acceptedFormats="text/csv"
        value={filledNavigatorScript}
        multiple={false}
      />
    </Column>
  );
};

export default NavigatorScripts;
