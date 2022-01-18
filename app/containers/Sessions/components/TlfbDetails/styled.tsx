// @ts-ignore
import styled from 'styled-components';

import { colors, elements } from 'theme';

const containerSpacing = 32;

// @ts-ignore
export const TlfbDetailsContainer = styled.div`
  border: 1px dashed ${colors.mystic};
  margin: ${containerSpacing}px;
  padding: ${containerSpacing}px;
  width: calc(100% - ${elements.screenSettingsWidth + 2 * containerSpacing}px);
  background: ${colors.white};
`;
