import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';

import ApprovableInput from 'components/Input/ApprovableInput';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';
import Box from 'components/Box';
import { themeColors } from 'theme';

import messages from './messages';

const NameQuestionLayout = ({
  onChange,
  formatMessage,
  answerBody,
  disabled,
  phoneticUrl,
  phoneticLoading,
  isAnimationOngoing,
}) => {
  const { name, phoneticName } =
    answerBody && answerBody.value ? answerBody.value : {};
  const inputStyles = {
    height: '100%',
    width: '100%',
    textAlign: 'center',
  };

  const handleNameChange = value => onChange({ name: value, phoneticName });
  const handlePhoneticNameChange = value =>
    onChange({ name, phoneticName: value });

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={6}>
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
            />
          </Box>
        </Col>
        <Col sm={12} md={6}>
          <TextVoicePreviewInput
            phoneticUrl={phoneticUrl}
            phoneticLoading={phoneticLoading}
            isAnimationOngoing={isAnimationOngoing}
            value={phoneticName}
            placeholder={formatMessage(messages.enterNamePhonetically)}
            onBlur={handlePhoneticNameChange}
            styles={inputStyles}
            disabled={disabled}
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
  phoneticUrl: PropTypes.any,
  phoneticLoading: PropTypes.bool,
  isAnimationOngoing: PropTypes.bool,
};

export default NameQuestionLayout;