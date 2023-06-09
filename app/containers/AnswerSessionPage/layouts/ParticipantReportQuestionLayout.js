import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import Radio from 'components/Radio';
import Column from 'components/Column';

import { themeColors } from 'theme';
import { emailValidator } from 'utils/validators';

import ValidatedInput from 'components/Input/ValidatedInput';
import messages from './messages';

export const YES_OPTION = true;
export const NO_OPTION = false;

const ParticipantReportLayout = ({
  onChange,
  formatMessage,
  answerBody,
  onValidation,
  showEmailInput,
  disabled,
  userEmail,
}) => {
  const { email, receive_report: option } =
    answerBody && answerBody.value ? answerBody.value : {};

  const handleChangeEmail = (value) =>
    onChange({ email: value, receive_report: option });
  const handleChangeOption = (value) => () =>
    onChange({ email, receive_report: value });

  return (
    <Box width="100%" padding={15}>
      <Column justify="center">
        <Row
          disabled={disabled}
          mt={20}
          align="center"
          onClick={handleChangeOption(YES_OPTION)}
        >
          <Radio
            id="answer-yes"
            disabled={disabled}
            checked={option === YES_OPTION}
            onChange={handleChangeOption(YES_OPTION)}
            mr={10}
          >
            <Text>{formatMessage(messages.reportYesOption)}</Text>
          </Radio>
        </Row>
        <Row mt={15} align="center">
          <Radio
            id="answer-no"
            disabled={disabled}
            checked={option === NO_OPTION}
            onChange={handleChangeOption(NO_OPTION)}
            mr={10}
          >
            <Text>{formatMessage(messages.reportNoOption)}</Text>
          </Radio>
        </Row>
        {showEmailInput && (
          <Column mt={25}>
            <Text>{formatMessage(messages.provideEmail)}</Text>
            <Box
              bg={themeColors.highlight}
              width="100%"
              px={21}
              py={14}
              mt={10}
            >
              <ValidatedInput
                placeholder={formatMessage(messages.emailPlaceholder)}
                value={email}
                validator={emailValidator}
                onChange={handleChangeEmail}
                onValidatorError={onValidation}
                disabled={option !== YES_OPTION || disabled}
              />
            </Box>
          </Column>
        )}
        {!showEmailInput && userEmail && (
          <Column mt={25} data-private>
            <Markup
              content={formatMessage(messages.participantReportUserEmail, {
                email: userEmail,
              })}
            />
          </Column>
        )}
      </Column>
    </Box>
  );
};

ParticipantReportLayout.propTypes = {
  onChange: PropTypes.func,
  formatMessage: PropTypes.func,
  onValidation: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  showEmailInput: PropTypes.bool,
  userEmail: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ParticipantReportLayout;
