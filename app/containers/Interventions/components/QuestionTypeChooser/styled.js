import React from 'react';
import StyledCircle from 'components/Circle/StyledCircle';
import styled from 'styled-components';
import Box from 'components/Box';

const DotCircle = props => <StyledCircle {...props} size="10px" />;

const FadedBox = styled(Box)`
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 90%
    );
    width: 100%;
    height: 2.5em;
    border-radius: inherit;
  }
`;

export { DotCircle, FadedBox };
