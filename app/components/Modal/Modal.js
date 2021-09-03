/**
 *
 * Modal
 *
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import useLockBodyScroll from 'utils/useLockBodyScroll';
import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';
import H1 from 'components/H1';
import ActionIcon from 'components/ActionIcon';

import messages from './messages';
import { StyledBox } from './styled';
import { MODAL_DESCRIPTION_ID, MODAL_TITLE_ID } from './constants';

const Modal = ({
  title,
  onClose,
  children,
  visible,
  titleProps,
  ...stylesProps
}) => {
  const { formatMessage } = useIntl();

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
            aria-labelledby={MODAL_TITLE_ID}
            aria-describedby={MODAL_DESCRIPTION_ID}
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
            <FullWidthContainer>
              <Row align="center" justify="between">
                <Col xs={10}>
                  {title && (
                    <H1 id={MODAL_TITLE_ID} {...titleProps}>
                      {title}
                    </H1>
                  )}
                </Col>

                <Col xs={2} align="end">
                  <ActionIcon
                    mr={0}
                    data-cy="modal-close-button"
                    onClick={onClose}
                    data-testid="close-modal-button"
                    ariaText={formatMessage(messages.closeButtonLabel)}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Box
                    width="100%"
                    borderRadius="0px"
                    mt={10}
                    id={MODAL_DESCRIPTION_ID}
                  >
                    {children}
                  </Box>
                </Col>
              </Row>
            </FullWidthContainer>
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
