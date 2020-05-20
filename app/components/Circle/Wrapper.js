import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, themeColors } from 'theme';
import { margin, padding, style } from '../BaseComponentStyles';

const Wrapper = styled.div`
  border-radius: 50%;
  background-color: ${props => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  ${padding};
  ${margin};
  ${style};
`;

Wrapper.propTypes = {
  padded: PropTypes.bool,
  size: PropTypes.string,
};

Wrapper.defaultProps = {
  size: '45px',
  bg: themeColors.primary,
  opacity: 1,
  color: colors.white,
};

export default Wrapper;
