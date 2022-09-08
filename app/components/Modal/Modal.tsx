/**
 *
 * Modal
 *
 */

import React, { useRef, useEffect, ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import useBodyLockScroll, { useElementLockScroll } from 'utils/useLockScroll';
import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';

import { MODAL_PORTAL_ID } from 'containers/App/constants';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';
import H1 from 'components/H1';
import ActionIcon from 'components/ActionIcon';
import Portal from 'components/Portal';

import messages from './messages';
import { StyledBox } from './styled';
import { MODAL_DESCRIPTION_ID, MODAL_TITLE_ID } from './constants';

export type Props = {
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  visible: boolean;
  titleProps?: Record<string, unknown>;
  hideCloseButton?: boolean;
  portalId?: string;
  disableClose?: boolean;
  zIndex?: number;
  disableScrollLock?: boolean;
} & Record<string, unknown>;

const Modal = ({
  title,
  onClose,
  children,
  visible,
  titleProps,
  hideCloseButton,
  portalId,
  disableClose,
  zIndex,
  disableScrollLock,
  ...stylesProps
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const handleClose = () => {
    if (onClose && !disableClose) onClose();
  };

  const modalContent = useRef<HTMLElement>(null);
  const modalOverlay = useRef<HTMLElement>(null);

  useBodyLockScroll(visible && !disableScrollLock);
  useElementLockScroll(visible && !disableScrollLock, portalId);

  useKeyPress(KeyCodes.ESC, handleClose);

  const handleClick = (event: MouseEvent) => {
    const { target } = event;
    const { current: overlayCurrent } = modalOverlay;
    const { current: contentCurrent } = modalContent;
    if (
      overlayCurrent &&
      contentCurrent &&
      overlayCurrent.contains(target as Node) &&
      !contentCurrent.contains(target as Node)
    )
      handleClose();
  };

  useEffect(() => {
    window.addEventListener('click', handleClick, false);
    return () => {
      window.removeEventListener('click', handleClick, false);
    };
  }, []);

  if (!visible) return <></>;

  return (
    <Portal id={portalId || MODAL_PORTAL_ID}>
      <Box
        ref={modalOverlay}
        height="100%"
        width="100%"
        top="0px"
        left="0px"
        position={portalId ? 'absolute' : 'fixed'}
        bg={colors.black}
        bgOpacity={0.4}
        zIndex={zIndex ?? 999}
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

              {!hideCloseButton && (
                <Col xs={2} align="end">
                  {/** @ts-ignore */}
                  <ActionIcon
                    mr={0}
                    data-cy="modal-close-button"
                    onClick={onClose}
                    data-testid="close-modal-button"
                    ariaText={formatMessage(messages.closeButtonLabel)}
                  />
                </Col>
              )}
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
      </Box>
    </Portal>
  );
};

export default Modal;
