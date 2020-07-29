import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';

import { Player, PlayerWrapper, ImageWrapper } from './styled';

const CommonLayout = ({ currentQuestion }) => {
  const {
    title,
    subtitle,
    video_url: videoUrl,
    image_url: imageUrl,
    settings: {
      title: settingsTitle,
      subtitle: settingsSubtitle,
      video: settingsVideo,
      image: settingsImage,
    },
  } = currentQuestion;
  return (
    <Box>
      <Row>
        {settingsTitle && title && (
          <Box padding={26} dangerouslySetInnerHTML={{ __html: title }} />
        )}
      </Row>
      <Row mt={10}>
        {settingsSubtitle && subtitle && (
          <Box padding={26} dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
      </Row>
      <Row mt={10}>
        {settingsVideo && videoUrl && (
          <PlayerWrapper>
            <Player url={videoUrl} controls width="100%" height="100%" />
          </PlayerWrapper>
        )}
      </Row>
      <Row mt={10}>
        {settingsImage && imageUrl && (
          <ImageWrapper>
            <Img src={imageUrl} alt="image" height="100%" width="100%" />
          </ImageWrapper>
        )}
      </Row>
    </Box>
  );
};

CommonLayout.propTypes = {
  currentQuestion: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    video_url: PropTypes.string,
    image_url: PropTypes.string,
    settings: PropTypes.shape({
      title: PropTypes.bool,
      subtitle: PropTypes.bool,
      video: PropTypes.bool,
      image: PropTypes.bool,
    }),
  }),
};

export default CommonLayout;
