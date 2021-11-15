import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUser,
  addSingleUserAvatarSaga,
  addOtherUserAvatarRequest,
  deleteSingleUserAvatarSaga,
  deleteOtherUserAvatarRequest,
} from 'global/reducers/user';
import { useInjectSaga } from 'redux-injectors';

import AvatarForm from 'components/AccountSettings/AvatarForm';

const WrappedAvatarFormAdmin = ({ user, addAvatar, deleteAvatar }) => {
  useInjectSaga({ key: 'addSingleUserAvatar', saga: addSingleUserAvatarSaga });
  useInjectSaga({ key: 'deleteAvatar', saga: deleteSingleUserAvatarSaga });

  const addAvatarCall = (avatarData) =>
    addAvatar({ userId: user.id, ...avatarData });

  const deleteAvatarCall = () => deleteAvatar(user.id);
  return (
    <AvatarForm
      user={user}
      addAvatar={addAvatarCall}
      deleteAvatar={deleteAvatarCall}
    />
  );
};

WrappedAvatarFormAdmin.propTypes = {
  user: PropTypes.object,
  addAvatar: PropTypes.func,
  deleteAvatar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});
const mapDispatchToProps = {
  addAvatar: addOtherUserAvatarRequest,
  deleteAvatar: deleteOtherUserAvatarRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WrappedAvatarFormAdmin);
