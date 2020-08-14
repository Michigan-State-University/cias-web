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

import { StyledInput } from 'components/Input/StyledInput';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Box from 'components/Box';
import BackButton from 'components/BackButton';
import ShareBox from 'containers/ShareBox';
import {
  fetchProblemRequest,
  makeSelectProblemState,
  editProblemRequest,
  problemReducer,
} from 'global/reducers/problem';
import { createInterventionRequest } from 'global/reducers/intervention';
import {
  localStateReducer,
  makeSelectCurrentInterventionIndex,
  changeCurrentIntervention,
} from 'global/reducers/localState';
import injectSaga from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import problemDetailsPageSagas from 'containers/ProblemDetailsPage/saga';
import appStages from 'global/appStages';
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
  interventionIndex,
  changeInterventionIndex,
}) {
  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });
  useInjectReducer({
    key: 'localState',
    reducer: localStateReducer,
  });

  const { interventions, name } = problem || {};

  useLayoutEffect(() => {
    fetchProblem(problemId);
  }, []);

  const renderList = () => (
    <>
      {interventions &&
        interventions.map((intervention, index) => {
          const handleClick = () => {
            changeInterventionIndex(index);
          };
          return (
            <InterventionListItem
              key={intervention.id}
              intervention={intervention}
              index={index}
              isSelected={index === interventionIndex}
              handleClick={handleClick}
              nextInterventionName={
                interventions[index + 1] ? interventions[index + 1].name : null
              }
            />
          );
        })}
    </>
  );

  if (fetchProblemError)
    return (
      <Box>
        <ErrorAlert errorText={fetchProblemError} />
      </Box>
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
      <Row>
        <Column sm={6}>
          {renderList()}
          <Row my={18} align="center">
            <InterventionCreateButton
              handleClick={() => createIntervention(problemId)}
            />
          </Row>
        </Column>
        {process.env.APP_STAGE === appStages.dev.id && (
          <Column height="0%" sm={6} ml={38} mt={-25}>
            <ShareBox />
          </Column>
        )}
      </Row>
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
  interventionIndex: PropTypes.number,
  changeInterventionIndex: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  problemState: makeSelectProblemState(),
  interventionIndex: makeSelectCurrentInterventionIndex(),
});

const mapDispatchToProps = {
  createIntervention: createInterventionRequest,
  fetchProblem: fetchProblemRequest,
  editName: editProblemRequest,
  changeInterventionIndex: changeCurrentIntervention,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'problemDetailsPageSagas',
  saga: problemDetailsPageSagas,
});

export default compose(
  withConnect,
  withSaga,
  injectIntl,
)(ProblemDetailsPage);
