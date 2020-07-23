import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings, colors } from 'theme';
import { margin, layout, padding, text } from '../BaseComponentStyles';

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
  ${props => (props.textAlign ? { textAlign: props.textAlign } : {})};
  ${margin};
  ${layout};
  ${padding};
  ${text};
`;

Input.propTypes = {
  transparent: PropTypes.bool,
  keyboard: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel']),
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
};

Input.defaultProps = {
  keyboard: 'text',
};

export { Input };
