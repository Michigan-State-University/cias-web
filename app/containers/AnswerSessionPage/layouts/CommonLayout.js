import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';

import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';

import { Player, PlayerWrapper, ImageWrapper } from './styled';

const CommonLayout = ({ currentQuestion }) => {
  const { formatMessage } = useIntl();

  const {
    title,
    subtitle,
    video_url: videoUrl,
    image_url: imageUrl,
    image_alt: imageAlt,
    settings: {
      title: settingsTitle,
      subtitle: settingsSubtitle,
      video: settingsVideo,
      image: settingsImage,
      required: settingsRequired,
    },
  } = currentQuestion;
  return (
    <Box>
      {settingsTitle && title && (
        <Row>
          <Box lineHeight="1.42" padding={26} pt={0} pb={8}>
            <Markup content={title} noWrap />
          </Box>
        </Row>
      )}
      {settingsSubtitle && subtitle && (
        <Row>
          <Box lineHeight="1.42" padding={26} pt={0} pb={8}>
            <Row align="start" justify="between">
              <Markup content={subtitle} />
              {settingsRequired && (
                <Tooltip
                  id="question-required"
                  content={
                    <Markup
                      content={formatMessage(globalMessages.questionRequired)}
                    />
                  }
                >
                  <Text color={themeColors.warning}>*</Text>
                </Tooltip>
              )}
            </Row>
          </Box>
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
            <Img
              src={imageUrl}
              alt={imageAlt}
              maxHeight="50vh"
              maxWidth="100%"
            />
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
    image_alt: PropTypes.string,
    settings: PropTypes.shape({
      title: PropTypes.bool,
      subtitle: PropTypes.bool,
      video: PropTypes.bool,
      image: PropTypes.bool,
      required: PropTypes.bool,
    }),
  }),
};

export default CommonLayout;
