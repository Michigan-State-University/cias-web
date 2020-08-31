/**
 *
 * ProblemPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container } from 'react-grid-system';

import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import Row from 'components/Row';
import SingleTile from 'components/SingleTile';
import TileRenderer from 'components/TileRenderer';
import search from 'assets/svg/search.svg';
import useFilter from 'utils/useFilter';
import { Input } from 'components/Input';
import { archived, draft } from 'models/Status/StatusTypes';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  createProblemRequest,
  createProblemSaga,
  makeSelectProblemLoader,
} from 'global/reducers/problem';
import {
  fetchProblemsRequest,
  makeSelectProblemsState,
  problemsRedcuer,
  fetchProblemsSaga,
} from 'global/reducers/problems';

import StatusFilter from './StatusFilter';
import messages from './messages';
import { ArchiveFilter, InitialRow } from './styled';

export function ProblemPage({
  fetchProblemsRequest: fetchProblems,
  problemPageState: { problems, fetchProblemLoading, fetchProblemError },
  intl: { formatMessage },
  createProblemRequest: createProblem,
  createProblemLoading,
}) {
  useInjectReducer({ key: 'problems', reducer: problemsRedcuer });
  useInjectSaga({ key: 'fetchProblems', saga: fetchProblemsSaga });
  useInjectSaga({ key: 'createProblem', saga: createProblemSaga });

  const [valueFilteredProblems, filterValue, setFilterValue] = useFilter(
    problems,
    'name',
  );

  const [finalProblems, filterStatus, setFilterStatus] = useFilter(
    valueFilteredProblems,
    'status',
    { initialDelay: 0, initialValue: [draft] },
  );

  useEffect(() => {
    fetchProblems();
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

  const mapProblem = problem => (
    <SingleTile tileData={problem} link={`/interventions/${problem.id}/`} />
  );

  if (fetchProblemLoading) return <Loader />;
  if (fetchProblemError)
    return <ErrorAlert errorText={fetchProblemError} fullPage />;

  if (!finalProblems.length && !problems.length) {
    return (
      <Container>
        <H1 my={35}>
          <FormattedMessage {...messages.noInterventions} />
        </H1>
        <TileRenderer
          containerKey="problem"
          newLabel={formatMessage(messages.createProblem)}
          onCreateCall={createProblem}
          createLoading={createProblemLoading}
        />
      </Container>
    );
  }

  const showArchived = filterStatus.includes(archived);
  return (
    <>
      <Container>
        <InitialRow>
          <H1 mt={35}>
            <FormattedMessage {...messages.myProblems} />
          </H1>
        </InitialRow>
        <InitialRow>
          <Row my={35} justify="between" width={250} height={30}>
            <StatusFilter
              onClick={handleFilterStatus}
              formatMessage={formatMessage}
              active={filterStatus}
            />
          </Row>
          <Row align="center">
            <ArchiveFilter onClick={handleChange(archived)}>
              {showArchived
                ? formatMessage(messages.hideArchived)
                : formatMessage(messages.showArchived)}
            </ArchiveFilter>
            <img src={search} alt="Search" />
            <Input
              value={filterValue}
              onChange={e => setFilterValue(e.target.value)}
              ml={5}
              placeholder={formatMessage(messages.filter)}
            />
          </Row>
        </InitialRow>
        {filterValue && finalProblems.length === 0 && (
          <h3>
            <FormattedMessage {...messages.noFilterResults} />
          </h3>
        )}
        <TileRenderer
          containerKey="problem"
          elements={finalProblems}
          mapFunction={mapProblem}
          newLabel={formatMessage(messages.createProblem)}
          onCreateCall={createProblem}
          createLoading={createProblemLoading}
        />
      </Container>
    </>
  );
}

ProblemPage.propTypes = {
  fetchProblemsRequest: PropTypes.func.isRequired,
  createProblemRequest: PropTypes.func,
  problemPageState: PropTypes.object,
  intl: PropTypes.object,
  createProblemLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  problemPageState: makeSelectProblemsState(),
  createProblemLoading: makeSelectProblemLoader('createProblemLoading'),
});

const mapDispatchToProps = {
  fetchProblemsRequest,
  createProblemRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(ProblemPage);