/*
 *
 * InterventionDetailsPage
 *
 */
import React, { useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
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
import { Markup } from 'interweave';

import { colors, themeColors } from 'theme';

import FileShareIcon from 'assets/svg/file-share.svg';
import CopyIcon from 'assets/svg/copy.svg';
import ArchiveIcon from 'assets/svg/archive.svg';
import PencilIcon from 'assets/svg/pencil-solid.svg';
import AddAppIcon from 'assets/svg/app-add.svg';
import TranslateIcon from 'assets/svg/translate.svg';
import DocumentIcon from 'assets/svg/document.svg';
import QuestionIcon from 'assets/svg/question-mark.svg';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { reorder } from 'utils/reorder';
import {
  canArchive,
  canDeleteSession,
  canEdit,
  canShareWithParticipants,
} from 'models/Status/statusPermissions';
import { Roles } from 'models/User/UserRoles';
import { reorderScope } from 'models/Session/ReorderScope';
import { archived } from 'models/Status/StatusTypes';
import { RolePermissions } from 'models/User/RolePermissions';
import { CatMhLicenseType } from 'models/Intervention';
import { getQuestionGroupsSaga } from 'global/reducers/questionGroups/sagas';
import { editSessionRequest, editSessionSaga } from 'global/reducers/session';
import { makeSelectUser } from 'global/reducers/auth';
import {
  fetchInterventionRequest,
  makeSelectInterventionState,
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
} from 'global/reducers/intervention';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';
import {
  copyInterventionRequest,
  fetchInterventionsRequest,
  interventionsReducer,
  fetchInterventionsSaga,
} from 'global/reducers/interventions';
import {
  questionsReducer,
  getQuestionsRequest,
} from 'global/reducers/questions';

import OrganizationShareBox from 'containers/ShareBox/OrganizationShareBox';
import SettingsPanel from 'containers/SettingsPanel';

import Modal, {
  ConfirmationModal,
  ModalType,
  useModal,
} from 'components/Modal';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import ShareBox from 'containers/ShareBox';
import Spinner from 'components/Spinner';
import AppContainer from 'components/Container';
import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';

import TranslateInterventionModal from 'containers/TranslateInterventionModal/index';
import Header from './Header';
import { DraggedTest } from './styled';
import interventionDetailsPageSagas from './saga';
import SessionCreateButton from './components/SessionCreateButton/index';
import SessionListItem from './components/SessionListItem';
import {
  CatMhAccessModal,
  InterventionAssignOrganizationModal,
  InterventionSettingsModal,
} from './components/Modals';
import SelectResearchers from '../SelectResearchers';
import messages from './messages';
import { InterventionDetailsPageContext, nextStatus } from './utils';
import { CAT_MH_TEST_COUNT_WARNING_THRESHOLD } from './constants';

export function InterventionDetailsPage({
  createSession,
  editIntervention,
  fetchIntervention,
  interventionState: {
    intervention,
    loaders: { fetchInterventionLoading, createSessionLoading },
    errors: { fetchInterventionError, createSessionError },
  },
  sessionIndex,
  changeSessionIndex,
  sendCsv,
  copySession,
  reorderSessions,
  copyIntervention,
  fetchQuestions,
  fetchSessionEmails,
  deleteSession,
  fetchInterventions,
  externalCopySession,
  user: { id: userId, roles },
  editSession,
}) {
  const { interventionId } = useParams();
  const { formatMessage } = useIntl();

  const [deleteConfirmationSessionId, setDeleteConfirmationSessionId] =
    useState(null);

  const rolePermissions = useMemo(() => RolePermissions(roles), [roles]);
  const { canAssignOrganizationToIntervention } = rolePermissions;

  const isAdmin = roles.includes(Roles.admin);

  const {
    sessions,
    name,
    id,
    status,
    csvLink,
    csvGeneratedAt,
    sharedTo,
    organizationId,
    userId: interventionOwnerId,
    languageName,
    googleLanguageId,
    isAccessRevoked,
    catMhPool,
    createdCatMhSessionCount,
    licenseType,
  } = intervention || {};

  const testsLeft = catMhPool - createdCatMhSessionCount;
  const hasSmallNumberOfCatMhSessionsRemaining =
    licenseType !== CatMhLicenseType.UNLIMITED &&
    (!catMhPool ||
      testsLeft / catMhPool <= CAT_MH_TEST_COUNT_WARNING_THRESHOLD);

  const editingPossible = canEdit(status);
  const sharingPossible = canShareWithParticipants(status);
  const archivingPossible = canArchive(status);
  const deletionPossible = canDeleteSession(status);
  const canAccessCsv = interventionOwnerId === userId;

  const [sendCopyModalVisible, setSendCopyModalVisible] = useState(false);
  const [translateModalVisible, setTranslateModalVisible] = useState(false);
  const [participantShareModalVisible, setParticipantShareModalVisible] =
    useState(false);
  const [
    interventionSettingsModalVisible,
    setInterventionSettingsModalVisible,
  ] = useState(false);
  const [assignOrganizationModalVisible, setAssignOrganizationModalVisible] =
    useState(false);

  const closeSendCopyModal = () => setSendCopyModalVisible(false);
  const openSendCopyModal = () => setSendCopyModalVisible(true);

  const closeTranslateModal = () => setTranslateModalVisible(false);
  const openTranslateModal = () => setTranslateModalVisible(true);
  const closeAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(false);
  const openAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(true);
  const handleCopyIntervention = () =>
    copyIntervention({ interventionId: id, withoutRedirect: true });
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
  const { openModal: openCatMhModal, Modal: CatMhModal } = useModal({
    type: ModalType.Modal,
    modalContentRenderer: (props) => <CatMhAccessModal {...props} />,
    props: {
      title: formatMessage(messages.catMhSettingsModalTitle),
    },
  });

  const canCreateCatSession = useMemo(() => {
    if (roles.includes('admin')) return true;
    return !isAccessRevoked;
  }, [roles, isAccessRevoked]);

  const options = [
    {
      id: 'translate',
      label: formatMessage(messages.translate),
      icon: TranslateIcon,
      action: openTranslateModal,
      color: colors.bluewood,
    },
    {
      id: 'copy',
      label: formatMessage(messages.copy),
      icon: FileShareIcon,
      action: openSendCopyModal,
      color: colors.bluewood,
    },
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: CopyIcon,
      action: handleCopyIntervention,
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
            disabled: !canEdit(status),
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            icon: DocumentIcon,
            action: () => openCatMhModal(intervention),
            label: formatMessage(messages.catMhSettingsModalTitle),
            id: 'catMhAccess',
          },
        ]
      : []),
  ];

  useLayoutEffect(() => {
    fetchIntervention(interventionId);
  }, []);

  useEffect(() => {
    fetchInterventions();
  }, []);

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

  const copyInterventionToResearchers = (users) =>
    copyIntervention({ interventionId, users, withoutRedirect: true });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (destination) handleReorder(source.index, destination.index);
  };

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
              {sessions &&
                orderBy(sessions, 'position').map((session, index) => {
                  const handleClick = () => {
                    fetchSessionEmails(index);
                    if (session.position !== sessionIndex + 1) {
                      fetchQuestions(session.id);
                      changeSessionIndex(index);
                    }
                    setParticipantShareModalVisible(true);
                  };
                  const nextIntervention = sessions.find(
                    ({ position }) => position === session.position + 1,
                  );
                  return (
                    <Row key={session.id}>
                      <SessionListItem
                        disabled={!editingPossible}
                        sharingPossible={sharingPossible}
                        deletionPossible={deletionPossible}
                        sharedTo={sharedTo}
                        session={session}
                        index={index}
                        isSelected={index === sessionIndex}
                        handleClick={handleClick}
                        handleCopySession={handleCopySession}
                        handleExternalCopySession={handleExternalCopySession}
                        handleDeleteSession={(sessionId) =>
                          setDeleteConfirmationSessionId(sessionId)
                        }
                        editSession={editSession}
                        nextSessionName={
                          nextIntervention ? nextIntervention.name : null
                        }
                        status={status}
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
        canDeleteSession: deletionPossible,
        rolePermissions,
      }}
    >
      <AppContainer>
        <Helmet>
          <title>{formatMessage(messages.pageTitle, { name })}</title>
        </Helmet>
        <ArchiveModal />
        <CatMhModal />
        <ConfirmationModal
          visible={!isNullOrUndefined(deleteConfirmationSessionId)}
          onClose={() => setDeleteConfirmationSessionId(null)}
          description={formatMessage(messages.sessionDeleteHeader)}
          content={formatMessage(messages.sessionDeleteMessage)}
          confirmAction={() => handleDeleteSession(deleteConfirmationSessionId)}
        />
        <Modal
          title={formatMessage(messages.sendCopyModalTitle)}
          onClose={closeSendCopyModal}
          visible={sendCopyModalVisible}
        >
          <SelectResearchers
            onResearchersSelected={copyInterventionToResearchers}
            onClose={closeSendCopyModal}
          />
        </Modal>

        <Modal onClose={closeTranslateModal} visible={translateModalVisible}>
          <TranslateInterventionModal
            id={id}
            name={name}
            googleLanguageId={googleLanguageId}
            onTranslated={closeTranslateModal}
          />
        </Modal>

        <Modal
          title={formatMessage(messages.interventionSettingsModalTitle)}
          onClose={() => setInterventionSettingsModalVisible(false)}
          visible={interventionSettingsModalVisible}
        >
          <InterventionSettingsModal />
        </Modal>

        <Modal
          title={formatMessage(messages.participantShareModalTitle)}
          onClose={() => setParticipantShareModalVisible(false)}
          visible={participantShareModalVisible}
        >
          {!organizationId && <ShareBox />}
          {organizationId && (
            <OrganizationShareBox organizationId={organizationId} />
          )}
        </Modal>

        <Modal
          title={formatMessage(messages.assignOrganization)}
          onClose={closeAssignOrganizationModal}
          visible={assignOrganizationModalVisible}
        >
          <InterventionAssignOrganizationModal
            interventionId={id}
            organizationId={organizationId}
          />
        </Modal>

        <Header
          name={name}
          csvGeneratedAt={csvGeneratedAt}
          csvLink={csvLink}
          editingPossible={editingPossible}
          editName={editName}
          handleChangeStatus={handleChangeStatus}
          handleSendCsv={handleSendCsv}
          options={options}
          status={status}
          organizationId={organizationId}
          canAccessCsv={canAccessCsv}
        />

        <GRow>
          <GCol>
            <Row justify="between">
              <Row align="center">
                <Tooltip
                  id="intervention-settings"
                  text={formatMessage(messages.interventionSettingsIconTooltip)}
                >
                  <Icon
                    src={PencilIcon}
                    fill={colors.grey}
                    onClick={() => setInterventionSettingsModalVisible(true)}
                    role="button"
                    aria-label={formatMessage(
                      messages.interventionSettingsIconTooltip,
                    )}
                    mr={10}
                  />
                </Tooltip>
                <Markup
                  content={formatMessage(messages.interventionLanguage, {
                    language: languageName,
                  })}
                />
              </Row>

              {!isAccessRevoked && (
                <Row align="center">
                  {formatMessage(messages.catMhCounter, {
                    licenseType,
                    current: testsLeft ?? 0,
                    initial: catMhPool ?? 0,
                    used: createdCatMhSessionCount,
                    counter: (chunks) => (
                      <span
                        style={{
                          color: hasSmallNumberOfCatMhSessionsRemaining
                            ? themeColors.warning
                            : themeColors.success,
                        }}
                      >
                        {chunks}
                      </span>
                    ),
                  })}
                  {hasSmallNumberOfCatMhSessionsRemaining && (
                    <Tooltip
                      id="cat-mh-count-warning"
                      text={formatMessage(messages.catMhCountWarning)}
                    >
                      <Icon
                        src={QuestionIcon}
                        fill={colors.gainsbro}
                        width={16}
                        height={16}
                      />
                    </Tooltip>
                  )}
                </Row>
              )}
            </Row>
          </GCol>

          <GCol xs={0} xl={6} />
        </GRow>

        <GRow>
          <GCol xl={6}>
            {renderList()}
            {createSessionLoading && (
              <Row my={18} align="center">
                <Spinner color={themeColors.secondary} />
              </Row>
            )}
            {editingPossible && (
              <Row my={18} align="center">
                <SessionCreateButton
                  canCreateCatSession={canCreateCatSession}
                  handleSessionCreation={createSessionCall}
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
    </InterventionDetailsPageContext.Provider>
  );
}

InterventionDetailsPage.propTypes = {
  createSession: PropTypes.func,
  fetchIntervention: PropTypes.func,
  interventionState: PropTypes.shape({
    sessions: PropTypes.array,
    fetchInterventionError: PropTypes.string,
    fetchInterventionLoading: PropTypes.bool,
    intervention: PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
    }),
    errors: PropTypes.shape({
      fetchInterventionError: PropTypes.string,
      createSessionError: PropTypes.string,
    }),
    loaders: PropTypes.shape({
      fetchInterventionLoading: PropTypes.bool,
      createSessionLoading: PropTypes.bool,
    }),
  }),
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
  fetchInterventions: PropTypes.func,
  externalCopySession: PropTypes.func,
  editSession: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  interventionState: makeSelectInterventionState(),
  sessionIndex: makeSelectCurrentSessionIndex(),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  createSession: createSessionRequest,
  fetchQuestions: getQuestionsRequest,
  fetchIntervention: fetchInterventionRequest,
  fetchInterventions: fetchInterventionsRequest,
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
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  injectReducer({
    key: 'intervention',
    reducer: interventionReducer,
  }),
  injectReducer({ key: 'interventions', reducer: interventionsReducer }),
  injectReducer({ key: 'questions', reducer: questionsReducer }),
  injectSaga({
    key: 'interventionOptionsSaga',
    saga: interventionOptionsSaga,
  }),
  injectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga }),
  injectSaga({ key: 'getQuestionGroupsSaga', saga: getQuestionGroupsSaga }),
  injectSaga({ key: 'editSession', saga: editSessionSaga }),
  injectSaga({
    key: 'interventionDetailsPageSagas',
    saga: interventionDetailsPageSagas,
  }),
)(InterventionDetailsPage);
