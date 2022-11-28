/**
 *
 * ConfirmationModal
 *
 */

import React, { ReactNode, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import ModalInfoIcon from 'assets/svg/modalInfo.svg';

import Box from 'components/Box';
import H1 from 'components/H1';
import ErrorAlert from 'components/ErrorAlert';
import Button, { ButtonProps } from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Text from 'components/Text';

import messages from './messages';
import Modal from './Modal';
import { MODAL_TITLE_ID } from './constants';
import { IconType } from './types';
import { ConfirmationModalButtonsContainer } from './styled';

export type Props = {
  visible: boolean;
  description: ReactNode;
  onClose: () => void;
  confirmAction: () => void;
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
  isMobile: boolean;
} & Record<string, unknown>;

const ConfirmationModal = ({
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
  ...modalStyles
}: Props): JSX.Element => {
  const onConfirm = useCallback(() => {
    confirmAction();
    if (closeOnConfirm) onClose();
  }, [confirmAction, closeOnConfirm, onClose]);

  if (!visible) return <></>;

  const getIcon = () => {
    switch (icon) {
      case 'info':
        return ModalInfoIcon;
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      {...modalStyles}
      hideCloseButton={hideCloseButton}
    >
      <Column px={!isMobile && 50} pd={30} {...contentContainerStyles}>
        {icon && (
          <Row justify="center" mb={32}>
            <Icon src={getIcon()} />
          </Row>
        )}
        <H1 textAlign="center" id={MODAL_TITLE_ID}>
          {description}
        </H1>
        {content && (
          <Box padded {...contentStyles}>
            <Text textAlign="center" lineHeight="24px">
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
