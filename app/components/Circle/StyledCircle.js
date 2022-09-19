import styled from 'styled-components';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';

import { border, margin, padding, style, text } from '../BaseComponentStyles';

const StyledCircle = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  ${({ doNotShrink, size }) => doNotShrink && `min-width: ${size}`};
  height: ${(props) => props.size};
  ${({ doNotShrink, size }) => doNotShrink && `min-height: ${size}`};
  ${padding};
  ${margin};
  ${style};
  ${text};
  ${border};
`;

StyledCircle.propTypes = {
  padded: PropTypes.bool,
  size: PropTypes.string,
  doNotShrink: PropTypes.bool,
};

StyledCircle.defaultProps = {
  size: '45px',
  bg: themeColors.primary,
  opacity: 1,
};

export default StyledCircle;
