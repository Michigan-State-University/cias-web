import React, { memo, useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  addHealthSystemRequest,
  selectEntityAction,
  addClinicRequest,
  toggleShowDeletedEntitiesAction,
} from 'global/reducers/organizations';

import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import SortableTree from 'components/SortableTree';
import Comment from 'components/Text/Comment';
import Loader from 'components/Loader';
import Checkbox from 'components/Checkbox';
import Text from 'components/Text';

import { ManageOrganizationsContext } from './constants';
import messages from '../../messages';
import { FullWidthContainer } from '../../styled';
import { generateTreeFromOrganization } from './generateTree';

/**
 * General container for Organization, Health System and Clinic
 */
const OrganizationDetails = ({
  addHealthSystem,
  addClinic,
  selectEntity,
  toggleShowDeletedEntities,
}) => {
  const { formatMessage } = useIntl();
  const {
    organization,
    loaders: {
      fetchOrganization: fetchOrganizationLoader,
      addHealthSystem: addHealthSystemLoader,
    },
    showDeletedEntities,
  } = useContext(ManageOrganizationsContext);

  const onAddHealthSystem = useCallback(
    () => addHealthSystem(organization.id),
    [organization],
  );

  const onAddClinic = useCallback(
    (healthSystemId) => addClinic(healthSystemId),
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
          <Row width="100%" justify="between" mt={30}>
            <Col xs="content">
              <Comment ml={55}>
                {formatMessage(messages.manageOrganizations)}
              </Comment>
            </Col>

            <Col xs="content">
              <NoMarginRow align="center" justify="end">
                <Checkbox
                  id="organization-toggle-archived"
                  checked={showDeletedEntities}
                  mr={5}
                  onChange={toggleShowDeletedEntities}
                >
                  <Text>
                    {formatMessage(messages.showDeletedEntitiesToggle)}
                  </Text>
                </Checkbox>
              </NoMarginRow>
            </Col>
          </Row>

          <Row>
            <Col>{render()}</Col>
          </Row>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

OrganizationDetails.propTypes = {
  addHealthSystem: PropTypes.func,
  addClinic: PropTypes.func,
  selectEntity: PropTypes.func,
  toggleShowDeletedEntities: PropTypes.func,
};

const mapDispatchToProps = {
  addHealthSystem: addHealthSystemRequest,
  addClinic: addClinicRequest,
  selectEntity: selectEntityAction,
  toggleShowDeletedEntities: toggleShowDeletedEntitiesAction,
};

const withConnect = connect(null, mapDispatchToProps);

export default memo(compose(withConnect)(OrganizationDetails));
