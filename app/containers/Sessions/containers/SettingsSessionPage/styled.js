import styled from 'styled-components';

import { colors, boxShadows } from 'theme';
import { Col, Container } from 'components/ReactGridSystem';

export const SessionSettingsContainer = styled(Container)`
  width: 800px;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: ${boxShadows.selago};
`;

export const SessionSettingsColumn = styled(Col)`
  padding-block: 25px;
`;
