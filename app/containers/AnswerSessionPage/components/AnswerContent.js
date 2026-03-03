import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import Column from 'components/Column';
import Box from 'components/Box';
import MarkupContainer from 'components/MarkupContainer';
import Img from 'components/Img';

const AnswerContent = ({ answerImage, payload, index, imageSize }) => (
  <Column>
    {answerImage && (
      <Box marginBlockEnd={8}>
        <Img
          src={answerImage.url}
          alt={answerImage.alt || `Answer ${index + 1} image`}
          maxWidth={imageSize.maxWidth}
          maxHeight={imageSize.maxHeight}
          width="auto"
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
  imageSize: PropTypes.shape({
    maxWidth: PropTypes.string.isRequired,
    maxHeight: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnswerContent;
