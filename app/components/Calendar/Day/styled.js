import Text from 'components/Text';
import styled, { css } from 'styled-components';
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

const getBorder = (active, disabled, hasEvents, compact) => {
  if (disabled) return 'none';
  if (active) return `2px solid ${colors.surfieGreen}`;
  if (hasEvents && compact) return `1px solid ${colors.azureBlue}`;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ disabled, active }) =>
    getBackgroundColor(disabled, active)};
  color: ${({ disabled, unreachable }) => getColor(disabled, unreachable)};
  border: ${({ active, disabled, hasEvents, compact }) =>
    getBorder(active, disabled, hasEvents, compact)};
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

  ${({ $notClickable }) =>
    $notClickable &&
    css`
      cursor: not-allowed;
    `}

  ${({ compact }) =>
    compact &&
    `
      flex-direction: row;
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

export const StyledText = styled(Text).attrs({
  textOpacity: 0.7,
  fontSize: 11,
  lineHeight: '11px',
})`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
