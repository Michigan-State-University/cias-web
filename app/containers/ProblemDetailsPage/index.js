/*
 *
 * ProblemDetailsPage
 *
 */

import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
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
import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import Modal from 'components/Modal';
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
import injectSaga, { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { colors, themeColors } from 'theme';
import appStages from 'global/appStages';
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

import Spinner from 'components/Spinner';
import { StatusLabel, InterventionOptions } from './styled';
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

  const { interventions, name, id, status, shared_to: sharedTo } =
    problem || {};

  const [modalVisible, setModalVisible] = useState(false);

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
    const orderdedNewList = newList.map(question => {
      position += 1;
      return {
        ...question,
        position,
      };
    });
    reorderInterventions({
      reorderedList: orderdedNewList,
      problemId,
    });
  };

  const renderList = () => (
    <>
      <Reorder
        reorderId="problem-list"
        onReorder={handleReorder}
        holdTime={125}
      >
        {interventions &&
          orderBy(interventions, 'position').map((intervention, index) => {
            const handleClick = () => {
              if (intervention.position !== interventionIndex + 1) {
                fetchQuestions(intervention.id);
                changeInterventionIndex(index);
              }
            };
            const nextIntervention = interventions.find(
              ({ position }) => position === intervention.position + 1,
            );
            return (
              <Row key={intervention.id}>
                <InterventionListItem
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
    </>
  );

  if (fetchProblemLoading) return <Loader />;

  if (fetchProblemError)
    return <ErrorAlert errorText={fetchProblemError} fullPage />;

  return (
    <Box height="100%" width="100%" padding="60px 160px">
      <Modal
        title={formatMessage(messages.modalTitle)}
        onClose={closeModal}
        visible={modalVisible}
      >
        <SelectResearchers problemId={id} onClose={closeModal} />
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
      <Row
        bg={colors.linkWater}
        borderRadius={10}
        py={15}
        px={20}
        align="center"
        width="fit-content"
      >
        <Text fontWeight="bold" mr={12}>
          {sharedTo && <FormattedMessage {...messages[sharedTo]} />}
        </Text>
        <Link to={`/interventions/${id}/settings`}>
          <TextButton>
            <FormattedMessage {...messages.adjust} />
          </TextButton>
        </Link>
      </Row>
      <Row>
        <Column sm={6}>
          {renderList()}
          {createInterventionLoading && (
            <Row my={18} align="center">
              <Spinner color={themeColors.secondary} />
            </Row>
          )}
          <Row my={18} align="center">
            <InterventionCreateButton handleClick={createInterventionCall} />
          </Row>
        </Column>
        {createInterventionError && (
          <ErrorAlert errorText={createInterventionError} />
        )}
        {process.env.APP_STAGE === appStages.dev.id && (
          <Column ml={38} sm={6} mt={18}>
            <Column position="sticky" top="100px">
              <ShareBox />
            </Column>
            <div />
          </Column>
        )}
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
