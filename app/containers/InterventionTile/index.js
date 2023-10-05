/**
 *
 * InterventionTile
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
  withStarInterventionSaga,
  withUnstarInterventionSaga,
  starInterventionRequest,
  unstarInterventionRequest,
} from 'global/reducers/interventions';

import { canArchive, canEdit } from 'models/Status/statusPermissions';
import { useRoleManager } from 'models/User/RolesManager';
import { SensitiveDataState } from 'models/Intervention';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { isInterventionExportFeatureEnabled } from 'utils/env';

import {
  InterventionAssignOrganizationModal,
  INTERVENTION_ASSIGN_ORGANIZATION_MODAL_WIDTH,
} from 'containers/InterventionDetailsPage/components/Modals';
import { useCollaboratorsModal } from 'containers/CollaboratorsModal';

import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import Dropdown from 'components/Dropdown';
import Modal, { ModalType, useModal } from 'components/Modal';
import Row from 'components/Row';
import Badge from 'components/Badge';
import Loader from 'components/Loader';
import {
  useHenryFordBranchingInfoModal,
  HenryFordBranchingInfoType,
  InterventionHenryFordBranchingInfoAction,
} from 'components/HenryFordBrachingInfoModal';
import { CollaboratingIndicator } from 'components/CollaboratingIndicator';
import { TileContainer } from 'components/TileContainer';
import Column from 'components/Column';
import { DataClearedIcon } from 'components/DataClearedIndicator';

import TranslateInterventionModal from 'containers/TranslateInterventionModal';
import interventionDetailsPageSagas from 'containers/InterventionDetailsPage/saga';
import {
  ShareExternallyLevel,
  useShareExternallyModal,
} from 'containers/ShareExternallyModal';

import InterventionDetails from './InterventionDetails';
import messages from './messages';
import { StyledLink, Heading, StatusIndicator, TileInfo } from './styled';
import { useClearInterventionData } from '../ClearInterventionData';
import { StarButton } from './StarButton';

const InterventionTile = ({
  tileData,
  tileState,
  participantView,
  link,
  copyIntervention,
  archiveIntervention,
  intl: { formatMessage },
  userId,
  isLoading,
  exportIntervention,
  userOrganizableId,
  starIntervention,
  unstarIntervention,
}) => {
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
    hfhsAccess,
    sensitiveDataState,
    clearSensitiveDataScheduledAt,
    starred,
  } = tileData || {};

  const { starInterventionLoading, unstarInterventionLoading } =
    tileState ?? {};

  const isCurrentUserInterventionOwner = interventionOwnerId === userId;

  const [assignOrganizationModalVisible, setAssignOrganizationModalVisible] =
    useState(false);

  const [translateModalVisible, setTranslateModalVisible] = useState(false);

  const closeAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(false);
  const openAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(true);

  const closeTranslateModal = () => setTranslateModalVisible(false);
  const openTranslateModal = () => setTranslateModalVisible(true);

  const handleArchiveIntervention = () => archiveIntervention(id);

  const { openModal: openArchiveModal, Modal: ArchiveModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.interventionArchiveHeader),
      content: formatMessage(messages.interventionArchiveMessage),
      confirmAction: handleArchiveIntervention,
    },
  });

  const shareExternally = (emails, ids) =>
    copyIntervention({ interventionId: id, emails, ids });
  const { Modal: ShareExternallyModal, openModal: openShareExternallyModal } =
    useShareExternallyModal(shareExternally, ShareExternallyLevel.INTERVENTION);

  const { Modal: CollaboratorsModal, openModal: openCollaboratorsModal } =
    useCollaboratorsModal(
      id,
      isCurrentUserInterventionOwner,
      interventionOwnerId,
    );

  const {
    isAdmin,
    canAssignOrganizationToIntervention: showAssignOrganizationOption,
  } = useRoleManager();

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

  const {
    Modal: HenryFordBranchingInfoModal,
    openModal: openHenryFordBranchingInfoModal,
  } = useHenryFordBranchingInfoModal(
    HenryFordBranchingInfoType.INTERVENTION,
    (action) => {
      switch (action) {
        case InterventionHenryFordBranchingInfoAction.SHARE_EXTERNALLY: {
          openShareExternallyModal();
          break;
        }
        case InterventionHenryFordBranchingInfoAction.DUPLICATE_HERE: {
          handleClone();
          break;
        }
        default: {
          break;
        }
      }
    },
  );

  const onShareExternally = () => {
    if (hfhsAccess) {
      openHenryFordBranchingInfoModal(
        InterventionHenryFordBranchingInfoAction.SHARE_EXTERNALLY,
      );
    } else {
      openShareExternallyModal();
    }
  };

  const onDuplicateHere = () => {
    if (hfhsAccess) {
      openHenryFordBranchingInfoModal(
        InterventionHenryFordBranchingInfoAction.DUPLICATE_HERE,
      );
    } else {
      handleClone();
    }
  };

  const { ClearInterventionDataOption, ClearInterventionDataModal } =
    useClearInterventionData(
      status,
      id,
      hasCollaborators,
      false,
      sensitiveDataState,
      clearSensitiveDataScheduledAt,
    );

  const onStarClick = (newStarred) => {
    if (newStarred) {
      starIntervention(id);
    } else {
      unstarIntervention(id);
    }
  };

  const options = [
    {
      icon: TranslateIcon,
      action: openTranslateModal,
      label: formatMessage(messages.translate),
      id: 'translate',
    },
    {
      icon: FileShareIcon,
      action: onShareExternally,
      label: formatMessage(messages.shareExternally),
      id: InterventionHenryFordBranchingInfoAction.SHARE_EXTERNALLY,
    },
    {
      id: InterventionHenryFordBranchingInfoAction.DUPLICATE_HERE,
      label: formatMessage(messages.duplicateHere),
      icon: CopyIcon,
      action: onDuplicateHere,
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
    ...(isInterventionExportFeatureEnabled
      ? [
          {
            id: 'export',
            label: formatMessage(messages.exportIntervention),
            icon: DownloadIcon,
            action: handleExportIntervention,
            color: colors.bluewood,
          },
        ]
      : []),
    ...(canEditCollaborators
      ? [
          {
            id: 'collaborate',
            label: formatMessage(messages.collaborate),
            icon: CollaborateIcon,
            action: openCollaboratorsModal,
          },
        ]
      : []),
    ...(isCurrentUserInterventionOwner ? [ClearInterventionDataOption] : []),
  ];

  const preventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dataCleared = sensitiveDataState === SensitiveDataState.REMOVED;

  if (isLoading)
    return (
      <TileContainer>
        <Loader type="inline" />
      </TileContainer>
    );

  return (
    <>
      <ArchiveModal />
      <HenryFordBranchingInfoModal />
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

      <CollaboratorsModal />
      <ClearInterventionDataModal />

      <StyledLink to={link}>
        <TileContainer gap={8}>
          <Column>
            <Heading>
              <Row gap={6} align="center">
                <Row gap={8} align="center">
                  {hasCollaborators && <CollaboratingIndicator iconSize={14} />}
                  {status && (
                    <Row align="center" gap={5}>
                      <Text lineHeight={1}>
                        <FormattedMessage
                          {...globalMessages.statuses[status]}
                        />
                      </Text>
                      <StatusIndicator status={status} />
                    </Row>
                  )}
                </Row>
              </Row>
              {!participantView && (
                <Row align="center">
                  <StarButton
                    starred={starred}
                    onClick={onStarClick}
                    loading={
                      starInterventionLoading || unstarInterventionLoading
                    }
                  />
                  <div onClick={preventDefault}>
                    <Dropdown
                      id={`intervention-list-item-options-${id}`}
                      options={options}
                    />
                  </div>
                </Row>
              )}
            </Heading>

            <EllipsisText
              text={name}
              fontSize={18}
              fontWeight="bold"
              lineHeight={1.3}
              lines={2}
            />
          </Column>

          <Row justify="between">
            <Tooltip
              id={`${id}-tile-tooltip`}
              content={
                <InterventionDetails
                  formatMessage={formatMessage}
                  user={user}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  dataCleared={dataCleared}
                />
              }
            >
              <TileInfo dataCleared={dataCleared}>
                <Row align="center" gap={8}>
                  {dataCleared && <DataClearedIcon />}
                  {!isNullOrUndefined(sessionsSize) && (
                    <Text fontSize={12}>
                      {formatMessage(messages.sessions, {
                        sessionCount: sessionsSize,
                      })}
                    </Text>
                  )}
                </Row>
              </TileInfo>
            </Tooltip>

            {showReportingBadge && (
              <Badge bg={colors.orange} fontSize={12}>
                {formatMessage(messages.isFromOrganization)}
              </Badge>
            )}
          </Row>
        </TileContainer>
      </StyledLink>
    </>
  );
};

InterventionTile.propTypes = {
  tileData: PropTypes.object,
  tileState: PropTypes.instanceOf(Map),
  intl: PropTypes.object,
  participantView: PropTypes.bool,
  link: PropTypes.string,
  copyIntervention: PropTypes.func,
  archiveIntervention: PropTypes.func,
  userId: PropTypes.string,
  isLoading: PropTypes.bool,
  exportIntervention: PropTypes.func,
  starIntervention: PropTypes.func,
  unstarIntervention: PropTypes.func,
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
  starIntervention: starInterventionRequest,
  unstarIntervention: unstarInterventionRequest,
};

const InterventionTileWithIntl = injectIntl(InterventionTile);

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
  injectSaga(withStarInterventionSaga),
  injectSaga(withUnstarInterventionSaga),
)(InterventionTileWithIntl);
