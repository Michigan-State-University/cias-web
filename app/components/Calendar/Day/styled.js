import styled from 'styled-components';
import { colors } from 'theme';
import { maxQueries } from 'components/Container/mediaQuery';

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

export const Container = styled.div`
  height: 104px;
  border-radius: 5px;
  box-sizing: border-box;

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

  @media ${maxQueries.md} {
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
  }
`;

export const DayNo = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
`;
