/**
 *
 * ConfirmationBox
 *
 */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H1 from 'components/H1';
import ErrorAlert from 'components/ErrorAlert';
import Modal, { MODAL_TITLE_ID } from 'components/Modal';
import Button from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';

import messages from './messages';

const ConfirmationBox = ({
  visible,
  description,
  onClose,
  confirmAction,
  loading,
  error,
  content,
  confirmationButtonColor,
  contentStyles,
  contentContainerStyles,
  ...modalStyles
}) => {
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
          <Button inverted hoverable onClick={onClose} type="button" mr={25}>
            <FormattedMessage {...messages.cancel} />
          </Button>
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
      {error && <ErrorAlert fullWidth errorText={error} />}
    </Modal>
  );
};

ConfirmationBox.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  confirmAction: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.array,
  description: PropTypes.node,
  maxWidth: PropTypes.number,
  confirmationButtonColor: PropTypes.string,
  contentStyles: PropTypes.object,
  contentContainerStyles: PropTypes.object,
};

ConfirmationBox.defaultProps = {
  onClose: () => {},
  confirmAction: () => {},
  loading: false,
  error: null,
  visible: false,
  description: <FormattedMessage {...messages.defaultDescription} />,
  maxWidth: 500,
  confirmationButtonColor: 'warning',
};

export default ConfirmationBox;
