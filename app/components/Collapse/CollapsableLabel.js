import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Img from 'components/Img';

import bin from 'assets/svg/bin-red.svg';

import { ImageWrapper, StyledCollapseLabel } from './styled';

const CollapseLabel = ({
  isOpened,
  onToggle,
  label,
  onDelete,
  disabled,
  onShowImg,
  onHideImg,
  imgWithBackground,
  color,
  height,
  py,
  px,
  bgOpacity,
}) => {
  const img = isOpened ? onShowImg : onHideImg;
  const imgElement = <Img src={img} />;
  const displayedImage = !imgWithBackground ? (
    imgElement
  ) : (
    <ImageWrapper>{imgElement}</ImageWrapper>
  );
  return (
    <Row justify="between" align="center">
      <StyledCollapseLabel
        bg={color}
        height={height}
        py={py}
        px={px}
        onClick={onToggle}
        bgOpacity={bgOpacity}
      >
        <Row justify="between">
          {label} {displayedImage}
        </Row>
      </StyledCollapseLabel>
      {!disabled && <Img src={bin} alt="bin" clickable onClick={onDelete} />}
    </Row>
  );
};

CollapseLabel.propTypes = {
  label: PropTypes.any,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
  imgWithBackground: PropTypes.bool,
  onShowImg: PropTypes.any,
  onHideImg: PropTypes.any,
  color: PropTypes.string,
  height: PropTypes.string,
  py: PropTypes.number,
  px: PropTypes.number,
  bgOpacity: PropTypes.number,
};

export default CollapseLabel;
