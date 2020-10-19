import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { makeSelectGroupQuestions } from 'global/reducers/questions/selectors';

import Collapse from 'components/Collapse';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import StyledInput from 'components/Input/StyledInput';
import Img from 'components/Img';
import Box from 'components/Box';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';
import reorderIcon from 'assets/svg/reorder-hand.svg';

import { reorderScope } from 'models/Intervention/ReorderScope';
import QuestionListItem from '../../components/QuestionListItem';
import { Spacer } from './styled';

const QuestionListGroup = ({
  questionGroup,
  toggleGroup,
  checkSelectedGroup,
  changeGroupName,
  manage,
  interventionId,
  selectSlide,
  selectedSlides,
  selectedQuestion,
  questions,
  editingPossible,
  problemStatus,
  index: groupIndex,
}) => {
  const { title, id } = questionGroup;
  const [openCollapsable, setOpenCollapsable] = useState(true);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);

  useEffect(() => {
    setOpenCollapsable(true);
  }, [questions.length]);

  if (questions.length === 0) return <></>;
  return (
    <Draggable key={`group-${id}`} draggableId={id} index={groupIndex}>
      {providedGroupDraggable => (
        <Row
          width="100%"
          display="block"
          ref={providedGroupDraggable.innerRef}
          {...providedGroupDraggable.draggableProps}
        >
          <Collapse
            disabled
            isOpened={openCollapsable}
            onToggle={toggleCollapsable}
            height="auto"
            px={0}
            bgOpacity={0}
            onHideImg={arrowDown}
            onShowImg={arrowUp}
            imgWithBackground
            label={
              <Row align="center" justify="between" width="100%" mr={10}>
                <Box>
                  {manage && (
                    <Checkbox
                      onClick={e => {
                        e.stopPropagation();
                        toggleGroup(questions);
                      }}
                      checked={checkSelectedGroup(questions)}
                    />
                  )}
                  <StyledInput
                    px={12}
                    py={6}
                    value={title}
                    fontSize={18}
                    fontWeight="bold"
                    placeholder="xd"
                    width="100%"
                    maxWidth="initial"
                    onBlur={val => changeGroupName(val, interventionId, id)}
                  />
                </Box>
                <Img
                  src={reorderIcon}
                  {...providedGroupDraggable.dragHandleProps}
                />
              </Row>
            }
          >
            <Droppable
              key={`group-${questionGroup.id}`}
              droppableId={id}
              type={reorderScope.questions}
            >
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questions.map((question, index) => (
                    <Row key={question.id} width="100%">
                      <QuestionListItem
                        selectSlide={selectSlide}
                        checked={selectedSlides.includes(question.id)}
                        manage={manage}
                        index={index}
                        selectedQuestionIndex={selectedQuestion}
                        questions={questions}
                        question={question}
                        interventionId={interventionId}
                        disabled={editingPossible}
                        problemStatus={problemStatus}
                      />
                    </Row>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Collapse>
          <Spacer />
        </Row>
      )}
    </Draggable>
  );
};

QuestionListGroup.propTypes = {
  questionGroup: PropTypes.object,
  toggleGroup: PropTypes.func,
  checkSelectedGroup: PropTypes.func,
  changeGroupName: PropTypes.func,
  editingPossible: PropTypes.bool,
  manage: PropTypes.bool,
  interventionId: PropTypes.string,
  selectSlide: PropTypes.func,
  selectedSlides: PropTypes.array,
  selectedQuestion: PropTypes.string,
  questions: PropTypes.array,
  problemStatus: PropTypes.string,
  isDuringQuestionReorder: PropTypes.bool,
  index: PropTypes.number,
};

const mapStateToProps = (_, props) =>
  createStructuredSelector({
    questions: makeSelectGroupQuestions(props.questionGroup.id),
  });

export default connect(mapStateToProps)(QuestionListGroup);
