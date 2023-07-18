import React, { ReactNode } from 'react';

import { colors } from 'theme';
import Box from 'components/Box';
import { FileDisplayItem } from 'components/FileDisplayItem';

type Props = {
  extraIcons?: ReactNode;
  name?: string;
  url: string;
} & Record<string, unknown>;

export const FileBox = ({ name, url, extraIcons, ...styles }: Props) => (
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
    <Box>{extraIcons}</Box>
  </Box>
);

export default FileBox;
