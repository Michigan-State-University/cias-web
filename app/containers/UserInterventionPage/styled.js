import { style } from 'components/BaseComponentStyles';
import styled from 'styled-components';
import { boxShadows, colors, elements, themeColors } from 'theme';

import { NoMarginRow } from 'components/ReactGridSystem';

const sharedContainerStyles = `
  padding: 15px;
  height: ${elements.userInterventionTileHeight}px;
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  color: ${themeColors.text};
`;

export const TileContainer = styled.div`
  ${sharedContainerStyles};
  color: ${colors.black};
  justify-content: space-between;
  ${style}
`;

export const StyledFileRow = styled(NoMarginRow)`
  gap: 10px;
`;
