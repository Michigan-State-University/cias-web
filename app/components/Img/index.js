import styled from 'styled-components';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { layout, margin, style, positioning } from '../BaseComponentStyles';

const Img = styled.img.attrs((props) => ({
  onClick: props.disabled ? null : props.onClick,
}))`
  width: auto;
  height: auto;
  pointer-events: ${({ pointerEvents }) => pointerEvents || ''};
  ${layout};
  ${margin};
  ${style};
  ${positioning};
  ${({ flipHorizontally }) => flipHorizontally && 'transform: scaleX(-1);'}
`;

Img.propTypes = {
  pointerEvents: PropTypes.string,
};

export default memo(Img);
