import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import QuestionListItem from 'containers/Interventions/components/QuestionListItem';
import { makeSelectGroupQuestions } from 'global/reducers/questions/selectors';

import Collapse from 'components/Collapse';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import StyledInput from 'components/Input/StyledInput';
import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

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
}) => {
  const { title, id } = questionGroup;
  const [openCollapsable, setOpenCollapsable] = useState(true);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);

  useEffect(() => {
    setOpenCollapsable(true);
  }, [questions.length]);

  if (questions.length === 0) return <></>;
  return (
    <Row width="100%" display="block">
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
          <Row>
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
          </Row>
        }
      >
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
      </Collapse>
      <Spacer />
    </Row>
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
};

const mapStateToProps = (_, props) =>
  createStructuredSelector({
    questions: makeSelectGroupQuestions(props.questionGroup.id),
  });

export default connect(mapStateToProps)(QuestionListGroup);
