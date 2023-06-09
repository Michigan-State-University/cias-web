/**
 *
 * UserDetails
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { injectReducer, injectSaga } from 'redux-injectors';

import { themeColors } from 'theme';

import {
  makeSelectUser,
  fetchUserRequest,
  fetchUserSaga,
  UserReducer,
  makeSelectUserLoader,
  makeSelectUserError,
} from 'global/reducers/user';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';

import AccountSettings from '../AccountSettings';
import WrappedAvatarFormAdmin from './containers/WrappedAvatarFormAdmin';
import WrappedFullNameFormAdmin from './containers/WrappedFullNameFormAdmin';
import WrappedDeactivationAdmin from './containers/WrappedDeactivationAdmin';
import { WrappedResendInvitationLinkAdmin } from './containers/WrappedResendInvitationLinkAdmin';
import messages from './messages';

export const UserDetails = ({
  user,
  userError,
  userLoading,
  fetchUser,
  match: {
    params: { userId },
  },
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchUser(userId);
  }, []);

  if (userLoading) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (userError) {
    return <ErrorAlert errorText={userError} />;
  }

  return (
    <>
      <AccountSettings
        NotificationsComponent={null}
        formComponents={{
          TimezoneComponent: null,
          EmailComponent: null,
          PasswordComponent: null,
          AvatarComponent: WrappedAvatarFormAdmin,
          FullNameComponent: WrappedFullNameFormAdmin,
          DeactivationComponent: WrappedDeactivationAdmin,
          ResendInvitationLinkComponent: WrappedResendInvitationLinkAdmin,
        }}
        userId={user.id}
      />

      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
    </>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object,
  userLoading: PropTypes.bool,
  userError: PropTypes.object,
  match: PropTypes.object,
  fetchUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoader('user'),
  userError: makeSelectUserError('user'),
});

const mapDispatchToProps = {
  fetchUser: fetchUserRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'userSaga', saga: fetchUserSaga }),
  injectReducer({ key: 'user', reducer: UserReducer }),
)(UserDetails);
