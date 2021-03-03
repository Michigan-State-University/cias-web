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
import { injectSaga } from 'redux-injectors';
import {
  fetchInterventionRequest,
  makeSelectInterventionState,
  changeAccessSettingRequest,
} from 'global/reducers/intervention';
import { canChangeAccessSettings } from 'models/Status/statusPermissions';
import { themeColors } from 'theme';

import AccessGiver from './containers/AccessGiver';
import LeftColumn from './Components/LeftColumn';
import RightColumn from './Components/RightColumn';
import { reducer, UPDATE } from './reducer';
import { shareOptions, SHARE_IDS } from './utils';
import { interventionSettingPageSaga } from './sagas';

import messages from './messages';

import { StyledBox } from './styled';

const SettingsPanel = ({
  intervention,
  changeAccessSetting,
  interventionState: {
    intervention: { status },
    loaders: {
      fetchInterventionLoading,
      changeAccessSettingLoading,
      enableAccessLoading,
      fetchUserAccessLoading,
    },
    errors: { fetchInterventionError, fetchUserAccessError },
  },
}) => {
  const [state, dispatch] = useReducer(reducer, {});

  const changingAccessSettingsPossible = canChangeAccessSettings(status);

  const updateSetting = newSetting =>
    changeAccessSetting(intervention.id, newSetting);

  const { shared_to: sharedTo, usersWithAccess } = intervention || {};

  const dispatchUpdate = newState =>
    dispatch({
      type: UPDATE,
      newState,
    });

  useEffect(() => {
    dispatchUpdate(shareOptions.find(option => option.id === sharedTo));
  }, [sharedTo]);

  const currentOption = shareOptions.find(option => option.id === sharedTo);

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return <ErrorAlert errorText={fetchInterventionError} />;

  return (
    <StyledBox>
      <Column width="100%" padding={35}>
        {!changeAccessSettingLoading && (
          <>
            <H2 mb={25}>
              <FormattedMessage {...messages.subheader} />
            </H2>
            <LeftColumn
              disabled={!changingAccessSettingsPossible}
              currentOption={currentOption}
              dispatchUpdate={dispatchUpdate}
              updateAccessSetting={updateSetting}
            />
            {state && <RightColumn state={state} />}
            {currentOption &&
              currentOption.id ===
                SHARE_IDS.onlyInvitedRegisteredParticipant && (
                <AccessGiver
                  usersWithAccess={usersWithAccess}
                  intervention={intervention}
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
  intervention: PropTypes.object,
  changeAccessSetting: PropTypes.func,
  interventionState: PropTypes.shape({
    loaders: PropTypes.object,
    intervention: PropTypes.shape({ status: PropTypes.string }),
    errors: PropTypes.shape({
      fetchInterventionError: PropTypes.string,
      fetchUserAccessError: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  interventionState: makeSelectInterventionState(),
});

const mapDispatchToProps = {
  fetchIntervention: fetchInterventionRequest,
  changeAccessSetting: changeAccessSettingRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'interventionSettingPage',
  saga: interventionSettingPageSaga,
});

export default compose(
  withConnect,
  withSaga,
)(SettingsPanel);
