import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Img from 'components/Img';
import { colors } from 'theme';

const AnswerImagePreview = ({
  answerImages,
  answerId,
  index,
  maxWidth = '200px',
  showAltInput = false,
  onAltTextChange = null,
  formatMessage = null,
  altPlaceholderMessage = null,
  disabled = false,
}) => {
  const answerImage = useMemo(
    () => answerImages.find((img) => img.answer_id === answerId),
    [answerImages, answerId],
  );

  if (!answerImage) {
    return null;
  }

  return (
    <Box marginBlockEnd={8}>
      <Img
        src={answerImage.url}
        alt={answerImage.alt || `Answer ${index + 1} image`}
        maxWidth={maxWidth}
        height="auto"
        borderRadius={4}
      />
      {showAltInput && onAltTextChange && formatMessage && (
        <Box mt={8} bg={colors.linkWaterDark}>
          <Box
            as="textarea"
            rows="2"
            value={answerImage.alt ?? ''}
            onChange={(e) => onAltTextChange(e.target.value)}
            placeholder={
              altPlaceholderMessage ? formatMessage(altPlaceholderMessage) : ''
            }
            disabled={disabled}
            style={{
              width: '100%',
              padding: '8px',
              border: 'none',
              background: 'transparent',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

AnswerImagePreview.propTypes = {
  answerImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
      answer_id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  answerId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  maxWidth: PropTypes.string,
  showAltInput: PropTypes.bool,
  onAltTextChange: PropTypes.func,
  formatMessage: PropTypes.func,
  altPlaceholderMessage: PropTypes.object,
  disabled: PropTypes.bool,
};

export default AnswerImagePreview;
