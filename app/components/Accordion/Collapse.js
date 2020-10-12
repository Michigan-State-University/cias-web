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
} from './styled';

const CollapseLabel = ({
  isOpened,
  onToggle,
  label,
  color,
  onDelete,
  disabled,
}) => {
  const img = isOpened ? arrowUp : arrowDown;

  return (
    <Row justify="between" align="center">
      <StyledCollapseLabel bg={color} onClick={onToggle}>
        <Row justify="between">
          {label} <Img src={img} />
        </Row>
      </StyledCollapseLabel>
      {!disabled && <Img src={bin} alt="bin" clickable onClick={onDelete} />}
    </Row>
  );
};

CollapseLabel.propTypes = {
  label: PropTypes.string,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  color: PropTypes.string,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
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
}) => (
  <StyledCollapseContainer>
    <CollapseLabel
      label={label}
      onToggle={onToggle}
      isOpened={isOpened}
      color={color}
      onDelete={onDelete}
      disabled={disabled}
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
  disabled: PropTypes.bool,
};

Collapse.defaultProps = {
  color: '#000',
};

export default Collapse;
