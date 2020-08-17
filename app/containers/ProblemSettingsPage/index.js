/**
 *
 * ProblemSettingsPage
 *
 */

import React, { useLayoutEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import BackButton from 'components/BackButton';
import Box from 'components/Box';
import H1 from 'components/H1';
import H3 from 'components/H3';
import Row from 'components/Row';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Loader from 'components/Loader';
import { useInjectReducer } from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  problemReducer,
  fetchProblemSaga,
  fetchProblemRequest,
  makeSelectProblemState,
} from 'global/reducers/problem';
import { colors } from 'theme';

import AccessGiver from './Components/AccessGiver';
import LeftColumn from './Components/LeftColumn';
import RightColumn from './Components/RightColumn';
import messages from './messages';
import { initialState, reducer, UPDATE } from './reducer';
import { shareOptions } from './utils';

const mockId = 'only_invited_registered_participants';

const ProblemSettingsPage = ({
  match: {
    params: { problemId },
  },
  fetchProblem,
  problemState: {
    problem,
    loaders: { fetchProblemLoading },
    errors: { fetchProblemError },
  },
}) => {
  const currentOption = shareOptions.find(option => option.id === mockId);
  const [state, dispatch] = useReducer(reducer, initialState(currentOption));

  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });

  useLayoutEffect(() => {
    fetchProblem(problemId);
  }, []);

  const dispatchUpdate = newState =>
    dispatch({
      type: UPDATE,
      newState,
    });

  const { name, id } = problem || {};

  if (fetchProblemLoading) return <Loader />;
  if (fetchProblemError) return <ErrorAlert errorText={fetchProblemError} />;

  return (
    <Box height="100%" width="100%" padding="60px 160px">
      <BackButton to={`/interventions/${id}`}>Back</BackButton>
      <H1 mt={20}>
        <FormattedMessage {...messages.header} />
      </H1>
      <H3 mt={10} fontWeight="regular">
        {name}
      </H3>
      <Column mt={35} bg={colors.white} width="100%" padding={35}>
        <Row>
          <LeftColumn
            currentOption={currentOption}
            dispatchUpdate={dispatchUpdate}
          />
          <RightColumn state={state} />
        </Row>
        <AccessGiver />
      </Column>
    </Box>
  );
};

ProblemSettingsPage.propTypes = {
  match: PropTypes.object,
  fetchProblem: PropTypes.func,
  problemState: PropTypes.shape({
    problem: PropTypes.object,
  }),
};

const mapStateToProps = createStructuredSelector({
  problemState: makeSelectProblemState(),
});

const mapDispatchToProps = {
  fetchProblem: fetchProblemRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'fetchProblem', saga: fetchProblemSaga });

export default compose(
  withConnect,
  withSaga,
)(ProblemSettingsPage);
