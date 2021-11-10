import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import messages from './messages';

export const ResendInvitationLink = ({ onResend, loading }) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      color="primary"
      inverted
      width={180}
      px={20}
      onClick={onResend}
      loading={loading}
    >
      {formatMessage(messages.resendInvitationLink)}
    </Button>
  );
};

ResendInvitationLink.propTypes = {
  onResend: PropTypes.func,
  loading: PropTypes.bool,
};
