import styled from 'styled-components';
import { colors } from 'theme';

const padding = '32px';

export const StyledSmsSettings = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${colors.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: ${padding};
  min-height: 100%;
`;

export const SectionDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.linkWater};
  position: relative;
  margin: ${padding} 0;
`;
