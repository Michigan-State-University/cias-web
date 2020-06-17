import styled from 'styled-components';
import PropTypes from 'prop-types';
import { borders, boxShadows } from 'theme';
import {
  layout,
  margin,
  padding,
  style,
  border,
  flex,
} from '../BaseComponentStyles';

const Dropzone = styled.div`
  border-radius: ${borders.borderRadius};
  ${({ withShadow }) => withShadow && `box-shadow: ${boxShadows[1]}`};
  ${border};
  ${margin};
  ${style};
  ${padding};
  ${layout};
  ${flex};
`;

Dropzone.propTypes = {
  withShadow: PropTypes.bool,
};

Dropzone.defaultProps = {
  withShadow: false,
};

export default Dropzone;
