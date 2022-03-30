import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import Box from 'components/Box';
import EllipsisText from 'components/Text/EllipsisText';
import Row from 'components/Row';

import webpageSelected from 'assets/svg/webpage-mouseover-selected.svg';
import webpage from 'assets/svg/webpage-mouseover.svg';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { colors } from 'theme';

const QuestionListItem = ({
  onClick,
  target,
  index,
  selectedQuestion,
  question: { id, subtitle, type, position, question_group_id: groupId },
}) => {
  const [width, setWidth] = useState(0);

  const canSelectQuestion = pos =>
    pos > selectedQuestion.position ||
    selectedQuestion.question_group_id !== groupId;

  const onRefChange = useCallback(node => setWidth(node?.offsetWidth ?? 0), []);

  const maxRowContentWidth = width - 70;

  return (
    <Row
      data-testid={`${selectedQuestion.id}-select-target-question-el`}
      key={`${selectedQuestion.id}-select-target-question-${index}`}
      px={10}
      mt={20}
      onClick={() => canSelectQuestion(position) && onClick({ type, id })}
      clickable={canSelectQuestion(position)}
      width="100%"
      data-cy={`choose-question-${htmlToPlainText(subtitle)}`}
      ref={onRefChange}
    >
      <Img src={target.id === id ? webpageSelected : webpage} mr={10} />
      <Box maxWidth={210}>
        <EllipsisText
          text={htmlToPlainText(subtitle)}
          color={!canSelectQuestion(position) ? colors.grey : ''}
          fontWeight={target.id === id ? 'bold' : ''}
          width={maxRowContentWidth}
        />
      </Box>
    </Row>
  );
};

QuestionListItem.propTypes = {
  onClick: PropTypes.func,
  target: PropTypes.object,
  index: PropTypes.number,
  selectedQuestion: PropTypes.shape({
    id: PropTypes.string,
    position: PropTypes.number,
    question_group_id: PropTypes.string,
  }),
  question: PropTypes.shape({
    id: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.number,
    question_group_id: PropTypes.string,
  }),
};

export default QuestionListItem;
