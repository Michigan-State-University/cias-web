import React from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import Text from 'components/Text';
import FileBox from 'components/FileBox';

import messages from '../messages';

export const DownloadScriptTemplatePanel = () => {
  const fileName = 'script_template.csv';
  const templateUrl = `${process.env.WEB_URL}/files/${fileName}`;

  return (
    <Box>
      <Text mb={12}>
        <FormattedMessage {...messages.downloadTemplate} />
      </Text>
      <FileBox name={fileName} url={templateUrl} showDownloadIcon />
    </Box>
  );
};

export default DownloadScriptTemplatePanel;
