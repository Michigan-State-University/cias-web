import PropTypes from 'prop-types';
import React, { memo, useCallback, useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import OrganizationIcon from 'assets/svg/organization-icon.svg';

import {
  deleteOrganizationRequest,
  editOrganizationRequest,
  inviteAdminRequest,
} from 'global/reducers/organizations';

import { makeSelectUserRoles } from 'global/reducers/auth';
import { RolePermissions } from 'models/User/RolePermissions';
import { Roles } from 'models/User/UserRoles';

import { Col, Row } from 'components/ReactGridSystem';
import ConfirmationBox from 'components/ConfirmationBox';

import { DeleteEntityModal } from '../Modals';
import TopPanelComponent from './TopPanelComponent';
import UserListComponent from './UserListComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const OrganizationSettings = ({
  openDeleteModal,
  closeDeleteModal,
  isDeleteModalOpen,
  deleteOrganization,
  editOrganization,
  inviteAdmin,
}) => {
  // selectors
  const userRoles = useSelector(makeSelectUserRoles());

  const { formatMessage } = useIntl();

  const { canDeleteOrganization } = RolePermissions(userRoles);

  const {
    organization: { eInterventionAdmins, id, name, organizationAdmins },
    loaders: { deleteOrganization: deleteOrganizationLoader },
  } = useContext(ManageOrganizationsContext);

  const onDelete = useCallback(() => deleteOrganization(id), [id]);

  const onEdit = useCallback(value => editOrganization({ ...value, id }), [id]);

  const onInvite = useCallback((email, role) => inviteAdmin(id, email, role), [
    id,
  ]);

  return (
    <>
      <ConfirmationBox
        visible={isDeleteModalOpen}
        onClose={closeDeleteModal}
        description={formatMessage(messages.deleteEntityModalTitle, {
          type: formatMessage(messages.organizationHeader),
        })}
        confirmAction={onDelete}
        content={
          <DeleteEntityModal
            name={name}
            type={formatMessage(messages.organizationHeader)}
          />
        }
      />

      <Row>
        <Col>
          <TopPanelComponent
            canDelete={canDeleteOrganization}
            header={formatMessage(messages.organizationHeader)}
            icon={OrganizationIcon}
            isDeleting={deleteOrganizationLoader}
            label={formatMessage(messages.organizationLabel)}
            name={name}
            onDelete={openDeleteModal}
            onEdit={onEdit}
            placeholder={formatMessage(messages.organizationPlaceholder)}
          />
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <UserListComponent
            header={formatMessage(messages.interventionAdminsHeader)}
            helper={formatMessage(messages.interventionAdminsHelper)}
            inviteTo={name}
            onInvite={onInvite}
            role={Roles.eInterventionAdmin}
            users={eInterventionAdmins}
          />
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <UserListComponent
            header={formatMessage(messages.organizationAdminsHeader)}
            helper={formatMessage(messages.organizationAdminsHelper)}
            inviteTo={name}
            onInvite={onInvite}
            role={Roles.organizationAdmin}
            users={organizationAdmins}
          />
        </Col>
      </Row>
    </>
  );
};

OrganizationSettings.propTypes = {
  closeDeleteModal: PropTypes.func,
  openDeleteModal: PropTypes.func,
  isDeleteModalOpen: PropTypes.bool,
  deleteOrganization: PropTypes.func,
  editOrganization: PropTypes.func,
  inviteAdmin: PropTypes.func,
};

const mapDispatchToProps = {
  deleteOrganization: deleteOrganizationRequest,
  editOrganization: editOrganizationRequest,
  inviteAdmin: inviteAdminRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(OrganizationSettings));
