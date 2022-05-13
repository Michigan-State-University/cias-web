import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, IntlShape } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import Row from 'components/Row';
import bin from 'assets/svg/bin-red.svg';
import { colors } from 'theme';
import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import {
  makeSelectSelectedQuestion,
  editQuestionRequest,
} from 'global/reducers/questions';

import messages from './messages';
import { PlayerWrapper, Player } from './styled';

const isURLValid = (url) =>
  url.includes('youtube') || url.includes('vimeo') || url.includes('youtu.be');

const QuestionVideo = ({
  intl: { formatMessage },
  selectedQuestion: { video_url: videoUrl },
  updateVideo,
  isNarratorTab,
  disabled,
}) => {
  const [hovered, setHovered] = useState(false);

  const setVideoUrl = (url) => updateVideo({ path: 'video_url', value: url });
  const removeVideUrl = () => updateVideo({ path: 'video_url', value: null });

  if (!videoUrl || !isURLValid(videoUrl))
    return (
      <Box bg={colors.linkWater} width="100%" px={16}>
        <Row align="center" height={93}>
          <ApprovableInput
            height="auto"
            rows="1"
            placeholder={formatMessage(messages.videoText)}
            value={videoUrl || ''}
            onCheck={setVideoUrl}
            type="singleline"
          />
        </Row>
      </Box>
    );

  return (
    <Box width="100%">
      {(isNarratorTab || disabled) && (
        <PlayerWrapper>
          <Player url={videoUrl} controls width="100%" height="100%" />
        </PlayerWrapper>
      )}
      {!isNarratorTab && !disabled && (
        <HoverableBox
          width="100%"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          clickable={false}
          px={21}
          py={14}
        >
          <Row justify="between" align="center">
            <PlayerWrapper>
              <Player url={videoUrl} controls width="100%" height="100%" />
            </PlayerWrapper>
            <Box
              onClick={removeVideUrl}
              clickable
              visibility={hovered ? 'visible' : 'hidden'}
              ml={15}
            >
              <Img src={bin} alt="bin-icon" />
            </Box>
          </Row>
        </HoverableBox>
      )}
    </Box>
  );
};

QuestionVideo.propTypes = {
  intl: PropTypes.shape(IntlShape),
  selectedQuestion: PropTypes.shape({
    video_url: PropTypes.string,
  }),
  updateVideo: PropTypes.func,
  isNarratorTab: PropTypes.bool,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  isNarratorTab: makeSelectIsNarratorTab(),
});

const mapDispatchToProps = {
  updateVideo: editQuestionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const QuestionVideoWithIntl = injectIntl(QuestionVideo);

export default withConnect(QuestionVideoWithIntl);
