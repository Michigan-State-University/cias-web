import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { get, split, set } from 'lodash';
import Row from '../../../../../../../components/Row';
import H3 from '../../../../../../../components/H3';
import Column from '../../../../../../../components/Column';
import Radio from '../../../../../../../components/Radio';
import Text from '../../../../../../../components/Text';
import { editQuestionRequest } from '../../../../../../../global/reducers/questions';
import {
  arrayValidator,
  numericValidator,
} from '../../../../../../../utils/validators';
import { Input } from '../styled';

const SmsSettingsTab = ({
  onQuestionToggle,
  acceptedAnswers,
}) => {
  const predefinedAnswers = get(acceptedAnswers, 'predefined', false);
  const rangeOfAnswers = get(acceptedAnswers, 'range', false);

  return (
    <>
      <Row justify="between" align="center" mb={8}>
        <H3>Accepted answers</H3>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <Column gap={12}>
          <Radio
            id="specified"
            onChange={() =>
              onQuestionToggle({
                path: 'accepted_answers',
                value: { predefined: [] },
              })
            }
            checked={predefinedAnswers}
          >
            <Text>Specified</Text>
          </Radio>
          <Radio
            id="random"
            onChange={() =>
              onQuestionToggle({
                path: 'accepted_answers',
                value: {
                  range: { from: '0', to: '100' },
                },
              })
            }
            checked={rangeOfAnswers}
          >
            <Text>Range</Text>
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
                Provide desired values divided by commas
              </Text>
            </label>
            <Input
              id="predefined_values"
              type="singleline"
              value={acceptedAnswers.predefined}
              validator={arrayValidator}
              onBlur={(v) =>
                onQuestionToggle({
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
                From
              </Text>
            </label>
            <Input
              id="range_from_accepted_values"
              type="singleline"
              value={acceptedAnswers.range.from}
              validator={numericValidator()}
              onBlur={(v) =>
                onQuestionToggle({
                  path: 'accepted_answers',
                  value: { range: { from: v, to: acceptedAnswers.range.to } },
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
                To
              </Text>
            </label>
            <Input
              id="range_to_accepted_values"
              type="singleline"
              value={acceptedAnswers.range.to}
              validator={numericValidator()}
              onBlur={(v) =>
                onQuestionToggle({
                  path: 'accepted_answers',
                  value: { range: { from: acceptedAnswers.range.from, to: v } },
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
              Error message if value is not within specified range
            </Text>
          </label>
          <Input
            id="answer_if_wrong"
            type="singleline"
            value={acceptedAnswers?.answer_if_wrong}
            onBlur={(v) =>
              onQuestionToggle({
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
  onQuestionToggle: PropTypes.func.isRequired,
  acceptedAnswers: PropTypes.object,
};

const mapDispatchToProps = {
  onQuestionToggle: editQuestionRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(SmsSettingsTab);
