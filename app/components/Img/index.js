import styled from 'styled-components';
import PropTypes from 'prop-types';
import { layout, margin, style, positioning } from '../BaseComponentStyles';

const Img = styled.img`
  width: auto;
  height: auto;
  pointer-events: ${({ pointerEvents }) => pointerEvents || ''};
  ${layout};
  ${margin};
  ${style};
  ${positioning};
`;

Img.propTypes = {
  pointerEvents: PropTypes.string,
};

export default Img;
