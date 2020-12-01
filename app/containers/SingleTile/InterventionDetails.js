import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Text from 'components/Text';

import messages from './messages';

const InterventionDetails = ({
  intl: { formatMessage },
  user,
  updatedAt,
  createdAt,
}) => {
  const { email, first_name: firstName, last_name: lastName } = user || {};

  return (
    <>
      {user && (
        <>
          <Text fontWeight="bold">{formatMessage(messages.createdBy)}</Text>
          <Text>
            {formatMessage(messages.email)}
            {email}
          </Text>
          <Text>
            {formatMessage(messages.firstName)}
            {firstName}
          </Text>
          <Text mb={5}>
            {formatMessage(messages.lastName)}
            {lastName}
          </Text>
        </>
      )}

      {createdAt && (
        <>
          <Text fontWeight="bold">{formatMessage(messages.createdAt)}</Text>
          <Text mb={5}>{dayjs(createdAt).format('YYYY/MM/DD HH:mm Z')}</Text>
        </>
      )}

      {updatedAt && (
        <>
          <Text fontWeight="bold">{formatMessage(messages.updatedAt)}</Text>
          <Text mb={5}>{dayjs(updatedAt).format('YYYY/MM/DD HH:mm Z')}</Text>
        </>
      )}
    </>
  );
};

InterventionDetails.propTypes = {
  intl: PropTypes.object,
  user: PropTypes.object,
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string,
};

export default injectIntl(InterventionDetails);
