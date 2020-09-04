import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, themeColors } from 'theme';
import {
  margin,
  border,
  layout,
  padding,
  flex,
} from 'components/BaseComponentStyles';

const invertedStyles = color => css`
  background-color: ${colors.white};
  color: ${themeColors[color]};
  border: 1px solid ${themeColors[color]};
`;

const basicStyles = (outlined, color) => css`
  background-color: ${outlined ? colors.white : themeColors[color]};
  color: ${colors.white};
`;

const getHover = props => {
  if (props.hoverable && !props.disabled) {
    if (props.inverted) return basicStyles(props.outlined, props.color);
    return invertedStyles(props.color);
  }
  return '';
};

export const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;
  border: none;
  outline: none;
  ${props =>
    props.inverted
      ? invertedStyles(props.color)
      : basicStyles(props.outlined, props.color)};
  ${props => props.disabled && `cursor: default; background-color: grey;`};
  transition: background-color 300ms ease, color 300ms ease, border 300ms ease;
  &:hover {
    ${props => getHover(props)};
  }
  ${margin};
  ${border};
  ${layout};
  ${padding};
  ${flex};
`;

StyledButton.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  outlined: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  hoverable: PropTypes.bool,
};

StyledButton.defaultProps = {
  color: 'primary',
  disabled: false,
  hoverable: false,
};
