import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'redux-injectors';
import {
  changeEmailRequest,
  changeEmailSaga,
  makeSelectUser,
  makeSelectLoaders,
  makeSelectErrors,
  changeErrorStatus,
} from 'global/reducers/auth';

import EmailForm from 'components/AccountSettings/EmailForm';

const WrappedEmailForm = ({
  formatMessage,
  user,
  changeEmail,
  error,
  loading,
  changeErrorValue,
}) => {
  useInjectSaga({ key: 'changeEmail', saga: changeEmailSaga });

  return (
    <EmailForm
      formatMessage={formatMessage}
      user={user}
      changeEmail={changeEmail}
      error={error}
      loading={loading}
      changeErrorValue={changeErrorValue}
    />
  );
};

WrappedEmailForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  changeEmail: PropTypes.func,
  changeErrorValue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoaders('changeEmailLoading'),
  error: makeSelectErrors('changeEmailError'),
});

const mapDispatchToProps = {
  changeEmail: changeEmailRequest,
  changeErrorValue: changeErrorStatus,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WrappedEmailForm);
