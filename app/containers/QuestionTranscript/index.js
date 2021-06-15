import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeSelectCurrentBlockIndex } from 'containers/AnswerSessionPage/selectors';

import QuestionTranscriptUI from './QuestionTranscriptUI';
import { filterAllowedBlocks } from './utils';

const QuestionTranscript = ({ question }) => {
  // selectors
  const currentBlockIndex = useSelector(makeSelectCurrentBlockIndex());

  const [lastVisibleIndex, setLastVisibleIndex] = useState(currentBlockIndex);

  const {
    narrator: { blocks: allBlocks },
  } = question;

  const blocks = useMemo(() => {
    const blocksWithRealIndexMapped = allBlocks.map((block, index) => ({
      ...block,
      realIndex: index,
    }));

    return filterAllowedBlocks(blocksWithRealIndexMapped);
  }, [allBlocks]);

  useEffect(() => {
    const indexExists = blocks.some(
      ({ realIndex }) => realIndex === currentBlockIndex,
    );

    if (indexExists) setLastVisibleIndex(currentBlockIndex);
  }, [blocks, currentBlockIndex]);

  return (
    <QuestionTranscriptUI
      blocks={blocks}
      currentBlockIndex={lastVisibleIndex}
    />
  );
};

QuestionTranscript.propTypes = {
  question: PropTypes.object,
};

export default memo(QuestionTranscript);
