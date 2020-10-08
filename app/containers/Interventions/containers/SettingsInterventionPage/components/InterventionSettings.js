import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import some from 'lodash/some';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import H3 from 'components/H3';
import lastKey from 'utils/getLastKey';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  editInterventionRequest,
  editInterventionSaga,
} from 'global/reducers/intervention';
import {
  getQuestionsRequest,
  getQuestionsSaga,
  questionsReducer,
} from 'global/reducers/questions';
import {
  fetchProblemSaga,
  makeSelectProblemStatus,
  problemReducer,
} from 'global/reducers/problem';

import { canEdit } from 'models/Status/statusPermissions';
import Option from './Option';
import messages from './messages';
import { Input, NameContainer } from './styled';

const InterventionSettings = ({
  id,
  name,
  narratorSettings,
  formatMessage,
  editIntervention,
  getQuestions,
  problemStatus,
}) => {
  useInjectReducer({ key: 'problem', reducer: problemReducer });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({ key: 'editIntervention', saga: editInterventionSaga });
  useInjectSaga({ key: 'getQuestions', saga: getQuestionsSaga });
  useInjectSaga({ key: 'fetchProblem', saga: fetchProblemSaga });

  const isNarratorActive = some(narratorSettings, setting => setting);

  const refetchQuestions = () => getQuestions(id);

  const onToggle = index => val => {
    editIntervention({ path: `settings.narrator.${index}`, value: val });
    refetchQuestions();
  };

  const onGlobalToggle = val => {
    editIntervention({
      path: `settings.narrator`,
      value: {
        voice: val,
        animation: val,
      },
    });
    refetchQuestions();
  };

  const editingPossible = canEdit(problemStatus);

  return (
    <Fragment>
      <NameContainer>
        <H3 mb={5} fontWeight="regular">
          {formatMessage(messages.nameLabel)}
        </H3>
        <Input
          disabled={!editingPossible}
          width="100%"
          placeholder={formatMessage(messages.placeholder)}
          value={name}
          onBlur={val => editIntervention({ path: 'name', value: val })}
        />
      </NameContainer>
      <H3 mt={30} mb={20}>
        {formatMessage(messages.narratorSettings)}
      </H3>
      {narratorSettings && (
        <Option
          disabled={!editingPossible}
          label={formatMessage(messages.narratorActive)}
          withBorder={isNarratorActive}
          value={isNarratorActive}
          action={onGlobalToggle}
          fontWeight="bold"
        />
      )}
      {isNarratorActive &&
        map(narratorSettings, (option, index) => (
          <Option
            disabled={!editingPossible}
            key={`el-option-${index}`}
            withBorder={index !== lastKey(narratorSettings)}
            label={formatMessage(messages[index])}
            value={option}
            action={onToggle(index)}
          />
        ))}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  problemStatus: makeSelectProblemStatus(),
});

const mapDispatchToProps = {
  editIntervention: editInterventionRequest,
  getQuestions: getQuestionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

InterventionSettings.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  narratorSettings: PropTypes.shape({
    voice: PropTypes.bool,
    narrator: PropTypes.bool,
  }),
  formatMessage: PropTypes.func,
  editIntervention: PropTypes.func,
  getQuestions: PropTypes.func,
  problemStatus: PropTypes.string,
};

export default compose(withConnect)(InterventionSettings);
