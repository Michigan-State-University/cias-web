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
  makeSelectNavigatorSetupData,
  updateNavigatorSetupRequest,
  addParticipantLinkRequest,
  updateParticipantLinkRequest,
  removeParticipantLinkRequest,
} from 'global/reducers/navigatorSetup';
import Tabs from 'components/Tabs';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';

import { themeColors } from 'theme';
import { NavigatorSetup, ParticipantLink } from 'models/NavigatorSetup';

import messages from '../messages';
import NavigatorModalLayout from '../Components/NavigatorModalLayout';

import NoNavigatorsForm from './NoNavigatorsForm';
import LinksForParticipant from './LinksForParticipant';

type Props = {
  interventionId: string;
};

const NavigatorSettingsModal = ({ interventionId }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const loading = useSelector(makeSelectNavigatorSetupLoader('fetching'));
  const error = useSelector(makeSelectNavigatorSetupError());
  const navigatorSetupData = useSelector(makeSelectNavigatorSetupData());

  useEffect(() => {
    dispatch(fetchNavigatorSetupRequest(interventionId));
  }, []);

  const updateNavigatorSettings = (
    newData: Partial<Omit<NavigatorSetup, 'id'>>,
  ) => {
    dispatch(updateNavigatorSetupRequest(interventionId, newData));
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

  if (loading) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (error || !navigatorSetupData) {
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
    participantLinks,
  } = navigatorSetupData;

  return (
    // @ts-ignore
    <Tabs withBottomBorder>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.navigators)}>Navigators</div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.noNavigator)}>
        <NavigatorModalLayout
          leftContent={
            <NoNavigatorsForm
              contactEmail={contactEmail}
              isNavigatorNotificationOn={isNavigatorNotificationOn}
              noNavigatorAvailableMessage={noNavigatorAvailableMessage}
              notifyBy={notifyBy}
              phone={phone}
              updateNavigatorSettings={updateNavigatorSettings}
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
