/**
 *
 * ConfirmationModal
 *
 */

import React, { ReactNode, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import ModalInfoIcon from 'assets/svg/modalInfo.svg';
import ModalErrorIcon from 'assets/svg/error-square.svg';

import Box from 'components/Box';
import H1 from 'components/H1';
import ErrorAlert from 'components/ErrorAlert';
import Button, { ButtonProps } from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Text from 'components/Text';

import { fontSizes } from 'theme';

import messages from './messages';
import Modal, { Props as ModalProps } from './Modal';
import { MODAL_DESCRIPTION_ID } from './constants';
import { IconType } from './types';
import { ConfirmationModalButtonsContainer } from './styled';

export type Props<T = boolean> = {
  visible: boolean;
  description: ReactNode;
  onClose: () => void;
  confirmAction: (modalState: Nullable<T | boolean>) => void;
  closeOnConfirm?: boolean;
  loading?: boolean;
  error?: string | object;
  content: ReactNode;
  confirmationButtonColor?: string;
  confirmationButtonText?: string;
  confirmationButtonStyles?: Partial<ButtonProps>;
  cancelButtonText?: string;
  cancelButtonStyles?: Partial<ButtonProps>;
  contentStyles?: Record<string, unknown>;
  contentContainerStyles?: Record<string, unknown>;
  icon?: IconType;
  hideCloseButton?: boolean;
  hideCancelButton?: boolean;
  isMobile?: boolean;
  titleStyles?: object;
  modalState?: Nullable<T | boolean>;
} & Omit<ModalProps, 'children'>;

const ConfirmationModal = <T,>({
  visible = false,
  description = <FormattedMessage {...messages.defaultDescription} />,
  onClose,
  confirmAction,
  closeOnConfirm = true,
  loading = false,
  error,
  content,
  confirmationButtonColor = 'warning',
  confirmationButtonText,
  confirmationButtonStyles,
  cancelButtonText,
  cancelButtonStyles,
  contentStyles,
  contentContainerStyles,
  icon,
  hideCloseButton,
  hideCancelButton,
  isMobile,
  titleStyles,
  modalState,
  ...modalProps
}: Props<T>): JSX.Element => {
  const onConfirm = useCallback(() => {
    confirmAction(modalState);
    if (closeOnConfirm) onClose();
  }, [confirmAction, closeOnConfirm, onClose, modalState]);

  if (!visible) return null;

  const getIcon = () => {
    switch (icon) {
      case 'info':
        return ModalInfoIcon;
      case 'error':
        return ModalErrorIcon;
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      hideCloseButton={hideCloseButton}
      {...modalProps}
    >
      <Column px={!isMobile && 20} pd={30} {...contentContainerStyles}>
        {icon && (
          <Row justify="center" mb={32}>
            <Icon src={getIcon()} />
          </Row>
        )}
        <H1 textAlign="center" id={MODAL_DESCRIPTION_ID} {...titleStyles}>
          {description}
        </H1>
        {content && (
          <Box py={16} {...contentStyles}>
            <Text
              textAlign="center"
              lineHeight="24px"
              fontSize={fontSizes.medium}
            >
              {content}
            </Text>
          </Box>
        )}
        <ConfirmationModalButtonsContainer>
          {/* @ts-ignore */}
          {!hideCancelButton && (
            <Button
              inverted
              hoverable
              onClick={onClose}
              type="button"
              {...cancelButtonStyles}
            >
              {cancelButtonText ?? <FormattedMessage {...messages.cancel} />}
            </Button>
          )}
          {/* @ts-ignore */}
          <Button
            color={confirmationButtonColor}
            hoverable
            disabled={loading}
            loading={loading}
            onClick={onConfirm}
            type="button"
            data-cy="confirmation-box-confirm-button"
            {...confirmationButtonStyles}
          >
            {confirmationButtonText ?? (
              <FormattedMessage {...messages.confirmCanceling} />
            )}
          </Button>
        </ConfirmationModalButtonsContainer>
      </Column>
      {/* @ts-ignore */}
      {error && <ErrorAlert fullWidth errorText={error} />}
    </Modal>
  );
};

export default ConfirmationModal;
