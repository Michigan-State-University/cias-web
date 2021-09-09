/**
 *
 * ConfirmationModal
 *
 */

import React, { ReactNode, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H1 from 'components/H1';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';

import messages from './messages';
import Modal from './Modal';
import { MODAL_TITLE_ID } from './constants';

export type Props = {
  visible: boolean;
  description: ReactNode;
  onClose: () => void;
  confirmAction: () => void;
  loading: boolean;
  error?: string | object;
  content: ReactNode;
  confirmationButtonColor: string;
  contentStyles?: Record<string, unknown>;
  contentContainerStyles?: Record<string, unknown>;
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
  contentStyles,
  contentContainerStyles,
  ...modalStyles
}: Props): JSX.Element => {
  const onConfirm = useCallback(() => {
    confirmAction();
    onClose();
  }, [confirmAction, onClose]);

  return (
    <Modal visible={visible} onClose={onClose} {...modalStyles}>
      <Column px={50} pd={30} {...contentContainerStyles}>
        <H1 textAlign="center" id={MODAL_TITLE_ID}>
          {description}
        </H1>
        {content && (
          <Box padded {...contentStyles}>
            {content}
          </Box>
        )}
        <Row mt={25}>
          {/* @ts-ignore */}
          <Button inverted hoverable onClick={onClose} type="button" mr={25}>
            <FormattedMessage {...messages.cancel} />
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
            <FormattedMessage {...messages.confirmCanceling} />
          </Button>
        </Row>
      </Column>
      {/* @ts-ignore */}
      {error && <ErrorAlert fullWidth errorText={error} />}
    </Modal>
  );
};

ConfirmationModal.defaultProps = {
  maxWidth: 500,
};

export default ConfirmationModal;
