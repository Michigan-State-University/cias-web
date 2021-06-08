import React, { memo, useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  addHealthSystemRequest,
  selectEntityAction,
  addClinicRequest,
} from 'global/reducers/organizations';

import { Col, Row } from 'components/ReactGridSystem';
import SortableTree from 'components/SortableTree';
import Comment from 'components/Text/Comment';

import Loader from 'components/Loader';
import { ManageOrganizationsContext } from './constants';
import messages from '../../messages';
import { FullWidthContainer } from '../../styled';
import { generateTreeFromOrganization } from './generateTree';

/**
 * General container for Organization, Health System and Clinic
 */
const OrganizationDetails = ({ addHealthSystem, addClinic, selectEntity }) => {
  const { formatMessage } = useIntl();
  const {
    organization,
    loaders: {
      fetchOrganization: fetchOrganizationLoader,
      addHealthSystem: addHealthSystemLoader,
    },
  } = useContext(ManageOrganizationsContext);

  const onAddHealthSystem = useCallback(
    () => addHealthSystem(organization.id),
    [organization],
  );

  const onAddClinic = useCallback(
    healthSystemId => addClinic(healthSystemId),
    [],
  );

  const onSelectEntity = useCallback(
    (type, id, parentId) => () => selectEntity(type, id, parentId),
    [],
  );

  const treeData = useMemo(
    () =>
      generateTreeFromOrganization({
        organizationData: organization,
        addHealthSystem: onAddHealthSystem,
        addClinic: onAddClinic,
        onAddHealthSystem,
        formatMessage,
        onClick: onSelectEntity,
        addHealthSystemLoader,
      }),
    [organization, addHealthSystemLoader],
  );

  const render = useCallback(() => {
    if (!organization && fetchOrganizationLoader)
      return <Loader type="inline" />;

    return <SortableTree treeData={treeData} />;
  }, [fetchOrganizationLoader, organization, treeData]);

  return (
    <FullWidthContainer>
      <Row>
        <Col>
          <Comment mt={30} ml={55}>
            {formatMessage(messages.manageOrganizations)}
          </Comment>
          {render()}
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

OrganizationDetails.propTypes = {
  addHealthSystem: PropTypes.func,
  addClinic: PropTypes.func,
  selectEntity: PropTypes.func,
};

const mapDispatchToProps = {
  addHealthSystem: addHealthSystemRequest,
  addClinic: addClinicRequest,
  selectEntity: selectEntityAction,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(OrganizationDetails));
