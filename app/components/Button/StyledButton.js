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

const invertedStyles = (color) => css`
  background-color: ${colors.white};
  color: ${themeColors[color] ?? color};
  border: 1px solid ${themeColors[color]};
`;

const basicStyles = (outlined, color) => css`
  background-color: ${outlined ? colors.white : themeColors[color] ?? color};
  color: ${colors.white};
  border: 1px solid transparent;
`;

const getHoverStyles = (props) => {
  if (props.hoverable && !props.disabled) {
    if (props.inverted) return basicStyles(props.outlined, props.color);
    return invertedStyles(props.color);
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
  cursor: pointer;
  border: none;
  outline: none;
  ${(props) =>
    props.inverted
      ? invertedStyles(props.color)
      : basicStyles(props.outlined, props.color)};
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
