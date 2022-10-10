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
import Button from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Text from 'components/Text';

import { fontSizes } from 'theme';

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
  confirmButtonStyles?: Record<string, unknown>;
  cancelButtonText?: string;
  cancelButtonStyles?: Record<string, unknown>;
  contentStyles?: Record<string, unknown>;
  contentContainerStyles?: Record<string, unknown>;
  icon?: IconType;
  hideCloseButton: boolean;
  isMobile: boolean;
  titleStyles: object;
} & Record<string, unknown>;

const ConfirmationModal = ({
  visible = false,
  description = <FormattedMessage {...messages.defaultDescription} />,
  onClose,
  confirmAction,
  loading = false,
  error,
  content,
  confirmationButtonColor = 'primary',
  confirmationButtonText,
  confirmButtonStyles,
  cancelButtonText,
  cancelButtonStyles,
  contentStyles,
  contentContainerStyles,
  icon = 'error',
  hideCloseButton,
  isMobile,
  titleStyles,
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
      {...modalStyles}
      hideCloseButton={hideCloseButton}
      maxWidth={500}
      pt={hideCloseButton ? 40 : 20}
      pb={40}
    >
      <Column px={!isMobile && 20} pd={30} mt={-10} {...contentContainerStyles}>
        {icon && (
          <Row justify="center" mb={32}>
            <Icon src={getIcon()} />
          </Row>
        )}
        <H1 textAlign="center" id={MODAL_TITLE_ID} {...titleStyles}>
          {description}
        </H1>
        {content && (
          <Box padded {...contentStyles}>
            <Text
              textAlign="center"
              lineHeight="24px"
              fontSize={fontSizes.medium}
            >
              {content}
            </Text>
          </Box>
        )}
        <Row mt={25} justify="center">
          {/* @ts-ignore */}
          <Button
            light
            hoverable
            onClick={onClose}
            type="button"
            mr={25}
            width="auto"
            padding="0 30px"
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
            width="auto"
            padding="0 30px"
            {...confirmButtonStyles}
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
