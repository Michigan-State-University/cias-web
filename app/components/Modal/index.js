/**
 *
 * Modal
 *
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { colors } from 'theme';

import useLockBodyScroll from 'utils/useLockBodyScroll';
import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';

import Box from 'components/Box';
import Column from 'components/Column';
import H1 from 'components/H1';
import Row from 'components/Row';
import ActionIcon from 'components/ActionIcon';

import { StyledBox } from './styled';

const Modal = ({
  title,
  onClose,
  children,
  visible,
  titleProps,
  ...stylesProps
}) => {
  const modalContent = useRef(null);
  const modalOverlay = useRef(null);
  useLockBodyScroll(visible);
  useKeyPress(KeyCodes.ESC, onClose);

  let portalRoot = document.getElementById('modal-portal');
  if (!portalRoot) {
    const app = document.getElementById('app');
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-portal');
    app.appendChild(portalRoot);
  }

  const handleClick = (event) => {
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
          <StyledBox
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            ref={modalContent}
            minWidth={400}
            minHeight={200}
            maxHeight="90%"
            maxWidth={700}
            bg={colors.white}
            px={20}
            py={20}
            overflow="auto"
            {...stylesProps}
          >
            <Column border="1px solid red">
              <Row align="center" justify="between" {...titleProps}>
                <H1 id="modal-title">{title}</H1>
                <ActionIcon
                  data-cy="modal-close-button"
                  position="relative"
                  top="-8px"
                  left="40px"
                  onClick={onClose}
                  data-testid="close-modal-button"
                />
              </Row>
            </Column>
            <Box borderRadius="0px" mt={10} id="modal-description">
              {children}
            </Box>
          </StyledBox>
        </Box>,
        document.getElementById('modal-portal'),
      )
    : null;
};

Modal.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func,
  titleProps: PropTypes.object,
};

export default Modal;
