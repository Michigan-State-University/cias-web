import styled from 'styled-components';
import { colors } from 'theme';

const getBackgroundColor = (disabled, active) => {
  if (disabled) return colors.babyBlue;
  if (active) return colors.zirkon;
  return colors.white;
};

const getColor = (disabled, unreachable) => {
  if (disabled) return colors.bluewood;
  if (unreachable) return colors.ghost;
  return colors.bluewood;
};

const getBorder = (active, disabled) => {
  if (disabled) return 'none';
  if (active) return `2px solid ${colors.surfieGreen}`;
  return `1px solid ${colors.linkWater}`;
};

// This Wrapper component is required for correct rendering of the table in Safari
// Safari doesn't like padding inside cell elements
// More info: https://stackoverflow.com/questions/6960083/safari-5-1-breaks-css-table-cell-spacing
export const Wrapper = styled.div`
  height: 100%;
`;

export const Container = styled.div`
  border-radius: 5px;
  box-sizing: border-box;
  height: 100%;

  background-color: ${({ disabled, active }) =>
    getBackgroundColor(disabled, active)};
  color: ${({ disabled, unreachable }) => getColor(disabled, unreachable)};
  border: ${({ active, disabled }) => getBorder(active, disabled)};
  padding: ${({ active }) => (active ? '11' : '12')}px;

  ${({ disabled }) => disabled && 'opacity: 0.4;'}
  ${({ disabled }) =>
    !disabled &&
    `
      cursor: pointer;
      &:hover {
        filter: drop-shadow(0 0 80px ${colors.selago});
      }
    `}

  ${({ mobile }) =>
    mobile &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      padding: unset;
      width: 100%;
      height: auto;

      &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }

  `}
`;

export const DayNo = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
`;
