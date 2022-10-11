import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { boxShadows } from 'theme';

export const StyledTooltip = styled(ReactTooltip).attrs({
  suppressClassNameWarning: true,
})`
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
  max-width: 380px;
  padding: 16px !important;
  opacity: 1 !important;
  ${({ visible }) => !visible && 'display: none;'}
  pointer-events: auto !important;

  p {
    font-size: 12px;
    line-height: 20px !important;
  }

  &:hover {
    visibility: visible !important;
    pointer-events: auto !important;
  }

  ${({ tooltipProps }) => tooltipProps}
`;
