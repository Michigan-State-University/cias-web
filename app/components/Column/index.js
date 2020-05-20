import styled from 'styled-components';
import PropTypes from 'prop-types';
import { flex } from '../BaseComponentStyles';

const calculateWidth = span => {
  if (span) return (span / 12) * 100;

  return undefined;
};

const getWidthString = span => {
  if (span) return `width: ${calculateWidth(span)}%;`;

  return '';
};

const Column = styled.div`
  display: flex;
  flex-direction: column;

  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%;')};

  @media only screen and (min-width: 768px) {
    ${props => props.sm && getWidthString(props.sm)};
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
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default Column;
