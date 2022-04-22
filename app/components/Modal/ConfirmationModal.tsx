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
import Button from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Text from 'components/Text';

import messages from './messages';
import Modal from './Modal';
import { MODAL_TITLE_ID } from './constants';
import { IconType } from './types';

export type Props = {
  visible: boolean;
  description: ReactNode;
  onClose: () => void;
  confirmAction: () => void;
  loading: boolean;
  error?: string | object;
  content: ReactNode;
  confirmationButtonColor?: string;
  confirmationButtonText?: string;
  cancelButtonText?: string;
  cancelButtonStyles?: Record<string, unknown>;
  contentStyles?: Record<string, unknown>;
  contentContainerStyles?: Record<string, unknown>;
  icon?: IconType;
  hideCloseButton: boolean;
  isMobile: boolean;
} & Record<string, unknown>;

const ConfirmationModal = ({
  visible = false,
  description = <FormattedMessage {...messages.defaultDescription} />,
  onClose,
  confirmAction,
  loading = false,
  error,
  content,
  confirmationButtonColor = 'warning',
  confirmationButtonText,
  cancelButtonText,
  cancelButtonStyles,
  contentStyles,
  contentContainerStyles,
  icon,
  hideCloseButton,
  isMobile,
  ...modalStyles
}: Props): JSX.Element => {
  const onConfirm = useCallback(() => {
    confirmAction();
    onClose();
  }, [confirmAction, onClose]);

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
        <Row mt={25}>
          {/* @ts-ignore */}
          <Button
            inverted
            hoverable
            onClick={onClose}
            type="button"
            mr={25}
            {...cancelButtonStyles}
          >
            {cancelButtonText ?? <FormattedMessage {...messages.cancel} />}
          </Button>
          {/* @ts-ignore */}
          <Button
            color={confirmationButtonColor}
            hoverable
            disabled={loading}
            loading={loading}
            onClick={onConfirm}
            type="button"
            data-cy="confirmation-box-confirm-button"
          >
            {confirmationButtonText ?? (
              <FormattedMessage {...messages.confirmCanceling} />
            )}
          </Button>
        </Row>
      </Column>
      {/* @ts-ignore */}
      {error && <ErrorAlert fullWidth errorText={error} />}
    </Modal>
  );
};

export default ConfirmationModal;
