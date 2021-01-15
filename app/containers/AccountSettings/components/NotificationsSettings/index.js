import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import clone from 'lodash/clone';

import Box from 'components/Box';
import H2 from 'components/H2';
import Row from 'components/Row';
import Text from 'components/Text';
import Checkbox from 'components/Checkbox';
import { colors, boxShadows } from 'theme';
import {
  changeNotificationsSettingsSaga,
  makeSelectUser,
  changeNotificationsSettingsRequest,
} from 'global/reducers/auth';

import messages from './messages';

function NotificationsSettings({
  intl: { formatMessage },
  user: { notificationsSettings },
  changeNotificationsSettings,
}) {
  useInjectSaga({
    key: 'changeNotificationsSettings',
    saga: changeNotificationsSettingsSaga,
  });

  const handleClick = notificationType => {
    const notificationsSettingsClone = clone(notificationsSettings ?? {});
    notificationsSettingsClone[notificationType] = !notificationsSettingsClone[
      notificationType
    ];
    changeNotificationsSettings(notificationsSettingsClone);
  };

  return (
    <Box bg={colors.white} padding={30} shadow={boxShadows.selago} mt={20}>
      <H2 mb={20}>{formatMessage(messages.header)}</H2>
      <Row align="center" mb={13}>
        <Checkbox
          checked={notificationsSettings?.email ?? false}
          onClick={() => handleClick('email')}
        />
        <Text ml={10} fontSize={14}>
          {formatMessage(messages.emailNotifications)}
        </Text>
      </Row>
      <Row align="center">
        <Checkbox
          checked={notificationsSettings?.phone ?? false}
          onClick={() => handleClick('phone')}
        />
        <Text ml={10} fontSize={14}>
          {formatMessage(messages.phoneNotifications)}
        </Text>
      </Row>
    </Box>
  );
}

NotificationsSettings.propTypes = {
  intl: intlShape,
  user: PropTypes.object,
  changeNotificationsSettings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  changeNotificationsSettings: changeNotificationsSettingsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(NotificationsSettings);
