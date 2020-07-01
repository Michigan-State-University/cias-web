import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings } from 'theme';
import { margin, layout, padding, text } from '../BaseComponentStyles';

const Input = styled.input.attrs(props => ({ type: props.keyboard }))`
  padding: ${paddings.small};
  border: ${borders.borderWidth} ${borders.borderStyle}
    ${props => (props.hasError ? 'red' : themeColors.highlight)};
  border-radius: ${borders.borderRadius};
  &:focus {
    box-shadow: none;
    outline: none;
    border: ${borders.borderWidth} ${borders.borderStyle} ${themeColors.primary};
  }
  ${margin};
  ${layout};
  ${padding};
  ${text};
  ${({ transparent }) =>
    transparent && {
      backgroundColor: 'transparent',
      border: `${borders.borderWidth} ${borders.borderStyle} transparent`,
    }};
  ${props => (props.textAlign ? { textAlign: props.textAlign } : {})};
`;

Input.propTypes = {
  transparent: PropTypes.bool,
  keyboard: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel']),
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
};

Input.defaultProps = {
  keyboard: 'text',
};

export { Input };
