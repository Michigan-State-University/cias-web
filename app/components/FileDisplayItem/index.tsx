import React from 'react';

import { FileInfo } from 'models/Intervention';

import { getFileUrl } from 'utils/getApiFileUrl';
import { getIconForExtension } from 'utils/fileIcons';

import { themeColors, fontSizes } from 'theme';

import EllipsisText from 'components/Text/EllipsisText';
import Img from 'components/Img';
import FileDownload from 'components/FileDownload';
import Row from 'components/Row';
import Box from 'components/Box';

interface FileDisplayProps {
  fileInfo: FileInfo;
}

export const FileDisplayItem = ({ fileInfo }: FileDisplayProps) => (
  <Row width="100%" align="center">
    <Img
      alt="file"
      src={getIconForExtension(fileInfo.name)}
      mr={5}
      width={20}
      height={20}
    />
    <Box flex={1}>
      <FileDownload
        fileName={fileInfo.name}
        url={getFileUrl(fileInfo.url)}
        ml={5}
        cursor="pointer"
      >
        {
          // @ts-ignore
          <EllipsisText
            text={fileInfo.name}
            color={themeColors.primary}
            fontSize={fontSizes.medium}
          />
        }
      </FileDownload>
    </Box>
  </Row>
);
