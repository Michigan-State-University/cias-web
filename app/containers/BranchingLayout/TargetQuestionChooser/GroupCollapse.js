import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Collapse from 'components/Collapse';
import Row from 'components/Row';
import Text from 'components/Text';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';
import { FinishGroupType } from 'models/Intervention/GroupTypes';
import { makeSelectGroupQuestions } from 'global/reducers/questions/selectors';
import { colors } from 'theme';

import QuestionListItem from './QuestionListItem';
import FinishGroupItem from './FinishGroupItem';

const GroupCollapse = ({ questionGroup, questions, questionListItemProps }) => {
  const [openCollapsable, setOpenCollapsable] = useState(false);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);
  if (questions.length === 0) return <></>;
  if (questionGroup.type === FinishGroupType) {
    const question = questions[0];
    return <FinishGroupItem question={question} {...questionListItemProps} />;
  }
  return (
    <Collapse
      disabled
      isOpened={openCollapsable}
      onToggle={toggleCollapsable}
      height="auto"
      px={10}
      onHideImg={arrowDown}
      onShowImg={arrowUp}
      color={openCollapsable ? colors.heather : colors.zirkon}
      label={
        <Row
          data-testid={`${questionGroup.id}-select-target-group-el`}
          data-cy={`select-group-branching-${questionGroup.title}`}
        >
          <Text fontSize={15}>{questionGroup.title}</Text>
        </Row>
      }
    >
      {questions.map((question, index) => (
        <QuestionListItem
          key={`${question.id}-select-question-${index}`}
          question={question}
          index={index}
          {...questionListItemProps}
        />
      ))}
    </Collapse>
  );
};

GroupCollapse.propTypes = {
  questionGroup: PropTypes.object,
  questions: PropTypes.array,
  questionListItemProps: PropTypes.object,
};

const mapStateToProps = (_, props) =>
  createStructuredSelector({
    questions: makeSelectGroupQuestions(props.questionGroup.id),
  });

export default connect(mapStateToProps)(GroupCollapse);
