import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import Column from 'components/Column';
import H3 from 'components/H3';

import messages from './messages';

import { TranscriptBox } from './styled';
import TextBlock from './TextBlock';

const QuestionTranscriptUI = ({ blocks, currentBlockIndex }) => {
  const { formatMessage } = useIntl();

  return (
    <Column height="100%">
      <H3 mb={16}>{formatMessage(messages.header)}</H3>
      <TranscriptBox>
        <ScrollFogBox overflow="scroll" borderRadius="0px">
          {blocks.map((block, index) => (
            <Box key={`Block-Transcript-${index}`}>
              <TextBlock
                block={block}
                isCurrent={block.realIndex === currentBlockIndex}
              />
              <br />
            </Box>
          ))}
          {(!blocks || !blocks.length) && (
            <H3>{formatMessage(messages.emptyState)}</H3>
          )}
        </ScrollFogBox>
      </TranscriptBox>
    </Column>
  );
};

QuestionTranscriptUI.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
  currentBlockIndex: PropTypes.number,
};

export default memo(QuestionTranscriptUI);
