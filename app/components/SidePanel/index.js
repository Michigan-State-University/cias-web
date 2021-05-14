/**
 *
 * SidePanel
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { StyledSidePanel, HandleWrapper, SidePanelWrapper } from './styled';

const SidePanel = ({ Handle, onOpen, onClose, isOpen, style, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const open = () => {
    if (!isVisible) {
      setIsVisible(true);

      if (onOpen) onOpen();
    }
  };
  const close = () => {
    if (isVisible) {
      setIsVisible(false);

      if (onClose) onClose();
    }
  };
  const toggle = () => {
    if (isVisible) close();
    else open();
  };

  useEffect(() => {
    if (isOpen) open();
    else close();
  }, [isOpen]);

  const { width } = style;

  return (
    <>
      <SidePanelWrapper $isVisible={isVisible} width={width}>
        {Handle && <HandleWrapper onClick={toggle}>{Handle}</HandleWrapper>}
        <StyledSidePanel width={width}>{isOpen && children}</StyledSidePanel>
      </SidePanelWrapper>
    </>
  );
};

SidePanel.propTypes = {
  Handle: PropTypes.node,
  style: PropTypes.shape({
    width: PropTypes.number,
  }),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

SidePanel.defaultProps = {
  isOpen: false,
  style: { width: 300 },
};

export default memo(SidePanel);
