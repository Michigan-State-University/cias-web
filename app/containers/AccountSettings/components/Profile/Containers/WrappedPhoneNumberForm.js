import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';

import { useInjectSaga } from 'redux-injectors';
import {
  changePhoneNumberSaga,
  makeSelectUser,
  makeSelectLoaders,
  makeSelectErrors,
  changeErrorStatus,
  editUserRequest,
} from 'global/reducers/auth';

import { makeSelectUser as makeSelectOtherUser } from 'global/reducers/user';

const WrappedPhoneNumberForm = ({
  userId,
  formatMessage,
  user,
  editUser,
  error,
  otherUser,
  loading,
  changeErrorValue,
}) => {
  useInjectSaga({ key: 'changePhoneNumber', saga: changePhoneNumberSaga });
  const userToDisplay = userId ? otherUser : user;
  const { phone } = userToDisplay ?? {};

  return (
    <PhoneNumberForm
      formatMessage={formatMessage}
      phone={phone}
      changePhoneNumber={editUser}
      error={error}
      loading={loading}
      changeErrorValue={changeErrorValue}
      disabled={userId !== undefined}
    />
  );
};

WrappedPhoneNumberForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.object,
  otherUser: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  editUser: PropTypes.func,
  changeErrorValue: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoaders('changePhoneNumberLoading'),
  error: makeSelectErrors('changePhoneNumberError'),
  otherUser: makeSelectOtherUser(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
  changeErrorValue: changeErrorStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedPhoneNumberForm);
