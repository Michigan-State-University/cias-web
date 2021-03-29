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
      <Row width="100%" mt={5} height={30} />
      {settingsTitle && title && (
        <Row>
          <Box
            lineHeight="1.42"
            padding={26}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Row>
      )}
      {settingsSubtitle && subtitle && (
        <Row>
          <Box
            lineHeight="1.42"
            padding={26}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </Row>
      )}
      {settingsVideo && videoUrl && (
        <Row mt={10}>
          <PlayerWrapper>
            <Player url={videoUrl} controls width="100%" height="100%" />
          </PlayerWrapper>
        </Row>
      )}
      {settingsImage && imageUrl && (
        <Row mt={10} justify="center" align="center" width="100%">
          <ImageWrapper>
            <Img src={imageUrl} alt="image" maxHeight="50vh" maxWidth="100%" />
          </ImageWrapper>
        </Row>
      )}
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
