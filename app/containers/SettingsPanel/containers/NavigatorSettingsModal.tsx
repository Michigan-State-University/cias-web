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
  makeSelectTabsData,
  updateNoNavigatorTabRequest,
  addParticipantLinkRequest,
  updateParticipantLinkRequest,
  removeParticipantLinkRequest,
  inviteNavigatorsByEmailRequest,
  removeNavigatorEmailInvitationRequest,
  removeInterventionNavigatorRequest,
} from 'global/reducers/navigatorSetup';
import Tabs from 'components/Tabs';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';

import { themeColors, colors } from 'theme';
import {
  NoNavigatorsAvailableData,
  ParticipantLink,
} from 'models/NavigatorSetup';

import messages from '../messages';
import NavigatorModalLayout from '../Components/NavigatorModalLayout';
import NavigatorEmailInvitationPanel from './NavigatorEmailInvitationPanel';
// import TeamNavigatorsPanel from './TeamNavigatorsPanel';
import AddedNavigatorPanel from './AddedNavigatorsPanel';

import NoNavigatorsForm from '../Components/NoNavigatorsForm';
import LinksForParticipant from './LinksForParticipant';

type Props = {
  interventionId: string;
};

const NavigatorSettingsModal = ({ interventionId }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const loading = useSelector(makeSelectNavigatorSetupLoader('fetching'));
  const navigatorEmailInvitationLoading = useSelector(
    makeSelectNavigatorSetupLoader('navigatorEmailInvitation'),
  );
  const error = useSelector(makeSelectNavigatorSetupError());
  const navigatorSettingsTabData = useSelector(makeSelectTabsData());

  useEffect(() => {
    dispatch(fetchNavigatorSetupRequest(interventionId));
  }, []);

  const updateNoNavigatorTabData = (
    newData: Partial<Omit<NoNavigatorsAvailableData, 'id'>>,
  ) => {
    dispatch(updateNoNavigatorTabRequest(interventionId, newData));
  };

  const addNewParticipantLink = () =>
    dispatch(
      addParticipantLinkRequest(interventionId, {
        displayName: '',
        url: '',
      }),
    );

  const updateParticipantLink = (
    linkId: string,
    data: Partial<Omit<ParticipantLink, 'id'>>,
  ) => dispatch(updateParticipantLinkRequest(interventionId, linkId, data));

  const removeParticipantLink = (linkId: string) =>
    dispatch(removeParticipantLinkRequest(interventionId, linkId));

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

  if (loading) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (error || !navigatorSettingsTabData) {
    return (
      <ErrorAlert
        errorText={error || formatMessage(messages.navigatorSetupError)}
        fullPage={false}
      />
    );
  }

  const {
    noNavigatorsAvailable: {
      contactEmail,
      isNavigatorNotificationOn,
      noNavigatorsAvailableMessage,
      notifyBy,
      phone,
      participantLinks,
    },
    navigatorsData: { pendingNavigatorInvitations, interventionNavigators },
  } = navigatorSettingsTabData;

  return (
    // @ts-ignore
    <Tabs
      mt={30}
      withBottomBorder
      emphasizeActiveLink
      labelStyle={{ color: colors.slateGray }}
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
              {/* REMOVED FOR NOW AS WE DON'T SUPPORT TEAM INVITATIONS YET */}
              {/* <TeamNavigatorsPanel /> */}
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
              noNavigatorsAvailableMessage={noNavigatorsAvailableMessage}
              notifyBy={notifyBy}
              phone={phone}
              updateNoNavigatorTabData={updateNoNavigatorTabData}
            />
          }
          rightContent={
            <LinksForParticipant
              links={participantLinks}
              addParticipantLink={addNewParticipantLink}
              updateParticipantLink={updateParticipantLink}
              removeParticipantLink={removeParticipantLink}
            />
          }
        />
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.helpingMaterials)}>
        Helping materials
      </div>
    </Tabs>
  );
};

export default compose(
  // @ts-ignore
  injectReducer({ key: 'navigatorSetup', reducer: navigatorSetupReducer }),
  injectSaga({ key: 'allNavigatorSetupSagas', saga: allNavigatorSetupSagas }),
)(NavigatorSettingsModal) as React.ComponentType<Props>;
