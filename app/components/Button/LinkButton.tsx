import React, { ReactNode } from 'react';

import { StyledLink, LinkContainer } from './styled';

type Props = {
  to?: string;
  children?: ReactNode;
  tabIndex?: number;
} & Record<string, unknown>;

const LinkButton = ({ to, children, tabIndex, ...restProps }: Props) => (
  <LinkContainer {...restProps}>
    <StyledLink to={to} tabIndex={tabIndex}>
      {children}
    </StyledLink>
  </LinkContainer>
);

export default LinkButton;
