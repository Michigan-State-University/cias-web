import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUser,
  editOtherUserRequest,
  editSingleUserSaga,
} from 'global/reducers/user';
import { useInjectSaga } from 'utils/injectSaga';

import FullNameForm from 'components/AccountSettings/FullNameForm';

const WrappedFullNameForm = ({
  formatMessage,
  userState: { user },
  editUser,
}) => {
  useInjectSaga({ key: 'editSingleUser', saga: editSingleUserSaga });
  const editUserCall = userData => editUser({ userId: user.id, ...userData });
  if (!user) {
    return null;
  }
  return (
    <FullNameForm
      formatMessage={formatMessage}
      user={user}
      editUser={editUserCall}
    />
  );
};

WrappedFullNameForm.propTypes = {
  formatMessage: PropTypes.func,
  userState: PropTypes.object,
  editUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editOtherUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(WrappedFullNameForm);
