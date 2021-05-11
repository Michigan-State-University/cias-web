import PropTypes from 'prop-types';
import React, { memo, useCallback, useContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import OrganizationIcon from 'assets/svg/organization-icon.svg';

import {
  deleteOrganizationRequest,
  editOrganizationRequest,
  inviteAdminRequest,
} from 'global/reducers/organizations';

import { Roles } from 'models/User/UserRoles';

import { Col, Row } from 'components/ReactGridSystem';

import TopPanelComponent from './TopPanelComponent';
import UserListComponent from './UserListComponent';
import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const OrganizationSettings = ({
  deleteOrganization,
  editOrganization,
  inviteAdmin,
}) => {
  const { formatMessage } = useIntl();

  const {
    organization,
    loaders: { deleteOrganization: deleteOrganizationLoader },
  } = useContext(ManageOrganizationsContext);

  const onDelete = useCallback(() => deleteOrganization(organization.id), [
    organization?.id,
  ]);

  const onEdit = useCallback(
    value => editOrganization({ ...value, id: organization.id }),
    [organization?.id],
  );

  const onInvite = useCallback(
    (email, role) => inviteAdmin(organization.id, email, role),
    [organization?.id],
  );

  return (
    <>
      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.organizationHeader)}
            icon={OrganizationIcon}
            isDeleting={deleteOrganizationLoader}
            label={formatMessage(messages.organizationLabel)}
            name={organization.name}
            onDelete={onDelete}
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
            inviteTo={organization.name}
            onInvite={onInvite}
            role={Roles.eInterventionAdmin}
            users={organization.eInterventionAdmins}
          />
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <UserListComponent
            header={formatMessage(messages.organizationAdminsHeader)}
            helper={formatMessage(messages.organizationAdminsHelper)}
            inviteTo={organization.name}
            onInvite={onInvite}
            role={Roles.organizationAdmin}
            users={organization.organizationAdmins}
          />
        </Col>
      </Row>
    </>
  );
};

OrganizationSettings.propTypes = {
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
