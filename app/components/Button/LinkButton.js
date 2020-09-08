import React from 'react';
import PropTypes from 'prop-types';

import { StyledLink, LinkContainer } from './styled';

const LinkButton = ({ to, children, tabIndex, ...restProps }) => (
  <LinkContainer {...restProps}>
    <StyledLink to={to} tabIndex={tabIndex}>
      {children}
    </StyledLink>
  </LinkContainer>
);

LinkButton.propTypes = {
  to: PropTypes.string,
  tabIndex: PropTypes.number,
  children: PropTypes.node,
};

export default LinkButton;
