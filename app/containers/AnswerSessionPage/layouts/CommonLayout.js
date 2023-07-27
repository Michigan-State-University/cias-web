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
import OriginalTextHover from 'components/OriginalTextHover';
import Player from 'components/Player';
import MarkupContainer from 'components/MarkupContainer';

import AudioTextPreview from 'components/AudioTextPreview';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { ImageWrapper } from './styled';
import { QUESTION_SUBTITLE_ID, QUESTION_TITLE_ID } from '../constants';

const CommonLayout = ({
  currentQuestion,
  showOriginalText,
  shouldDisablePlayer,
  isMobile,
}) => {
  const { formatMessage } = useIntl();
  const {
    id,
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
    original_text: originalText,
  } = currentQuestion;
  return (
    <Box>
      {settingsTitle && title && (
        <Row align="center" justify={isMobile ? 'between' : 'start'} pb={8}>
          {!isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(title)}
              previewKey={`question-${id}-title`}
            />
          )}
          <Box lineHeight="1.42" px={26} pt={0}>
            <OriginalTextHover
              id={`question-${id}-title`}
              text={originalText?.title}
              hidden={!showOriginalText}
            >
              <Row align="center">
                <MarkupContainer id={QUESTION_TITLE_ID}>
                  <Markup content={title} noWrap />
                </MarkupContainer>
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
            </OriginalTextHover>
          </Box>
          {isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(title)}
              previewKey={`question-${id}-title`}
            />
          )}
        </Row>
      )}
      {settingsSubtitle && subtitle && (
        <Row align="center" justify={isMobile ? 'between' : 'start'} pb={8}>
          {!isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(subtitle)}
              previewKey={`question-${id}-subtitle`}
            />
          )}
          <Box lineHeight="1.42" px={26} pt={0}>
            <OriginalTextHover
              id={`question-${id}-subtitle`}
              text={originalText?.subtitle}
              hidden={!showOriginalText}
            >
              <Row align="start" justify="between">
                <MarkupContainer id={QUESTION_SUBTITLE_ID}>
                  <Markup content={subtitle} />
                </MarkupContainer>
              </Row>
            </OriginalTextHover>
          </Box>
          {isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(subtitle)}
              previewKey={`question-${id}-subtitle`}
            />
          )}
        </Row>
      )}
      {settingsVideo && videoUrl && (
        <Row mt={10}>
          <Player videoUrl={videoUrl} mt={22} disabled={shouldDisablePlayer} />
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    original_text: PropTypes.object,
  }),
  showOriginalText: PropTypes.bool,
  isMobile: PropTypes.bool,
  shouldDisablePlayer: PropTypes.bool,
};

export default CommonLayout;
