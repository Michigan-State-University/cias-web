/**
 *
 * ConfirmationBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Box from '../Box';
import H1 from '../H1';
import ErrorAlert from '../ErrorAlert';
import Modal from '../Modal';
import Button from '../Button';
import Row from '../Row';
import Column from '../Column';

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
}) => (
  <Modal visible={visible} onClose={onClose} {...modalStyles}>
    <Column px={50} pd={30} {...contentContainerStyles}>
      <H1 textAlign="center">{description}</H1>
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
          onClick={confirmAction}
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
