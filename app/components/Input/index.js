import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings } from 'theme';
import { margin, layout } from '../BaseComponentStyles';

const Input = styled.input.attrs(props => ({ type: props.keyboard }))`
  padding: ${paddings.small};
  border: ${borders.borderWidth} ${borders.borderStyle} ${themeColors.highlight};
  border-radius: ${borders.borderRadius};
  &:focus {
    box-shadow: none;
    outline: none;
    border: ${borders.borderWidth} ${borders.borderStyle} ${themeColors.primary};
  }
  ${margin};
  ${layout};
  ${props =>
    props.transparent
      ? { border: 'none', backgroundColor: 'transparent' }
      : {}};
`;

Input.propTypes = {
  transparent: PropTypes.bool,
  keyboard: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel']),
};

Input.defaultProps = {
  keyboard: 'text',
};

export { Input };
