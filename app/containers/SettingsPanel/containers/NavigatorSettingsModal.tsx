import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { injectReducer, injectSaga } from 'redux-injectors';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import {
  allNavigatorSetupSagas,
  navigatorSetupReducer,
  fetchNavigatorSetupRequest,
  makeSelectNavigatorSetupLoader,
  makeSelectNavigatorSetupError,
  makeSelectNavigatorSetup,
  updateNoNavigatorTabRequest,
  inviteNavigatorsByEmailRequest,
  removeNavigatorEmailInvitationRequest,
  removeInterventionNavigatorRequest,
  navigatorSetupReducerKey,
  makeSelectPendingNavigatorInvitations,
  makeSelectInterventionNavigators,
  makeSelectTeamNavigators,
  addNavigatorFromTeamRequest,
} from 'global/reducers/navigatorSetup';
import { themeColors, colors } from 'theme';
import { SimpleUser } from 'models/User';
import { NoNavigatorsAvailableData } from 'models/NavigatorSetup';

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

type Props = {
  interventionId: string;
};

const NavigatorSettingsModal = ({ interventionId }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const navigatorSetup = useSelector(makeSelectNavigatorSetup());
  const pendingNavigatorInvitations = useSelector(
    makeSelectPendingNavigatorInvitations(),
  );
  const interventionNavigators = useSelector(
    makeSelectInterventionNavigators(),
  );

  const teamNavigators = useSelector(makeSelectTeamNavigators());

  const loading = useSelector(
    makeSelectNavigatorSetupLoader('fetchingNavigatorSetup'),
  );

  const navigatorEmailInvitationLoading = useSelector(
    makeSelectNavigatorSetupLoader('navigatorEmailInvitation'),
  );
  const error = useSelector(makeSelectNavigatorSetupError());

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
    isNavigatorNotificationOn,
    noNavigatorAvailableMessage,
    notifyBy,
    phone,
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
              />
              <TeamNavigatorsPanel
                teamNavigators={teamNavigators}
                addNavigatorFromTeam={addNavigatorFromTeam}
              />
            </>
          }
          rightContent={
            <AddedNavigatorPanel
              interventionNavigators={interventionNavigators}
              removeInterventionNavigator={removeInterventionNavigator}
            />
          }
        />
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.noNavigator)}>
        <NavigatorModalLayout
          leftContent={
            <NoNavigatorsForm
              isNavigatorNotificationOn={isNavigatorNotificationOn}
              contactEmail={contactEmail}
              noNavigatorAvailableMessage={noNavigatorAvailableMessage}
              notifyBy={notifyBy}
              phone={phone}
              updateNoNavigatorTabData={updateNoNavigatorTabData}
            />
          }
          rightContent={
            <ParticipantLinksPanel interventionId={interventionId} />
          }
        />
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.helpingMaterials)}>
        <NavigatorModalLayout
          leftContent={<NavigatorLinksPanel interventionId={interventionId} />}
          rightContent={
            <Column gap={32}>
              <NavigatorFilesPanel interventionId={interventionId} />
              <ParticipantFilesPanel interventionId={interventionId} />
            </Column>
          }
        />
      </div>
    </Tabs>
  );
};

export default compose(
  // @ts-ignore
  injectReducer({
    key: navigatorSetupReducerKey,
    reducer: navigatorSetupReducer,
  }),
  injectSaga({ key: 'allNavigatorSetupSagas', saga: allNavigatorSetupSagas }),
)(NavigatorSettingsModal) as React.ComponentType<Props>;
