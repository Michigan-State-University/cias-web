import React from 'react';
import ReactSVG from 'react-inlinesvg';
import styled from 'styled-components';

import { margin, layout } from '../BaseComponentStyles';

const getCursorStyle = ({ $clickable, disabled, onClick }) => {
  if (disabled) return 'not-allowed';

  if (onClick || $clickable) return 'pointer';

  return '';
};

export const SVG = styled(({ fill, stroke, ...props }) => (
  <ReactSVG {...props} />
)).attrs(({ onClick, disabled }) => ({
  onClick: disabled ? undefined : onClick,
}))`
  *[fill^='#'] {
    fill: ${({ fill }) => fill};
  }
  *[stroke^='#'] {
    stroke: ${({ stroke }) => stroke};
  }

  cursor: ${getCursorStyle};
  ${margin};
  ${layout}
`;

export const SvgWrapper = styled.div`
  position: relative;
`;
