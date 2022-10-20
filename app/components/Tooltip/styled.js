import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { boxShadows } from 'theme';

export const StyledTooltip = styled(ReactTooltip).attrs({
  suppressClassNameWarning: true,
})`
  box-shadow: ${boxShadows.selago};
  max-width: 380px;
  padding: 15px;
  opacity: 1 !important;
  ${({ visible }) => !visible && 'display: none;'}
  pointer-events: auto !important;

  &.__react_component_tooltip {
    border-radius: 6px;

    div {
      font-size: 12px;
      line-height: 20px !important;
    }
  }

  &:hover {
    visibility: visible !important;
    pointer-events: auto !important;
  }
`;
