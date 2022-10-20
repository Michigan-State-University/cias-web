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

import { Roles } from 'models/User/RolesManager';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import { ConfirmationModal } from 'components/Modal';

import { DeleteEntityModal } from '../Modals';
import TopPanelComponent from './TopPanelComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';
import UserListComponent from './UserListComponent';

const HealthSystemSettings = ({
  openDeleteModal,
  closeDeleteModal,
  isDeleteModalOpen,
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

  const { healthSystemAdmins, id, name } = useMemo(
    () =>
      organization.healthSystems.find(
        ({ id: healthSystemId }) => healthSystemId === selectedEntity.id,
      ) || { healthSystemAdmins: [], id: '', name: '' },
    [selectedEntity, organization],
  );

  const onDelete = useCallback(() => deleteHealthSystem(id), [id]);

  const onEdit = useCallback(
    (value) => editHealthSystem({ ...value, id }),
    [id],
  );

  const onInvite = useCallback(
    (email, role) => inviteAdmin(id, email, role),
    [id],
  );

  if (!id || fetchOrganizationLoader || fetchHealthSystemLoader)
    return <Loader type="inline" />;

  return (
    <>
      <ConfirmationModal
        visible={isDeleteModalOpen}
        onClose={closeDeleteModal}
        description={formatMessage(messages.deleteEntityModalTitle, {
          type: formatMessage(messages.healthSystemHeader),
        })}
        confirmAction={onDelete}
        content={
          <DeleteEntityModal
            name={name}
            type={formatMessage(messages.healthSystemHeader)}
          />
        }
      />

      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.healthSystemHeader)}
            icon={HealthSystemIcon}
            isDeleting={deleteHealthSystemLoader}
            label={formatMessage(messages.healthSystemLabel)}
            name={name}
            onDelete={openDeleteModal}
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
            inviteTo={name}
            onInvite={onInvite}
            role={Roles.HealthSystemAdmin}
            users={healthSystemAdmins}
          />
        </Col>
      </Row>
    </>
  );
};

HealthSystemSettings.propTypes = {
  closeDeleteModal: PropTypes.func,
  openDeleteModal: PropTypes.func,
  isDeleteModalOpen: PropTypes.bool,
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

const withConnect = connect(null, mapDispatchToProps);

export default memo(compose(withConnect)(HealthSystemSettings));
