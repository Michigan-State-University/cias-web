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
} from 'global/reducers/navigatorSetup';
import Tabs from 'components/Tabs';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import H3 from 'components/H3';

import { themeColors } from 'theme';
import { NavigatorSetup } from 'models/NavigatorSetup';
import NoNavigatorsForm from './NoNavigatorsForm';

import messages from '../messages';
import NavigatorModalLayout from '../Components/NavigatorModalLayout';
import NavigatorEmailInvitationPanel from './NavigatorEmailInvitationPanel';
import TeamNavigatorsPanel from './TeamNavigatorsPanel';

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
  } = navigatorSetupData;

  return (
    // @ts-ignore
    <Tabs withBottomBorder>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.navigators)}>
        <NavigatorModalLayout
          leftContent={
            <>
              <NavigatorEmailInvitationPanel />
              <TeamNavigatorsPanel />
            </>
          }
          rightContent={<H3>Navigators added to this intervention</H3>}
        />
      </div>
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
          rightContent={<>No navigators tab</>}
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
