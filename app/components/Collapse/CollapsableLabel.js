import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Img from 'components/Img';

import bin from 'assets/svg/bin-red.svg';
import binGrey from 'assets/svg/bin-grey.svg';

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
  deleteActive,
  index,
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
      {!disabled && (
        <Img
          data-testid={`bin-${label}`}
          data-cy={`accordion-element-delete-${index}`}
          src={deleteActive ? bin : binGrey}
          alt="bin"
          clickable={deleteActive}
          onClick={deleteActive && onDelete}
        />
      )}
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
  deleteActive: PropTypes.bool,
  index: PropTypes.number,
};

export default CollapseLabel;
