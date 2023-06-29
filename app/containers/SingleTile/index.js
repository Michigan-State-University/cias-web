/**
 *
 * SingleTile
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { injectReducer, injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FileShareIcon from 'assets/svg/file-share.svg';
import CopyIcon from 'assets/svg/copy.svg';
import AddAppIcon from 'assets/svg/app-add.svg';
import TranslateIcon from 'assets/svg/translate.svg';
import DocumentIcon from 'assets/svg/document.svg';
import DownloadIcon from 'assets/svg/download-line.svg';
import CollaborateIcon from 'assets/svg/collaborate-icon.svg';
import ArchiveIcon from 'assets/svg/archive.svg';

import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectUserId,
  makeSelectUserOrganizableId,
} from 'global/reducers/auth';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';
import {
  exportInterventionRequest,
  exportInterventionSaga,
  fetchInterventionSaga,
  interventionReducer,
} from 'global/reducers/intervention';
import {
  copyInterventionRequest,
  archiveInterventionRequest,
} from 'global/reducers/interventions';

import { canArchive, canEdit } from 'models/Status/statusPermissions';
import { useRoleManager } from 'models/User/RolesManager';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  CatMhAccessModal,
  CollaboratorsModal,
  COLLABORATORS_MODAL_WIDTH,
  InterventionAssignOrganizationModal,
  INTERVENTION_ASSIGN_ORGANIZATION_MODAL_WIDTH,
} from 'containers/InterventionDetailsPage/components/Modals';

import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import Dropdown from 'components/Dropdown';
import Modal, { ModalType, useModal } from 'components/Modal';
import Row from 'components/Row';
import Badge from 'components/Badge';
import Loader from 'components/Loader';

import TranslateInterventionModal from 'containers/TranslateInterventionModal';
import interventionDetailsPageSagas from 'containers/InterventionDetailsPage/saga';
import { useShareExternallyModal } from 'containers/ShareExternallyModal';

import InterventionDetails from './InterventionDetails';
import messages from './messages';
import {
  TileContainer,
  StyledLink,
  Heading,
  StatusIndicator,
  TileInfo,
} from './styled';
import { CollaboratingIndicator } from './CollaboratingIndicator';

const SingleTile = ({
  tileData,
  participantView,
  link,
  copyIntervention,
  archiveIntervention,
  intl: { formatMessage },
  userId,
  isLoading,
  exportIntervention,
  userOrganizableId,
}) => {
  const [assignOrganizationModalVisible, setAssignOrganizationModalVisible] =
    useState(false);

  const [translateModalVisible, setTranslateModalVisible] = useState(false);
  const [collaborateModalVisible, setCollaborateModalVisible] = useState(false);

  const closeAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(false);
  const openAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(true);

  const closeTranslateModal = () => setTranslateModalVisible(false);
  const openTranslateModal = () => setTranslateModalVisible(true);
  const closeCollaborateModal = () => setCollaborateModalVisible(false);
  const openCollaborateModal = () => setCollaborateModalVisible(true);

  const handleArchiveIntervention = () => archiveIntervention(id);

  const { openModal: openArchiveModal, Modal: ArchiveModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.interventionArchiveHeader),
      content: formatMessage(messages.interventionArchiveMessage),
      confirmAction: handleArchiveIntervention,
    },
  });
  const { openModal: openCatMhModal, Modal: CatMhModal } = useModal({
    type: ModalType.Modal,
    modalContentRenderer: (props) => <CatMhAccessModal {...props} />,
    props: {
      title: formatMessage(messages.catMhSettingsModalTitle),
    },
  });

  const shareExternally = (emails, ids) =>
    copyIntervention({ interventionId: id, emails, ids });
  const { Modal: ShareExternallyModal, openModal: openShareExternallyModal } =
    useShareExternallyModal(shareExternally);

  const {
    isAdmin,
    canAssignOrganizationToIntervention: showAssignOrganizationOption,
  } = useRoleManager();

  const {
    name,
    status,
    sessionsSize,
    id,
    organizationId,
    user,
    createdAt,
    updatedAt,
    googleLanguageId,
    hasCollaborators,
    userId: interventionOwnerId,
  } = tileData || {};

  const isCurrentUserInterventionOwner = interventionOwnerId === userId;

  const handleExportIntervention = () => exportIntervention(id);

  const handleClone = () => copyIntervention({ interventionId: id });

  // cannot make changes to intervention with collaborators because it would require
  // turning on edit mode first but that's impossible from the intervention list view
  const canCurrentUserMakeChanges =
    !hasCollaborators && (isAdmin || isCurrentUserInterventionOwner);

  const archivingPossible = canCurrentUserMakeChanges && canArchive(status);

  const assigningOrganizationPossible =
    canCurrentUserMakeChanges && canEdit(status);

  const showReportingBadge =
    organizationId && (isAdmin || organizationId === userOrganizableId);

  const canEditCollaborators = isAdmin || isCurrentUserInterventionOwner;

  const options = [
    {
      icon: TranslateIcon,
      action: openTranslateModal,
      label: formatMessage(messages.translate),
      id: 'translate',
    },
    {
      icon: FileShareIcon,
      action: openShareExternallyModal,
      label: formatMessage(messages.shareExternally),
      id: 'share externally',
    },
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicateHere),
      icon: CopyIcon,
      action: handleClone,
    },
    {
      id: 'archive',
      label: formatMessage(messages.archive),
      icon: ArchiveIcon,
      action: openArchiveModal,
      color: colors.bluewood,
      disabled: !archivingPossible,
    },
    ...(showAssignOrganizationOption
      ? [
          {
            icon: AddAppIcon,
            action: openAssignOrganizationModal,
            label: formatMessage(messages.assignOrganization),
            id: 'assignOrganization',
            disabled: !assigningOrganizationPossible,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            icon: DocumentIcon,
            action: () => openCatMhModal(tileData),
            label: formatMessage(messages.catMhSettingsModalTitle),
            id: 'catMhAccess',
            disabled: hasCollaborators,
          },
        ]
      : []),
    {
      id: 'export',
      label: formatMessage(messages.exportIntervention),
      icon: DownloadIcon,
      action: handleExportIntervention,
      color: colors.bluewood,
    },
    ...(canEditCollaborators
      ? [
          {
            id: 'collaborate',
            label: formatMessage(messages.collaborate),
            icon: CollaborateIcon,
            action: openCollaborateModal,
          },
        ]
      : []),
  ];

  const preventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (isLoading)
    return (
      <TileContainer>
        <Loader type="inline" />
      </TileContainer>
    );

  return (
    <>
      <CatMhModal />
      <ArchiveModal />
      <ShareExternallyModal />
      <Modal onClose={closeTranslateModal} visible={translateModalVisible}>
        <TranslateInterventionModal
          id={id}
          googleLanguageId={googleLanguageId}
          onTranslated={closeTranslateModal}
        />
      </Modal>

      <Modal
        title={formatMessage(messages.assignOrganization)}
        onClose={closeAssignOrganizationModal}
        visible={assignOrganizationModalVisible}
        width={INTERVENTION_ASSIGN_ORGANIZATION_MODAL_WIDTH}
      >
        <InterventionAssignOrganizationModal
          interventionId={id}
          organizationId={organizationId}
          onClose={closeAssignOrganizationModal}
        />
      </Modal>

      <Modal
        title={formatMessage(messages.collaborate)}
        onClose={closeCollaborateModal}
        visible={collaborateModalVisible}
        width={COLLABORATORS_MODAL_WIDTH}
        maxWidth={COLLABORATORS_MODAL_WIDTH}
      >
        <CollaboratorsModal
          interventionId={id}
          isCurrentUserInterventionOwner={isCurrentUserInterventionOwner}
        />
      </Modal>

      <StyledLink to={link}>
        <TileContainer>
          <Heading>
            <Row gap={12} align="center">
              {hasCollaborators && <CollaboratingIndicator />}
              {status && (
                <Row align="center" gap={5}>
                  <Text lineHeight={1}>
                    <FormattedMessage {...globalMessages.statuses[status]} />
                  </Text>
                  <StatusIndicator status={status} />
                </Row>
              )}
            </Row>
            {!participantView && (
              <div onClick={preventDefault}>
                <Dropdown options={options} />
              </div>
            )}
          </Heading>

          <EllipsisText text={name} fontSize={18} fontWeight="bold" />

          <Row justify="between">
            <Tooltip
              id={`${id}-tile-tooltip`}
              content={
                <InterventionDetails
                  formatMessage={formatMessage}
                  user={user}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                />
              }
            >
              <TileInfo>
                {!isNullOrUndefined(sessionsSize) && (
                  <div>
                    <Text>
                      {formatMessage(messages.sessions, {
                        sessionCount: sessionsSize,
                      })}
                    </Text>
                  </div>
                )}
              </TileInfo>
            </Tooltip>

            {showReportingBadge && (
              <Badge bg={colors.orange}>
                {formatMessage(messages.isFromOrganization)}
              </Badge>
            )}
          </Row>
        </TileContainer>
      </StyledLink>
    </>
  );
};

SingleTile.propTypes = {
  tileData: PropTypes.object,
  intl: PropTypes.object,
  participantView: PropTypes.bool,
  link: PropTypes.string,
  copyIntervention: PropTypes.func,
  archiveIntervention: PropTypes.func,
  userId: PropTypes.string,
  isLoading: PropTypes.bool,
  exportIntervention: PropTypes.func,
  userOrganizableId: PropTypes.string,
  isCurrentUserInterventionOwner: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  userOrganizableId: makeSelectUserOrganizableId(),
});

const mapDispatchToProps = {
  copyIntervention: copyInterventionRequest,
  archiveIntervention: archiveInterventionRequest,
  exportIntervention: exportInterventionRequest,
};

const SingleTileWithIntl = injectIntl(SingleTile);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  memo,
  withConnect,
  injectSaga({
    key: 'interventionOptionsSaga',
    saga: interventionOptionsSaga,
  }),
  injectSaga({
    key: 'interventionDetailsPageSagas',
    saga: interventionDetailsPageSagas,
  }),
  injectSaga({
    key: 'fetchIntervention',
    saga: fetchInterventionSaga,
  }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectSaga({ key: 'exportIntervention', saga: exportInterventionSaga }),
)(SingleTileWithIntl);
