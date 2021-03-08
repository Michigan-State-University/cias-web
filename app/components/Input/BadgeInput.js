import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, borders, fontSizes } from 'theme';
import { style } from 'components/BaseComponentStyles';

import { StyledInput } from './StyledInput';

const BadgeInput = styled(StyledInput).attrs(({ color }) => ({
  bg: color,
  bgOpacity: 0.1,
}))`
  padding: 5px 10px;
  font-size: ${fontSizes.small};
  font-weight: 600;
  border-radius: 4px;
  &:focus {
    box-shadow: none;
    outline: none;
    border: ${borders.borderWidth} ${borders.borderStyle} transparent;
  }
  ${style};
`;

BadgeInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  keyboard: PropTypes.string,
  validator: PropTypes.func,
  textAlign: PropTypes.string,
  onBlur: PropTypes.func,
};

BadgeInput.defaultProps = {
  keyboard: 'text',
  color: colors.jungleGreen,
  autoSize: true,
};

export { BadgeInput };

export default BadgeInput;
