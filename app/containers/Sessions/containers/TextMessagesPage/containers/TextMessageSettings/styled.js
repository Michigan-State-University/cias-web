import styled from 'styled-components';
import { colors } from 'theme';

const padding = '32px';

export const StyledSmsSettings = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${colors.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: calc(100vh - 70px);
  padding: ${padding};
  overflow: scroll;
`;

export const SectionDivider = styled.div`
  height: 1px;
  width: calc(100% + ${padding} * 2);
  background-color: ${colors.linkWater};
  left: -${padding};
  position: relative;
  margin-block: ${padding};
`;
