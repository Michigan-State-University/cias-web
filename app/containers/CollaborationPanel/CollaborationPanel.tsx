import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';

import { makeSelectIsCollaboratingIntervention } from 'global/reducers/intervention';

import Row from 'components/Row';
import Text from 'components/Text';
import { LabelPosition, Switch } from 'components/Switch';

import messages from './messages';

export type Props = {};

const Component: React.FC<Props> = () => {
  const { formatMessage } = useIntl();

  // TODO https://htdevelopers.atlassian.net/browse/CIAS30-3416 Create useInterventionChannel hook

  const isCollaborating = useSelector(makeSelectIsCollaboratingIntervention());

  // TODO https://htdevelopers.atlassian.net/browse/CIAS30-3416 replace with redux
  const [editing, setEditing] = useState(false);

  // TODO https://htdevelopers.atlassian.net/browse/CIAS30-3416 replace with channel action
  const handleToggle = (editingEnabled: boolean) => setEditing(editingEnabled);

  if (!isCollaborating) return null;

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
        editing ? themeColors.secondary : colors.lightDivider
      }`}
    >
      <Text fontSize={15} lineHeight={1.5}>
        {formatMessage(messages.currentMode, { editing })}
      </Text>
      <Switch
        id="enable-intervention-editing"
        checked={editing}
        // TODO https://htdevelopers.atlassian.net/browse/CIAS30-3416 replace above with below
        // checked={(editing || startingEditing) && !stoppingEditing}
        onToggle={handleToggle}
        labelPosition={LabelPosition.Right}
        labelOffset={8}
      >
        <Text fontSize={15} lineHeight={1.5}>
          {formatMessage(messages.enableEditing)}
        </Text>
      </Switch>
      {/*  TODO Show loader here while starting or stopping editing */}
    </Row>
  );
};

export const CollaborationPanel = memo(Component);
