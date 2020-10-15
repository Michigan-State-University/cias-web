import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCollapse from 'react-collapse';

import { StyledCollapseContent, Content } from './styled';

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

export default CollapseContent;
