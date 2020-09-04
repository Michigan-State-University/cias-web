/**
 *
 * ConfirmationBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ErrorAlert from '../ErrorAlert';
import Modal from '../Modal';
import Button from '../Button';
import Row from '../Row';
import Column from '../Column';
import H2 from '../H2';

import messages from './messages';

const ConfirmationBox = ({
  visible,
  title,
  description,
  onClose,
  confirmAction,
  loading,
  error,
}) => (
  <Modal visible={visible} title={title} onClose={onClose}>
    <Column>
      <H2>{description}</H2>
      <Row mt={25}>
        <Button inverted hoverable onClick={onClose} type="button" mr={25}>
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button
          hoverable
          disabled={loading}
          loading={loading}
          onClick={confirmAction}
          type="button"
        >
          <FormattedMessage {...messages.confirmCanceling} />
        </Button>
      </Row>
    </Column>
    {error && <ErrorAlert fullWidth>{error}</ErrorAlert>}
  </Modal>
);

ConfirmationBox.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.node,
  onClose: PropTypes.func,
  confirmAction: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.array,
  description: PropTypes.node,
};

ConfirmationBox.defaultProps = {
  onClose: () => {},
  confirmAction: () => {},
  loading: false,
  error: null,
  visible: false,
  title: <FormattedMessage {...messages.defaultTitle} />,
  description: <FormattedMessage {...messages.defaultDescription} />,
};

export default ConfirmationBox;
