import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import CSVFileValidator from 'csv-file-validator';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';

import { navigatorScriptConfig } from 'models/NavigatorSetup';

import Column from 'components/Column';
import H2 from 'components/H2';
import Text from 'components/Text';
import Img from 'components/Img';
import H3 from 'components/H3';
import Box from 'components/Box';

import {
  uploadFilledScriptTemplateRequest,
  makeSelectFilledScriptFile,
  makeSelectNavigatorSetupLoader,
  removeFilledScriptTemplateRequest,
} from 'global/reducers/navigatorSetup';
import navigatorScriptExample from 'assets/images/navigator-script-example.png';

import DownloadScriptTemplatePanel from '../Components/DownloadScriptTemplatePanel';
import FilesPanel from '../Components/FilesPanel';
import messages from '../messages';

type Props = {
  interventionId: string;
  disabled: boolean;
};

export const NavigatorScripts = ({ interventionId, disabled }: Props) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [validationError, setValidationError] = useState(false);

  const filledNavigatorScript = useSelector(makeSelectFilledScriptFile());

  const uploadFilledScriptFile = (file: File) => {
    setValidationError(false);

    CSVFileValidator(file, navigatorScriptConfig)
      .then(({ inValidData }) => {
        if (isEmpty(inValidData)) {
          dispatch(uploadFilledScriptTemplateRequest(interventionId, file));
        } else {
          setValidationError(true);
        }
      })
      .catch(() => {
        toast.error(formatMessage(messages.csvValidationError));
      });
  };

  const removeFilledNavigatorScript = () => {
    dispatch(removeFilledScriptTemplateRequest(interventionId));
  };

  const updatingFilledNavigatorScript = useSelector(
    makeSelectNavigatorSetupLoader('updatingFilledNavigatorScript'),
  );

  const labelTooltipContent = (
    <Box py={8}>
      <H3 mb={10}>
        <FormattedMessage {...messages.navigatorScriptUploadTooltipTilte} />
      </H3>
      <Text mb={24} lineHeight="20px">
        <FormattedMessage
          {...messages.navigatorScriptUploadTooltipDescription}
        />
      </Text>
      <Img src={navigatorScriptExample} height={164} />
    </Box>
  );

  return (
    <Column gap={24}>
      <H2 fontSize={16} lineHeight="24px">
        <FormattedMessage {...messages.scriptsForNavigator} />
      </H2>
      <DownloadScriptTemplatePanel />
      <FilesPanel
        onUpload={uploadFilledScriptFile}
        onRemoveFile={removeFilledNavigatorScript}
        loading={updatingFilledNavigatorScript}
        label={formatMessage(messages.filledTemplate)}
        acceptedFormats="text/csv"
        value={filledNavigatorScript}
        tooltipContent={labelTooltipContent}
        error={
          validationError
            ? formatMessage(messages.failedCsvValidation)
            : undefined
        }
        disabled={disabled}
      />
    </Column>
  );
};

export default NavigatorScripts;
