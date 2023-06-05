import React, { memo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';

import {
  makeSelectCollaborationLoading,
  makeSelectHasCollaborators,
  makeSelectIsCurrentUserEditor,
} from 'global/reducers/intervention';

import { InterventionChannelContext } from 'utils/useInterventionChannel';

import Row from 'components/Row';
import Text from 'components/Text';
import { LabelPosition, Switch } from 'components/Switch';

import messages from './messages';

export type Props = {};

const Component: React.FC<Props> = () => {
  const { formatMessage } = useIntl();

  const interventionChannel = useContext(InterventionChannelContext);

  const hasCollaborators = useSelector(makeSelectHasCollaborators());
  const isLoading = useSelector(makeSelectCollaborationLoading());
  const isCurrentUserEditor = useSelector(makeSelectIsCurrentUserEditor());

  // TODO enable switch only if user has correct access
  // TODO disable editing if switch is not on
  // TODO display current editor if it isn't a current user
  // TODO Hide participant data if user doesn't have correct access

  const handleToggle = (editingEnabled: boolean) => {
    if (editingEnabled) {
      interventionChannel?.startEditing();
      return;
    }
    interventionChannel?.stopEditing();
  };

  if (!hasCollaborators) return null;

  return (
    <Row
      justify="center"
      align="center"
      bg={colors.lightDivider}
      height={40}
      boxSizing="border-box"
      flexShrink={0}
      gap={16}
      borderBottom={`1px solid ${
        isCurrentUserEditor ? themeColors.secondary : colors.lightDivider
      }`}
    >
      <Text fontSize={15} lineHeight={1.5}>
        {formatMessage(messages.currentMode, { editing: isCurrentUserEditor })}
      </Text>
      <Switch
        id="enable-intervention-editing"
        checked={isCurrentUserEditor}
        onToggle={handleToggle}
        labelPosition={LabelPosition.Right}
        labelOffset={8}
        loading={isLoading}
      >
        <Text fontSize={15} lineHeight={1.5}>
          {formatMessage(messages.enableEditing)}
        </Text>
      </Switch>
    </Row>
  );
};

export const CollaborationPanel = memo(Component);
