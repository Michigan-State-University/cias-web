import React from 'react';
import ReactSVG from 'react-inlinesvg';
import styled from 'styled-components';

import { margin, layout, text, svg } from 'components/BaseComponentStyles';

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
  cursor: ${getCursorStyle};
  ${svg}
  ${margin};
  ${layout}
`;

export const SvgWrapper = styled.div`
  position: relative;
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  ${layout}
  ${text}
`;
