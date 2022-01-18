// @ts-ignore
import styled from 'styled-components';

import { colors, elements } from 'theme';

const containerSpacing = 32;

export const TlfbContainer = styled.div`
  margin: ${containerSpacing}px;
  width: calc(100% - ${elements.screenSettingsWidth + 2 * containerSpacing}px);
  display: flex;
  flex-direction: column;
`;

export const TlfbHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const TlfbSettingsContainer = styled.div`
  border: 1px dashed ${colors.mystic};
  padding: ${containerSpacing}px;
  background: ${colors.white};
  flex: 1;
`;
