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

  const isCollaborating = useSelector(makeSelectIsCollaboratingIntervention());

  const [editing, setEditing] = useState(false);

  const handleToggle = (editingEnabled: boolean) => setEditing(editingEnabled);

  // TODO negate condition
  if (isCollaborating) return null;

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
        onToggle={handleToggle}
        labelPosition={LabelPosition.Right}
        labelOffset={8}
      >
        <Text fontSize={15} lineHeight={1.5}>
          {formatMessage(messages.enableEditing)}
        </Text>
      </Switch>
    </Row>
  );
};

export const CollaborationPanel = memo(Component);
