import styled from 'styled-components';
import PropTypes from 'prop-types';
import { paddings } from 'theme';
import { layout, margin, padding, style, border } from '../BaseComponentStyles';

const Box = styled.div`
  width: auto;
  height: auto;
  display: block;
  ${props => (props.padded ? `padding: ${paddings.regular}` : '')};
  ${layout};
  ${padding};
  ${margin};
  ${style};
  ${border};
`;

Box.propTypes = {
  padded: PropTypes.bool,
};

Box.defaultProps = {
  padded: false,
};

export default Box;
