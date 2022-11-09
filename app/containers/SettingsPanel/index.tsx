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

import { reducer, UPDATE } from './reducer';
import { interventionTypesOption, shareOptions } from './utils';
import { withInterventionSettingsPageSagas } from './sagas';
import messages from './messages';
import { StyledBox } from './styled';
import { OptionType } from './types';

const NAVIGATOR_SETTINGS_MODAL_WIDTH = 918;

interface Props {
  intervention: Intervention;
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
        <NavigatorSettingsModal interventionId={intervention.id} />
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
  } = intervention || {};

  const changingAccessSettingsPossible = canChangeAccessSettings(status);
  const changingChatSettingsPossible = canEnableChat(status);

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
    if (isChatEnabled) {
      openNavigatorSettingModal(true);
    }
    globalDispatch(
      editInterventionRequest({
        id: interventionId,
        liveChatEnabled: isChatEnabled,
      }),
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

  // @ts-ignore
  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    // @ts-ignore
    return <ErrorAlert errorText={fetchInterventionError} />;

  return (
    <Column>
      <NavigatorSettingModal />
      <StyledBox>
        <Column width="100%" padding={35}>
          <Box display="flex" align="center" mb={48}>
            <Switch
              onToggle={updateNavigatorSetting}
              checked={!!intervention?.liveChatEnabled}
              id="use-navigator-switch"
              disabled={!changingChatSettingsPossible}
            >
              <H2 mr={24}>
                <FormattedMessage {...messages.setupNavigator} />
              </H2>
            </Switch>
            {intervention?.liveChatEnabled && (
              <>
                <Img
                  onClick={openNavigatorSettingModal}
                  ml={24}
                  mr={8}
                  src={cog}
                  alt="manage"
                  cursor="pointer"
                />
                <Text fontWeight="bold">
                  <FormattedMessage {...messages.configureNavigatorSettings} />
                </Text>
              </>
            )}
          </Box>
          <InterventionRadioPanel
            radioPanelTitle={
              <FormattedMessage {...messages.interventionType} />
            }
            radioOptions={interventionTypesOption}
            disabled={!changingAccessSettingsPossible}
            selectedValue={type}
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
          <Box mt={40} />
          <InterventionRadioPanel
            onOptionHover={dispatchUpdate}
            radioPanelTitle={<FormattedMessage {...messages.subheader} />}
            radioOptions={shareOptions}
            disabled={!changingAccessSettingsPossible}
            selectedValue={sharedTo}
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
              <FileList files={files || []} handleDelete={deleteFile} />
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
