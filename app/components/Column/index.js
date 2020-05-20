import styled from 'styled-components';
import PropTypes from 'prop-types';
import { flex } from '../BaseComponentStyles';

const calculateWidth = span => {
  if (span) return (span / 12) * 10;

  return undefined;
};

const getWidthString = span => {
  if (span) return `width: ${calculateWidth(calculateWidth)}%;`;

  return '';
};

const Column = styled.div`
  display: flex;
  flex-direction: column;

  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%;')};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }
  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
  ${flex};
`;

Column.propTypes = {
  span: PropTypes.number,
};

export default Column;
