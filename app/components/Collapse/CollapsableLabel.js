import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import bin from 'assets/svg/bin-red.svg';
import binGrey from 'assets/svg/bin-grey.svg';

import Row from 'components/Row';
import Img from 'components/Img';
import { ImageButton } from 'components/Button';

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
  py,
  px,
  bgOpacity,
  deleteActive,
  index,
  animatedImg,
  dragHandleProps,
}) => {
  const { formatMessage } = useIntl();
  const currentImg = isOpened ? onShowImg : onHideImg;
  const img = animatedImg ? onShowImg : currentImg;
  const imgElement = (
    <Img
      className={animatedImg ? 'animated-img' : 'img'}
      src={img}
      role="presentation"
    />
  );
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
        isOpened={isOpened}
        {...dragHandleProps}
      >
        <Row justify="between">
          {label} {displayedImage}
        </Row>
      </StyledCollapseLabel>
      {!disabled && (
        <ImageButton
          src={deleteActive ? bin : binGrey}
          onClick={deleteActive ? onDelete : undefined}
          title={formatMessage(messages.deleteItem)}
          ml={5}
          data-testid={`bin-${label}`}
          data-cy={`accordion-element-delete-${index}`}
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
  animatedImg: PropTypes.bool,
  dragHandleProps: PropTypes.object,
};

export default CollapseLabel;
