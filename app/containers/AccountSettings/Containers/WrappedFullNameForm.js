import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  editUserRequest,
  editUserSaga,
  makeSelectUser,
} from 'global/reducers/auth';
import { useInjectSaga } from 'redux-injectors';

import FullNameForm from 'components/AccountSettings/FullNameForm';

const WrappedFullNameForm = ({ formatMessage, user, editUser }) => {
  useInjectSaga({ key: 'editUser', saga: editUserSaga });

  return (
    <FullNameForm
      formatMessage={formatMessage}
      user={user}
      editUser={editUser}
    />
  );
};

WrappedFullNameForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.object,
  editUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(WrappedFullNameForm);
