import styled from 'styled-components';

import { boxShadows, colors, paddings, themeColors } from 'theme';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';

export const HoverableBox = styled(Box)`
  cursor: pointer;
  transition: 0.2s;
  border: 1px transparent solid;
  box-shadow: ${boxShadows.black};

  ${({ $isSelected }) =>
    $isSelected && {
      borderWidth: '2px',
      borderColor: themeColors.secondary,
    }}
  &:hover {
    border-color: ${themeColors.secondary};
  }
`;

export const ChartButtonBox = styled(HoverableBox)`
  padding: 7px;
  background-color: ${colors.white};
  width: 130px;
  height: 130px;
`;

export const Input = styled(StyledInput)`
  border: none;
  background-color: ${themeColors.highlight};
  outline: none;
  max-width: none;

  &:focus {
    border: none;
  }

  padding-left: ${paddings.small};
  padding-right: ${paddings.small};
`;

export const FormulaGroupPanel = styled.div`
  width: 100%;
  margin-top: 36px;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid ${colors.selago};
  background-color: ${colors.zirkon};
`;

export const BarChartTooltip = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border: 1px solid rgba(127, 127, 127, 0.8);
  font-size: 1.2em;
  font-weight: bold;
`;
