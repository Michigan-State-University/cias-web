import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors } from 'theme';
import { margin, padding, style, text } from '../BaseComponentStyles';

const StyledCircle = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  ${padding};
  ${margin};
  ${style};
  ${text};
`;

StyledCircle.propTypes = {
  padded: PropTypes.bool,
  size: PropTypes.string,
};

StyledCircle.defaultProps = {
  size: '45px',
  bg: themeColors.primary,
  opacity: 1,
};

export default StyledCircle;
