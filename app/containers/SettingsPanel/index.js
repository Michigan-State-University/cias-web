/**
 *
 * SettingsPanel
 *
 */

import React, {
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';

import AddIcon from 'assets/svg/addSign2.svg';

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
import { canChangeAccessSettings } from 'models/Status/statusPermissions';
import { InterventionType } from 'models/Intervention/InterventionDto';

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

import { InterventionDetailsPageContext } from 'containers/InterventionDetailsPage/utils';

import LogoUpload from './containers/LogoUpload';
import AccessGiver from './containers/AccessGiver';
import InterventionAccessDescription from './Components/InterventionAccessDescription';
import InterventionRadioPanel from './Components/InterventionRadioPanel';

import { reducer, UPDATE } from './reducer';
import { interventionTypesOption, shareOptions, SHARE_IDS } from './utils';
import { interventionSettingPageSaga } from './sagas';
import messages from './messages';
import { StyledBox } from './styled';

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
}) => {
  const { rolePermissions } = useContext(InterventionDetailsPageContext);
  const { formatMessage } = useIntl();

  const [state, dispatch] = useReducer(reducer, {});

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

  const isModuleIntervention =
    type === InterventionType.FIXED || type === InterventionType.FLEXIBLE;

  const updateAccessSettings = (newSetting) =>
    updateIntervention({ id: interventionId, sharedTo: newSetting });

  const updateAdditionalText = (text) =>
    updateIntervention({ id: interventionId, additionalText: text });

  const deleteFile = (fileInfo) =>
    deleteInterventionAttachment(intervention.id, fileInfo.id);

  const updateType = (newType) => {
    if (
      type === InterventionType.DEFAULT &&
      newType !== InterventionType.DEFAULT &&
      sharedTo === SHARE_IDS.anyoneWithTheLink
    ) {
      updateIntervention({
        id: interventionId,
        type: newType,
        sharedTo: SHARE_IDS.anyoneWhoIsARegisteredParticipant,
      });
    } else {
      updateIntervention({ id: interventionId, type: newType });
    }
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

  const onFilesUpload = (attachments) => {
    addInterventionAttachments(intervention.id, attachments);
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

  const dispatchUpdate = (newState) => {
    dispatch({
      type: UPDATE,
      newState: newState || currentOption,
    });
  };

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return <ErrorAlert errorText={fetchInterventionError} />;

  return (
    <Column>
      <StyledBox>
        <Column width="100%" padding={35}>
          <InterventionRadioPanel
            radioPanelTitle={
              <FormattedMessage {...messages.interventionType} />
            }
            radioOptions={interventionTypesOption}
            disabled={!changingAccessSettingsPossible}
            selectedValue={type}
            updateSetting={updateType}
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
            updateSetting={updateAccessSettings}
            disabledOptions={disabledOptions}
          />
          {state && <InterventionAccessDescription state={state} />}
          {currentOption.id === SHARE_IDS.onlyInvitedRegisteredParticipant && (
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
                  text={originalText?.additionalText}
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
      {rolePermissions.canEditLogo && (
        <StyledBox my={30} padding={35}>
          <LogoUpload
            intervention={intervention}
            logoLoading={logoLoading}
            addImage={onAddLogo}
            deleteImage={onDeleteLogo}
            updateDescription={onUpdateLogoDescription}
          />
        </StyledBox>
      )}
    </Column>
  );
};

SettingsPanel.propTypes = {
  intervention: PropTypes.object,
  updateIntervention: PropTypes.func,
  addLogo: PropTypes.func,
  deleteLogo: PropTypes.func,
  updateLogo: PropTypes.func,
  interventionState: PropTypes.shape({
    loaders: PropTypes.object,
    errors: PropTypes.shape({
      fetchInterventionError: PropTypes.string,
      fetchUserAccessError: PropTypes.string,
    }),
  }),
  addInterventionAttachments: PropTypes.func,
  deleteInterventionAttachment: PropTypes.func,
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
