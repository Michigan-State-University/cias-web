import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, borders, paddings } from 'theme';

const Button = styled.button`
  width: ${props => props.width};
  height: 48px;
  padding: ${paddings.small};
  background-color: ${props =>
    props.outlined ? colors.white : colors[props.color]};
  color: ${colors.white};
  border-radius: ${borders.borderRadius};
  cursor: pointer;
`;

Button.propTypes = {
  color: PropTypes.oneOf(['primary']),
  outlined: PropTypes.bool,
  width: PropTypes.string,
};

Button.defaultProps = {
  color: 'primary',
  width: '100%',
};

export { Button };
