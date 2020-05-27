import styled from 'styled-components';
import PropTypes from 'prop-types';
import { breakpoints } from 'theme';
import { flex, layout } from '../BaseComponentStyles';

const maxNumberOfColumns = 12;

/**
 * Calculate width of a column in percents
 * @param  {int} columnSpan column span value over maximum of 12 columns
 * @param  {int} return width of column in percents
 */
const calculateWidth = columnSpan => {
  if (columnSpan) return (columnSpan / maxNumberOfColumns) * 100;

  return undefined;
};

const getWidthString = columnSpan => {
  if (columnSpan) return `width: ${calculateWidth(columnSpan)}%;`;

  return '';
};

const Column = styled.div`
  display: flex;
  flex-direction: column;

  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%;')};

  @media only screen and (min-width: ${breakpoints.sm}) {
    ${props => props.sm && getWidthString(props.sm)};
  }
  @media only screen and (min-width: ${breakpoints.md}) {
    ${({ md }) => md && getWidthString(md)};
  }
  @media only screen and (min-width: ${breakpoints.lg}) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
  ${flex};
  ${layout};
`;

Column.propTypes = {
  span: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default Column;
