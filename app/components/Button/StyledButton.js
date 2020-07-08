import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, themeColors, borders } from 'theme';

export const StyledButton = styled.button`
  width: ${props => props.width};
  height: 48px;
  background-color: ${props =>
    props.outlined ? colors.white : themeColors[props.color]};
  color: ${colors.white};
  border-radius: ${borders.borderRadius};
  cursor: pointer;
  ${props =>
    props.disabled
      ? `
    cursor : default;
    background-color : grey;
  `
      : ` `}
`;

StyledButton.propTypes = {
  color: PropTypes.oneOf(['primary']),
  outlined: PropTypes.bool,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

StyledButton.defaultProps = {
  color: 'primary',
  width: '100%',
  disabled: false,
};
