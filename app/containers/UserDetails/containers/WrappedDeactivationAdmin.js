import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUser,
  changeActivateStatusRequest,
  changeActivateStatusSaga,
} from 'global/reducers/user';
import { useInjectSaga } from 'redux-injectors';

import Deactivation from 'components/AccountSettings/Deactivation';

const WrappedDeactivationAdmin = ({ user, changeStatus }) => {
  useInjectSaga({ key: 'changeActiveStatus', saga: changeActivateStatusSaga });

  const changeStatusCall = newStatus => changeStatus(user.id, newStatus);

  return <Deactivation user={user} changeStatus={changeStatusCall} />;
};

WrappedDeactivationAdmin.propTypes = {
  user: PropTypes.object,
  changeStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});
const mapDispatchToProps = {
  changeStatus: changeActivateStatusRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedDeactivationAdmin);
