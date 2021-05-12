import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Container, Col, Row } from 'components/ReactGridSystem';
import EditIcon from 'assets/svg/edit.svg';

import {
  makeSelectOrganization,
  fetchOrganizationRequest,
} from 'global/reducers/organizations';
import Loader from 'components/Loader';
import Comment from 'components/Text/Comment';
import StyledInput from 'components/Input/StyledInput';
import Icon from 'components/Icon';
import messages from '../../messages';
import OrganizationInterventionRow from '../OrganizationInterventionRow';

const DashboardSetup = ({ organization, fetchOrganization }) => {
  const { organizationId } = useParams();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!organization) {
      fetchOrganization(organizationId);
    }
  }, []);

  if (!organization) return <Loader fullSize />;

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.dashboardSetup)}</title>
      </Helmet>
      <Container>
        <Row>
          <Col ml="55px !important" mt={30}>
            <Row align="center">
              <StyledInput
                placeholder="Enter organization name"
                type="singleline"
                value={organization.name}
                onBlur={() => {}}
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
      </Container>
    </>
  );
};

DashboardSetup.propTypes = {
  organization: PropTypes.object,
  fetchOrganization: PropTypes.func,
};

const mapStateToProps = () =>
  createStructuredSelector({
    organization: makeSelectOrganization(),
  });

const mapDispatchToProps = {
  fetchOrganization: fetchOrganizationRequest,
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardSetup);
