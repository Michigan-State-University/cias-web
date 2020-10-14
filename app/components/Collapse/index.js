import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse as ReactCollapse } from 'react-collapse';

import arrowUp from 'assets/svg/arrow-up.svg';
import arrowDown from 'assets/svg/arrow-down.svg';
import bin from 'assets/svg/bin-red.svg';

import Row from 'components/Row';
import Img from 'components/Img';

import {
  StyledCollapseLabel,
  StyledCollapseContainer,
  StyledCollapseContent,
  Content,
  ImageWrapper,
} from './styled';

const CollapseLabel = ({
  isOpened,
  onToggle,
  label,
  color,
  onDelete,
  disabled,
  onShowImg,
  onHideImg,
  height,
  py,
  px,
  imgWithBackground,
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
        py={py}
        px={px}
        height={height}
        bg={color}
        onClick={onToggle}
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
  color: PropTypes.string,
  height: PropTypes.string,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
  imgWithBackground: PropTypes.bool,
  onShowImg: PropTypes.any,
  onHideImg: PropTypes.any,
  py: PropTypes.number,
  px: PropTypes.number,
};

const CollapseContent = ({ child, isOpened }) => {
  const [show, setShow] = useState(isOpened);
  const [transition, setTransition] = useState(false);

  useLayoutEffect(() => {
    if (!isOpened) {
      setTransition(false);
      setTimeout(() => {
        setShow(false);
      }, 500);
    } else {
      setShow(true);
      setTimeout(() => {
        setTransition(true);
      }, 20);
    }
  }, [isOpened]);

  return (
    <StyledCollapseContent>
      <ReactCollapse isOpened={transition && isOpened}>
        {show && <Content>{child}</Content>}
      </ReactCollapse>
    </StyledCollapseContent>
  );
};

CollapseContent.propTypes = {
  child: PropTypes.node,
  isOpened: PropTypes.bool,
};

const Collapse = ({
  children,
  isOpened,
  onToggle,
  label,
  color,
  onDelete,
  disabled,
  onShowImg,
  onHideImg,
  height,
  py,
  px,
  imgWithBackground,
  initialOpened,
}) => {
  const [internalOpened, setInternalOpened] = useState(initialOpened);
  const internalOnToggle = () => setInternalOpened(!internalOpened);
  return (
    <StyledCollapseContainer>
      <CollapseLabel
        label={label}
        onToggle={onToggle || internalOnToggle}
        isOpened={isOpened || internalOpened}
        color={color}
        onDelete={onDelete}
        disabled={disabled}
        onShowImg={onShowImg}
        onHideImg={onHideImg}
        height={height}
        py={py}
        px={px}
        imgWithBackground={imgWithBackground}
      />
      <CollapseContent child={children} isOpened={isOpened || internalOpened} />
    </StyledCollapseContainer>
  );
};

Collapse.propTypes = {
  children: PropTypes.node,
  label: PropTypes.any,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  color: PropTypes.string,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
  onShowImg: PropTypes.any,
  onHideImg: PropTypes.any,
  height: PropTypes.string,
  py: PropTypes.number,
  px: PropTypes.number,
  imgWithBackground: PropTypes.bool,
  initialOpened: PropTypes.bool,
};

Collapse.defaultProps = {
  color: '#000',
  onShowImg: arrowUp,
  onHideImg: arrowDown,
  height: '40px',
  px: 12,
  py: 12,
  imgWithBackground: false,
  initialOpened: false,
};

export default Collapse;
