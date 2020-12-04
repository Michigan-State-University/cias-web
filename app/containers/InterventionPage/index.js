/**
 *
 * InterventionPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import Row from 'components/Row';
import SingleTile from 'containers/SingleTile';
import TileRenderer from 'components/TileRenderer';
import useFilter from 'utils/useFilter';
import SearchInput from 'components/Input/SearchInput';
import { statusTypes } from 'models/Status/StatusTypes';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  createInterventionRequest,
  createInterventionSaga,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';
import {
  fetchInterventionsRequest,
  makeSelectInterventionsState,
  interventionsReducer,
  fetchInterventionsSaga,
} from 'global/reducers/interventions';

import StatusFilter from './StatusFilter';
import messages from './messages';
import { InitialRow } from './styled';

export function InterventionPage({
  fetchInterventionsRequest: fetchInterventions,
  interventionPageState: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
  intl: { formatMessage },
  createInterventionRequest: createIntervention,
  createInterventionLoading,
}) {
  useInjectReducer({ key: 'interventions', reducer: interventionsReducer });
  useInjectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga });
  useInjectSaga({ key: 'createIntervention', saga: createInterventionSaga });

  const [valueFilteredInterventions, filterValue, setFilterValue] = useFilter(
    interventions,
    'name',
    {},
  );

  const [finalInterventions, filterStatus, setFilterStatus] = useFilter(
    valueFilteredInterventions,
    'status',
    { initialDelay: 0, initialValue: statusTypes },
  );

  useEffect(() => {
    fetchInterventions();
  }, []);

  const handleChange = value => () => {
    if (filterStatus.includes(value))
      setFilterStatus(filterStatus.filter(el => el !== value));
    else setFilterStatus([...filterStatus, value]);
  };

  const handleFilterStatus = e => {
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    handleChange(value)();
  };

  const handleClearFilters = () => {
    setFilterStatus(statusTypes);
  };

  const mapIntervention = intervention => (
    <SingleTile
      tileData={intervention}
      link={`/interventions/${intervention.id}/`}
    />
  );

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return <ErrorAlert errorText={fetchInterventionError} fullPage />;

  if (!finalInterventions.length && !interventions.length) {
    return (
      <AppContainer>
        <H1 my={35}>
          <FormattedMessage {...messages.noInterventions} />
        </H1>
        <TileRenderer
          containerKey="intervention"
          newLabel={formatMessage(messages.createIntervention)}
          onCreateCall={createIntervention}
          createLoading={createInterventionLoading}
        />
      </AppContainer>
    );
  }
  return (
    <AppContainer>
      <InitialRow>
        <H1 mt={35}>
          <FormattedMessage {...messages.myInterventions} />
        </H1>
      </InitialRow>
      <InitialRow>
        <Row my={35} justify="between" width={400} height={30}>
          <StatusFilter
            onClick={handleFilterStatus}
            formatMessage={formatMessage}
            active={filterStatus}
            onClear={handleClearFilters}
          />
        </Row>
        <Row align="center">
          <SearchInput
            value={filterValue}
            onChange={e => setFilterValue(e.target.value)}
            ml={5}
            placeholder={formatMessage(messages.filter)}
          />
        </Row>
      </InitialRow>
      {filterValue && finalInterventions.length === 0 && (
        <h3>
          <FormattedMessage {...messages.noFilterResults} />
        </h3>
      )}
      <TileRenderer
        containerKey="intervention"
        elements={finalInterventions}
        mapFunction={mapIntervention}
        newLabel={formatMessage(messages.createIntervention)}
        onCreateCall={createIntervention}
        createLoading={createInterventionLoading}
      />
    </AppContainer>
  );
}

InterventionPage.propTypes = {
  fetchInterventionsRequest: PropTypes.func.isRequired,
  createInterventionRequest: PropTypes.func,
  interventionPageState: PropTypes.object,
  intl: PropTypes.object,
  createInterventionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  interventionPageState: makeSelectInterventionsState(),
  createInterventionLoading: makeSelectInterventionLoader(
    'createInterventionLoading',
  ),
});

const mapDispatchToProps = {
  fetchInterventionsRequest,
  createInterventionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(InterventionPage);
