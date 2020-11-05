import React from 'react';
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
  selectedQuestionId,
  question: { id, subtitle, type },
}) => {
  const canSelectQuestion = questionId => selectedQuestionId !== questionId;

  return (
    <Row
      data-testid={`${selectedQuestionId}-select-target-question-el`}
      key={`${selectedQuestionId}-select-target-question-${index}`}
      px={10}
      mt={20}
      onClick={() => canSelectQuestion(id) && onClick({ type, id })}
      clickable={canSelectQuestion(id)}
      width="100%"
    >
      <Img src={target.id === id ? webpageSelected : webpage} mr={10} />
      <Box maxWidth={230}>
        <EllipsisText
          text={htmlToPlainText(subtitle)}
          color={!canSelectQuestion(id) ? colors.grey : ''}
          fontWeight={target.id === id ? 'bold' : ''}
        />
      </Box>
    </Row>
  );
};

QuestionListItem.propTypes = {
  onClick: PropTypes.func,
  target: PropTypes.object,
  index: PropTypes.number,
  selectedQuestionId: PropTypes.string,
  question: PropTypes.shape({
    id: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default QuestionListItem;
