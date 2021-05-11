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

import TopPanelComponent from './TopPanelComponent';
import UserListComponent from './UserListComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const ClinicSettings = ({
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

  const clinic = useMemo(() => {
    const healthSystem = organization.healthSystems.find(
      ({ id }) => id === selectedEntity.parentId,
    );

    return healthSystem.healthClinics.find(
      ({ id }) => id === selectedEntity.id,
    );
  }, [selectedEntity, organization]);

  const onDelete = useCallback(
    () => deleteClinic(clinic.id, selectedEntity.parentId),
    [clinic?.id, selectedEntity.parentId],
  );

  const onEdit = useCallback(
    value =>
      editClinic({
        ...value,
        id: clinic.id,
        healthSystemId: clinic.healthSystemId,
      }),
    [clinic?.id],
  );

  const onInvite = useCallback(
    (email, role) => inviteAdmin(clinic.id, email, role),
    [clinic?.id],
  );

  if (!clinic || fetchOrganizationLoader || fetchClinicLoader)
    return <Loader type="inline" />;

  return (
    <>
      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.clinicHeader)}
            icon={ClinicIcon}
            isDeleting={deleteClinicLoader}
            label={formatMessage(messages.clinicLabel)}
            name={clinic.name}
            onDelete={onDelete}
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
            inviteTo={clinic.name}
            onInvite={onInvite}
            role={Roles.clinicAdmin}
            users={clinic.healthClinicAdmins}
          />
        </Col>
      </Row>
    </>
  );
};

ClinicSettings.propTypes = {
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
