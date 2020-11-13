import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { makeSelectQuestionGroupsIds } from 'global/reducers/questionGroups';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';
import { setAnimationStopPosition } from 'global/reducers/localState';
import { resetAnimationPosition } from 'utils/getNarratorPosition';
import Button from 'components/Button';

import { saveNarratorMovement } from '../../actions';
import messages from './messages';

const ClearAnimationButton = ({
  groupIds,
  questions,
  selectedQuestion,
  blockIndex,
  setOffset,
  savePosition,
}) => {
  const clearAnimationPosition = () => {
    const newPosition = resetAnimationPosition(
      selectedQuestion,
      blockIndex,
      questions,
      groupIds,
    );
    savePosition(blockIndex, selectedQuestion.id, newPosition);
    setOffset(newPosition.x, newPosition.y);
  };
  return (
    <Button mt={15} onClick={clearAnimationPosition}>
      <FormattedMessage {...messages.resetAnimationPosition} />
    </Button>
  );
};

const mapStateToProps = createStructuredSelector({
  groupIds: makeSelectQuestionGroupsIds(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  setOffset: setAnimationStopPosition,
  savePosition: saveNarratorMovement,
};

ClearAnimationButton.propTypes = {
  groupIds: PropTypes.array,
  questions: PropTypes.array,
  selectedQuestion: PropTypes.object,
  blockIndex: PropTypes.number,
  setOffset: PropTypes.func,
  savePosition: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClearAnimationButton);
