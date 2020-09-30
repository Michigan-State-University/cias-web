/**
 *
 * SettingsPanel
 *
 */

import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Loader from 'components/Loader';
import Spinner from 'components/Spinner';
import H2 from 'components/H2';
import injectSaga from 'utils/injectSaga';
import {
  fetchProblemRequest,
  makeSelectProblemState,
  changeAccessSettingRequest,
} from 'global/reducers/problem';
import { themeColors } from 'theme';

import AccessGiver from './containers/AccessGiver';
import LeftColumn from './Components/LeftColumn';
import RightColumn from './Components/RightColumn';
import { reducer, UPDATE } from './reducer';
import { shareOptions, ids } from './utils';
import { problemSettingPageSaga } from './sagas';

import messages from './messages';

import { StyledBox } from './styled';

const SettingsPanel = ({
  problem,
  changeAccessSetting,
  problemState: {
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

  const updateSetting = newSetting =>
    changeAccessSetting(problem.id, newSetting);

  const { shared_to: sharedTo, usersWithAccess } = problem || {};

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
    <StyledBox>
      <Column width="100%" padding={35}>
        {!changeAccessSettingLoading && (
          <>
            <H2 mb={25}>
              <FormattedMessage {...messages.subheader} />
            </H2>
            <LeftColumn
              currentOption={currentOption}
              dispatchUpdate={dispatchUpdate}
              updateAccessSetting={updateSetting}
            />
            {state && <RightColumn state={state} />}
            {currentOption &&
              currentOption.id === ids.onlyInvitedRegisteredParticipant && (
                <AccessGiver
                  usersWithAccess={usersWithAccess}
                  problemId={problem.id}
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
    </StyledBox>
  );
};

SettingsPanel.propTypes = {
  problem: PropTypes.object,
  changeAccessSetting: PropTypes.func,
  problemState: PropTypes.shape({
    loaders: PropTypes.object,
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
)(SettingsPanel);
