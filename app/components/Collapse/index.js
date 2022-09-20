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
  deleting,
  disabled,
  onShowImg,
  onHideImg,
  width,
  height,
  py,
  px,
  color,
  bgOpacity,
  imgWithBackground,
  deleteActive,
  index,
  animatedImg,
  'data-cy': cypressId,
  dragHandleProps,
  contentProps,
  containerProps,
  isBinInCollapse,
  binImage,
  binMargin,
  disableAnimation,
  binFillColor,
  binProps,
  arrowColor,
  extraIcons,
  showHoverEffect,
}) => (
  <StyledCollapseContainer data-cy={cypressId} {...containerProps}>
    <CollapseLabel
      width={width}
      label={label}
      onToggle={onToggle}
      isOpened={isOpened}
      onDelete={onDelete}
      deleting={deleting}
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
      index={index}
      animatedImg={animatedImg}
      dragHandleProps={dragHandleProps}
      isBinInCollapse={isBinInCollapse}
      binImage={binImage}
      binMargin={binMargin}
      binFillColor={binFillColor}
      binProps={binProps}
      arrowColor={arrowColor}
      extraIcons={extraIcons}
      showHoverEffect={showHoverEffect}
    />
    <CollapseContent
      child={children}
      isOpened={isOpened}
      contentProps={contentProps}
      disableAnimation={disableAnimation}
    />
  </StyledCollapseContainer>
);

Collapse.propTypes = {
  children: PropTypes.node,
  label: PropTypes.any,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  onDelete: PropTypes.func,
  deleting: PropTypes.bool,
  disabled: PropTypes.bool,
  onShowImg: PropTypes.any,
  onHideImg: PropTypes.any,
  imgWithBackground: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  py: PropTypes.number,
  px: PropTypes.number,
  bgOpacity: PropTypes.number,
  color: PropTypes.string,
  deleteActive: PropTypes.bool,
  index: PropTypes.number,
  animatedImg: PropTypes.bool,
  'data-cy': PropTypes.string,
  dragHandleProps: PropTypes.object,
  contentProps: PropTypes.object,
  containerProps: PropTypes.object,
  isBinInCollapse: PropTypes.bool,
  binImage: PropTypes.node,
  binMargin: PropTypes.number,
  disableAnimation: PropTypes.bool,
  binFillColor: PropTypes.string,
  binProps: PropTypes.object,
  arrowColor: PropTypes.string,
  extraIcons: PropTypes.node,
  showHoverEffect: PropTypes.bool,
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
  disableAnimation: false,
};

export default Collapse;
