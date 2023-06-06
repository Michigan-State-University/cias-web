import React, { memo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';

import { Editor } from 'models/Intervention';

import {
  makeSelectCollaborationLoading,
  makeSelectCurrentEditor,
  makeSelectHasCollaborators,
  makeSelectIsCurrentUserEditor,
} from 'global/reducers/intervention';

import { InterventionChannelContext } from 'utils/useInterventionChannel';

import Row from 'components/Row';
import Text, { EllipsisText } from 'components/Text';
import { LabelPosition, Switch } from 'components/Switch';

import messages from './messages';

export type Props = {};

const Component: React.FC<Props> = () => {
  const { formatMessage } = useIntl();

  const interventionChannel = useContext(InterventionChannelContext);

  const hasCollaborators: boolean = useSelector(makeSelectHasCollaborators());
  const isLoading: boolean = useSelector(makeSelectCollaborationLoading());
  const isCurrentUserEditor: boolean = useSelector(
    makeSelectIsCurrentUserEditor(),
  );
  const currentEditor: Nullable<Editor> = useSelector(
    makeSelectCurrentEditor(),
  );

  const editingByOtherUser = !!currentEditor && !isCurrentUserEditor;

  // TODO enable switch only if user has correct access
  // TODO disable editing if switch is not on
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
      px={48}
    >
      <Text fontSize={15} lineHeight={1.5} flexShrink={0}>
        {formatMessage(messages.currentMode, { editing: isCurrentUserEditor })}
      </Text>
      <Row flexShrink={0} align="center">
        <Switch
          id="enable-intervention-editing"
          checked={isCurrentUserEditor}
          onToggle={handleToggle}
          labelPosition={LabelPosition.Right}
          labelOffset={8}
          loading={isLoading}
          disabled={editingByOtherUser}
        >
          <Text fontSize={15} lineHeight={1.5}>
            {formatMessage(messages.enableEditing)}
          </Text>
        </Switch>
      </Row>
      {editingByOtherUser && (
        <EllipsisText
          text={formatMessage(messages.editedByOtherUser, {
            ...currentEditor,
          })}
          fontSize={15}
          lineHeight={1.5}
        />
      )}
    </Row>
  );
};

export const CollaborationPanel = memo(Component);
