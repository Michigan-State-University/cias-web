import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { boxShadows } from 'theme';

export const StyledTooltip = styled(ReactTooltip).attrs({
  suppressClassNameWarning: true,
})`
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
  max-width: 380px;
  padding: 15px;
  opacity: 1 !important;
`;
