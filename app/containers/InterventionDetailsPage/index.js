/*
 *
 * InterventionDetailsPage
 *
 */
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import get from 'lodash/get';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import orderBy from 'lodash/orderBy';

import { StyledInput } from 'components/Input/StyledInput';
import Loader from 'components/Loader';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Box from 'components/Box';
import BackButton from 'components/BackButton';
import ShareBox from 'containers/ShareBox';
import Dropdown from 'components/Dropdown';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
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
} from 'global/reducers/intervention';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';

import { injectSaga, useInjectSaga, useInjectReducer } from 'redux-injectors';

import { colors, themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';

import fileShare from 'assets/svg/file-share.svg';
import copy from 'assets/svg/copy.svg';
import archive from 'assets/svg/archive.svg';
import { copyInterventionRequest } from 'global/reducers/interventions';

import {
  questionsReducer,
  getQuestionsRequest,
} from 'global/reducers/questions';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import SettingsPanel from 'containers/SettingsPanel';
import H3 from 'components/H3';
import {
  canArchive,
  canEdit,
  canShareWithParticipants,
} from 'models/Status/statusPermissions';
import { reorderScope } from 'models/Session/ReorderScope';
import { reorder } from 'utils/reorder';
import { getQuestionGroupsSaga } from 'global/reducers/questionGroups/sagas';

import { StatusLabel, InterventionOptions, DraggedTest } from './styled';
import interventionDetailsPageSagas from './saga';
import SessionCreateButton from './components/SessionCreateButton';
import InterventionStatusButtons from './components/InterventionStatusButtons';
import SessionListItem from './components/SessionListItem';
import SelectResearchers from '../SelectResearchers';
import messages from './messages';
import { updateStatuses } from './utils';

export function InterventionDetailsPage({
  intl: { formatMessage },
  createSession,
  editIntervention,
  fetchIntervention,
  match: {
    params: { interventionId },
  },
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
}) {
  useInjectReducer({
    key: 'intervention',
    reducer: interventionReducer,
  });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({
    key: 'interventionOptionsSaga',
    saga: interventionOptionsSaga,
  });
  useInjectSaga({ key: 'getQuestionGroupsSaga', saga: getQuestionGroupsSaga });

  const { sessions, name, id, status } = intervention || {};

  const editingPossible = canEdit(status);
  const sharingPossible = canShareWithParticipants(status);
  const archivingPossible = canArchive(status);

  const [modalVisible, setModalVisible] = useState(false);
  const [
    participantShareModalVisible,
    setParticipantShareModalVisible,
  ] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const handleCopyIntervention = () => copyIntervention({ interventionId: id });
  const handleArchiveIntervention = () =>
    editIntervention({
      path: 'status_event',
      value: 'to_archive',
    });

  const options = [
    {
      id: 'copy',
      label: formatMessage(messages.copy),
      icon: fileShare,
      action: openModal,
      color: colors.bluewood,
    },
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: copy,
      action: handleCopyIntervention,
      color: colors.bluewood,
    },
    {
      id: 'archive',
      label: formatMessage(messages.archive),
      icon: archive,
      action: handleArchiveIntervention,
      color: colors.bluewood,
      disabled: !archivingPossible,
    },
  ];

  useLayoutEffect(() => {
    fetchIntervention(interventionId);
  }, []);

  useEffect(() => {
    if (
      !isNullOrUndefined(intervention) &&
      !isNullOrUndefined(sessions[sessionIndex])
    )
      fetchQuestions(sessions[sessionIndex].id);
  }, [intervention ? intervention.id : 0]);

  const handleCopySession = sessionId => {
    copySession({ sessionId });
  };

  const editName = val => editIntervention({ path: 'name', value: val });

  const handleChangeStatus = () =>
    editIntervention({
      path: 'status_event',
      value: get(updateStatuses, status, ''),
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
    copyIntervention({ interventionId, users });

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
                        session={session}
                        index={index}
                        isSelected={index === sessionIndex}
                        handleClick={handleClick}
                        handleCopySession={handleCopySession}
                        nextSessionName={
                          nextIntervention ? nextIntervention.name : null
                        }
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
    <Box height="100%" width="100%" padding="60px 160px">
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Modal
        title={
          <H3
            mb={15}
            fontSize={13}
            fontWeight="bold"
            textOpacity={0.6}
            color={colors.bluewood}
          >
            <FormattedMessage {...messages.modalTitle} />
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
        title={formatMessage(messages.participantShareModalTitle)}
        onClose={() => setParticipantShareModalVisible(false)}
        visible={participantShareModalVisible}
      >
        <ShareBox />
      </Modal>

      <Row justify="between">
        <BackButton to="/">
          <FormattedMessage {...messages.back} />
        </BackButton>
      </Row>
      <Row my={18} justify="between">
        <Row align="center">
          <Box mr={15}>
            <StatusLabel status={status}>
              {status && formatMessage(globalMessages.statuses[status])}
            </StatusLabel>
          </Box>
          <StyledInput
            disabled={!editingPossible}
            ml={-12}
            px={12}
            py={6}
            width="400px"
            value={name}
            fontSize={23}
            placeholder={formatMessage(messages.placeholder)}
            onBlur={editName}
            maxWidth="none"
          />
        </Row>
        <Row>
          <InterventionStatusButtons
            status={status}
            handleChangeStatus={handleChangeStatus}
            handleSendCsv={handleSendCsv}
          />
          <InterventionOptions>
            <Dropdown options={options} clickable />
          </InterventionOptions>
        </Row>
      </Row>
      <Row>
        <Column sm={6}>
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
        </Column>
        {createSessionError && <ErrorAlert errorText={createSessionError} />}
        <Column ml={38} sm={6} mt={18}>
          <Column position="sticky" top="100px">
            <SettingsPanel intervention={intervention} />
          </Column>
          <div />
        </Column>
      </Row>
    </Box>
  );
}

InterventionDetailsPage.propTypes = {
  intl: PropTypes.object,
  createSession: PropTypes.func,
  fetchIntervention: PropTypes.func,
  interventionState: PropTypes.shape({
    sessions: PropTypes.array,
    fetchInterventionError: PropTypes.string,
    fetchInterventionLoading: PropTypes.bool,
    intervention: PropTypes.shape({ id: PropTypes.string }),
    errors: PropTypes.shape({
      fetchInterventionError: PropTypes.string,
      createSessionError: PropTypes.string,
    }),
    loaders: PropTypes.shape({
      fetchInterventionLoading: PropTypes.bool,
      createSessionLoading: PropTypes.bool,
    }),
  }),
  match: PropTypes.object,
  editIntervention: PropTypes.func,
  sessionIndex: PropTypes.number,
  changeSessionIndex: PropTypes.func,
  sendCsv: PropTypes.func,
  copySession: PropTypes.func,
  reorderSessions: PropTypes.func,
  copyIntervention: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchSessionEmails: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  interventionState: makeSelectInterventionState(),
  sessionIndex: makeSelectCurrentSessionIndex(),
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
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'interventionDetailsPageSagas',
  saga: interventionDetailsPageSagas,
});

export default compose(
  withConnect,
  withSaga,
  injectIntl,
)(InterventionDetailsPage);
