import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import differenceBy from 'lodash/differenceBy';

import {
  fetchNavigatorSetupRequest,
  makeSelectNavigatorSetupLoader,
  makeSelectNavigatorSetupError,
  makeSelectNavigatorSetup,
  updateNoNavigatorTabRequest,
  inviteNavigatorsByEmailRequest,
  removeNavigatorEmailInvitationRequest,
  removeInterventionNavigatorRequest,
  makeSelectPendingNavigatorInvitations,
  makeSelectInterventionNavigators,
  makeSelectTeamNavigators,
  addNavigatorFromTeamRequest,
  withNavigatorSetupReducer,
  withAllNavigatorSetupsSagas,
} from 'global/reducers/navigatorSetup';
import { makeSelectUser } from 'global/reducers/auth';

import { SimpleUser } from 'models/User';
import { NoNavigatorsAvailableData } from 'models/NavigatorSetup';
import { useRoleManager } from 'models/User/RolesManager';

import { themeColors, colors } from 'theme';

import Tabs from 'components/Tabs';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import Column from 'components/Column';

import NavigatorModalLayout from '../Components/NavigatorModalLayout';
import NoNavigatorsForm from '../Components/NoNavigatorsForm';
import messages from '../messages';

import NavigatorEmailInvitationPanel from './NavigatorEmailInvitationPanel';
import TeamNavigatorsPanel from './TeamNavigatorsPanel';
import AddedNavigatorPanel from './AddedNavigatorsPanel';
import ParticipantLinksPanel from './ParticipantLinksPanel';
import NavigatorLinksPanel from './NavigatorLinksPanel';
import NavigatorFilesPanel from './NavigatorFilesPanel';
import ParticipantFilesPanel from './ParticipantFilesPanel';
import NavigatorScripts from './NavigatorScripts';

type Props = {
  interventionId: string;
  editingPossible: boolean;
};

const NavigatorSettingsModal = ({ interventionId, editingPossible }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectReducer(withNavigatorSetupReducer);
  useInjectSaga(withAllNavigatorSetupsSagas);

  const navigatorSetup = useSelector(makeSelectNavigatorSetup());
  const pendingNavigatorInvitations = useSelector(
    makeSelectPendingNavigatorInvitations(),
  );
  const interventionNavigators = useSelector(
    makeSelectInterventionNavigators(),
  );

  const teamNavigators = useSelector(makeSelectTeamNavigators());

  const availableTeamNavigators = useMemo(
    () => differenceBy(teamNavigators, interventionNavigators, 'id'),
    [teamNavigators, interventionNavigators],
  );

  const loading = useSelector(
    makeSelectNavigatorSetupLoader('fetchingNavigatorSetup'),
  );

  const navigatorEmailInvitationLoading = useSelector(
    makeSelectNavigatorSetupLoader('navigatorEmailInvitation'),
  );
  const error = useSelector(makeSelectNavigatorSetupError());

  const { teamId } = useSelector(makeSelectUser());

  const { canDisplayTeamNavigatorPanel } = useRoleManager();

  useEffect(() => {
    dispatch(fetchNavigatorSetupRequest(interventionId));
  }, []);

  const updateNoNavigatorTabData = (
    newData: Partial<NoNavigatorsAvailableData>,
  ) => {
    dispatch(updateNoNavigatorTabRequest(interventionId, newData));
  };

  const inviteNavigatorsByEmail = (emails: string[]) =>
    dispatch(inviteNavigatorsByEmailRequest(interventionId, emails));

  const removeNavigatorEmailInvitation = (invitationId: string) =>
    dispatch(
      removeNavigatorEmailInvitationRequest(interventionId, invitationId),
    );
  const removeInterventionNavigator = (interventionNavigatorId: string) =>
    dispatch(
      removeInterventionNavigatorRequest(
        interventionId,
        interventionNavigatorId,
      ),
    );

  const addNavigatorFromTeam = (user: SimpleUser) =>
    dispatch(addNavigatorFromTeamRequest(user, interventionId));

  if (loading) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (error || !navigatorSetup) {
    return (
      <ErrorAlert
        errorText={error || formatMessage(messages.navigatorSetupError)}
        fullPage={false}
      />
    );
  }

  const {
    contactEmail,
    noNavigatorAvailableMessage,
    phone,
    contactMessage,
    messagePhone,
  } = navigatorSetup;

  return (
    // @ts-ignore
    <Tabs
      mt={28}
      withBottomBorder
      emphasizeActiveLink
      labelStyle={{ color: colors.slateGray, fontSize: 14, lineHeight: 1 }}
      containerProps={{ mb: 0, mt: 40 }}
    >
      {/* @ts-ignore */}
      <div label={formatMessage(messages.navigators)}>
        <NavigatorModalLayout
          leftContent={
            <>
              <NavigatorEmailInvitationPanel
                pendingNavigatorInvitations={pendingNavigatorInvitations}
                inviteNavigatorsByEmail={inviteNavigatorsByEmail}
                removeNavigatorEmailInvitation={removeNavigatorEmailInvitation}
                invitationLoading={navigatorEmailInvitationLoading}
                disabled={!editingPossible}
              />
              {(teamId ?? canDisplayTeamNavigatorPanel) && (
                <TeamNavigatorsPanel
                  teamNavigators={availableTeamNavigators}
                  addNavigatorFromTeam={addNavigatorFromTeam}
                  disabled={!editingPossible}
                />
              )}
            </>
          }
          rightContent={
            <AddedNavigatorPanel
              interventionNavigators={interventionNavigators}
              removeInterventionNavigator={removeInterventionNavigator}
              disabled={!editingPossible}
            />
          }
        />
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.contactInformation)}>
        <NavigatorModalLayout
          leftContent={
            <NoNavigatorsForm
              contactEmail={contactEmail}
              noNavigatorAvailableMessage={noNavigatorAvailableMessage}
              phone={phone}
              updateNoNavigatorTabData={updateNoNavigatorTabData}
              contactMessage={contactMessage}
              messagePhone={messagePhone}
              disabled={!editingPossible}
            />
          }
          rightContent={
            <ParticipantLinksPanel
              interventionId={interventionId}
              disabled={!editingPossible}
            />
          }
        />
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.helpingMaterials)}>
        <NavigatorModalLayout
          leftContent={
            <Column gap={32}>
              <NavigatorScripts
                interventionId={interventionId}
                disabled={!editingPossible}
              />
              <NavigatorLinksPanel
                interventionId={interventionId}
                disabled={!editingPossible}
              />
            </Column>
          }
          rightContent={
            <Column gap={32}>
              <NavigatorFilesPanel
                interventionId={interventionId}
                disabled={!editingPossible}
              />
              <ParticipantFilesPanel
                interventionId={interventionId}
                disabled={!editingPossible}
              />
            </Column>
          }
        />
      </div>
    </Tabs>
  );
};

export default NavigatorSettingsModal;
