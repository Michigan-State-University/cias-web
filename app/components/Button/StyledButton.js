import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, themeColors } from 'theme';
import Color from 'color';

import {
  margin,
  border,
  layout,
  padding,
  flex,
} from 'components/BaseComponentStyles';

const invertedStyles = (color, textColor) => css`
  background-color: ${textColor ?? colors.white};
  color: ${themeColors[color] ?? color};
  border: 1px solid ${themeColors[color]};
`;

const basicStyles = (outlined, color, textColor) => css`
  background-color: ${outlined ? colors.white : themeColors[color] ?? color};
  color: ${textColor ?? colors.white};
  border: 1px solid transparent;
`;

const lightStyles = (outlined, color, textColor) => css`
  background-color: ${outlined
    ? colors.white
    : Color(themeColors.primary).alpha(0.1).hexa() ?? color};
  color: ${textColor ?? themeColors.primary};
  border: 1px solid transparent;
`;

const getStyles = (inverted, light, outlined, color, textColor) => {
  if (light) return lightStyles(outlined, color, textColor);
  if (inverted) return invertedStyles(color, textColor);
  return basicStyles(outlined, color, textColor);
};

const getHoverStyles = (props) => {
  if (props.hoverable && !props.disabled) {
    if (props.inverted)
      return basicStyles(
        props.outlined,
        props.hoverColor ?? props.color,
        props.hoverTextColor ?? props.textColor,
      );
    return invertedStyles(
      props.hoverTextColor ?? props.color,
      props.hoverColor ?? props.textColor,
    );
  }
  return '';
};

const getDisabledStyles = (inverted) => {
  if (inverted)
    return `cursor: default; color: ${colors.grey}; border-color: ${colors.grey}`;

  return `cursor: default; background-color: ${colors.grey};`;
};

export const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: ${(props) => props.radius};
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed' : 'pointer'} !important;
  border: none;
  outline: none;
  ${({ disabled }) => !disabled && 'font-weight: bold;'}
  ${({ inverted, light, outlined, color, textColor }) =>
    getStyles(inverted, light, outlined, color, textColor)}
  ${(props) => props.disabled && getDisabledStyles(props.inverted)};
  transition: background-color 300ms ease, color 300ms ease, border 300ms ease;

  &:hover {
    ${(props) => getHoverStyles(props)};
  }

  ${margin};
  ${border};
  ${layout};
  ${padding};
  ${flex};
`;

StyledButton.propTypes = {
  color: PropTypes.string,
  outlined: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  hoverable: PropTypes.bool,
  radius: PropTypes.string,
};

StyledButton.defaultProps = {
  color: 'primary',
  disabled: false,
  hoverable: false,
  radius: '100px',
};
