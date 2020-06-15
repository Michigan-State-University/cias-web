import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import Row from 'components/Row';
import bin from 'assets/svg/bin-red.svg';
import { colors } from 'theme';

import messages from './messages';
import { PlayerWrapper, Player } from './styled';
import { makeSelectSelectedQuestion } from '../../containers/EditInterventionPage/selectors';
import { updateQuestionVideo } from '../../containers/EditInterventionPage/actions';

const isURLValid = url => url.includes('youtube') || url.includes('vimeo');

const QuestionVideo = ({
  intl: { formatMessage },
  selectedQuestion: { video },
  updateVideo,
}) => {
  const [hovered, setHovered] = useState(false);

  const setVideoUrl = videoUrl => updateVideo(videoUrl);
  const removeVideUrl = () => updateVideo(null);

  if (!video || !isURLValid(video))
    return (
      <Box bg={colors.linkWater} width="100%" px={16}>
        <Row align="center" height={93}>
          <ApprovableInput
            height="auto"
            rows="1"
            placeholder={formatMessage(messages.videoText)}
            value={video || ''}
            onCheck={setVideoUrl}
            type="singleline"
          />
        </Row>
      </Box>
    );

  return (
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
          <Player url={video} controls width="100%" height="100%" />
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
  );
};

QuestionVideo.propTypes = {
  intl: intlShape,
  selectedQuestion: PropTypes.shape({
    video: PropTypes.string,
  }),
  updateVideo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateVideo: videoUrl => updateQuestionVideo(videoUrl),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const QuestionVideoWithIntl = injectIntl(QuestionVideo);

export default withConnect(QuestionVideoWithIntl);
