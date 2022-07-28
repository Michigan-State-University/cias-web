import React, { ReactElement } from 'react';

import Box from 'components/Box';
import { colors } from 'theme';
import { FileDisplayItem } from 'components/FileDisplayItem';

type Props = {
  extraIcons?: ReactElement[];
  name: string;
  url: string;
};

export const FileBox = ({ name, url, extraIcons }: Props) => (
  <Box
    display="flex"
    justify="between"
    bg={colors.lightBlue}
    borderRadius="5px"
    padding="13px 12px"
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
