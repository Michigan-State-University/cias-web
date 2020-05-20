import styled from 'styled-components';
import PropTypes from 'prop-types';
import { paddings } from 'theme';
import { layout, margin, padding } from '../BaseComponentStyles';

const Box = styled.div`
  width: auto;
  height: auto;
  ${props => (props.padded ? `padding: ${paddings.regular}` : '')};
  ${layout};
  ${padding};
  ${margin};
`;

Box.propTypes = {
  padded: PropTypes.bool,
};

Box.defaultProps = {
  padded: false,
};

export default Box;
