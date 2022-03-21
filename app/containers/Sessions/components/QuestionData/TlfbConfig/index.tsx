import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { RootState } from 'global/reducers';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { TlfbConfigDTO } from 'models/Question';
import { InterventionStatus } from 'models/Intervention';

import { naturalNumberValidator } from 'utils/validators';

import { themeColors } from 'theme';

import H2 from 'components/H2';
import Row from 'components/Row';
import Column from 'components/Column';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Radio from 'components/Radio';
import Text from 'components/Text';

import messages from './messages';
import { UPDATE_DAYS_COUNT, UPDATE_RANGE_SETTINGS } from './constants';

export type TlfbConfigProps = {
  isNarratorTab: boolean;
  interventionStatus: InterventionStatus;
};

const TlfbConfig = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const selectedQuestion = useSelector<RootState, TlfbConfigDTO>(
    makeSelectSelectedQuestion()!,
  );

  const {
    body: {
      data: [
        {
          payload: {
            choose_date_range: chooseDateRange,
            days_count: daysCount,
          },
        },
      ],
    },
  } = selectedQuestion;

  const handleChange = (days_count: string) => {
    dispatch(
      updateQuestionData({
        type: UPDATE_DAYS_COUNT,
        data: days_count,
      }),
    );
  };

  const handleRadioChange = (value: boolean) => () => {
    dispatch(
      updateQuestionData({
        type: UPDATE_RANGE_SETTINGS,
        data: value,
      }),
    );
  };

  return (
    <Column py={32} px={17}>
      <Row>
        <H2>{formatMessage(messages.tlfbTimeframe)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <Row my={24}>
        <Radio
          id="tlfb-config-date-range"
          // disabled={loading}
          onChange={handleRadioChange(true)}
          checked={chooseDateRange === true}
        >
          <Text mr={24}>{formatMessage(messages.dateRange)}</Text>
        </Radio>
        <Radio
          id="tlfb-config-number-of-days"
          // disabled={loading}
          onChange={handleRadioChange(false)}
          checked={chooseDateRange === false}
        >
          <Text>{formatMessage(messages.numberOfDays)}</Text>
        </Radio>
      </Row>
      {!chooseDateRange && (
        <LabelledApprovableInput
          id="number-of-days-input"
          label={formatMessage(messages.noOfDaysLabel)}
          type="singleline"
          keyboard="tel"
          placeholder={formatMessage(messages.noOfDaysPlaceholder)}
          value={daysCount}
          validator={naturalNumberValidator}
          onCheck={handleChange}
          height={48}
          transparent={false}
        />
      )}
    </Column>
  );
};

export default TlfbConfig;
