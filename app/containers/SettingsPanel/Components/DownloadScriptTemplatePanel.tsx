import React from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import Text from 'components/Text';
import { ImageButton } from 'components/Button';
import FileDownload from 'components/FileDownload';
import FileBox from 'components/FileBox';

import downloadIcon from 'assets/svg/downloadCloud.svg';

import messages from '../messages';

export const DownloadScriptTemplatePanel = () => {
  const fileName = 'script_template.csv';
  const templateUrl = `${process.env.WEB_URL}/files/${fileName}`;

  return (
    <Box>
      <Text mb={12}>
        <FormattedMessage {...messages.downloadTemplate} />
      </Text>
      <FileBox
        name={fileName}
        url={templateUrl}
        extraIcons={[
          <FileDownload url={templateUrl} key={fileName}>
            <ImageButton showHoverEffect src={downloadIcon} />
          </FileDownload>,
        ]}
      />
    </Box>
  );
};

export default DownloadScriptTemplatePanel;
