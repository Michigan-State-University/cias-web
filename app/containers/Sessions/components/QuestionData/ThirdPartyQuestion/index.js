import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import { themeColors } from 'theme';

import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import Text from 'components/Text';
import { DndSortable } from 'components/DragAndDrop';

import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE } from './constants';
import { reorderAnswersAction } from './actions';
import { ThirdPartyQuestionAnswer } from './ThirdPartyQuestionAnswer';

const ThirdPartyQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  reorderAnswers,
  isNarratorTab,
  editingPossible,
  intl: { formatMessage },
}) => {
  const [hoveredIndex, setHoveredIndexIndex] = useState(-1);
  const handleMouseLeave = useCallback(
    () => setHoveredIndexIndex(-1),
    [setHoveredIndexIndex],
  );

  const {
    id,
    body: { data },
  } = selectedQuestion;

  const canDeleteAnswer = data.length > 1;

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleChange = useCallback(
    (index, answer) => {
      updateAnswer(index, answer);
    },
    [updateAnswer],
  );

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderAnswers(items);
  };

  return (
    <Column mt={10}>
      <DndSortable onDragEnd={onDragEnd} items={data} selector={null}>
        {({ item, index, dragHandleProps }) => (
          <ThirdPartyQuestionAnswer
            key={`question-${id}-answer-${index}-item`}
            questionId={id}
            answer={item}
            isNarratorTabOrEditNotPossible={isNarratorTabOrEditNotPossible}
            isNarratorTab={isNarratorTab}
            editingPossible={editingPossible}
            index={index}
            dragHandleProps={dragHandleProps}
            onMouseEnter={setHoveredIndexIndex}
            onMouseLeave={handleMouseLeave}
            hoveredIndex={hoveredIndex}
            canDeleteAnswer={canDeleteAnswer}
            onChange={handleChange}
            onRemove={removeAnswer}
          />
        )}
      </DndSortable>
      <Row display="flex" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox px={21} py={14} onClick={addAnswer}>
          <Box>
            <Row align="center">
              <PlusCircle mr={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addAnswer)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>
    </Column>
  );
};

ThirdPartyQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  reorderAnswers: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  editingPossible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  addAnswer: () => updateQuestionData({ type: ADD }),
  updateAnswer: (index, value) =>
    updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),
  removeAnswer: (index) =>
    updateQuestionData({ type: REMOVE, data: { index } }),
  reorderAnswers: reorderAnswersAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(ThirdPartyQuestion));
