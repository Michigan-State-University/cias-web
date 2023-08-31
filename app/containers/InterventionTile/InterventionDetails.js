import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Text from 'components/Text';

import messages from './messages';
import globalMessages from '../../global/i18n/globalMessages';

const InterventionDetails = ({
  intl: { formatMessage },
  user,
  updatedAt,
  createdAt,
  dataCleared,
}) => {
  const { email, firstName, lastName } = user || {};

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

      {dataCleared && (
        <Text fontWeight="bold">
          {formatMessage(globalMessages.dataClearedInfo)}
        </Text>
      )}
    </>
  );
};

InterventionDetails.propTypes = {
  intl: PropTypes.object,
  user: PropTypes.object,
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string,
  dataCleared: PropTypes.bool,
};

export default injectIntl(InterventionDetails);
