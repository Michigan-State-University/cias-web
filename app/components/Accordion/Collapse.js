import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import arrowUp from 'assets/svg/arrow-up.svg';
import arrowDown from 'assets/svg/arrow-down.svg';

import Row from 'components/Row';
import Img from 'components/Img';

import {
  StyledCollapseLabel,
  StyledCollapseContainer,
  StyledCollapseContent,
  Content,
} from './styled';

const CollapseLabel = ({ isOpened, onToggle, label, color }) => {
  const img = isOpened ? arrowUp : arrowDown;

  return (
    <StyledCollapseLabel bg={color} onClick={onToggle}>
      <Row justify="between">
        {label} <Img src={img} />
      </Row>
    </StyledCollapseLabel>
  );
};

CollapseLabel.propTypes = {
  label: PropTypes.string,
  onToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  color: PropTypes.string,
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
    show && (
      <StyledCollapseContent isOpened={transition && isOpened}>
        <Content>{child}</Content>
      </StyledCollapseContent>
    )
  );
};

CollapseContent.propTypes = {
  child: PropTypes.node,
  isOpened: PropTypes.bool,
};

const Collapse = ({ children, isOpened, onToggle, label, color }) => (
  <StyledCollapseContainer>
    <CollapseLabel
      label={label}
      onToggle={onToggle}
      isOpened={isOpened}
      color={color}
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
};

Collapse.defaultProps = {
  color: '#000',
};

export default Collapse;
