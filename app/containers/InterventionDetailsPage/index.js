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
import { Col as GCol, Row as GRow, useScreenClass } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import { injectSaga, injectReducer } from 'redux-injectors';
import { Markup } from 'interweave';

import { colors, themeColors } from 'theme';

import FileShareIcon from 'assets/svg/file-share.svg';
import CopyIcon from 'assets/svg/copy.svg';
import ArchiveIcon from 'assets/svg/archive.svg';
import PencilIcon from 'assets/svg/pencil-solid.svg';
import AddAppIcon from 'assets/svg/app-add.svg';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { reorder } from 'utils/reorder';
import {
  canArchive,
  canDeleteSession,
  canEdit,
  canShareWithParticipants,
} from 'models/Status/statusPermissions';
import { reorderScope } from 'models/Session/ReorderScope';
import { archived } from 'models/Status/StatusTypes';
import { RolePermissions } from 'models/User/RolePermissions';
import { getQuestionGroupsSaga } from 'global/reducers/questionGroups/sagas';
import { editSessionRequest, editSessionSaga } from 'global/reducers/session';
import { makeSelectUserRoles, makeSelectUserId } from 'global/reducers/auth';
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

import ConfirmationBox from 'components/ConfirmationBox';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import ShareBox from 'containers/ShareBox';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import AppContainer from 'components/Container';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';

import Header from './Header';
import { DraggedTest } from './styled';
import interventionDetailsPageSagas from './saga';
import SessionCreateButton from './components/SessionCreateButton';
import SessionListItem from './components/SessionListItem';
import {
  InterventionAssignOrganizationModal,
  InterventionSettingsModal,
} from './components/Modals';
import SelectResearchers from '../SelectResearchers';
import messages from './messages';
import {
  InterventionDetailsPageContext,
  nextStatus,
  updateStatuses,
} from './utils';

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
  roles,
  userId,
  editSession,
}) {
  const { interventionId } = useParams();
  const { formatMessage } = useIntl();

  const [
    deleteConfirmationSessionId,
    setDeleteConfirmationSessionId,
  ] = useState(null);

  const rolePermissions = useMemo(() => RolePermissions(roles), [roles]);
  const { canAssignOrganizationToIntervention } = rolePermissions;

  const screenClass = useScreenClass();

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
  } = intervention || {};

  const editingPossible = canEdit(status);
  const sharingPossible = canShareWithParticipants(status);
  const archivingPossible = canArchive(status);
  const deletionPossible = canDeleteSession(status);
  const canAccessCsv = interventionOwnerId === userId;

  const [modalVisible, setModalVisible] = useState(false);
  const [
    participantShareModalVisible,
    setParticipantShareModalVisible,
  ] = useState(false);
  const [
    interventionSettingsModalVisible,
    setInterventionSettingsModalVisible,
  ] = useState(false);
  const [
    assignOrganizationModalVisible,
    setAssignOrganizationModalVisible,
  ] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const closeAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(false);
  const openAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(true);

  const handleCopyIntervention = () =>
    copyIntervention({ interventionId: id, withoutRedirect: true });
  const handleArchiveIntervention = () =>
    editIntervention({
      status_event: 'to_archive',
      status: archived,
      id: interventionId,
    });
  const handleDeleteSession = sessionId => {
    deleteSession(sessionId, id);
    setDeleteConfirmationSessionId(null);
  };

  const options = [
    {
      id: 'copy',
      label: formatMessage(messages.copy),
      icon: FileShareIcon,
      action: openModal,
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
      action: handleArchiveIntervention,
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

  const handleCopySession = sessionId => {
    copySession({ sessionId });
  };

  const handleExternalCopySession = params => {
    const { sessionId, id: targetInterventionId } = params;
    externalCopySession({
      sessionId,
      currentInterventionId: interventionId,
      interventionId: targetInterventionId,
    });
  };

  const editName = val => editIntervention({ name: val, id: interventionId });

  const handleChangeStatus = () =>
    editIntervention({
      status_event: get(updateStatuses, status, ''),
      status: get(nextStatus, status, ''),
      id: interventionId,
    });

  const handleSendCsv = () => sendCsv(id);

  const createSessionCall = () =>
    createSession(interventionId, sessions.length);

  const handleReorder = (previousIndex, nextIndex) => {
    const newList = reorder(sessions, previousIndex, nextIndex);
    let position = 0;
    const orderedNewList = newList.map(session => {
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

  const copyInterventionToResearchers = users =>
    copyIntervention({ interventionId, users, withoutRedirect: true });

  const onDragEnd = result => {
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
          {providedDroppable => (
            <div
              ref={providedDroppable.innerRef}
              {...providedDroppable.droppableProps}
            >
              {sessions &&
                orderBy(sessions, 'position').map((session, index) => {
                  const handleInviteParticipantsClick = () => {
                    fetchSessionEmails(index);
                    if (index !== sessionIndex) {
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
                        handleInviteParticipantsClick={
                          handleInviteParticipantsClick
                        }
                        handleCopySession={handleCopySession}
                        handleExternalCopySession={handleExternalCopySession}
                        handleDeleteSession={sessionId =>
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
          <title>{name}</title>
        </Helmet>
        <ConfirmationBox
          visible={!isNullOrUndefined(deleteConfirmationSessionId)}
          onClose={() => setDeleteConfirmationSessionId(null)}
          description={formatMessage(messages.sessionDeleteHeader)}
          content={formatMessage(messages.sessionDeleteMessage)}
          confirmAction={() => handleDeleteSession(deleteConfirmationSessionId)}
        />
        <Modal
          title={
            <H3
              mb={15}
              fontSize={13}
              fontWeight="bold"
              textOpacity={0.6}
              color={colors.bluewood}
            >
              {formatMessage(messages.modalTitle)}
            </H3>
          }
          onClose={closeModal}
          visible={modalVisible}
        >
          <SelectResearchers
            onResearchersSelected={copyInterventionToResearchers}
            onClose={closeModal}
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

        <Row>
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

        <GRow>
          <GCol
            lg={6}
            md={12}
            style={{ order: ['md', 'sm', 'xs'].includes(screenClass) ? 1 : 0 }}
          >
            {renderList()}
            {createSessionLoading && (
              <Row my={18} align="center">
                <Spinner color={themeColors.secondary} />
              </Row>
            )}
            {editingPossible && (
              <Row my={18} align="center">
                <SessionCreateButton handleClick={createSessionCall} />
              </Row>
            )}
            {createSessionError && (
              <ErrorAlert errorText={createSessionError} />
            )}
          </GCol>
          <GCol>
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
  roles: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  interventionState: makeSelectInterventionState(),
  sessionIndex: makeSelectCurrentSessionIndex(),
  roles: makeSelectUserRoles(),
  userId: makeSelectUserId(),
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
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
