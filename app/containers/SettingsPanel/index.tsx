/**
 *
 * SettingsPanel
 *
 */

import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';

import AddIcon from 'assets/svg/addSign2.svg';
import cog from 'assets/svg/gear-selected.svg';

import {
  fetchInterventionRequest,
  makeSelectInterventionState,
  interventionLogoSaga,
  addInterventionLogoRequest,
  deleteInterventionLogoRequest,
  updateInterventionLogoRequest,
  editInterventionRequest,
  addAttachmentRequest,
  deleteAttachmentRequest,
} from 'global/reducers/intervention';
import {
  canChangeAccessSettings,
  canEnableChat,
} from 'models/Status/statusPermissions';
import {
  InterventionType,
  Intervention,
  FileInfo,
  InterventionSharedTo,
} from 'models/Intervention';

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
import { interventionSettingPageSaga } from './sagas';
import messages from './messages';
import { StyledBox } from './styled';
import { OptionType } from './types';

const NAVIGATOR_SETTINGS_MODAL_WIDTH = 918;

interface Props {
  intervention: Intervention;
  updateIntervention: (interventionData: Partial<Intervention>) => void;
  addLogo: (interventionId: string, logoData: string, logoUrl?: string) => void;
  deleteLogo: (interventionId: string) => void;
  updateLogo: (interventionId: string, description: string) => void;
  interventionState: {
    loaders: {
      fetchInterventionLoading: boolean;
      enableAccessLoading: boolean;
      fetchUserAccessLoading: boolean;
      logoLoading: boolean;
      addAttachmentsLoading: boolean;
    };
    errors: {
      fetchInterventionError: string;
      fetchUserAccessError: string;
    };
  };
  addInterventionAttachments: (
    interventionId: string,
    attachments: File[],
  ) => void;
  deleteInterventionAttachment: (
    interventionId: string,
    fileId: string,
  ) => void;
}

const SettingsPanel = ({
  intervention,
  updateIntervention,
  addLogo,
  deleteLogo,
  updateLogo,
  interventionState: {
    loaders: {
      fetchInterventionLoading,
      enableAccessLoading,
      fetchUserAccessLoading,
      logoLoading,
      addAttachmentsLoading,
    },
    errors: { fetchInterventionError, fetchUserAccessError },
  },
  addInterventionAttachments,
  deleteInterventionAttachment,
}: Props) => {
  const { formatMessage } = useIntl();

  const [state, dispatch] = useReducer(reducer, null);
  const { openModal: openNavigatorSettingModal, Modal: NavigatorSettingModal } =
    useModal({
      type: ModalType.Modal,
      modalContentRenderer: () => (
        <NavigatorSettingsModal interventionId={intervention.id} />
      ),
      props: {
        title: formatMessage(messages.useNavigatorSettings),
        width: NAVIGATOR_SETTINGS_MODAL_WIDTH,
        height: 722,
        maxWidth: NAVIGATOR_SETTINGS_MODAL_WIDTH,
      },
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
    updateIntervention({ id: interventionId, sharedTo: newSetting });

  const updateAdditionalText = (text: string) =>
    updateIntervention({ id: interventionId, additionalText: text });

  const deleteFile = (fileInfo: FileInfo) =>
    deleteInterventionAttachment(interventionId, fileInfo.id);

  const updateType = (newType: InterventionType) => {
    if (
      type === InterventionType.DEFAULT &&
      newType !== InterventionType.DEFAULT &&
      sharedTo === InterventionSharedTo.ANYONE
    ) {
      updateIntervention({
        id: interventionId,
        type: newType,
        sharedTo: InterventionSharedTo.REGISTERED,
      });
    } else {
      updateIntervention({ id: interventionId, type: newType });
    }
  };

  const updateNaviagtorSetting = (isChatEnabled: boolean) => {
    updateIntervention({ id: interventionId, liveChatEnabled: isChatEnabled });
  };

  const onAddLogo = useCallback(
    (logo) => {
      addLogo(interventionId, logo.image);
    },
    [interventionId],
  );

  const onDeleteLogo = useCallback(() => {
    deleteLogo(interventionId);
  }, [interventionId]);

  const onUpdateLogoDescription = useCallback(
    (description) => {
      updateLogo(interventionId, description);
    },
    [interventionId],
  );

  const onFilesUpload = (attachments: File[]) => {
    addInterventionAttachments(interventionId, attachments);
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
            <H2 mr={24}>
              <FormattedMessage {...messages.useNavigator} />
            </H2>
            <Switch
              onToggle={updateNaviagtorSetting}
              checked={!!intervention?.liveChatEnabled}
              id="use-navigator-switch"
              disabled={!changingChatSettingsPossible}
            />
            <Img
              onClick={openNavigatorSettingModal}
              ml={15}
              src={cog}
              alt="manage"
              cursor="pointer"
            />
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

const mapStateToProps = createStructuredSelector({
  interventionState: makeSelectInterventionState(),
});

const mapDispatchToProps = {
  fetchIntervention: fetchInterventionRequest,
  updateIntervention: editInterventionRequest,
  addLogo: addInterventionLogoRequest,
  deleteLogo: deleteInterventionLogoRequest,
  updateLogo: updateInterventionLogoRequest,
  addInterventionAttachments: addAttachmentRequest,
  deleteInterventionAttachment: deleteAttachmentRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({
    key: 'interventionSettingPage',
    saga: interventionSettingPageSaga,
  }),
  injectSaga({
    key: 'interventionLogo',
    saga: interventionLogoSaga,
  }),
)(SettingsPanel);
