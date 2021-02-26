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

  const handleChangeEmail = value =>
    onChange({ email: value, receive_report: option });
  const handleChangeOption = value => () =>
    onChange({ email, receive_report: value });

  return (
    <Box width="100%" padding={15}>
      <Column justify="center">
        <Row>
          <Text>{formatMessage(messages.reportHeader)}</Text>
        </Row>
        <Row
          disabled={disabled}
          mt={20}
          align="center"
          onClick={handleChangeOption(YES_OPTION)}
        >
          <Radio disabled={disabled} checked={option === YES_OPTION} mr={10} />
          <Text>{formatMessage(messages.reportYesOption)}</Text>
        </Row>
        <Row
          disabled={disabled}
          mt={15}
          align="center"
          onClick={handleChangeOption(NO_OPTION)}
        >
          <Radio disabled={disabled} checked={option === NO_OPTION} mr={10} />
          <Text>{formatMessage(messages.reportNoOption)}</Text>
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
          <Column mt={25}>
            <Text>
              <Markup
                content={formatMessage(messages.participantReportUserEmail, {
                  email: userEmail,
                })}
              />
            </Text>
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
