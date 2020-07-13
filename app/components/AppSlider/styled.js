import styled from 'styled-components';
import { colors, hexToRgb, themeColors } from 'theme';

export const ValueSliderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;

  background-color: rgba(${hexToRgb(themeColors.secondary)}, 0.5);
  border: none;
  color: ${colors.white};
  border-radius: 3px;
`;

export const ValueSliderWrapperStyled = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
