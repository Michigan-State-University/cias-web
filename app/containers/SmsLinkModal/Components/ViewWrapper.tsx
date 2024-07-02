/* eslint-disable arrow-body-style */
import { memo } from 'react';

import Column from 'components/Column';
import Box from 'components/Box';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ViewWrapper = ({ children }: Props) => {
  return (
    <Column minWidth="220px" maxWidth={500} overflow="scroll">
      <Box pl={30} pr={30}>
        {children}
      </Box>
    </Column>
  );
};

export default memo(ViewWrapper);
