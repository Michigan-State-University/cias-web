import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import EditIcon from 'assets/svg/edit.svg';

import {
  makeSelectOrganization,
  fetchOrganizationRequest,
  selectEntityAction,
  editOrganizationRequest,
} from 'global/reducers/organizations';

import { Container, Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import Comment from 'components/Text/Comment';
import StyledInput from 'components/Input/StyledInput';
import Icon from 'components/Icon';

import DashboardSections from './containers/DashboardSections';
import OrganizationInterventionRow from './containers/OrganizationInterventionRow';

import messages from '../../messages';

const DashboardSetup = ({
  organization,
  fetchOrganization,
  selectEntity,
  editOrganization,
}) => {
  const { organizationId } = useParams();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!organization) {
      fetchOrganization(organizationId);
      selectEntity(organizationId);
    }
  }, []);
  const onBlur = (name) => {
    editOrganization({ id: organizationId, name });
  };

  if (!organization) return <Loader fullSize />;

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.dashboardSetup)}</title>
      </Helmet>
      <Container mx="55px !important">
        <Row>
          <Col mt={30}>
            <Row align="center">
              <StyledInput
                placeholder="Enter organization name"
                type="singleline"
                value={organization.name}
                onBlur={onBlur}
                fontSize={32}
                fontWeight="bold"
                maxWidth="100%"
                mr={8}
              />
              <Icon src={EditIcon} />
            </Row>
            <Comment my={30}>
              {formatMessage(messages.reportingInterventions)}
            </Comment>
            <OrganizationInterventionRow
              formatMessage={formatMessage}
              organizationId={organizationId}
            />
          </Col>
        </Row>

        <Row>
          <Col mt={40}>
            <DashboardSections />
          </Col>
        </Row>
      </Container>
    </>
  );
};

DashboardSetup.propTypes = {
  organization: PropTypes.object,
  fetchOrganization: PropTypes.func,
  selectEntity: PropTypes.func,
  editOrganization: PropTypes.func,
};

const mapStateToProps = () =>
  createStructuredSelector({
    organization: makeSelectOrganization(),
  });

const mapDispatchToProps = {
  fetchOrganization: fetchOrganizationRequest,
  selectEntity: selectEntityAction,
  editOrganization: editOrganizationRequest,
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DashboardSetup);
