import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCollapse from 'react-collapse';

import { StyledCollapseContent, Content } from './styled';

const CLOSE_TIMEOUT = 500;
export const TRANSITION_TIMEOUT = 20;

const CollapseContent = ({ child, isOpened, contentProps }) => {
  const [show, setShow] = useState(isOpened);
  const [transition, setTransition] = useState(false);

  useLayoutEffect(() => {
    let timeoutHandle;

    if (!isOpened) {
      setTransition(false);
      timeoutHandle = setTimeout(() => {
        setShow(false);
      }, CLOSE_TIMEOUT);
    } else {
      setShow(true);
      timeoutHandle = setTimeout(() => {
        setTransition(true);
      }, TRANSITION_TIMEOUT);
    }

    return () => clearTimeout(timeoutHandle);
  }, [isOpened]);

  return (
    <StyledCollapseContent {...contentProps}>
      <ReactCollapse isOpened={transition && isOpened}>
        {show && <Content>{child}</Content>}
      </ReactCollapse>
    </StyledCollapseContent>
  );
};

CollapseContent.propTypes = {
  child: PropTypes.node,
  isOpened: PropTypes.bool,
  contentProps: PropTypes.object,
};

export default CollapseContent;
