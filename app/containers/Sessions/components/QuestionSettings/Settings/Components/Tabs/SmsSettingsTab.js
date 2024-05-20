import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get, split, set } from 'lodash';
import { useIntl } from 'react-intl';

import { arrayValidator, numericValidator } from 'utils/validators';

import { editQuestionRequest } from 'global/reducers/questions';

import Row from 'components/Row';
import H3 from 'components/H3';
import Column from 'components/Column';
import Radio from 'components/Radio';
import Text from 'components/Text';

import { Input } from '../styled';
import messages from './messages';

const SmsSettingsTab = ({ editQuestion, acceptedAnswers }) => {
  const { formatMessage } = useIntl();
  const predefinedAnswers = get(acceptedAnswers, 'predefined', false);
  const rangeOfAnswers = get(acceptedAnswers, 'range', false);

  return (
    <>
      <Row justify="between" align="center" mb={8}>
        <H3>
          <Text>{formatMessage(messages.acceptedAnswersLabel)}</Text>
        </H3>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <Column gap={12}>
          <Radio
            id="specified"
            onChange={() =>
              editQuestion({
                path: 'accepted_answers',
                value: { predefined: [] },
              })
            }
            checked={predefinedAnswers}
          >
            <Text>{formatMessage(messages.specified)}</Text>
          </Radio>
          <Radio
            id="random"
            onChange={() =>
              editQuestion({
                path: 'accepted_answers',
                value: {
                  range: { from: '0', to: '100' },
                },
              })
            }
            checked={rangeOfAnswers}
          >
            <Text>{formatMessage(messages.range)}</Text>
          </Radio>
        </Column>
      </Row>
      {predefinedAnswers && (
        <Row justify="between" align="center" mb={15}>
          <Column>
            <label htmlFor="predefined_values">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.predefinedValues)}
              </Text>
            </label>
            <Input
              id="predefined_values"
              type="singleline"
              value={acceptedAnswers.predefined}
              validator={arrayValidator}
              onBlur={(v) =>
                editQuestion({
                  path: 'accepted_answers',
                  value: { predefined: v === '' ? [] : split(v, ',') },
                })
              }
              width="100%"
              px={12}
            />
          </Column>
        </Row>
      )}
      {rangeOfAnswers && (
        <Row justify="between" align="center" mb={15}>
          <Column mr={4}>
            <label htmlFor="range_from_accepted_values">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.rangeFromAcceptedValues)}
              </Text>
            </label>
            <Input
              id="range_from_accepted_values"
              type="singleline"
              value={acceptedAnswers.range.from}
              validator={numericValidator()}
              onBlur={(v) =>
                editQuestion({
                  path: 'accepted_answers.range.from',
                  value: v,
                })
              }
              width="100%"
              px={12}
            />
          </Column>
          <Column ml={4}>
            <label htmlFor="range_to_accepted_values">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.rangeToAcceptedValues)}
              </Text>
            </label>
            <Input
              id="range_to_accepted_values"
              type="singleline"
              value={acceptedAnswers.range.to}
              validator={numericValidator()}
              onBlur={(v) =>
                editQuestion({
                  path: 'accepted_answers.range.to',
                  value: v,
                })
              }
              width="100%"
              px={12}
            />
          </Column>
        </Row>
      )}
      <Row justify="between" align="center" mb={15}>
        <Column>
          <label htmlFor="answer_if_wrong">
            <Text mb={5} fontSize="12px" fontWeight="bold" width="fit-content">
              {formatMessage(messages.answerIfWrong)}
            </Text>
          </label>
          <Input
            id="answer_if_wrong"
            type="singleline"
            value={acceptedAnswers?.answer_if_wrong}
            onBlur={(v) =>
              editQuestion({
                path: 'accepted_answers',
                value: set(acceptedAnswers, 'answer_if_wrong', v),
              })
            }
            width="100%"
            px={12}
          />
        </Column>
      </Row>
    </>
  );
};

SmsSettingsTab.propTypes = {
  editQuestion: PropTypes.func.isRequired,
  acceptedAnswers: PropTypes.object,
};

const mapDispatchToProps = {
  editQuestion: editQuestionRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(SmsSettingsTab);
