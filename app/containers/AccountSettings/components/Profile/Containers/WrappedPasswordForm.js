import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import {
  changePasswordRequest,
  changePasswordSaga,
  makeSelectErrors,
  makeSelectLoaders,
  changeErrorStatus,
} from 'global/reducers/auth';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import PasswordForm from 'components/AccountSettings/PasswordForm';

const WrappedPasswordForm = ({
  formatMessage,
  changePassword,
  changeErrorValue,
  visible,
  onClose,
  error,
  loading,
}) => {
  useInjectSaga({ key: 'changePassword', saga: changePasswordSaga });

  return (
    <PasswordForm
      formatMessage={formatMessage}
      changePassword={changePassword}
      changeErrorValue={changeErrorValue}
      visible={visible}
      onClose={onClose}
      error={error}
      loading={loading}
    />
  );
};

WrappedPasswordForm.propTypes = {
  formatMessage: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  changePassword: PropTypes.func,
  changeErrorValue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectErrors('changePasswordError'),
  loading: makeSelectLoaders('changePasswordLoading'),
});

const mapDispatchToProps = {
  changePassword: changePasswordRequest,
  changeErrorValue: changeErrorStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(WrappedPasswordForm);
