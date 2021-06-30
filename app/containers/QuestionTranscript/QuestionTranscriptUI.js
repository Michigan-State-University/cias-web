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

const QuestionTranscriptUI = ({ texts, currentBlockIndex, language }) => {
  const { formatMessage } = useIntl();

  return (
    <Column height="100%">
      <H3 mb={16}>{formatMessage(messages.header)}</H3>
      <TranscriptBox lang={language}>
        <ScrollFogBox overflow="scroll" borderRadius="0px">
          {texts.map(({ text, realIndex }, index) => (
            <Box key={`Block-Transcript-${index}`}>
              <TextBlock
                text={text}
                isCurrent={realIndex === currentBlockIndex}
              />
              <br />
            </Box>
          ))}
          {(!texts || !texts.length) && (
            <H3>{formatMessage(messages.emptyState)}</H3>
          )}
        </ScrollFogBox>
      </TranscriptBox>
    </Column>
  );
};

QuestionTranscriptUI.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.object),
  currentBlockIndex: PropTypes.number,
  language: PropTypes.string,
};

export default memo(QuestionTranscriptUI);
