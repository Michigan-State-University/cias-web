import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings, colors } from 'theme';
import { margin, layout, padding, text, style } from '../BaseComponentStyles';

const getBorderColor = (hasError, currentColor) => {
  if (hasError) return themeColors.warning;
  return currentColor;
};

const getAutoComplete = ({ autoComplete, placeholder }) => {
  switch (autoComplete) {
    case 'off':
      return {
        autoComplete: 'off',
        /*
         * Safari logic => 'name' field must contain a 'search' word, because it completely ignores 'autocomplete' value.
         * Welcome to Apple logic => "Think different".
         * source: https://bytes.grubhub.com/disabling-safari-autofill-for-a-single-line-address-input-b83137b5b1c7
         * */
        name: `notASearchField-${placeholder}`,
      };
    case 'on':
      return { autoComplete: 'on' };
    default:
      return {};
  }
};

const Input = styled.input.attrs(props => ({
  type: props.keyboard,
  ...getAutoComplete(props),
}))`
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
  ${({ transparent, hasError }) =>
    transparent && {
      backgroundColor: 'transparent',
      ...(!hasError && { borderColor: 'transparent' }),
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
