/**
 *
 * SettingsPanel
 *
 */

import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { useInjectSaga } from 'redux-injectors';

import AddIcon from 'assets/svg/addSign2.svg';
import cog from 'assets/svg/cog-primary.svg';

import {
  makeSelectInterventionState,
  addInterventionLogoRequest,
  deleteInterventionLogoRequest,
  updateInterventionLogoRequest,
  editInterventionRequest,
  addAttachmentRequest,
  deleteAttachmentRequest,
  withInterventionLogoSaga,
  makeSelectEditingPossible,
  makeSelectCanCurrentUserMakeChanges,
  makeSelectCanCurrentUserAccessParticipantsData,
} from 'global/reducers/intervention';
import {
  canChangeAccessSettings,
  canEnableChat,
} from 'models/Status/statusPermissions';
import {
  InterventionType,
  Intervention,
  InterventionSharedTo,
} from 'models/Intervention';
import { AppFile } from 'models/File';

import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Loader from 'components/Loader';
import Box from 'components/Box';
import H3 from 'components/H3';
import H2 from 'components/H2';
import { FileList } from 'components/FileList';
import Divider from 'components/Divider';
import UploadFileButton from 'components/UploadFileButton';
import OriginalTextHover from 'components/OriginalTextHover';
import ApprovableInput from 'components/Input/ApprovableInput';
import { selectQuillText } from 'components/Input/utils';
import HoverableBox from 'components/Box/HoverableBox';
import Text from 'components/Text';

import Switch from 'components/Switch';
import Img from 'components/Img';
import { ModalType, useModal } from 'components/Modal';

import LogoUpload from './containers/LogoUpload';
import AccessGiver from './containers/AccessGiver';
import NavigatorSettingsModal from './containers/NavigatorSettingsModal';
import InterventionAccessDescription from './Components/InterventionAccessDescription';
import InterventionRadioPanel from './Components/InterventionRadioPanel';
import ConversationsTranscriptPanel from './containers/ConversationsTranscriptPanel';

import { reducer, UPDATE } from './reducer';
import { interventionTypesOption, shareOptions } from './utils';
import { withInterventionSettingsPageSagas } from './sagas';
import messages from './messages';
import { StyledBox } from './styled';
import { OptionType } from './types';
import { TextButton } from '../../components/Button';

const NAVIGATOR_SETTINGS_MODAL_WIDTH = 918;

interface Props {
  intervention: Nullable<Intervention>;
}

const SettingsPanel = ({ intervention }: Props) => {
  const {
    loaders: {
      fetchInterventionLoading,
      enableAccessLoading,
      fetchUserAccessLoading,
      logoLoading,
      addAttachmentsLoading,
    },
    errors: { fetchInterventionError, fetchUserAccessError },
  } = useSelector<any, any>(makeSelectInterventionState());
  const editingPossible = useSelector(makeSelectEditingPossible());
  const canCurrentUserMakeChanges = useSelector(
    makeSelectCanCurrentUserMakeChanges(),
  );
  const canAccessParticipantsData = useSelector(
    makeSelectCanCurrentUserAccessParticipantsData(),
  );

  const globalDispatch = useDispatch();

  useInjectSaga(withInterventionSettingsPageSagas);
  useInjectSaga(withInterventionLogoSaga);
  const { formatMessage } = useIntl();

  const modalProps = useMemo(
    () => ({
      title: formatMessage(messages.useNavigatorSettings),
      width: NAVIGATOR_SETTINGS_MODAL_WIDTH,
      height: 722,
      maxWidth: NAVIGATOR_SETTINGS_MODAL_WIDTH,
      py: 32,
      px: 32,
      titleProps: {
        fontSize: 24,
        lineHeight: 1,
      },
    }),
    [],
  );

  const [state, dispatch] = useReducer(reducer, null);
  const { openModal: openNavigatorSettingModal, Modal: NavigatorSettingModal } =
    useModal({
      type: ModalType.Modal,
      modalContentRenderer: () => (
        <NavigatorSettingsModal
          interventionId={intervention!.id}
          editingPossible={editingPossible}
        />
      ),
      props: modalProps,
    });

  const {
    sharedTo,
    usersWithAccess,
    status,
    type,
    id: interventionId,
    files,
    additionalText,
    originalText,
    liveChatEnabled,
    conversationsPresent,
    conversationsTranscriptGeneratedAt,
    conversationsTranscriptFilename,
  } = intervention || {};

  const changingAccessSettingsPossible =
    editingPossible && canChangeAccessSettings(status);
  const changingChatSettingsPossible = editingPossible && canEnableChat(status);

  const isModuleIntervention =
    type === InterventionType.FIXED || type === InterventionType.FLEXIBLE;

  const updateAccessSettings = (newSetting: InterventionSharedTo) =>
    globalDispatch(
      editInterventionRequest({ id: interventionId, sharedTo: newSetting }),
    );

  const updateAdditionalText = (text: string) =>
    globalDispatch(
      editInterventionRequest({ id: interventionId, additionalText: text }),
    );

  const deleteFile = (fileInfo: AppFile) =>
    globalDispatch(deleteAttachmentRequest(interventionId, fileInfo.id));

  const updateType = (newType: InterventionType) => {
    if (
      type === InterventionType.DEFAULT &&
      newType !== InterventionType.DEFAULT &&
      sharedTo === InterventionSharedTo.ANYONE
    ) {
      globalDispatch(
        editInterventionRequest({
          id: interventionId,
          type: newType,
          sharedTo: InterventionSharedTo.REGISTERED,
        }),
      );
    } else {
      globalDispatch(
        editInterventionRequest({ id: interventionId, type: newType }),
      );
    }
  };

  const updateNavigatorSetting = (isChatEnabled: boolean) => {
    globalDispatch(
      editInterventionRequest(
        {
          id: interventionId,
          liveChatEnabled: isChatEnabled,
        },
        {
          ...(isChatEnabled && {
            onSuccess: () => openNavigatorSettingModal(true),
          }),
        },
      ),
    );
  };

  const onAddLogo = useCallback(
    (logo) => {
      globalDispatch(addInterventionLogoRequest(interventionId, logo.image));
    },
    [interventionId],
  );

  const onDeleteLogo = useCallback(() => {
    globalDispatch(deleteInterventionLogoRequest(interventionId));
  }, [interventionId]);

  const onUpdateLogoDescription = useCallback(
    (description) => {
      globalDispatch(
        updateInterventionLogoRequest(interventionId, description),
      );
    },
    [interventionId],
  );

  const onFilesUpload = (attachments: File[]) => {
    globalDispatch(addAttachmentRequest(interventionId, attachments));
  };

  useEffect(() => {
    dispatchUpdate(shareOptions.find((option) => option.id === sharedTo));
  }, [sharedTo]);

  const currentOption = useMemo(
    () => shareOptions.find((option) => option.id === sharedTo),
    [sharedTo],
  );

  const disabledOptions = useMemo(
    () => (type !== InterventionType.DEFAULT ? [shareOptions[0].id] : []),
    [type],
  );

  const dispatchUpdate = (newState: Nullable<OptionType>) => {
    dispatch({
      type: UPDATE,
      newState: newState || currentOption || null,
    });
  };

  const showConversationsTranscriptPanel =
    canAccessParticipantsData &&
    (liveChatEnabled ||
      conversationsPresent ||
      conversationsTranscriptGeneratedAt);

  // @ts-ignore
  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    // @ts-ignore
    return <ErrorAlert errorText={fetchInterventionError} />;

  if (!intervention) return null;

  return (
    <Column>
      <NavigatorSettingModal />
      <StyledBox>
        <Column width="100%" padding={35}>
          <Box display="flex" align="center">
            <Switch
              onToggle={updateNavigatorSetting}
              checked={!!liveChatEnabled}
              id="use-navigator-switch"
              disabled={!changingChatSettingsPossible}
            >
              <H2 mr={24}>
                <FormattedMessage {...messages.setupNavigator} />
              </H2>
            </Switch>
            {liveChatEnabled && (
              <TextButton
                onClick={openNavigatorSettingModal}
                buttonProps={{ display: 'flex', ml: 24, gap: 8 }}
              >
                <Img src={cog} alt="manage" />
                <Text fontWeight="bold">
                  <FormattedMessage {...messages.configureNavigatorSettings} />
                </Text>
              </TextButton>
            )}
          </Box>
          {showConversationsTranscriptPanel && (
            <ConversationsTranscriptPanel
              generatedAt={conversationsTranscriptGeneratedAt}
              filename={conversationsTranscriptFilename}
              interventionId={interventionId!}
            />
          )}
          <InterventionRadioPanel
            radioPanelTitle={
              <FormattedMessage {...messages.interventionType} />
            }
            radioOptions={interventionTypesOption}
            disabled={!changingAccessSettingsPossible}
            selectedValue={type!}
            updateSetting={(value) => updateType(value as InterventionType)}
            nameTooltip={
              <>
                <H3>
                  <FormattedMessage {...messages.normalIntervention} />
                </H3>
                <FormattedMessage {...messages.normalInterventionDescription} />
                <Box mb={20} />
                <H3>
                  <FormattedMessage {...messages.flexibleIntervention} />
                </H3>
                <FormattedMessage
                  {...messages.flexibleInterventionDescription}
                />
                <Box mb={20} />
                <H3>
                  <FormattedMessage {...messages.fixedIntervention} />
                </H3>
                <FormattedMessage {...messages.fixedInterventionDescription} />
              </>
            }
          />
          <InterventionRadioPanel
            onOptionHover={dispatchUpdate}
            radioPanelTitle={<FormattedMessage {...messages.subheader} />}
            radioOptions={shareOptions}
            disabled={!changingAccessSettingsPossible}
            selectedValue={sharedTo!}
            updateSetting={(value) =>
              updateAccessSettings(value as InterventionSharedTo)
            }
            disabledOptions={disabledOptions}
          />
          {state && <InterventionAccessDescription state={state} />}
          {currentOption?.id === InterventionSharedTo.INVITED && (
            <AccessGiver
              usersWithAccess={usersWithAccess}
              intervention={intervention}
              enableAccessLoading={enableAccessLoading}
              fetchUserAccessLoading={fetchUserAccessLoading}
              fetchUserAccessError={fetchUserAccessError}
              disabled={!canCurrentUserMakeChanges}
            />
          )}
          {type !== InterventionType.DEFAULT && (
            <>
              <Box mt={40} mb={25}>
                <OriginalTextHover
                  id="original-additional-text"
                  text={originalText?.additionalText || ''}
                >
                  <H2 id="additional-text">
                    <FormattedMessage {...messages.additionalText} />
                  </H2>
                </OriginalTextHover>
              </Box>
              <HoverableBox borderRadius="10px">
                <ApprovableInput
                  disabled={!changingAccessSettingsPossible}
                  type="multiline"
                  value={additionalText}
                  onCheck={updateAdditionalText}
                  onFocus={selectQuillText}
                  autoSize
                  richText
                  aria-labelledby="additional-text"
                  placeholder={formatMessage(
                    messages.additionalTextPlaceholder,
                  )}
                />
              </HoverableBox>
            </>
          )}
          {isModuleIntervention && (
            <>
              <FileList
                files={files || []}
                handleDelete={deleteFile}
                disabled={!editingPossible}
              />
              <Divider mt={15} mr={15} />
              {/* @ts-ignore */}
              <UploadFileButton
                icon={AddIcon}
                onUpload={onFilesUpload}
                iconProps={{ width: '32px', height: '32px' }}
                dropzoneProps={{ multiple: true }}
                isLoading={addAttachmentsLoading}
                width="fit-content"
                mt={45}
                disabled={!editingPossible}
              >
                <FormattedMessage {...messages.addFilesButtonMessage} />
              </UploadFileButton>
            </>
          )}
        </Column>
      </StyledBox>
      <StyledBox my={30} padding={35}>
        <LogoUpload
          intervention={intervention}
          logoLoading={logoLoading}
          addImage={onAddLogo}
          deleteImage={onDeleteLogo}
          updateDescription={onUpdateLogoDescription}
        />
      </StyledBox>
    </Column>
  );
};

export default SettingsPanel;
