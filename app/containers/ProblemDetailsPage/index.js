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
import { Link } from 'react-router-dom';

import { StyledInput } from 'components/Input/StyledInput';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Box from 'components/Box';
import BackButton from 'components/BackButton';
import ShareBox from 'containers/ShareBox';
import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
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
import { colors } from 'theme';
import appStages from 'global/appStages';

import problemDetailsPageSagas from './saga';
import InterventionCreateButton from './components/InterventionCreateButton';
import InterventionListItem from './components/InterventionListItem';
import messages from './messages';

const mockSetting =
  'Anyone who is a registered participant can access the session';

export function ProblemDetailsPage({
  intl: { formatMessage },
  createIntervention,
  editName,
  fetchProblem,
  match: {
    params: { problemId },
  },
  problemState: {
    problem,
    loaders: { fetchProblemLoading },
    errors: { fetchProblemError },
  },
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

  const { interventions, name, id } = problem || {};

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

  if (fetchProblemLoading) return <Loader />;

  if (fetchProblemError)
    return (
      <Box>
        <ErrorAlert errorText={fetchProblemError} />
      </Box>
    );

  return (
    <Box height="100%" width="100%" padding="60px 160px">
      <Row>
        <BackButton to="/">
          <FormattedMessage {...messages.back} />
        </BackButton>
      </Row>
      <Row my={18}>
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
          <Row
            bg={colors.linkWater}
            borderRadius={10}
            py={15}
            px={20}
            align="center"
            width="fit-content"
          >
            <Text fontWeight="bold" mr={12}>
              {mockSetting}
            </Text>
            <Link to={`/interventions/${id}/settings`}>
              <TextButton>
                <FormattedMessage {...messages.adjust} />
              </TextButton>
            </Link>
          </Row>
          {renderList()}
          <Row my={18} align="center">
            <InterventionCreateButton
              handleClick={() => createIntervention(problemId)}
            />
          </Row>
        </Column>
        {process.env.APP_STAGE === appStages.dev.id && (
          <Column ml={38} sm={6}>
            <Column position="sticky" top="100px">
              <ShareBox />
            </Column>
            <div />
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
