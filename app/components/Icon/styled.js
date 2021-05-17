import React from 'react';
import ReactSVG from 'react-inlinesvg';
import styled from 'styled-components';

import { margin } from '../BaseComponentStyles';

export const SVG = styled(({ fill, stroke, ...props }) => (
  <ReactSVG {...props} />
))`
  *[fill^='#'] {
    fill: ${({ fill }) => fill};
  }
  *[stroke^='#'] {
    stroke: ${({ stroke }) => stroke};
  }

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'initial')};
  ${margin};
`;
