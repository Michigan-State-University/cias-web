import styled from 'styled-components';
import { colors, borders } from 'theme';
import { layout } from '../BaseComponentStyles';

export const ArrowDropdownWrapper = styled.div`
  position: relative;
  ${layout};
`;

export const DropdownContainer = styled.div.attrs((props) => ({
  onClick: props.disabled ? null : props.onClick,
}))`
  overflow: hidden;
  height: 50px;
  padding: 5px 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  border-radius: ${borders.borderRadius};
  background-color: ${({ bg }) => bg || colors.linkWater};
  ${layout};
  ${({ disabled }) =>
    disabled ? 'cursor: not-allowed; opacity: 0.5' : 'cursor: pointer'};
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  margin-top: -12px;
`;
