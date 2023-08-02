import React, { memo, useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { colors, themeColors } from 'theme';

import { Editor } from 'models/Intervention';
import { CollaboratorData } from 'models/Collaborator';
import { useRoleManager } from 'models/User/RolesManager';

import {
  fetchCurrentUserCollaboratorDataRequest,
  makeSelectCollaborationLoading,
  makeSelectCurrentEditor,
  makeSelectCurrentUserCollaboratorData,
  makeSelectHasCollaborators,
  makeSelectInterventionLoader,
  makeSelectIsCurrentUserEditor,
  makeSelectIsCurrentUserInterventionOwner,
  withFetchCurrentUserCollaboratorDataSaga,
} from 'global/reducers/intervention';

import { InterventionChannelContext } from 'utils/useInterventionChannel';

import Row from 'components/Row';
import Text from 'components/Text';
import { LabelPosition, Switch } from 'components/Switch';
import { ModalType, useModal } from 'components/Modal';
import Loader from 'components/Loader';
import Box from 'components/Box';

import messages from './messages';

export type Props = {};

const CollaborationPanelComponent: React.FC<Props> = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectSaga(withFetchCurrentUserCollaboratorDataSaga);

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
  const fetchCurrentUserCollaboratorDataLoading = useSelector(
    makeSelectInterventionLoader('fetchCurrentUserCollaboratorData'),
  );

  const { isAdmin } = useRoleManager();

  const editingByOtherUser = !!currentEditor && !isCurrentUserEditor;
  const canEdit =
    isCurrentUserInterventionOwner ||
    currentUserCollaboratorData?.edit ||
    isAdmin;
  const interventionId = interventionChannel?.interventionId;

  const handleToggle = (editingEnabled: boolean) => {
    if (editingByOtherUser) {
      openForceEditModal(true);
      return;
    }

    if (editingEnabled) {
      interventionChannel?.startEditing();
      return;
    }
    interventionChannel?.stopEditing();
  };

  const { openModal: openForceEditModal, Modal: ForceEditModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.forceEditModalDescription),
      content: formatMessage(messages.forceEditModalContent, {
        firstName: '',
        lastName: '',
        email: '',
        ...currentEditor,
      }),
      confirmAction: () => interventionChannel?.forceStartEditing(),
    },
  });

  useEffect(() => {
    if (
      !currentUserCollaboratorData &&
      interventionId &&
      hasCollaborators &&
      !isCurrentUserInterventionOwner
    ) {
      dispatch(fetchCurrentUserCollaboratorDataRequest(interventionId));
    }
  }, [
    interventionId,
    hasCollaborators,
    isCurrentUserInterventionOwner,
    currentUserCollaboratorData,
  ]);

  if (!hasCollaborators) return null;

  return (
    <>
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
        {fetchCurrentUserCollaboratorDataLoading && (
          <>
            <Box>
              <Loader type="inline" size={40} />
            </Box>
            <Box>
              <Text
                fontSize={15}
                lineHeight={1.5}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {formatMessage(messages.loadingPermissions)}
              </Text>
            </Box>
          </>
        )}
        {!fetchCurrentUserCollaboratorDataLoading && (
          <>
            <Text fontSize={15} lineHeight={1.5} flexShrink={0}>
              {formatMessage(messages.currentMode, {
                editing: isCurrentUserEditor,
              })}
            </Text>
            {canEdit && (
              <Row flexShrink={0} align="center">
                <Switch
                  id="enable-intervention-editing"
                  checked={isCurrentUserEditor}
                  onToggle={handleToggle}
                  labelPosition={LabelPosition.Right}
                  labelOffset={8}
                  loading={isLoading}
                  disabled={
                    editingByOtherUser && !isCurrentUserInterventionOwner
                  }
                >
                  <Text fontSize={15} lineHeight={1.5}>
                    {formatMessage(messages.enableEditing)}
                  </Text>
                </Switch>
              </Row>
            )}
            {editingByOtherUser && (
              <Text
                fontSize={15}
                lineHeight={1.5}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {formatMessage(messages.editedByOtherUser, {
                  ...currentEditor,
                })}
              </Text>
            )}
          </>
        )}
      </Row>
      <ForceEditModal />
    </>
  );
};

export const CollaborationPanel = memo(CollaborationPanelComponent);
