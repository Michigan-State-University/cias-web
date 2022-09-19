import styled, { css } from 'styled-components';

import { colors } from 'theme';

import Text from 'components/Text';

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

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `}
  ${({ disabled }) =>
    !disabled &&
    css`
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
    css`
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
  white-space: nowrap;
`;

export const StyledText = styled(Text).attrs({
  textOpacity: 0.7,
  fontSize: 11,
  lineHeight: 1,
})`
  ${({ wrap }) =>
    !wrap &&
    css`
      white-space: nowrap;
    `}

  ${({ ellipsis }) =>
    ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
    `}
`;

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ blue }) =>
    blue ? colors.brightNavyBlue : colors.purplePlum};

  @media only screen and (max-width: 350px) {
    width: 4px;
    height: 4px;
  }
`;
