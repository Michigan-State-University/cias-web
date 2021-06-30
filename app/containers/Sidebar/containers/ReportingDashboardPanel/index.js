import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { compose } from 'redux';

import { colors, themeColors } from 'theme';
import {
  createOrganizationRequest,
  fetchOrganizationsRequest,
  makeSelectNewOrganizationLoader,
  makeSelectOrganizations,
  makeSelectOrganizationsError,
  makeSelectOrganizationsLoader,
  organizationsReducer,
} from 'global/reducers/organizations';
import allOrganizationsSagas from 'global/reducers/organizations/sagas';

import Comment from 'components/Text/Comment';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import Box from 'components/Box';
import Column from 'components/Column';

import messages from './messages';
import OrganizationItem from '../../components/OrganizationItem';

const ReportingDashboardPanel = ({
  organizations,
  organizationsLoading,
  organizationsError,
  fetchOrganizations,
  createOrganization,
  newOrganizationLoading,
  canAccessOrganizations,
  canAddNewOrganization,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const addNewOrganization = () => {
    createOrganization();
  };

  const renderOrganizations = () => {
    if (organizationsError) {
      return <ErrorAlert errorText={organizationsError} />;
    }
    if (organizationsLoading) {
      return <Spinner color={themeColors.secondary} />;
    }
    return organizations.map(organization => (
      <OrganizationItem
        canAccessOrganizations={canAccessOrganizations}
        organization={organization}
        key={organization.id}
      />
    ));
  };

  return (
    <Column width="100%" overflow="hidden">
      {canAccessOrganizations && (
        <>
          <Comment
            width="100%"
            pt={20}
            mt={20}
            borderTop={`1px solid ${colors.botticelli}`}
          >
            {formatMessage(messages.reportingPanel)}
          </Comment>
          {canAddNewOrganization && (
            <Button
              hoverable
              radius="5px"
              my={20}
              width="auto"
              px={10}
              inverted
              color="secondary"
              onClick={addNewOrganization}
            >
              {formatMessage(messages.addOrganization)}
            </Button>
          )}
          {newOrganizationLoading && <Spinner color={themeColors.secondary} />}
        </>
      )}
      <Box overflow="scroll">{renderOrganizations()}</Box>
    </Column>
  );
};

ReportingDashboardPanel.propTypes = {
  organizations: PropTypes.array,
  organizationsLoading: PropTypes.bool,
  newOrganizationLoading: PropTypes.bool,
  canAccessOrganizations: PropTypes.bool,
  canAddNewOrganization: PropTypes.bool,
  organizationsError: PropTypes.any,
  fetchOrganizations: PropTypes.func,
  createOrganization: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  organizationsLoading: makeSelectOrganizationsLoader(),
  organizationsError: makeSelectOrganizationsError(),
  newOrganizationLoading: makeSelectNewOrganizationLoader(),
});

const mapDispatchToProps = {
  fetchOrganizations: fetchOrganizationsRequest,
  createOrganization: createOrganizationRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'organizations', reducer: organizationsReducer }),
  injectSaga({
    key: 'organizationsSagas',
    saga: allOrganizationsSagas,
  }),
  withConnect,
)(ReportingDashboardPanel);
