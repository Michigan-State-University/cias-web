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
import { useInjectSaga } from 'utils/injectSaga';

import Deactivation from 'components/AccountSettings/Deactivation';

const WrappedDeactivationAdmin = ({ userState: { user }, changeStatus }) => {
  useInjectSaga({ key: 'changeActiveStatus', saga: changeActivateStatusSaga });

  const changeStatusCall = newStatus => changeStatus(user.id, newStatus);

  return <Deactivation user={user} changeStatus={changeStatusCall} />;
};

WrappedDeactivationAdmin.propTypes = {
  userState: PropTypes.object,
  changeStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});
const mapDispatchToProps = {
  changeStatus: changeActivateStatusRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedDeactivationAdmin);
