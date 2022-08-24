import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Column from 'components/Column';
import H2 from 'components/H2';

import {
  uploadFilledScriptTemplateRequest,
  makeSelectFilledScriptFile,
  makeSelectNavigatorSetupLoader,
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

  // TODO: remove navigator script file
  // const removeFilledNavigatorScript = () => {
  //   dispatch(removeFilledNavigatorScriptRequest(interventionId));
  // };

  const uploadingFilledNavigatorScript = useSelector(
    makeSelectNavigatorSetupLoader('uploadingFilledNavigatorScript'),
  );

  return (
    <Column gap={24}>
      <H2 fontSize={16} lineHeight="24px">
        <FormattedMessage {...messages.scriptsForNavigator} />
      </H2>
      <DownloadScriptTemplatePanel />
      <FilesPanel
        onUpload={uploadFilledScriptFile}
        removeFile={() => console.log('remove file!')}
        uploadingFile={uploadingFilledNavigatorScript}
        label={formatMessage(messages.filledTemplate)}
        acceptedFormats="text/csv"
        value={filledNavigatorScript}
        multiple={false}
      />
    </Column>
  );
};

export default NavigatorScripts;
