import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';
import Row from 'components/Row';
import Column from 'components/Column';
import { themeColors } from 'theme';

import messages from './messages';

const NameQuestionLayout = ({ onChange, formatMessage, answerBody }) => {
  const { name, phoneticName } =
    answerBody && answerBody.value ? answerBody.value : {};
  const inputStyles = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  };

  const handleNameChange = value => onChange({ name: value, phoneticName });
  const handlePhoneticNameChange = value =>
    onChange({ name, phoneticName: value });

  return (
    <Row width="100%" justify="between">
      <Column
        bg={themeColors.highlight}
        width="100%"
        maxWidth={300}
        px={21}
        py={14}
        justify="center"
      >
        <ApprovableInput
          type="singleline"
          value={name}
          placeholder={formatMessage(messages.enterName)}
          onCheck={handleNameChange}
          styles={inputStyles}
        />
      </Column>
      <Column
        bg={themeColors.highlight}
        width="100%"
        maxWidth={300}
        px={21}
        py={14}
        justify="center"
        align="center"
      >
        <TextVoicePreviewInput
          value={phoneticName}
          placeholder={formatMessage(messages.enterNamePhonetically)}
          onBlur={handlePhoneticNameChange}
          styles={inputStyles}
        />
      </Column>
    </Row>
  );
};

NameQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default NameQuestionLayout;
