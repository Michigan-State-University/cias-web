import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { useRoleManager } from 'models/User/RolesManager';

import { makeSelectNavigatorAvailability } from 'global/reducers/notifications';

import { NotificationsActionsContext } from 'utils/useNotificationChannel';
import { LabelPosition, Switch } from 'components/Switch';
import Divider, { Orientation } from 'components/Divider';
import Row from 'components/Row';

import messages from './messages';

const NavigatorAvailabilityPanel = () => {
  const { formatMessage } = useIntl();

  const { mustSetNavigatorAvailability } = useRoleManager();

  const { setNavigatorAvailability } =
    useContext(NotificationsActionsContext) ?? {};

  const online = useSelector(makeSelectNavigatorAvailability());

  if (!mustSetNavigatorAvailability) return null;

  const handleToggle = (offline: boolean) =>
    setNavigatorAvailability && setNavigatorAvailability({ online: !offline });

  return (
    <Row align="stretch" flexShrink={0} gap={32}>
      <Switch
        id="navigator-availability-switch"
        checked={!online}
        onToggle={handleToggle}
        labelPosition={LabelPosition.Right}
        labelOffset={16}
      >
        {formatMessage(messages.offlineForLiveChat)}
      </Switch>
      <Divider orientation={Orientation.VERTICAL} />
    </Row>
  );
};

export default NavigatorAvailabilityPanel;
