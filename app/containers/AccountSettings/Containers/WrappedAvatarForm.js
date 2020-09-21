import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUser,
  addAvatarRequest,
  addAvatarSaga,
  deleteAvatarRequest,
  deleteAvatarSaga,
} from 'global/reducers/auth';
import { useInjectSaga } from 'utils/injectSaga';

import AvatarForm from '../Components/AvatarForm';

const WrappedAvatarForm = ({ user, addAvatar, deleteAvatar }) => {
  useInjectSaga({ key: 'addAvatar', saga: addAvatarSaga });
  useInjectSaga({ key: 'deleteAvatar', saga: deleteAvatarSaga });

  return (
    <AvatarForm user={user} addAvatar={addAvatar} deleteAvatar={deleteAvatar} />
  );
};

WrappedAvatarForm.propTypes = {
  user: PropTypes.object,
  addAvatar: PropTypes.func,
  deleteAvatar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  addAvatar: addAvatarRequest,
  deleteAvatar: deleteAvatarRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedAvatarForm);
