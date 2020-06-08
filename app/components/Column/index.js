import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mediaQuery } from 'theme';
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

  ${mediaQuery.tablet`
    ${({ sm }) => sm && getWidthString(sm)};
  `}

  ${mediaQuery.desktopXs`
    ${({ md }) => md && getWidthString(md)};
  `}

  ${mediaQuery.desktop`
    ${({ lg }) => lg && getWidthString(lg)};
  `}

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
