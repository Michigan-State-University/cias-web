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
  HoverableContainer,
} from './styled';

const CollapseLabel = ({ isOpened, onToggle, label, color, onDelete }) => {
  const img = isOpened ? arrowUp : arrowDown;

  return (
    <HoverableContainer
      justify="between"
      align="center"
      isDeletable={!!onDelete}
    >
      <StyledCollapseLabel bg={color} onClick={onToggle}>
        <Row justify="between">
          {label} <Img src={img} />
        </Row>
      </StyledCollapseLabel>
      <Img src={bin} alt="bin" clickable onClick={onDelete} />
    </HoverableContainer>
  );
};

CollapseLabel.propTypes = {
  label: PropTypes.string,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  color: PropTypes.string,
  onDelete: PropTypes.func,
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
      }, 10);
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

const Collapse = ({ children, isOpened, onToggle, label, color, onDelete }) => (
  <StyledCollapseContainer>
    <CollapseLabel
      label={label}
      onToggle={onToggle}
      isOpened={isOpened}
      color={color}
      onDelete={onDelete}
    />
    <CollapseContent child={children} isOpened={isOpened} />
  </StyledCollapseContainer>
);

Collapse.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  color: PropTypes.string,
  onDelete: PropTypes.func,
};

Collapse.defaultProps = {
  color: '#000',
};

export default Collapse;
