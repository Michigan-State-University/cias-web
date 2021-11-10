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

import {
  makeSelectUser,
  fetchUserRequest,
  fetchUserSaga,
  UserReducer,
  makeSelectUserLoader,
  makeSelectUserError,
} from 'global/reducers/user';

import { injectReducer, injectSaga } from 'redux-injectors';

import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import ErrorAlert from 'components/ErrorAlert';
import AccountSettings from '../AccountSettings';
import WrappedAvatarFormAdmin from './containers/WrappedAvatarFormAdmin';
import WrappedFullNameFormAdmin from './containers/WrappedFullNameFormAdmin';
import WrappedDeactivationAdmin from './containers/WrappedDeactivationAdmin';
import { WrappedResendInvitationLinkAdmin } from './containers/WrappedResendInvitationLinkAdmin';

export const UserDetails = ({
  user,
  userError,
  userLoading,
  fetchUser,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    fetchUser(id);
  }, []);

  if (userLoading) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (userError) {
    return <ErrorAlert errorText={userError} />;
  }

  return (
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectSaga({ key: 'userSaga', saga: fetchUserSaga }),
  injectReducer({ key: 'user', reducer: UserReducer }),
)(UserDetails);
