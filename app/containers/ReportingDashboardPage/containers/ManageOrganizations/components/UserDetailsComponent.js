import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

import { Roles } from 'models/User/RolesManager';

import {
  makeSelectUser,
  fetchUserSaga,
  changeActivateStatusSaga,
  editSingleUserSaga,
  UserReducer,
  fetchUserRequest,
  editOtherUserRequest,
  changeActivateStatusRequest,
  makeSelectUserLoader,
} from 'global/reducers/user';

import { setShouldRefetchAction } from 'global/reducers/organizations';

import Text from 'components/Text';
import { ConfirmationModal } from 'components/Modal';
import Loader from 'components/Loader';

import UserDetailsUI from './UserDetailsUI';
import messages from '../../../messages';
import { SettingsContainer } from '../../../styled';

const UserDetailsComponent = ({
  user,
  userLoading,
  role,
  onCancel,
  changeActivateStatus,
  editUser,
  fetchUser,
  userId,
  setShouldRefetch,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const [activationModalVisible, setActivationModalVisible] = useState(false);
  const openActivationModal = () => setActivationModalVisible(true);
  const closeActivationModal = () => setActivationModalVisible(false);

  const handleCancel = useCallback(() => {
    setShouldRefetch();
    onCancel();
  }, []);

  const modalDescription = useMemo(
    () =>
      user?.active
        ? formatMessage(messages.deactivateAccountConfirm)
        : formatMessage(messages.activateAccountConfirm),
    [user?.active],
  );

  const modalContent = useMemo(
    () => (
      <>
        <Text textAlign="center" fontWeight="bold">
          {user?.fullName}
        </Text>
        <Text textAlign="center">{user?.email}</Text>
      </>
    ),
    [user],
  );

  const roleHeader = useMemo(() => {
    switch (role) {
      case Roles.EInterventionAdmin:
        return formatMessage(messages.interventionAdminsHeader);
      case Roles.OrganizationAdmin:
        return formatMessage(messages.organizationAdminsHeader);
      case Roles.HealthSystemAdmin:
        return formatMessage(messages.healthSystemAdminsHeader);
      case Roles.ClinicAdmin:
        return formatMessage(messages.clinicAdminsHeader);
      default:
        return '';
    }
  }, [role]);

  const roleHelper = useMemo(() => {
    switch (role) {
      case Roles.EInterventionAdmin:
        return formatMessage(messages.interventionAdminsHelper);
      case Roles.OrganizationAdmin:
        return formatMessage(messages.organizationAdminsHelper);
      case Roles.HealthSystemAdmin:
        return formatMessage(messages.healthSystemAdminsHelper);
      case Roles.ClinicAdmin:
        return formatMessage(messages.clinicAdminsHelper);
      default:
        return '';
    }
  }, [role]);

  const handleActivation = () => {
    closeActivationModal();
    changeActivateStatus(user.id, !user.active);
  };

  const handleEdit = useCallback(
    (field, required) => (value) => {
      if (value === '' && required === true) {
        toast.warning(
          formatMessage(messages.fieldCannotBeEmpty, {
            field: upperFirst(lowerCase(field)),
          }),
        );
      } else {
        editUser({ userId, [field]: value });
      }
    },
    [userId],
  );

  if (userLoading) return <Loader type="inline" />;

  return (
    <SettingsContainer>
      <UserDetailsUI
        user={user}
        role={role}
        roleHeader={roleHeader}
        roleHelper={roleHelper}
        onStatusChange={openActivationModal}
        onEdit={handleEdit}
        onCancel={handleCancel}
      />

      <ConfirmationModal
        visible={activationModalVisible}
        onClose={closeActivationModal}
        description={modalDescription}
        content={modalContent}
        confirmAction={handleActivation}
      />
    </SettingsContainer>
  );
};

UserDetailsComponent.propTypes = {
  onCancel: PropTypes.func,
  role: PropTypes.string,
  user: PropTypes.object,
  userLoading: PropTypes.bool,
  userId: PropTypes.string,
  changeActivateStatus: PropTypes.func,
  editUser: PropTypes.func,
  fetchUser: PropTypes.func,
  setShouldRefetch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoader('user'),
});

const mapDispatchToProps = {
  changeActivateStatus: changeActivateStatusRequest,
  editUser: editOtherUserRequest,
  fetchUser: fetchUserRequest,
  setShouldRefetch: setShouldRefetchAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const reduxInjectors = [
  injectReducer({ key: 'user', reducer: UserReducer }),
  injectSaga({ key: 'fetchUserSaga', saga: fetchUserSaga }),
  injectSaga({ key: 'editSingleUserSaga', saga: editSingleUserSaga }),
  injectSaga({
    key: 'changeActivateStatusSaga',
    saga: changeActivateStatusSaga,
  }),
];

export default memo(
  compose(withConnect, ...reduxInjectors)(UserDetailsComponent),
);
