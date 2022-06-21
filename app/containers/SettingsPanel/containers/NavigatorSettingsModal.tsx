import React from 'react';
import { useIntl } from 'react-intl';

import Tabs from 'components/Tabs';

import messages from '../messages';
import NavigatorModalLayout from '../Components/NavigatorModalLayout';
import NoNavigatorsForm from './NoNavigatorsForm';

type Props = {
  interventionId: string;
};

const NavigatorSettingsModal = ({ interventionId }: Props) => {
  const { formatMessage } = useIntl();
  return (
    // @ts-ignore
    <Tabs withBottomBorder>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.navigators)}>
        Navigators {interventionId}
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.noNavigator)}>
        <NavigatorModalLayout
          leftContent={<NoNavigatorsForm />}
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

export default NavigatorSettingsModal;
