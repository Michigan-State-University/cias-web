/*
 *
 * ProblemDetailsPage
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
  fetchProblemRequest,
  makeSelectProblemState,
  editProblemRequest,
  problemReducer,
  sendProblemCsvRequest,
  reorderInterventionList,
  copyInterventionRequest,
  createInterventionRequest,
  makeSelectCurrentInterventionIndex,
  changeCurrentIntervention,
  fetchInterventionEmailsRequest,
} from 'global/reducers/intervention';
import { problemOptionsSaga } from 'global/sagas/problemOptionsSaga';

import { injectSaga, useInjectSaga, useInjectReducer } from 'redux-injectors';

import { colors, themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';

import fileShare from 'assets/svg/file-share.svg';
import copy from 'assets/svg/copy.svg';
import archive from 'assets/svg/archive.svg';
import { copyProblemRequest } from 'global/reducers/interventions';

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
import { reorderScope } from 'models/Intervention/ReorderScope';
import { reorder } from 'utils/reorder';
import { getQuestionGroupsSaga } from 'global/reducers/questionGroups/sagas';

import { StatusLabel, InterventionOptions, DraggedTest } from './styled';
import problemDetailsPageSagas from './saga';
import InterventionCreateButton from './components/InterventionCreateButton';
import InterventionStatusButtons from './components/InterventionStatusButtons';
import InterventionListItem from './components/InterventionListItem';
import SelectResearchers from '../SelectResearchers';
import messages from './messages';
import { updateStatuses } from './utils';

export function ProblemDetailsPage({
  intl: { formatMessage },
  createIntervention,
  editProblem,
  fetchProblem,
  match: {
    params: { problemId },
  },
  problemState: {
    problem,
    loaders: { fetchProblemLoading, createInterventionLoading },
    errors: { fetchProblemError, createInterventionError },
  },
  interventionIndex,
  changeInterventionIndex,
  sendCsv,
  copyIntervention,
  reorderInterventions,
  copyProblem,
  fetchQuestions,
  fetchInterventionEmails,
}) {
  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({ key: 'problemOptionsSaga', saga: problemOptionsSaga });
  useInjectSaga({ key: 'getQuestionGroupsSaga', saga: getQuestionGroupsSaga });

  const { interventions, name, id, status } = problem || {};

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
  const handleCopyProblem = () => copyProblem({ problemId: id });
  const handleArchiveProblem = () =>
    editProblem({
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
      action: handleCopyProblem,
      color: colors.bluewood,
    },
    {
      id: 'archive',
      label: formatMessage(messages.archive),
      icon: archive,
      action: handleArchiveProblem,
      color: colors.bluewood,
      disabled: !archivingPossible,
    },
  ];

  useLayoutEffect(() => {
    fetchProblem(problemId);
  }, []);

  useEffect(() => {
    if (
      !isNullOrUndefined(problem) &&
      !isNullOrUndefined(interventions[interventionIndex])
    )
      fetchQuestions(interventions[interventionIndex].id);
  }, [problem ? problem.id : 0]);

  const handleCopyIntervention = sessionId => {
    copyIntervention({ sessionId });
  };

  const editName = val => editProblem({ path: 'name', value: val });

  const handleChangeStatus = () =>
    editProblem({
      path: 'status_event',
      value: get(updateStatuses, status, ''),
    });

  const handleSendCsv = () => sendCsv(id);

  const createInterventionCall = () =>
    createIntervention(problemId, interventions.length);

  const handleReorder = (previousIndex, nextIndex) => {
    const newList = reorder(interventions, previousIndex, nextIndex);
    let position = 0;
    const orderedNewList = newList.map(intervention => {
      position += 1;
      return {
        ...intervention,
        position,
      };
    });
    reorderInterventions({
      reorderedList: orderedNewList,
      problemId,
    });
  };

  const copyProblemToResearchers = users => copyProblem({ problemId, users });

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
              {interventions &&
                orderBy(interventions, 'position').map(
                  (intervention, index) => {
                    const handleClick = () => {
                      fetchInterventionEmails(index);
                      if (intervention.position !== interventionIndex + 1) {
                        fetchQuestions(intervention.id);
                        changeInterventionIndex(index);
                      }
                      setParticipantShareModalVisible(true);
                    };
                    const nextIntervention = interventions.find(
                      ({ position }) => position === intervention.position + 1,
                    );
                    return (
                      <Row key={intervention.id}>
                        <InterventionListItem
                          disabled={!editingPossible}
                          sharingPossible={sharingPossible}
                          intervention={intervention}
                          index={index}
                          isSelected={index === interventionIndex}
                          handleClick={handleClick}
                          handleCopyIntervention={handleCopyIntervention}
                          nextInterventionName={
                            nextIntervention ? nextIntervention.name : null
                          }
                        />
                      </Row>
                    );
                  },
                )}
              {providedDroppable.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DraggedTest>
  );

  if (fetchProblemLoading) return <Loader />;

  if (fetchProblemError)
    return <ErrorAlert errorText={fetchProblemError} fullPage />;

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
          onResearchersSelected={copyProblemToResearchers}
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
          {createInterventionLoading && (
            <Row my={18} align="center">
              <Spinner color={themeColors.secondary} />
            </Row>
          )}
          {editingPossible && (
            <Row my={18} align="center">
              <InterventionCreateButton handleClick={createInterventionCall} />
            </Row>
          )}
        </Column>
        {createInterventionError && (
          <ErrorAlert errorText={createInterventionError} />
        )}
        <Column ml={38} sm={6} mt={18}>
          <Column position="sticky" top="100px">
            <SettingsPanel problem={problem} />
          </Column>
          <div />
        </Column>
      </Row>
    </Box>
  );
}

ProblemDetailsPage.propTypes = {
  intl: PropTypes.object,
  createIntervention: PropTypes.func,
  fetchProblem: PropTypes.func,
  problemState: PropTypes.shape({
    interventions: PropTypes.array,
    fetchProblemError: PropTypes.string,
    fetchProblemLoading: PropTypes.bool,
  }),
  match: PropTypes.object,
  editProblem: PropTypes.func,
  interventionIndex: PropTypes.number,
  changeInterventionIndex: PropTypes.func,
  sendCsv: PropTypes.func,
  copyIntervention: PropTypes.func,
  reorderInterventions: PropTypes.func,
  copyProblem: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchInterventionEmails: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  problemState: makeSelectProblemState(),
  interventionIndex: makeSelectCurrentInterventionIndex(),
});

const mapDispatchToProps = {
  createIntervention: createInterventionRequest,
  fetchQuestions: getQuestionsRequest,
  fetchProblem: fetchProblemRequest,
  editProblem: editProblemRequest,
  changeInterventionIndex: changeCurrentIntervention,
  fetchInterventionEmails: fetchInterventionEmailsRequest,
  sendCsv: sendProblemCsvRequest,
  copyIntervention: copyInterventionRequest,
  reorderInterventions: reorderInterventionList,
  copyProblem: copyProblemRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'problemDetailsPageSagas',
  saga: problemDetailsPageSagas,
});

export default compose(
  withConnect,
  withSaga,
  injectIntl,
)(ProblemDetailsPage);
