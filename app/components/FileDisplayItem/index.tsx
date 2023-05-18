import React from 'react';
import { useIntl } from 'react-intl';

import { AppFile } from 'models/File';

import { getFileUrl } from 'utils/getApiFileUrl';
import { getIconForExtension } from 'utils/fileIcons';

import { themeColors, fontSizes } from 'theme';

import EllipsisText from 'components/Text/EllipsisText';
import Img from 'components/Img';
import FileDownload from 'components/FileDownload';
import Row from 'components/Row';
import Box from 'components/Box';

import messages from './messages';

interface FileDisplayProps {
  fileInfo: Partial<Pick<AppFile, 'name'>> & Pick<AppFile, 'url'>;
  textProps?: object;
}

export const FileDisplayItem = ({
  fileInfo: { name, url },
  textProps,
}: FileDisplayProps) => {
  const { formatMessage } = useIntl();

  return (
    <Row width="100%" align="center">
      <Img
        alt="file"
        src={getIconForExtension(name)}
        mr={5}
        width={20}
        height={20}
      />
      <Box flex={1}>
        <FileDownload
          fileName={name}
          url={getFileUrl(url)}
          ml={5}
          cursor="pointer"
        >
          {
            // @ts-ignore
            <EllipsisText
              text={name ?? formatMessage(messages.file)}
              color={themeColors.primary}
              fontSize={fontSizes.medium}
              {...textProps}
            />
          }
        </FileDownload>
      </Box>
    </Row>
  );
};
