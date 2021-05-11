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

import HealthSystemIcon from 'assets/svg/health-system-icon.svg';

import {
  deleteHealthSystemRequest,
  editHealthSystemRequest,
  EntityType,
  fetchHealthSystemRequest,
  inviteAdminRequest,
} from 'global/reducers/organizations';

import { Roles } from 'models/User/UserRoles';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';

import TopPanelComponent from './TopPanelComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';
import UserListComponent from './UserListComponent';

const HealthSystemSettings = ({
  fetchHealthSystem,
  deleteHealthSystem,
  editHealthSystem,
  inviteAdmin,
}) => {
  const { formatMessage } = useIntl();

  const {
    selectedEntity,
    shouldRefetch,
    organization,
    loaders: {
      fetchOrganization: fetchOrganizationLoader,
      fetchHealthSystem: fetchHealthSystemLoader,
      deleteHealthSystem: deleteHealthSystemLoader,
    },
  } = useContext(ManageOrganizationsContext);

  useEffect(() => {
    fetchHealthSystem(selectedEntity.id);
  }, [selectedEntity]);

  useEffect(() => {
    if (shouldRefetch[EntityType.healthSystem])
      fetchHealthSystem(selectedEntity.id);
  }, [shouldRefetch[EntityType.healthSystem]]);

  const healthSystem = useMemo(
    () => organization.healthSystems.find(({ id }) => id === selectedEntity.id),
    [selectedEntity, organization],
  );

  const onDelete = useCallback(() => deleteHealthSystem(healthSystem.id), [
    healthSystem?.id,
  ]);

  const onEdit = useCallback(
    value => editHealthSystem({ ...value, id: healthSystem.id }),
    [healthSystem?.id],
  );

  const onInvite = useCallback(
    (email, role) => inviteAdmin(healthSystem.id, email, role),
    [healthSystem?.id],
  );

  if (!healthSystem || fetchOrganizationLoader || fetchHealthSystemLoader)
    return <Loader type="inline" />;

  return (
    <>
      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.healthSystemHeader)}
            icon={HealthSystemIcon}
            isDeleting={deleteHealthSystemLoader}
            label={formatMessage(messages.healthSystemLabel)}
            name={healthSystem.name}
            onDelete={onDelete}
            onEdit={onEdit}
            placeholder={formatMessage(messages.healthSystemPlaceholder)}
          />
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <UserListComponent
            header={formatMessage(messages.healthSystemAdminsHeader)}
            helper={formatMessage(messages.healthSystemAdminsHelper)}
            inviteTo={healthSystem.name}
            onInvite={onInvite}
            role={Roles.healthSystemAdmin}
            users={healthSystem.healthSystemAdmins}
          />
        </Col>
      </Row>
    </>
  );
};

HealthSystemSettings.propTypes = {
  fetchHealthSystem: PropTypes.func,
  deleteHealthSystem: PropTypes.func,
  editHealthSystem: PropTypes.func,
  inviteAdmin: PropTypes.func,
};

const mapDispatchToProps = {
  fetchHealthSystem: fetchHealthSystemRequest,
  deleteHealthSystem: deleteHealthSystemRequest,
  editHealthSystem: editHealthSystemRequest,
  inviteAdmin: inviteAdminRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(HealthSystemSettings));
