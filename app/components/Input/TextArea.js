import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings, colors } from 'theme';

import { margin, layout } from '../BaseComponentStyles';
import { getAriaLabelProps } from './utils';

const TextArea = styled.textarea.attrs((props) => ({
  ...getAriaLabelProps(props),
}))`
  resize: none;
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
  ${({ transparent }) =>
    transparent && {
      backgroundColor: 'transparent',
      border: `${borders.borderWidth} ${borders.borderStyle} transparent`,
    }};
  &:disabled {
    color: ${colors.casper};
  }
`;

TextArea.propTypes = {
  transparent: PropTypes.bool,
};

export { TextArea };

export default TextArea;
