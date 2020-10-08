/*
 *
 * ProblemDetailsPage
 *
 */

import React, { useLayoutEffect, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import get from 'lodash/get';
import Reorder, { reorder } from 'react-reorder';
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
} from 'global/reducers/problem';
import { problemOptionsSaga } from 'global/sagas/problemOptionsSaga';

import injectSaga, { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { colors, themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';

import fileShare from 'assets/svg/file-share.svg';
import copy from 'assets/svg/copy.svg';
import archive from 'assets/svg/archive.svg';
import { closed } from 'models/Status/StatusTypes';
import { copyProblemRequest } from 'global/reducers/problems';

import {
  getQuestionsRequest,
  questionsReducer,
  getQuestionsSaga,
} from 'global/reducers/questions';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import SettingsPanel from 'containers/SettingsPanel';
import H3 from 'components/H3';
import { canEdit } from 'models/Status/statusPermissions';
import { StatusLabel, InterventionOptions, DraggedTest } from './styled';
import problemDetailsPageSagas from './saga';
import InterventionCreateButton from './components/InterventionCreateButton';
import InterventionStatusButtons from './components/InterventionStatusButtons';
import InterventionListItem from './components/InterventionListItem';
import SelectResearchers from './components/SelectResearchers';
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
}) {
  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({ key: 'getQuestions', saga: getQuestionsSaga });
  useInjectSaga({ key: 'problemOptionsSaga', saga: problemOptionsSaga });

  const { interventions, name, id, status } = problem || {};

  const editingPossible = canEdit(status);

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
  }, [problem]);

  const availableOptions = options.filter(
    elem => elem.id !== 'archive' || status === closed,
  );

  const handleCopyIntervention = interventionId => {
    copyIntervention({ interventionId });
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

  const handleReorder = (event, previousIndex, nextIndex) => {
    const newList = reorder(interventions, previousIndex, nextIndex);
    let position = 0;
    const orderedNewList = newList.map(question => {
      position += 1;
      return {
        ...question,
        position,
      };
    });
    reorderInterventions({
      reorderedList: orderedNewList,
      problemId,
    });
  };

  const copyProblemToResearchers = users => copyProblem({ problemId, users });

  const renderList = () => (
    <DraggedTest>
      <Reorder
        reorderId="problem-list"
        onReorder={handleReorder}
        holdTime={125}
        disabled={!editingPossible}
      >
        {interventions &&
          orderBy(interventions, 'position').map((intervention, index) => {
            const handleClick = () => {
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
          })}
      </Reorder>
    </DraggedTest>
  );

  if (fetchProblemLoading) return <Loader />;

  if (fetchProblemError)
    return <ErrorAlert errorText={fetchProblemError} fullPage />;

  return (
    <Box height="100%" width="100%" padding="60px 160px">
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
            <Dropdown options={availableOptions} clickable />
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
