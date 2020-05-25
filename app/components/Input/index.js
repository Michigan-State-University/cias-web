import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings } from 'theme';
import { margin, layout } from '../BaseComponentStyles';

const Input = styled.input`
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
};

export { Input };
