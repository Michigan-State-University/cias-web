import styled from 'styled-components';
import PropTypes from 'prop-types';
import { paddings, borders } from 'theme';
import {
  layout,
  margin,
  padding,
  style,
  border,
  flex,
} from '../BaseComponentStyles';

const Box = styled.div`
  width: auto;
  height: auto;
  display: block;
  border-radius: ${borders.borderRadius};
  ${props => (props.padded ? `padding: ${paddings.regular}` : '')};
  ${layout};
  ${padding};
  ${margin};
  ${style};
  ${border};
  ${flex};
`;

Box.propTypes = {
  padded: PropTypes.bool,
};

Box.defaultProps = {
  padded: false,
};

export default Box;
