import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fontSizes } from 'theme';
import { margin, style, layout, text } from '../BaseComponentStyles';

const Badge = styled.div.attrs(
  ({ bgWithOpacity, color }) =>
    bgWithOpacity && {
      bg: color,
      bgOpacity: 0.1,
    },
)`
  min-height: 24px;
  min-width: 25px;
  width: max-content;
  padding: 5px 10px;
  font-size: ${fontSizes.small};
  font-weight: 600;
  border-radius: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${style};
  ${layout};
  ${margin};
  ${text};
`;

Badge.propTypes = {
  bgWithOpacity: PropTypes.bool,
};

Badge.defaultProps = {
  color: colors.white,
  bg: colors.jungleGreen,
};

export default Badge;
