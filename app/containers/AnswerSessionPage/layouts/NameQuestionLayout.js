import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';

import { themeColors } from 'theme';

import ApprovableInput from 'components/Input/ApprovableInput';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';
import Box from 'components/Box';
import Text from 'components/Text';

import messages from './messages';
import {
  NAME_QUESTION_NAME_ID,
  NAME_QUESTION_SPELL_NAME_ID,
} from '../constants';

const NameQuestionLayout = ({
  onChange,
  formatMessage,
  answerBody,
  disabled,
  isDesktop,
  isAnimationOngoing,
  phoneticPreviewParams,
}) => {
  const { name, phoneticName } =
    answerBody && answerBody.value ? answerBody.value : {};
  const inputStyles = {
    height: '100%',
    width: '100%',
    textAlign: 'center',
  };

  const handleNameChange = (value) => onChange({ name: value, phoneticName });
  const handlePhoneticNameChange = (value) =>
    onChange({ name, phoneticName: value });

  const mdColSize = isDesktop ? 6 : 12;

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={mdColSize}>
          <Text id={NAME_QUESTION_NAME_ID}>
            {formatMessage(messages.enterName)}
          </Text>

          <Box
            bg={themeColors.highlight}
            minWidth={300}
            px={21}
            py={14}
            justify="center"
            mb={10}
          >
            <ApprovableInput
              type="singleline"
              value={name ?? ''}
              placeholder={formatMessage(messages.enterName)}
              onCheck={handleNameChange}
              styles={inputStyles}
              disabled={disabled}
              aria-labelledby={NAME_QUESTION_NAME_ID}
            />
          </Box>
        </Col>
        <Col sm={12} md={mdColSize}>
          <Text id={NAME_QUESTION_SPELL_NAME_ID}>
            {formatMessage(messages.enterNamePhonetically)}
          </Text>

          <TextVoicePreviewInput
            phoneticPreviewParams={phoneticPreviewParams}
            isAnimationOngoing={isAnimationOngoing}
            value={phoneticName}
            placeholder={formatMessage(messages.enterNamePhonetically)}
            onTextReady={handlePhoneticNameChange}
            styles={inputStyles}
            disabled={disabled}
            aria-labelledby={NAME_QUESTION_SPELL_NAME_ID}
          />
        </Col>
      </Row>
    </Container>
  );
};

NameQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isAnimationOngoing: PropTypes.bool,
  phoneticPreviewParams: PropTypes.object,
  isDesktop: PropTypes.bool,
};

export default NameQuestionLayout;
