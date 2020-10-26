import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  flex,
  layout,
  margin,
  style,
  padding,
  positioning,
} from '../BaseComponentStyles';

const maxNumberOfColumns = 12;

/**
 * Calculate width of a column in percents
 * @param  {int} columnSpan column span value over maximum of 12 columns
 * @param  {int} return width of column in percents
 */
export const calculateWidth = columnSpan => {
  if (columnSpan) return (columnSpan / maxNumberOfColumns) * 100;

  return undefined;
};

export const getWidthString = columnSpan => {
  if (columnSpan) return `width: ${calculateWidth(columnSpan)}%;`;

  return '';
};

const Column = styled.div`
  display: flex;
  flex-direction: column;

  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%;')};
  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }
  @media only screen and (min-width: 960px) {
    ${({ md }) => md && getWidthString(md)};
  }
  @media only screen and (min-width: 1170px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
  @media only screen and (min-width: 1360px) {
    ${({ xlg }) => xlg && getWidthString(xlg)};
  }

  ${flex};
  ${layout};
  ${margin};
  ${style};
  ${padding};
  ${positioning};
`;

Column.propTypes = {
  span: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default Column;
