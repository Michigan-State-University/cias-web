/**
 *
 * ShareBoxModalParent
 *
 */
import React, { ReactNode } from 'react';

import Box from 'components/Box';

type Props = {
  children: ReactNode;
};
const ShareBoxModalParent = ({ children }: Props): JSX.Element => (
  <Box height="fit-content" width={500} mt={20}>
    {children}
  </Box>
);

export default ShareBoxModalParent;
