import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, themeColors, borders, paddings } from 'theme';

export const StyledButton = styled.button`
  width: ${props => props.width};
  height: 48px;
  padding: ${paddings.small};
  background-color: ${props =>
    props.outlined ? colors.white : themeColors[props.color]};
  color: ${colors.white};
  border-radius: ${borders.borderRadius};
  cursor: pointer;
  ${props =>
    props.disabled
      ? `
    cursor : default;
    background-color : grey;
  `
      : ` `}
`;

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;

export const Spinner = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  &:after {
    content: ' ';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${animation} 1.2s linear infinite;
  }
`;

StyledButton.propTypes = {
  color: PropTypes.oneOf(['primary']),
  outlined: PropTypes.bool,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

StyledButton.defaultProps = {
  color: 'primary',
  width: '100%',
  disabled: false,
};
