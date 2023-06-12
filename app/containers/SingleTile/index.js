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

import BinNoBgIcon from 'assets/svg/bin-no-bg.svg';
import CsvIcon from 'assets/svg/csv-icon.svg';
import FileShareIcon from 'assets/svg/file-share.svg';
import CopyIcon from 'assets/svg/copy.svg';
import AddAppIcon from 'assets/svg/app-add.svg';
import TranslateIcon from 'assets/svg/translate.svg';
import DocumentIcon from 'assets/svg/document.svg';
import DownloadIcon from 'assets/svg/download-line.svg';
import CollaborateIcon from 'assets/svg/collaborate-icon.svg';

import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import { makeSelectUserId } from 'global/reducers/auth';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';
import {
  exportInterventionRequest,
  exportInterventionSaga,
  interventionReducer,
  sendInterventionCsvRequest,
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
import SelectResearchers from 'containers/SelectResearchers';

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
  sendCsv,
  copyIntervention,
  archiveIntervention,
  intl: { formatMessage },
  userId,
  isLoading,
  exportIntervention,
}) => {
  const [
    shareWithResearchersModalVisible,
    setShareWithResearchersModalVisible,
  ] = useState(false);

  const [assignOrganizationModalVisible, setAssignOrganizationModalVisible] =
    useState(false);

  const [translateModalVisible, setTranslateModalVisible] = useState(false);
  const [collaborateModalVisible, setCollaborateModalVisible] = useState(false);

  const closeShareWithResearchersModal = () =>
    setShareWithResearchersModalVisible(false);
  const openShareWithResearchersModal = () =>
    setShareWithResearchersModalVisible(true);

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

  const { isAdmin, canAssignOrganizationToIntervention } = useRoleManager();

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
    isCurrentUserCollaborator,
  } = tileData || {};

  const handleCsvRequest = () => sendCsv(id);

  const handleExportIntervention = () => exportIntervention(id);

  const canExportCSV = userId === user?.id;

  const handleClone = () =>
    copyIntervention({ interventionId: id, withoutRedirect: true });

  const options = [
    {
      icon: TranslateIcon,
      action: openTranslateModal,
      label: formatMessage(messages.translate),
      id: 'translate',
    },
    ...(canExportCSV
      ? [
          {
            icon: CsvIcon,
            action: handleCsvRequest,
            label: formatMessage(messages.exportCSV),
            id: 'Export CSV',
          },
        ]
      : []),
    {
      icon: FileShareIcon,
      action: openShareWithResearchersModal,
      label: formatMessage(messages.shareExternally),
      id: 'share externally',
    },
    ...((canArchive(status) && [
      {
        icon: BinNoBgIcon,
        action: openArchiveModal,
        label: formatMessage(messages.archive),
        id: 'Archive e-session',
      },
    ]) ||
      []),
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicateHere),
      icon: CopyIcon,
      action: handleClone,
    },
    ...(canAssignOrganizationToIntervention
      ? [
          {
            icon: AddAppIcon,
            action: openAssignOrganizationModal,
            label: formatMessage(messages.assignOrganization),
            id: 'assignOrganization',
            disabled: !canEdit(status),
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
    {
      id: 'collaborate',
      label: formatMessage(messages.collaborate),
      icon: CollaborateIcon,
      action: openCollaborateModal,
    },
  ];

  const preventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const copyInterventionToResearchers = (users) =>
    copyIntervention({ interventionId: id, users });

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
      <Modal
        title={formatMessage(messages.sendCopyModalTitle)}
        onClose={closeShareWithResearchersModal}
        visible={shareWithResearchersModalVisible}
      >
        <SelectResearchers
          onClose={closeShareWithResearchersModal}
          onResearchersSelected={copyInterventionToResearchers}
        />
      </Modal>
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
      >
        <CollaboratorsModal interventionId={id} />
      </Modal>

      <StyledLink to={link}>
        <TileContainer>
          <Heading>
            <Row gap={12} align="center">
              {isCurrentUserCollaborator && <CollaboratingIndicator />}
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

            {organizationId && (
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
  sendCsv: PropTypes.func,
  copyIntervention: PropTypes.func,
  archiveIntervention: PropTypes.func,
  userId: PropTypes.string,
  isLoading: PropTypes.bool,
  exportIntervention: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
});

const mapDispatchToProps = {
  copyIntervention: copyInterventionRequest,
  sendCsv: sendInterventionCsvRequest,
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
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectSaga({ key: 'exportIntervention', saga: exportInterventionSaga }),
)(SingleTileWithIntl);
