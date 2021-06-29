import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import ClinicIcon from 'assets/svg/clinic-icon.svg';

import { Roles } from 'models/User/UserRoles';

import {
  inviteAdminRequest,
  deleteClinicRequest,
  editClinicRequest,
  fetchClinicRequest,
  EntityType,
} from 'global/reducers/organizations';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import ConfirmationBox from 'components/ConfirmationBox';

import { DeleteEntityModal } from '../Modals';
import TopPanelComponent from './TopPanelComponent';
import UserListComponent from './UserListComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const ClinicSettings = ({
  openDeleteModal,
  closeDeleteModal,
  isDeleteModalOpen,
  fetchClinic,
  deleteClinic,
  editClinic,
  inviteAdmin,
}) => {
  const { formatMessage } = useIntl();

  const {
    selectedEntity,
    shouldRefetch,
    organization,
    loaders: {
      fetchOrganization: fetchOrganizationLoader,
      fetchClinic: fetchClinicLoader,
      deleteClinic: deleteClinicLoader,
    },
  } = useContext(ManageOrganizationsContext);

  useEffect(() => {
    fetchClinic(selectedEntity.id);
  }, [selectedEntity]);

  useEffect(() => {
    if (shouldRefetch[EntityType.clinic]) fetchClinic(selectedEntity.id);
  }, [shouldRefetch[EntityType.clinic]]);

  const { healthClinicAdmins, healthSystemId, id, name } = useMemo(() => {
    const healthSystem = organization.healthSystems.find(
      ({ id: systemId }) => systemId === selectedEntity.parentId,
    );

    return (
      healthSystem.healthClinics.find(
        ({ id: clinicId }) => clinicId === selectedEntity.id,
      ) ?? {}
    );
  }, [selectedEntity, organization]);

  const onDelete = useCallback(
    () => deleteClinic(id, selectedEntity.parentId),
    [id, selectedEntity.parentId],
  );

  const onEdit = useCallback(
    value =>
      editClinic({
        ...value,
        id,
        healthSystemId,
      }),
    [id],
  );

  const onInvite = useCallback((email, role) => inviteAdmin(id, email, role), [
    id,
  ]);

  if (!id || fetchOrganizationLoader || fetchClinicLoader)
    return <Loader type="inline" />;

  return (
    <>
      <ConfirmationBox
        visible={isDeleteModalOpen}
        onClose={closeDeleteModal}
        description={formatMessage(messages.deleteEntityModalTitle, {
          type: formatMessage(messages.clinicHeader),
        })}
        confirmAction={onDelete}
        content={
          <DeleteEntityModal
            name={name}
            type={formatMessage(messages.clinicHeader)}
          />
        }
      />

      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.clinicHeader)}
            icon={ClinicIcon}
            isDeleting={deleteClinicLoader}
            label={formatMessage(messages.clinicLabel)}
            name={name}
            onDelete={openDeleteModal}
            onEdit={onEdit}
            placeholder={formatMessage(messages.clinicPlaceholder)}
          />
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <UserListComponent
            header={formatMessage(messages.clinicAdminsHeader)}
            helper={formatMessage(messages.clinicAdminsHelper)}
            inviteTo={name}
            onInvite={onInvite}
            role={Roles.clinicAdmin}
            users={healthClinicAdmins}
          />
        </Col>
      </Row>
    </>
  );
};

ClinicSettings.propTypes = {
  closeDeleteModal: PropTypes.func,
  openDeleteModal: PropTypes.func,
  isDeleteModalOpen: PropTypes.bool,
  fetchClinic: PropTypes.func,
  deleteClinic: PropTypes.func,
  editClinic: PropTypes.func,
  inviteAdmin: PropTypes.func,
};

const mapDispatchToProps = {
  fetchClinic: fetchClinicRequest,
  deleteClinic: deleteClinicRequest,
  editClinic: editClinicRequest,
  inviteAdmin: inviteAdminRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(ClinicSettings));
