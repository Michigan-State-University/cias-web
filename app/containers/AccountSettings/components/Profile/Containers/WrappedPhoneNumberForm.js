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

const WrappedPhoneNumberForm = ({
  formatMessage,
  user,
  editUser,
  error,
  loading,
  changeErrorValue,
}) => {
  useInjectSaga({ key: 'changePhoneNumber', saga: changePhoneNumberSaga });

  const { phone } = user ?? {};

  return (
    <PhoneNumberForm
      formatMessage={formatMessage}
      phone={phone}
      changePhoneNumber={editUser}
      error={error}
      loading={loading}
      changeErrorValue={changeErrorValue}
    />
  );
};

WrappedPhoneNumberForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  editUser: PropTypes.func,
  changeErrorValue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoaders('changePhoneNumberLoading'),
  error: makeSelectErrors('changePhoneNumberError'),
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
