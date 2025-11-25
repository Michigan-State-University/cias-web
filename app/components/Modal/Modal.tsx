/**
 *
 * Modal
 *
 */

import React, { useRef, ReactElement, ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import useBodyLockScroll, { useElementLockScroll } from 'utils/useLockScroll';
import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';

import { MODAL_PORTAL_ID } from 'containers/App/constants';

import {
  Col as GridCol,
  FullWidthContainer,
  Row as GridRow,
} from 'components/ReactGridSystem';
import Box from 'components/Box';
import H1 from 'components/H1';
import ActionIcon from 'components/ActionIcon';
import Portal from 'components/Portal';
import Text from 'components/Text';
import Row from 'components/Row';

import messages from './messages';
import { StyledBox } from './styled';
import { MODAL_DESCRIPTION_ID, MODAL_TITLE_ID } from './constants';

export type Props = {
  title?: string;
  titleExtraContent?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
  visible: boolean;
  titleProps?: Record<string, unknown>;
  hideCloseButton?: boolean;
  portalId?: string;
  disableClose?: boolean;
  zIndex?: number;
  disableScrollLock?: boolean;
  description?: ReactNode;
  titleIcon?: ReactElement;
  titleIconWidth?: number;
  stretchContent?: boolean;
  contentContainerProps?: Record<string, unknown>;
} & Record<string, unknown>;

const Modal = ({
  title,
  titleExtraContent,
  onClose,
  children,
  visible,
  titleProps,
  hideCloseButton,
  portalId,
  disableClose,
  zIndex,
  disableScrollLock,
  description,
  titleIcon,
  titleIconWidth,
  stretchContent,
  contentContainerProps,
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

  const {
    fullWidthContainerProps,
    contentRowProps,
    contentProps,
    contentColumnProps,
  } = useMemo(() => {
    if (stretchContent) {
      return {
        fullWidthContainerProps: {
          height: '100%',
          display: 'flex',
          direction: 'column',
        },
        contentRowProps: {
          flex: '1 !important',
          minHeight: '0px',
        },
        contentColumnProps: {
          maxHeight: '100%',
        },
        contentProps: {
          flex: '1',
          minHeight: '0px',
          display: 'flex',
          direction: 'column',
        },
      };
    }
    return {};
  }, [stretchContent]);

  if (!visible) return null;

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
          pt={20}
          pb={20}
          overflow="auto"
          {...stylesProps}
        >
          <FullWidthContainer {...fullWidthContainerProps}>
            <GridRow align={titleIcon ? 'start' : 'center'} justify="between">
              {titleIcon && (
                <GridCol xs={2} width={titleIconWidth}>
                  {titleIcon}
                </GridCol>
              )}

              <GridCol xs={titleIcon ? 8 : 10}>
                <Row align="center" gap={8}>
                  {title && (
                    <H1 id={MODAL_TITLE_ID} {...titleProps}>
                      {title}
                    </H1>
                  )}
                  {titleExtraContent}
                </Row>
              </GridCol>

              {!hideCloseButton && (
                <GridCol xs={2} align="end">
                  {/** @ts-ignore */}
                  <ActionIcon
                    mr={0}
                    data-cy="modal-close-button"
                    onClick={() => onClose && onClose()}
                    data-testid="close-modal-button"
                    ariaText={formatMessage(messages.closeButtonLabel)}
                  />
                </GridCol>
              )}
            </GridRow>
            {description && (
              <GridRow align="start" justify="center">
                {titleIcon && <GridCol xs={2} width={titleIconWidth} />}
                <GridCol xs={titleIcon ? 10 : 12}>
                  <Text mt={6} lineHeight="18px" fontSize="13px">
                    {description}
                  </Text>
                </GridCol>
              </GridRow>
            )}

            <GridRow {...contentRowProps}>
              <GridCol xs={12} {...contentColumnProps}>
                <Box
                  width="100%"
                  borderRadius="0px"
                  mt={10}
                  id={MODAL_DESCRIPTION_ID}
                  {...contentProps}
                  {...contentContainerProps}
                >
                  {children}
                </Box>
              </GridCol>
            </GridRow>
          </FullWidthContainer>
        </StyledBox>
      </Box>
    </Portal>
  );
};

export default Modal;
