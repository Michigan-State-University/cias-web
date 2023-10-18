import React, { ReactNode } from 'react';

import downloadIcon from 'assets/svg/downloadCloud.svg';

import { colors } from 'theme';

import Box from 'components/Box';
import { FileDisplayItem } from 'components/FileDisplayItem';
import FileDownload from 'components/FileDownload';

import { ImageButton } from 'components/Button';

type Props = {
  extraIcons?: ReactNode;
  name?: string;
  url: string;
  showDownloadIcon?: boolean;
} & Record<string, unknown>;

export const FileBox = ({
  name,
  url,
  extraIcons,
  showDownloadIcon,
  ...styles
}: Props) => (
  <Box
    display="flex"
    justify="between"
    bg={colors.lightBlue}
    borderRadius="5px"
    padding="9px 13px"
    {...styles}
  >
    <FileDisplayItem
      fileInfo={{ name, url }}
      textProps={{
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: '13px',
        hoverDecoration: 'underline',
      }}
    />
    <Box>
      {extraIcons}
      {showDownloadIcon && (
        <FileDownload url={url} fileName={name}>
          <ImageButton title={name} showHoverEffect src={downloadIcon} />
        </FileDownload>
      )}
    </Box>
  </Box>
);

export default FileBox;
