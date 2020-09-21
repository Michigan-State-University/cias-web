import React from 'react';
import PropTypes from 'prop-types';

import { useWindowSize } from 'utils/useWindowSize';

import { calculateWidth } from './containerBreakpoints';
import StyledContainer from './styled';

const AppContainer = ({ children, ...props }) => {
  const { width } = useWindowSize();

  const maxWidth = calculateWidth(width);

  return (
    <StyledContainer $maxWidth={maxWidth} {...props}>
      {children}
    </StyledContainer>
  );
};

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default AppContainer;
