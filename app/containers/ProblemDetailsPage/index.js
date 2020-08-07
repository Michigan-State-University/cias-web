/*
 *
 * ProblemDetailsPage
 *
 */

import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container } from 'react-grid-system';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { StyledInput } from 'components/Input/StyledInput';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Box from 'components/Box';
import BackButton from 'components/BackButton';
import {
  problemReducer,
  fetchProblemRequest,
  makeSelectProblemState,
  fetchProblemSaga,
  editProblemSaga,
  editProblemRequest,
} from 'global/reducers/problem';
import {
  createInterventionSaga,
  createInterventionRequest,
} from 'global/reducers/intervention';
import InterventionListItem from './components/InterventionListItem';
import InterventionCreateButton from './components/InterventionCreateButton';

import messages from './messages';

export function ProblemDetailsPage({
  intl: { formatMessage },
  createIntervention,
  editName,
  fetchProblem,
  match: {
    params: { problemId },
  },
  problemState: { problem, fetchProblemLoading, fetchProblemError },
}) {
  useInjectSaga({ key: 'createIntervention', saga: createInterventionSaga });
  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });
  useInjectSaga({ key: 'fetchProblem', saga: fetchProblemSaga });
  useInjectSaga({ key: 'editProblem', saga: editProblemSaga });

  const { interventions, name } = problem || {};

  useLayoutEffect(() => {
    fetchProblem(problemId);
  }, []);

  const renderList = () => (
    <>
      {interventions &&
        interventions.map((intervention, index) => (
          <InterventionListItem
            key={intervention.id}
            intervention={intervention}
            index={index}
          />
        ))}
    </>
  );

  if (fetchProblemError)
    return (
      <Container>
        <ErrorAlert errorText={fetchProblemError} />
      </Container>
    );

  if (fetchProblemLoading) return <Loader />;

  return (
    <Box height="100%" width="100%" padding="60px 160px">
      <Row>
        <BackButton to="/">
          <FormattedMessage {...messages.back} />
        </BackButton>
      </Row>
      <Row mt={18}>
        <StyledInput
          ml={-12}
          px={12}
          py={6}
          width="400px"
          value={name}
          fontSize={23}
          placeholder={formatMessage(messages.placeholder)}
          onBlur={val => editName({ path: 'name', value: val })}
          maxWidth="none"
        />
      </Row>
      <Column sm={6}>
        {renderList()}
        <Row my={18} align="center">
          <InterventionCreateButton
            handleClick={() => createIntervention(problemId)}
          />
        </Row>
      </Column>
    </Box>
  );
}

ProblemDetailsPage.propTypes = {
  intl: PropTypes.object,
  createIntervention: PropTypes.func,
  fetchProblem: PropTypes.func,
  problemState: PropTypes.shape({
    interventions: PropTypes.array,
    fetchProblemError: PropTypes.string,
    fetchProblemLoading: PropTypes.bool,
  }),
  match: PropTypes.object,
  editName: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  problemState: makeSelectProblemState(),
});

const mapDispatchToProps = {
  createIntervention: createInterventionRequest,
  fetchProblem: fetchProblemRequest,
  editName: editProblemRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(ProblemDetailsPage);
