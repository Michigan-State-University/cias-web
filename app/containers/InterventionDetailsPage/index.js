/*
 *
 * InterventionDetailsPage
 *
 */
import React, { useLayoutEffect, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import get from 'lodash/get';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import orderBy from 'lodash/orderBy';
import { Col as GCol, Row as GRow } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import { injectSaga, injectReducer } from 'redux-injectors';

import { colors, themeColors } from 'theme';

import FileShareIcon from 'assets/svg/file-share.svg';
import CopyIcon from 'assets/svg/copy.svg';
import ArchiveIcon from 'assets/svg/archive.svg';
import GearIcon from 'assets/svg/gear-wo-background.svg';
import AddAppIcon from 'assets/svg/app-add.svg';
import TranslateIcon from 'assets/svg/translate.svg';
import PadlockIcon from 'assets/svg/padlock.svg';
import DownloadIcon from 'assets/svg/download-line.svg';
import CollaborateIcon from 'assets/svg/collaborate-icon.svg';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { reorder } from 'utils/reorder';
import {
  canArchive,
  canEdit,
  canShareWithParticipants,
} from 'models/Status/statusPermissions';
import { useRoleManager } from 'models/User/RolesManager';
import { reorderScope } from 'models/Session/ReorderScope';
import { archived } from 'models/Status/StatusTypes';
import { getQuestionGroupsSaga } from 'global/reducers/questionGroups/sagas';
import { editSessionRequest, editSessionSaga } from 'global/reducers/session';
import { makeSelectUser } from 'global/reducers/auth';
import {
  fetchInterventionRequest,
  makeSelectIntervention,
  editInterventionRequest,
  interventionReducer,
  sendInterventionCsvRequest,
  reorderSessionList,
  copySessionRequest,
  createSessionRequest,
  makeSelectCurrentSessionIndex,
  changeCurrentSession,
  fetchSessionEmailsRequest,
  deleteSessionRequest,
  externalCopySessionRequest,
  makeSelectInterventionError,
  makeSelectInterventionLoader,
  exportInterventionRequest,
  exportInterventionSaga,
  makeSelectEditingPossible,
  makeSelectIsCurrentUserInterventionOwner,
  makeSelectCanCurrentUserMakeChanges,
  makeSelectCanCurrentUserAccessParticipantsData,
  fetchInterventionSaga,
  makeSelectIsCurrentUserEditor,
} from 'global/reducers/intervention';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';
import {
  copyInterventionRequest,
  withFetchInterventionsSaga,
  withInterventionsReducer,
} from 'global/reducers/interventions';
import {
  questionsReducer,
  getQuestionsRequest,
} from 'global/reducers/questions';

import SettingsPanel from 'containers/SettingsPanel';
import TranslateInterventionModal from 'containers/TranslateInterventionModal/index';
import { ShareBox, ShareBoxType } from 'containers/ShareBox';
import { CollaborationPanel } from 'containers/CollaborationPanel';
import {
  ShareExternallyLevel,
  useShareExternallyModal,
} from 'containers/ShareExternallyModal';
import { useClearInterventionData } from 'containers/ClearInterventionData';

import Modal, {
  ConfirmationModal,
  ModalType,
  useModal,
} from 'components/Modal';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Spinner from 'components/Spinner';
import AppContainer from 'components/Container';
import {
  useHenryFordBranchingInfoModal,
  HenryFordBranchingInfoType,
  InterventionHenryFordBranchingInfoAction,
} from 'components/HenryFordBrachingInfoModal';

import { useCollaboratorsModal } from 'containers/CollaboratorsModal';

import Header from './Header';
import { DraggedTest } from './styled';
import interventionDetailsPageSagas from './saga';
import SessionCreateButton from './components/SessionCreateButton/index';
import SessionListItem from './components/SessionListItem';
import {
  InterventionAssignOrganizationModal,
  InterventionSettingsModal,
  useThirdPartyToolsAccessModal,
  INTERVENTION_ASSIGN_ORGANIZATION_MODAL_WIDTH,
} from './components/Modals';
import messages from './messages';
import { InterventionDetailsPageContext, nextStatus } from './utils';
import { INTERVENTION_SETTINGS_MODAL_WIDTH } from './constants';

export function InterventionDetailsPage({
  createSession,
  editIntervention,
  fetchIntervention,
  intervention,
  fetchInterventionLoading,
  createSessionLoading,
  fetchInterventionError,
  createSessionError,
  sessionIndex,
  changeSessionIndex,
  sendCsv,
  copySession,
  reorderSessions,
  copyIntervention,
  fetchQuestions,
  fetchSessionEmails,
  deleteSession,
  externalCopySession,
  user: { organizableId: userOrganizableId },
  editSession,
  exportIntervention,
  isCurrentUserEditor,
  canCurrentUserMakeChanges,
  editingPossible,
  isCurrentUserInterventionOwner,
  canAccessParticipantsData,
}) {
  const { interventionId } = useParams();
  const { formatMessage } = useIntl();

  const [deleteConfirmationSessionId, setDeleteConfirmationSessionId] =
    useState(null);

  const { isAdmin, canAssignOrganizationToIntervention } = useRoleManager();

  const {
    sessions,
    name,
    id,
    status,
    csvGeneratedAt,
    csvFilename,
    sharedTo,
    organizationId,
    googleLanguageId,
    isAccessRevoked,
    catMhPool,
    createdCatMhSessionCount,
    licenseType,
    type,
    userId,
    hfhsAccess,
    hasCollaborators,
    sensitiveDataState,
    clearSensitiveDataScheduledAt,
  } = intervention || {};

  const showSessionCreateButton = canEdit(status);
  const sharingPossible = canShareWithParticipants(status);
  const archivingPossible = canCurrentUserMakeChanges && canArchive(status);

  const [translateModalVisible, setTranslateModalVisible] = useState(false);
  const [participantShareModalVisible, setParticipantShareModalVisible] =
    useState(false);

  const [
    interventionSettingsModalVisible,
    setInterventionSettingsModalVisible,
  ] = useState(false);
  const openInterventionSettingsModal = () =>
    setInterventionSettingsModalVisible(true);
  const closeInterventionSettingsModal = () =>
    setInterventionSettingsModalVisible(false);

  const [assignOrganizationModalVisible, setAssignOrganizationModalVisible] =
    useState(false);

  const closeTranslateModal = () => setTranslateModalVisible(false);
  const openTranslateModal = () => setTranslateModalVisible(true);
  const closeAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(false);
  const openAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(true);
  const handleCopyIntervention = () => copyIntervention({ interventionId: id });
  const handleArchiveIntervention = () =>
    editIntervention({
      status: archived,
      id: interventionId,
    });
  const handleDeleteSession = (sessionId) => {
    deleteSession(sessionId, id);
    setDeleteConfirmationSessionId(null);
  };

  const { openModal: openArchiveModal, Modal: ArchiveModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.interventionArchiveHeader),
      content: formatMessage(messages.interventionArchiveMessage),
      confirmAction: handleArchiveIntervention,
    },
  });

  const { openThirdPartyToolsAccessModal, ThirdPartyToolsModal } =
    useThirdPartyToolsAccessModal();

  const {
    openModal: openInterventionInviteModal,
    Modal: InterventionInviteModal,
  } = useModal({
    type: ModalType.Modal,
    props: {
      title: formatMessage(messages.participantShareModalTitle),
    },
    modalContentRenderer: () => (
      <ShareBox
        type={ShareBoxType.INTERVENTION}
        organizationId={organizationId}
      />
    ),
  });

  const shareExternally = (emails, ids) =>
    copyIntervention({ interventionId, emails, ids });
  const { Modal: ShareExternallyModal, openModal: openShareExternallyModal } =
    useShareExternallyModal(shareExternally, ShareExternallyLevel.INTERVENTION);

  const { Modal: CollaboratorsModal, openModal: openCollaboratorsModal } =
    useCollaboratorsModal(
      interventionId,
      isCurrentUserInterventionOwner,
      userId,
    );

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
          handleCopyIntervention();
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
      handleCopyIntervention();
    }
  };

  const canCreateCatSession = useMemo(
    () => !isAccessRevoked,
    [isAccessRevoked],
  );

  const canEditCollaborators = isAdmin || isCurrentUserInterventionOwner;

  const handleExportIntervention = () => exportIntervention(id);

  const { ClearInterventionDataOption, ClearInterventionDataModal } =
    useClearInterventionData(
      status,
      id,
      hasCollaborators,
      isCurrentUserEditor,
      sensitiveDataState,
      clearSensitiveDataScheduledAt,
    );

  const options = [
    {
      id: 'interventionSettings',
      label: formatMessage(messages.interventionSettings),
      icon: GearIcon,
      action: openInterventionSettingsModal,
      color: colors.bluewood,
    },
    {
      id: 'translate',
      label: formatMessage(messages.translate),
      icon: TranslateIcon,
      action: openTranslateModal,
      color: colors.bluewood,
    },
    {
      id: InterventionHenryFordBranchingInfoAction.SHARE_EXTERNALLY,
      label: formatMessage(messages.shareExternally),
      icon: FileShareIcon,
      action: onShareExternally,
      color: colors.bluewood,
    },
    {
      id: InterventionHenryFordBranchingInfoAction.DUPLICATE_HERE,
      label: formatMessage(messages.duplicateHere),
      icon: CopyIcon,
      action: onDuplicateHere,
      color: colors.bluewood,
    },
    {
      id: 'archive',
      label: formatMessage(messages.archive),
      icon: ArchiveIcon,
      action: openArchiveModal,
      color: colors.bluewood,
      disabled: !archivingPossible,
    },
    ...(canAssignOrganizationToIntervention
      ? [
          {
            icon: AddAppIcon,
            action: openAssignOrganizationModal,
            label: formatMessage(messages.assignOrganization),
            id: 'assignOrganization',
            disabled: !canEdit(status) || !canCurrentUserMakeChanges,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            icon: PadlockIcon,
            action: () => openThirdPartyToolsAccessModal(intervention),
            label: formatMessage(messages.thirdPartyToolsAccessModalTitle),
            id: 'thirdPartyToolsAccess',
            disabled: !canCurrentUserMakeChanges,
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
            action: openCollaboratorsModal,
          },
        ]
      : []),
    ...(isCurrentUserInterventionOwner ? [ClearInterventionDataOption] : []),
  ];

  useLayoutEffect(() => {
    fetchIntervention(interventionId);
  }, [interventionId]);

  useEffect(() => {
    if (
      !isNullOrUndefined(intervention) &&
      !isNullOrUndefined(sessions?.[sessionIndex])
    )
      fetchQuestions(sessions[sessionIndex].id);
  }, [intervention ? intervention.id : 0]);

  const handleCopySession = (sessionId) => {
    copySession({ sessionId });
  };

  const handleExternalCopySession = (params) => {
    const { sessionId, id: targetInterventionId } = params;
    externalCopySession({
      sessionId,
      currentInterventionId: interventionId,
      interventionId: targetInterventionId,
    });
  };

  const editName = (val) => editIntervention({ name: val, id: interventionId });

  const handleChangeStatus = () =>
    editIntervention({
      status: get(nextStatus, status, ''),
      id: interventionId,
    });

  const handleSendCsv = () => sendCsv(id);

  const createSessionCall = (sessionType) =>
    createSession(interventionId, sessions.length, sessionType);

  const handleReorder = (previousIndex, nextIndex) => {
    const newList = reorder(sessions, previousIndex, nextIndex);
    let position = 0;
    const orderedNewList = newList.map((session) => {
      position += 1;
      return {
        ...session,
        position,
      };
    });
    reorderSessions({
      reorderedList: orderedNewList,
      interventionId,
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (destination) handleReorder(source.index, destination.index);
  };

  const sortedSessions = useMemo(
    () => sessions && orderBy(sessions, 'position'),
    [sessions],
  );

  const renderList = () => (
    <DraggedTest>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          isDropDisabled={!editingPossible}
          droppableId="session-list"
          type={reorderScope.sessions}
        >
          {(providedDroppable) => (
            <div
              ref={providedDroppable.innerRef}
              {...providedDroppable.droppableProps}
            >
              {sortedSessions &&
                sortedSessions.map((session, index) => {
                  const handleInviteParticipantsClick = () => {
                    fetchSessionEmails(index);
                    if (index !== sessionIndex) {
                      fetchQuestions(session.id);
                      changeSessionIndex(index);
                    }
                    setParticipantShareModalVisible(true);
                  };
                  const nextSession = sortedSessions.find(
                    ({ position }) => position > session.position,
                  );
                  return (
                    <Row key={session.id}>
                      <SessionListItem
                        disabled={!editingPossible}
                        sharingPossible={sharingPossible}
                        deletionPossible={editingPossible}
                        sharedTo={sharedTo}
                        session={session}
                        index={index}
                        isSelected={index === sessionIndex}
                        handleInviteParticipantsClick={
                          handleInviteParticipantsClick
                        }
                        handleCopySession={handleCopySession}
                        handleExternalCopySession={handleExternalCopySession}
                        handleDeleteSession={(sessionId) =>
                          setDeleteConfirmationSessionId(sessionId)
                        }
                        editSession={editSession}
                        nextSessionName={nextSession ? nextSession.name : null}
                        status={status}
                        interventionType={type}
                        hfhsAccess={hfhsAccess}
                      />
                    </Row>
                  );
                })}
              {providedDroppable.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DraggedTest>
  );

  if (fetchInterventionLoading) return <Loader />;

  if (fetchInterventionError)
    return <ErrorAlert errorText={fetchInterventionError} fullPage />;

  return (
    <InterventionDetailsPageContext.Provider
      value={{
        canEdit: editingPossible,
        canShareWithParticipants: sharingPossible,
        canArchive: archivingPossible,
      }}
    >
      <Column height="100%">
        <CollaborationPanel />
        <Row overflowY="auto">
          <AppContainer
            pageTitle={formatMessage(messages.pageTitle, { name })}
            width="100%"
          >
            <ArchiveModal />
            <ThirdPartyToolsModal />
            <HenryFordBranchingInfoModal />
            <ConfirmationModal
              visible={!isNullOrUndefined(deleteConfirmationSessionId)}
              onClose={() => setDeleteConfirmationSessionId(null)}
              description={formatMessage(messages.sessionDeleteHeader)}
              content={formatMessage(messages.sessionDeleteMessage)}
              confirmAction={() =>
                handleDeleteSession(deleteConfirmationSessionId)
              }
            />
            <ShareExternallyModal />

            <Modal
              onClose={closeTranslateModal}
              visible={translateModalVisible}
            >
              <TranslateInterventionModal
                id={id}
                googleLanguageId={googleLanguageId}
                onTranslated={closeTranslateModal}
              />
            </Modal>

            <Modal
              title={formatMessage(messages.interventionSettingsModalTitle)}
              onClose={closeInterventionSettingsModal}
              visible={interventionSettingsModalVisible}
              width={INTERVENTION_SETTINGS_MODAL_WIDTH}
            >
              <InterventionSettingsModal
                editingPossible={editingPossible}
                canCurrentUserMakeChanges={canCurrentUserMakeChanges}
                onClose={closeInterventionSettingsModal}
              />
            </Modal>

            <Modal
              title={formatMessage(messages.participantShareModalTitle)}
              onClose={() => setParticipantShareModalVisible(false)}
              visible={participantShareModalVisible}
            >
              <ShareBox
                type={ShareBoxType.SESSION}
                organizationId={organizationId}
              />
            </Modal>

            <InterventionInviteModal />

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

            <Header
              name={name}
              csvGeneratedAt={csvGeneratedAt}
              csvFilename={csvFilename}
              interventionId={interventionId}
              canCurrentUserMakeChanges={canCurrentUserMakeChanges}
              editingPossible={editingPossible}
              editName={editName}
              handleChangeStatus={handleChangeStatus}
              handleSendCsv={handleSendCsv}
              options={options}
              status={status}
              organizationId={organizationId}
              canAccessCsv={canAccessParticipantsData}
              openInterventionInviteModal={openInterventionInviteModal}
              interventionType={type}
              sharingPossible={sharingPossible}
              userOrganizableId={userOrganizableId}
              hasCollaborators={hasCollaborators}
              sensitiveDataState={sensitiveDataState}
              catMhAccess={!isAccessRevoked}
              catMhLicenseType={licenseType}
              catMhPool={catMhPool}
              createdCatMhSessionCount={createdCatMhSessionCount}
            />

            <GRow>
              <GCol xl={6}>
                {renderList()}
                {createSessionLoading && (
                  <Row my={18} align="center">
                    <Spinner color={themeColors.secondary} />
                  </Row>
                )}
                {showSessionCreateButton && (
                  <Row my={18} align="center">
                    <SessionCreateButton
                      canCreateCatSession={canCreateCatSession}
                      handleSessionCreation={createSessionCall}
                      disabled={!editingPossible}
                    />
                  </Row>
                )}
                {createSessionError && (
                  <ErrorAlert errorText={createSessionError} />
                )}
              </GCol>
              <GCol xl={6}>
                <Column position="sticky" top="100px" mt={18}>
                  <SettingsPanel intervention={intervention} />
                </Column>
              </GCol>
            </GRow>
          </AppContainer>
        </Row>
      </Column>
    </InterventionDetailsPageContext.Provider>
  );
}

InterventionDetailsPage.propTypes = {
  createSession: PropTypes.func,
  fetchIntervention: PropTypes.func,
  intervention: PropTypes.object,
  fetchInterventionError: PropTypes.string,
  createSessionError: PropTypes.string,
  fetchInterventionLoading: PropTypes.bool,
  createSessionLoading: PropTypes.bool,
  editIntervention: PropTypes.func,
  sessionIndex: PropTypes.number,
  changeSessionIndex: PropTypes.func,
  sendCsv: PropTypes.func,
  copySession: PropTypes.func,
  reorderSessions: PropTypes.func,
  copyIntervention: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchSessionEmails: PropTypes.func,
  deleteSession: PropTypes.func,
  externalCopySession: PropTypes.func,
  editSession: PropTypes.func,
  user: PropTypes.object,
  exportIntervention: PropTypes.func,
  isCurrentUserEditor: PropTypes.bool,
  canCurrentUserMakeChanges: PropTypes.bool,
  editingPossible: PropTypes.bool,
  isCurrentUserInterventionOwner: PropTypes.bool,
  canAccessParticipantsData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  fetchInterventionLoading: makeSelectInterventionLoader(
    'fetchInterventionLoading',
  ),
  createSessionLoading: makeSelectInterventionLoader('createSessionLoading'),
  fetchInterventionError: makeSelectInterventionError('fetchInterventionError'),
  createSessionError: makeSelectInterventionError('createSessionError'),
  sessionIndex: makeSelectCurrentSessionIndex(),
  user: makeSelectUser(),
  isCurrentUserEditor: makeSelectIsCurrentUserEditor(),
  canCurrentUserMakeChanges: makeSelectCanCurrentUserMakeChanges(),
  editingPossible: makeSelectEditingPossible(),
  isCurrentUserInterventionOwner: makeSelectIsCurrentUserInterventionOwner(),
  canAccessParticipantsData: makeSelectCanCurrentUserAccessParticipantsData(),
});

const mapDispatchToProps = {
  createSession: createSessionRequest,
  fetchQuestions: getQuestionsRequest,
  fetchIntervention: fetchInterventionRequest,
  editIntervention: editInterventionRequest,
  changeSessionIndex: changeCurrentSession,
  fetchSessionEmails: fetchSessionEmailsRequest,
  sendCsv: sendInterventionCsvRequest,
  copySession: copySessionRequest,
  reorderSessions: reorderSessionList,
  copyIntervention: copyInterventionRequest,
  deleteSession: deleteSessionRequest,
  externalCopySession: externalCopySessionRequest,
  editSession: editSessionRequest,
  exportIntervention: exportInterventionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  injectReducer({
    key: 'intervention',
    reducer: interventionReducer,
  }),
  injectReducer(withInterventionsReducer),
  injectReducer({ key: 'questions', reducer: questionsReducer }),
  injectSaga({
    key: 'interventionOptionsSaga',
    saga: interventionOptionsSaga,
  }),
  injectSaga(withFetchInterventionsSaga),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
  injectSaga({ key: 'getQuestionGroupsSaga', saga: getQuestionGroupsSaga }),
  injectSaga({ key: 'editSession', saga: editSessionSaga }),
  injectSaga({
    key: 'interventionDetailsPageSagas',
    saga: interventionDetailsPageSagas,
  }),
  injectSaga({ key: 'exportIntervention', saga: exportInterventionSaga }),
)(InterventionDetailsPage);
