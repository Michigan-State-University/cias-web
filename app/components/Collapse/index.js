import React from 'react';
import PropTypes from 'prop-types';

import arrowUp from 'assets/svg/arrow-up.svg';
import arrowDown from 'assets/svg/arrow-down.svg';

import { StyledCollapseContainer } from './styled';
import CollapseLabel from './CollapsableLabel';
import CollapseContent from './CollapsableContent';

const Collapse = ({
  children,
  isOpened,
  onToggle,
  label,
  onDelete,
  disabled,
  onShowImg,
  onHideImg,
  height,
  py,
  px,
  color,
  bgOpacity,
  imgWithBackground,
  deleteActive,
}) => (
  <StyledCollapseContainer>
    <CollapseLabel
      label={label}
      onToggle={onToggle}
      isOpened={isOpened}
      onDelete={onDelete}
      disabled={disabled}
      onShowImg={onShowImg}
      onHideImg={onHideImg}
      imgWithBackground={imgWithBackground}
      height={height}
      py={py}
      px={px}
      color={color}
      bgOpacity={bgOpacity}
      deleteActive={deleteActive}
    />
    <CollapseContent child={children} isOpened={isOpened} />
  </StyledCollapseContainer>
);

Collapse.propTypes = {
  children: PropTypes.node,
  label: PropTypes.any,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
  onShowImg: PropTypes.any,
  onHideImg: PropTypes.any,
  imgWithBackground: PropTypes.bool,
  height: PropTypes.string,
  py: PropTypes.number,
  px: PropTypes.number,
  bgOpacity: PropTypes.number,
  color: PropTypes.string,
  deleteActive: PropTypes.bool,
};

Collapse.defaultProps = {
  onShowImg: arrowUp,
  onHideImg: arrowDown,
  imgWithBackground: false,
  color: '#000',
  height: '40px',
  px: 12,
  py: 12,
  deleteActive: true,
};

export default Collapse;
