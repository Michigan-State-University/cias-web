import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Box from 'components/Box';
import H2 from 'components/H2';
import Row from 'components/Row';
import Text from 'components/Text';
import Checkbox from 'components/Checkbox';
import { colors, boxShadows } from 'theme';
import { makeSelectUser, editUserRequest } from 'global/reducers/auth';

import messages from './messages';

function NotificationsSettings({
  intl: { formatMessage },
  user: { emailNotification, smsNotification },
  editUser,
}) {
  return (
    <Box bg={colors.white} padding={30} shadow={boxShadows.selago} mt={20}>
      <H2 mb={20}>{formatMessage(messages.header)}</H2>

      <Row align="center" mb={13}>
        <Checkbox
          id="notification-email"
          checked={emailNotification}
          onChange={() =>
            editUser({
              emailNotification: !emailNotification,
            })
          }
        >
          <Text ml={10} fontSize={14}>
            {formatMessage(messages.emailNotifications)}
          </Text>
        </Checkbox>
      </Row>

      <Row align="center">
        <Checkbox
          id="notification-sms"
          checked={smsNotification}
          onChange={() => editUser({ smsNotification: !smsNotification })}
        >
          <Text ml={10} fontSize={14}>
            {formatMessage(messages.phoneNotifications)}
          </Text>
        </Checkbox>
      </Row>
    </Box>
  );
}

NotificationsSettings.propTypes = {
  intl: PropTypes.shape(IntlShape),
  user: PropTypes.object,
  editUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(NotificationsSettings);
