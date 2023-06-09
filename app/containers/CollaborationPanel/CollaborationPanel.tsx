import React, { memo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';

import { Editor } from 'models/Intervention';
import { CollaboratorData } from 'models/Collaborator';
import { useRoleManager } from 'models/User/RolesManager';

import {
  makeSelectCollaborationLoading,
  makeSelectCurrentEditor,
  makeSelectCurrentUserCollaboratorData,
  makeSelectHasCollaborators,
  makeSelectIsCurrentUserEditor,
  makeSelectIsCurrentUserInterventionOwner,
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
  const isCurrentUserInterventionOwner: boolean = useSelector(
    makeSelectIsCurrentUserInterventionOwner(),
  );
  const currentUserCollaboratorData: Nullable<CollaboratorData> = useSelector(
    makeSelectCurrentUserCollaboratorData(),
  );

  const { isAdmin } = useRoleManager();

  const editingByOtherUser = !!currentEditor && !isCurrentUserEditor;
  const canEdit =
    isCurrentUserInterventionOwner ||
    currentUserCollaboratorData?.edit ||
    isAdmin;

  // TODO handle reporting intervention

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
      {canEdit && (
        <>
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
        </>
      )}
    </Row>
  );
};

export const CollaborationPanel = memo(Component);
