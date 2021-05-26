import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { compose } from 'redux';

import {
  allHealthSystemsSagas,
  fetchHealthSystemsRequest,
  makeSelectHealthSystemState,
  healthSystemsReducer,
} from 'global/reducers/healthSystems';

import { themeColors } from 'theme';
import Comment from 'components/Text/Comment';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import Box from 'components/Box';

import HealthSystemItem from '../../components/HealthSystemItem';
import messages from './messages';

const HealthSystemsPanel = ({
  healthSystemsState: {
    healthSystems,
    healthSystemsLoading,
    healthSystemsError,
  },
  fetchHealthSystems,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchHealthSystems();
  }, []);

  const renderHealthSystems = () => {
    if (healthSystemsError) {
      return <ErrorAlert errorText={healthSystemsError} />;
    }
    if (healthSystemsLoading) {
      return <Spinner color={themeColors.secondary} />;
    }
    return healthSystems.map((healthSystem, index) => (
      <HealthSystemItem
        healthSystem={healthSystem}
        key={healthSystems?.id || index}
      />
    ));
  };

  return (
    <Box width="100%">
      <Comment width="100%">{formatMessage(messages.healthSystems)}</Comment>
      {renderHealthSystems()}
    </Box>
  );
};

HealthSystemsPanel.propTypes = {
  healthSystemsState: PropTypes.object,
  fetchHealthSystems: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  healthSystemsState: makeSelectHealthSystemState(),
});

const mapDispatchToProps = {
  fetchHealthSystems: fetchHealthSystemsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'healthSystemsState', reducer: healthSystemsReducer }),
  injectSaga({
    key: 'healthSystemSagas',
    saga: allHealthSystemsSagas,
  }),
  withConnect,
)(HealthSystemsPanel);
