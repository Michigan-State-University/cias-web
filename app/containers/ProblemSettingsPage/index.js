/**
 *
 * ProblemSettingsPage
 *
 */

import React, { useLayoutEffect, useReducer, useEffect } from 'react';
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
  fetchProblemRequest,
  makeSelectProblemState,
  changeAccessSettingRequest,
} from 'global/reducers/problem';
import { colors, themeColors } from 'theme';

import Spinner from 'components/Spinner';
import AccessGiver from './containers/AccessGiver';
import LeftColumn from './Components/LeftColumn';
import RightColumn from './Components/RightColumn';
import messages from './messages';
import { reducer, UPDATE } from './reducer';
import { shareOptions, ids } from './utils';
import { problemSettingPageSaga } from './sagas';

const ProblemSettingsPage = ({
  match: {
    params: { problemId },
  },
  fetchProblem,
  changeAccessSetting,
  problemState: {
    problem,
    loaders: {
      fetchProblemLoading,
      changeAccessSettingLoading,
      enableAccessLoading,
      fetchUserAccessLoading,
    },
    errors: { fetchProblemError, fetchUserAccessError },
  },
}) => {
  const [state, dispatch] = useReducer(reducer, {});
  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });

  useLayoutEffect(() => {
    fetchProblem(problemId);
  }, []);

  const updateSetting = newSetting =>
    changeAccessSetting(problemId, newSetting);

  const { name, id, shared_to: sharedTo, usersWithAccess } = problem || {};

  const dispatchUpdate = newState =>
    dispatch({
      type: UPDATE,
      newState,
    });

  useEffect(() => {
    dispatchUpdate(shareOptions.find(option => option.id === sharedTo));
  }, [sharedTo]);

  const currentOption = shareOptions.find(option => option.id === sharedTo);

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
        {!changeAccessSettingLoading && (
          <>
            <Row>
              <LeftColumn
                currentOption={currentOption}
                dispatchUpdate={dispatchUpdate}
                updateAccessSetting={updateSetting}
              />
              {state && <RightColumn state={state} />}
            </Row>
            {currentOption &&
              currentOption.id === ids.onlyInvitedRegisteredParticipant && (
                <AccessGiver
                  usersWithAccess={usersWithAccess}
                  problemId={problemId}
                  enableAccessLoading={enableAccessLoading}
                  fetchUserAccessLoading={fetchUserAccessLoading}
                  fetchUserAccessError={fetchUserAccessError}
                />
              )}
          </>
        )}
        {changeAccessSettingLoading && (
          <Spinner color={themeColors.secondary} size={100} />
        )}
      </Column>
    </Box>
  );
};

ProblemSettingsPage.propTypes = {
  match: PropTypes.object,
  fetchProblem: PropTypes.func,
  changeAccessSetting: PropTypes.func,
  problemState: PropTypes.shape({
    problem: PropTypes.object,
  }),
};

const mapStateToProps = createStructuredSelector({
  problemState: makeSelectProblemState(),
});

const mapDispatchToProps = {
  fetchProblem: fetchProblemRequest,
  changeAccessSetting: changeAccessSettingRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'problemSettingPage',
  saga: problemSettingPageSaga,
});

export default compose(
  withConnect,
  withSaga,
)(ProblemSettingsPage);
