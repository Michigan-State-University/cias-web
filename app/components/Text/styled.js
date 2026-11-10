import styled from 'styled-components';
import Truncate from 'react-truncate';

import Box from 'components/Box';

import { text, style, layout } from '../BaseComponentStyles';

// Style props are consumed by the css helpers below and must not reach the DOM
// (react-truncate spreads whatever it doesn't know onto the rendered <span>).
// Only data-* / aria-* attributes are forwarded.
const forwardableAttributes = (styleProps) =>
  Object.fromEntries(
    Object.entries(styleProps).filter(
      ([key]) => key.startsWith('data-') || key.startsWith('aria-'),
    ),
  );

export const StyledEllipsisText = styled(Truncate).attrs(
  ({ $styleProps = {} }) => forwardableAttributes($styleProps),
)`
  position: relative;
  width: 100%;
  ${({ $styleProps = {} }) => text($styleProps)};
  ${({ $styleProps = {} }) => style($styleProps)};
  ${({ $styleProps = {} }) => layout($styleProps)};
`;

export const TruncatedMarkup = styled(Box)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
