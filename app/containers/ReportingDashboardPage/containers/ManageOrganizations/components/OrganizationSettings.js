import PropTypes from 'prop-types';
import React, { memo, useCallback, useContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import OrganizationIcon from 'assets/svg/organization-icon.svg';

import {
  deleteOrganizationRequest,
  editOrganizationRequest,
} from 'global/reducers/organizations';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';

import TopPanelComponent from './TopPanelComponent';
import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const OrganizationSettings = ({ deleteOrganization, editOrganization }) => {
  const { formatMessage } = useIntl();

  const {
    organization,
    loaders: {
      deleteOrganization: deleteOrganizationLoader,
      fetchOrganization: fetchOrganizationLoader,
    },
  } = useContext(ManageOrganizationsContext);

  const onDelete = useCallback(() => {
    deleteOrganization(organization.id);
  }, [organization?.id]);

  const onEdit = useCallback(
    value => {
      editOrganization({ ...value, id: organization.id });
    },
    [organization?.id],
  );

  if (!organization || fetchOrganizationLoader) return <Loader type="inline" />;

  return (
    <Row>
      <Col>
        <TopPanelComponent
          header={formatMessage(messages.organizationHeader)}
          icon={OrganizationIcon}
          isDeleting={deleteOrganizationLoader}
          label={formatMessage(messages.organizationLabel)}
          placeholder={formatMessage(messages.organizationPlaceholder)}
          name={organization.name}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Col>
    </Row>
  );
};

OrganizationSettings.propTypes = {
  deleteOrganization: PropTypes.func,
  editOrganization: PropTypes.func,
};

const mapDispatchToProps = {
  deleteOrganization: deleteOrganizationRequest,
  editOrganization: editOrganizationRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(OrganizationSettings));
