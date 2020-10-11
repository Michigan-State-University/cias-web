import React from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
import Radio from 'components/Radio';
import StyledInput from 'components/Input/StyledInput';
import QuestionListItem from 'containers/Interventions/components/QuestionListItem';
import { makeSelectGroupQuestions } from 'global/reducers/questions/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

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
}) => {
  const { title, id } = questionGroup;
  return (
    <div>
      <Row>
        {manage && (
          <Radio
            onClick={() => toggleGroup(questions)}
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
      {questions.map((question, index2) => (
        <Row key={question.id}>
          <QuestionListItem
            selectSlide={selectSlide}
            checked={selectedSlides.includes(question.id)}
            manage={manage}
            index={index2}
            selectedQuestionIndex={selectedQuestion}
            questions={questions}
            question={question}
            interventionId={interventionId}
          />
        </Row>
      ))}
    </div>
  );
};

QuestionListGroup.propTypes = {
  questionGroup: PropTypes.object,
  toggleGroup: PropTypes.func,
  checkSelectedGroup: PropTypes.func,
  changeGroupName: PropTypes.func,
  manage: PropTypes.bool,
  interventionId: PropTypes.string,
  selectSlide: PropTypes.func,
  selectedSlides: PropTypes.array,
  selectedQuestion: PropTypes.string,
  questions: PropTypes.array,
};

const mapStateToProps = (_, props) =>
  createStructuredSelector({
    questions: makeSelectGroupQuestions(props.questionGroup.id),
  });

export default connect(mapStateToProps)(QuestionListGroup);
