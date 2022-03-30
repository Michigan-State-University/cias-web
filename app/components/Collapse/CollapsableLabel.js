import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import bin from 'assets/svg/bin-red.svg';
import binGrey from 'assets/svg/bin-grey.svg';

import Row from 'components/Row';
import Box from 'components/Box';
import Icon from 'components/Icon';

import { ImageButton } from 'components/Button/ImageButton';

import { ImageWrapper, StyledCollapseLabel } from './styled';
import messages from './messages';

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
  width,
  py,
  px,
  bgOpacity,
  deleteActive,
  index,
  animatedImg,
  dragHandleProps,
  binNotActiveImage,
  binImage,
  isBinInCollapse,
  binMargin,
  binFillColor,
  binProps,
  arrowColor,
  extraIcons,
}) => {
  const { formatMessage } = useIntl();
  const currentImg = isOpened ? onShowImg : onHideImg;
  const img = animatedImg ? onShowImg : currentImg;
  const imgElement = (
    <Icon
      className={animatedImg ? 'animated-img' : 'img'}
      src={img}
      role="presentation"
      stroke={arrowColor}
      fill={arrowColor}
    />
  );
  const displayedImage = !imgWithBackground ? (
    imgElement
  ) : (
    <ImageWrapper>{imgElement}</ImageWrapper>
  );

  const deleteIcon = (
    <ImageButton
      src={deleteActive ? binImage : binNotActiveImage}
      onClick={deleteActive ? onDelete : undefined}
      title={formatMessage(messages.deleteItem)}
      ml={isBinInCollapse ? 0 : binMargin || 5}
      mr={!isBinInCollapse ? 0 : binMargin || 5}
      data-testid={`bin-${label}`}
      data-cy={`accordion-element-delete-${index}`}
      disabled={disabled}
      fill={binFillColor}
      iconProps={binProps}
    />
  );

  return (
    <Row justify="between" align="center">
      <StyledCollapseLabel
        bg={color}
        height={height}
        width={width}
        py={py}
        px={px}
        onClick={onToggle}
        bgOpacity={bgOpacity}
        isOpened={isOpened}
        {...dragHandleProps}
      >
        <Row
          justify="between"
          align="center"
          fontSize={dragHandleProps?.fontSize}
          lineHeight={dragHandleProps?.lineHeight}
        >
          {label}
          <Box display="flex" align="center">
            {extraIcons && extraIcons}
            {isBinInCollapse && onDelete && deleteIcon}
            {displayedImage}
          </Box>
        </Row>
      </StyledCollapseLabel>
      {!disabled && !isBinInCollapse && onDelete && deleteIcon}
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
  width: PropTypes.string,
  py: PropTypes.number,
  px: PropTypes.number,
  bgOpacity: PropTypes.number,
  deleteActive: PropTypes.bool,
  index: PropTypes.number,
  animatedImg: PropTypes.bool,
  dragHandleProps: PropTypes.object,
  binImage: PropTypes.node,
  binNotActiveImage: PropTypes.node,
  isBinInCollapse: PropTypes.bool,
  binMargin: PropTypes.number,
  binFillColor: PropTypes.string,
  binProps: PropTypes.object,
  arrowColor: PropTypes.string,
  extraIcons: PropTypes.object,
};

CollapseLabel.defaultProps = {
  binImage: bin,
  binNotActiveImage: binGrey,
  isBinInCollapse: false,
};

export default CollapseLabel;
