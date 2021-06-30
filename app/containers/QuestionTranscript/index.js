import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeSelectCurrentBlockIndex } from 'containers/AnswerSessionPage/selectors';

import QuestionTranscriptUI from './QuestionTranscriptUI';
import { mapBlockToTextWithRealIndex } from './utils';

const QuestionTranscript = ({ question, language }) => {
  // selectors
  const currentBlockIndex = useSelector(makeSelectCurrentBlockIndex());

  const [lastVisibleIndex, setLastVisibleIndex] = useState(currentBlockIndex);

  const {
    narrator: { blocks: allBlocks },
  } = question;

  const texts = useMemo(() => mapBlockToTextWithRealIndex(allBlocks), [
    allBlocks,
  ]);

  useEffect(() => {
    const indexExists = texts.some(
      ({ realIndex }) => realIndex === currentBlockIndex,
    );

    if (indexExists) setLastVisibleIndex(currentBlockIndex);
  }, [texts, currentBlockIndex]);

  return (
    <QuestionTranscriptUI
      texts={texts}
      currentBlockIndex={lastVisibleIndex}
      language={language}
    />
  );
};

QuestionTranscript.propTypes = {
  question: PropTypes.object,
  language: PropTypes.string,
};

export default memo(QuestionTranscript);
