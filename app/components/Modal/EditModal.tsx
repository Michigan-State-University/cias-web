import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from 'components/Modal';
import Column from 'components/Column';
import Box from 'components/Box';
import Row from 'components/Row';
import Divider from 'components/Divider';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';

import messages from './messages';

type EditModalProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  width?: number;
  description?: string;
  children?: ReactElement;
  loading?: boolean;
  onSubmit?: any;
  disabled?: boolean;
  confirmButtonMessage?: string;
  cancelButtonMessage?: string;
  error?: string;
};

export const EditModal = ({
  visible,
  title,
  onClose,
  width = 500,
  description,
  children,
  loading,
  onSubmit,
  disabled,
  confirmButtonMessage,
  cancelButtonMessage,
  error,
}: EditModalProps) => (
  <Modal
    visible={visible}
    title={title}
    onClose={onClose}
    width={width}
    maxWidth="100%"
    titleProps={{
      fontSize: 20,
      mb: 5,
    }}
    px={32}
    py={32}
  >
    <Column>
      {description && (
        <Box mb={40}>
          {description}
          <Divider mt={16} />
        </Box>
      )}
      <Row width="100%">{children}</Row>
      <Row width="100%" mt={56}>
        <Button
          hoverable
          onClick={onSubmit}
          type="button"
          loading={loading}
          data-testid="confirm-button"
          width={156}
          mr={16}
          disabled={disabled}
        >
          {confirmButtonMessage}
        </Button>
        <Button
          data-testid="close-button"
          mr={20}
          light
          hoverable
          onClick={onClose}
          type="button"
          width={104}
        >
          {cancelButtonMessage ?? <FormattedMessage {...messages.cancel} />}
        </Button>
      </Row>
      {error && <ErrorAlert mt={25} errorText={error} />}
    </Column>
  </Modal>
);

export default EditModal;
