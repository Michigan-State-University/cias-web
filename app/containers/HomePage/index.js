/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col } from 'react-grid-system';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import useDebounce from 'utils/useDebounce';
import useIsInViewport from 'utils/useIsInViewport';

import search from 'assets/svg/search.svg';
import StatusFilter from 'containers/HomePage/StatusFilter';
import Loader from 'components/Loader';
import { Input } from 'components/Input';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import SingleInterventionPanel from 'components/SingleInterventionPanel';
import Spinner from 'components/Spinner';
import {
  interventionListReducer,
  fetchInterventionsSaga,
  makeSelectInterventionList,
  fetchInterventionsRequest,
} from 'global/reducers/interventionList';

import {
  createInterventionSaga,
  createInterventionRequest,
  makeSelectInterventionLoaders,
} from 'global/reducers/intervention';

import {
  NewInterventionFloatButton,
  AddIcon,
  InitialRow,
  ArchivedButton,
} from './styled';
import messages from './messages';

export function HomePage({
  intl: { formatMessage },
  createIntervention,
  fetchInterventions,
  loaders: { createIntervention: createInterventionLoader },
  interventionList: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
}) {
  useInjectSaga({ key: 'createIntervention', saga: createInterventionSaga });
  useInjectReducer({
    key: 'interventionList',
    reducer: interventionListReducer,
  });
  useInjectSaga({ key: 'getInterventions', saga: fetchInterventionsSaga });

  const [filterValue, setFilterValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const debouncedFilterValue = useDebounce(filterValue, 500);
  const [filteredInterventions, setFilteredInterventions] = useState(null);

  const [ref, isInViewport] = useIsInViewport();

  useEffect(() => {
    fetchInterventions();
  }, []);

  useEffect(() => {
    if (interventions) {
      setFilteredInterventions(interventions);
      setFilterValue('');
    }
  }, [interventions]);

  useEffect(() => {
    if (!interventions) return;
    if (debouncedFilterValue === '' && filterStatus === '')
      setFilteredInterventions(interventions);
    let searchedInterventions = interventions;
    if (debouncedFilterValue !== '') {
      searchedInterventions = searchedInterventions.filter(
        ({ name }) =>
          name.toLowerCase().indexOf(debouncedFilterValue.toLowerCase()) !== -1,
      );
    }
    if (filterStatus !== '') {
      searchedInterventions = searchedInterventions.filter(
        ({ status }) =>
          status.toLowerCase().indexOf(filterStatus.toLowerCase()) !== -1,
      );
    }
    setFilteredInterventions(searchedInterventions);
  }, [debouncedFilterValue, filterStatus]);

  const handleFilterStatus = e => {
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    if (value === filterStatus) {
      setFilterStatus('');
    } else {
      setFilterStatus(value);
    }
  };

  const wrapWithCol = (child, key) => (
    <Col key={`Single-intvention-${key}`} xs={12} sm={6} lg={4} xl={3}>
      {child}
    </Col>
  );

  if (fetchInterventionLoading || filteredInterventions === null)
    return <Loader />;
  if (fetchInterventionError)
    return (
      <Container>
        <ErrorAlert errorText={fetchInterventionError} />
      </Container>
    );

  if (!filteredInterventions.length && !interventions.length)
    return (
      <Container>
        <H1 my={35}>
          <FormattedMessage {...messages.noInterventions} />
        </H1>

        <SingleInterventionPanel
          clickHandler={createIntervention}
          interventionCreating={createInterventionLoader}
        />
      </Container>
    );

  return (
    <Fragment>
      <Container>
        <InitialRow>
          <H1>
            <FormattedMessage {...messages.myIntervention} />
          </H1>
          <div>
            <img src={search} alt="Search" />
            <Input
              value={filterValue}
              onChange={e => setFilterValue(e.target.value)}
              ml={5}
              placeholder={formatMessage(messages.filter)}
            />
          </div>
        </InitialRow>
        <InitialRow>
          <StatusFilter
            onClick={handleFilterStatus}
            formatMessage={formatMessage}
            active={filterStatus}
          />
          <ArchivedButton>
            {formatMessage(messages.showArchived)}
          </ArchivedButton>
        </InitialRow>
        {filterValue && filteredInterventions.length === 0 && (
          <h3>
            <FormattedMessage {...messages.noFilterResults} />
          </h3>
        )}
        <Row>
          {wrapWithCol(
            <SingleInterventionPanel
              ref={ref}
              clickHandler={createIntervention}
              interventionCreating={createInterventionLoader}
            />,
            'new',
          )}
          {filteredInterventions.map(intervention =>
            wrapWithCol(
              <SingleInterventionPanel intervention={intervention} />,
              intervention.id,
            ),
          )}
        </Row>
      </Container>
      {filteredInterventions.length !== 0 && !isInViewport && (
        <NewInterventionFloatButton onClick={createIntervention}>
          {!createInterventionLoader && (
            <>
              <AddIcon>+</AddIcon>
              <FormattedMessage {...messages.createIntervention} />
            </>
          )}
          {createInterventionLoader && <Spinner />}
        </NewInterventionFloatButton>
      )}
    </Fragment>
  );
}

HomePage.propTypes = {
  intl: PropTypes.object,
  createIntervention: PropTypes.func,
  fetchInterventions: PropTypes.func,
  homePageState: PropTypes.object,
  interventionList: PropTypes.object,
  loaders: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  interventionList: makeSelectInterventionList(),
  loaders: makeSelectInterventionLoaders(),
});

const mapDispatchToProps = {
  createIntervention: createInterventionRequest,
  fetchInterventions: fetchInterventionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(HomePage);
