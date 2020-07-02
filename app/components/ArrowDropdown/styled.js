import styled from 'styled-components';
import { colors, borders } from 'theme';
import { layout } from '../BaseComponentStyles';

export const ArrowDropdownWrapper = styled.div`
  position: relative;
  ${layout};
`;

export const DropdownContainer = styled.div`
  overflow: hidden;
  cursor: pointer;
  height: 50px;
  padding: 5px 10px;
  border-radius: ${borders.borderRadius};
  background-color: ${colors.linkWater};
  ${layout};
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  margin-top: -12px;
`;
