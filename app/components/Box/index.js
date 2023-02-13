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
  positioning,
  text,
} from '../BaseComponentStyles';

const Box = styled.div.attrs(({ onClick, disabled }) => ({
  onClick: disabled ? null : onClick,
  defaultColor: 'unset',
}))`
  ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight}` : '')};
  width: auto;
  height: auto;
  display: block;
  border-radius: ${borders.borderRadius};
  ${(props) => (props.padded ? `padding: ${paddings.regular}` : '')};
  ${(props) =>
    props.disableScrollbar
      ? 'scrollbar-width: none; -ms-overflow-style: none; &::-webkit-scrollbar { width: 0; }'
      : ''}
  ${layout};
  ${padding};
  ${margin};
  ${style};
  ${border};
  ${flex};
  ${positioning};
  ${text};
`;

Box.propTypes = {
  padded: PropTypes.bool,
  disableScrollbar: PropTypes.bool,
};

Box.defaultProps = {
  padded: false,
  disableScrollbar: false,
};

export default Box;
