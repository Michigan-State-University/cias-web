import React from 'react';

import AppContainer, { Props } from './AppContainer';

export const FillAppContainer = ({ children, ...props }: Props) => (
  <AppContainer
    display="flex"
    direction="column"
    align="center"
    height="100%"
    py={54}
    $maxWidth="100%"
    {...props}
  >
    {children}
  </AppContainer>
);
