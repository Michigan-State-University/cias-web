import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import Column from 'components/Column';
import Box from 'components/Box';
import MarkupContainer from 'components/MarkupContainer';
import Img from 'components/Img';

const AnswerContent = ({ answerImage, payload, index, imageMaxWidth }) => (
  <Column>
    {answerImage && (
      <Box marginBlockEnd={8}>
        <Img
          src={answerImage.url}
          alt={answerImage.alt || `Answer ${index + 1} image`}
          maxWidth={imageMaxWidth}
          height="auto"
        />
      </Box>
    )}
    <MarkupContainer>
      <Markup content={payload} noWrap />
    </MarkupContainer>
  </Column>
);

AnswerContent.propTypes = {
  answerImage: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    answer_id: PropTypes.string.isRequired,
  }),
  payload: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  imageMaxWidth: PropTypes.string.isRequired,
};

export default AnswerContent;
