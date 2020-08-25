/**
 *
 * Modal
 *
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { colors } from 'theme';

import Box from 'components/Box';
import Column from 'components/Column';
import H1 from 'components/H1';
import Row from 'components/Row';
import Img from 'components/Img';
import cross from 'assets/svg/cross.svg';
import useLockBodyScroll from 'utils/useLockBodyScroll';
import useKeyPress from 'utils/useKeyPress';

const ESC_KEY_CODE = 27;

const Modal = ({ title, onClose, children, visible }) => {
  const modalContent = useRef(null);
  const modalOverlay = useRef(null);
  useLockBodyScroll(visible);
  useKeyPress(ESC_KEY_CODE, onClose);

  let portalRoot = document.getElementById('modal-portal');
  if (!portalRoot) {
    const app = document.getElementById('app');
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-portal');
    app.appendChild(portalRoot);
  }

  const handleClick = event => {
    const { target } = event;
    const { current: overlayCurrent } = modalOverlay;
    const { current: contentCurrent } = modalContent;
    if (
      overlayCurrent &&
      contentCurrent &&
      overlayCurrent.contains(target) &&
      !contentCurrent.contains(target)
    )
      onClose();
  };

  useEffect(() => {
    window.addEventListener('click', handleClick, false);
    return () => {
      window.removeEventListener('click', handleClick, false);
    };
  }, []);

  return visible
    ? ReactDOM.createPortal(
        <Box
          ref={modalOverlay}
          height="100%"
          width="100%"
          top="0px"
          left="0px"
          position="fixed"
          bg={colors.black}
          bgOpacity={0.4}
          zIndex={999}
          borderRadius="0px"
          display="flex"
          align="center"
          justify="center"
        >
          <Box
            ref={modalContent}
            minWidth={400}
            minHeight={300}
            maxHeight="90%"
            maxWidth={700}
            bg={colors.white}
            px={20}
            py={20}
            overflow="auto"
          >
            <Column border="1px solid red">
              <Row align="center" justify="between">
                <H1>{title}</H1>
                <Img src={cross} alt="close" onClick={onClose} clickable />
              </Row>
            </Column>
            <Box borderRadius="0px" mt={40}>
              {children}
            </Box>
          </Box>
        </Box>,
        document.getElementById('modal-portal'),
      )
    : null;
};

Modal.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default Modal;
