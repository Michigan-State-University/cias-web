import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';

import { useInjectSaga } from 'redux-injectors';
import {
  changePhoneNumberSaga,
  changePhoneNumberRequest,
  makeSelectUser,
  makeSelectLoaders,
  makeSelectErrors,
  changeErrorStatus,
} from 'global/reducers/auth';

const WrappedPhoneNumberForm = ({
  formatMessage,
  user,
  changePhoneNumber,
  error,
  loading,
  changeErrorValue,
}) => {
  useInjectSaga({ key: 'changePhoneNumber', saga: changePhoneNumberSaga });

  const { countryCode, phoneNumber } = user ?? {};

  return (
    <PhoneNumberForm
      formatMessage={formatMessage}
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      changePhoneNumber={changePhoneNumber}
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
  changePhoneNumber: PropTypes.func,
  changeErrorValue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoaders('changePhoneNumberLoading'),
  error: makeSelectErrors('changePhoneNumberError'),
});

const mapDispatchToProps = {
  changePhoneNumber: changePhoneNumberRequest,
  changeErrorValue: changeErrorStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedPhoneNumberForm);
