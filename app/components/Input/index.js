import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings, colors } from 'theme';
import { margin, layout, padding, text, style } from '../BaseComponentStyles';

const getBorderColor = (hasError, currentColor) => {
  if (hasError) return colors.flamingo;
  return currentColor;
};

const Input = styled.input.attrs(props => ({ type: props.keyboard }))`
  padding: ${paddings.small};
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${({ hasError }) =>
    getBorderColor(hasError, themeColors.highlight)};
  border-radius: ${borders.borderRadius};
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: ${({ hasError }) =>
      getBorderColor(hasError, themeColors.primary)};
  }
  ${({ transparent }) =>
    transparent && {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }};
  ${margin};
  ${layout};
  ${padding};
  ${text};
  ${style};
  &:disabled {
    color: ${colors.casper};
  }
`;

Input.propTypes = {
  transparent: PropTypes.bool,
  keyboard: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel']),
};

Input.defaultProps = {
  keyboard: 'text',
};

export { Input };

export default Input;
