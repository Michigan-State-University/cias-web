import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, themeColors, borders, paddings } from 'theme';

const StyledButton = styled.button`
  width: ${props => props.width};
  height: 48px;
  padding: ${paddings.small};
  background-color: ${props =>
    props.outlined ? colors.white : themeColors[props.color]};
  color: ${colors.white};
  border-radius: ${borders.borderRadius};
  cursor: pointer;
`;

StyledButton.propTypes = {
  color: PropTypes.oneOf(['primary']),
  outlined: PropTypes.bool,
  width: PropTypes.string,
};

StyledButton.defaultProps = {
  color: 'primary',
  width: '100%',
};

export default StyledButton;
