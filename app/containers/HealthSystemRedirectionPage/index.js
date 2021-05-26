import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectHealthSystemState } from 'global/reducers/healthSystems';
import { connect } from 'react-redux';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import { Redirect } from 'react-router';

const HealthSystemRedirectionPage = ({
  healthSystemsState: {
    healthSystems,
    healthSystemsLoading,
    healthSystemsError,
  },
}) => {
  if (healthSystemsError) {
    return <ErrorAlert errorText={healthSystemsError} />;
  }
  if (healthSystemsLoading || healthSystems.length === 0) {
    return <Spinner color={themeColors.secondary} />;
  }
  return <Redirect to={`health-system/${healthSystems[0].id}`} />;
};

HealthSystemRedirectionPage.propTypes = {
  healthSystemsState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  healthSystemsState: makeSelectHealthSystemState(),
});

export default connect(mapStateToProps)(HealthSystemRedirectionPage);
