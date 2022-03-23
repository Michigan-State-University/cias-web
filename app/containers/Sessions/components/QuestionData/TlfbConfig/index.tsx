import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { RootState } from 'global/reducers';
import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { TlfbConfigDTO } from 'models/Question';
import { InterventionStatusMetadata } from 'models/Intervention';

import { naturalNumberValidator } from 'utils/validators';

import { themeColors } from 'theme';

import H2 from 'components/H2';
import Row from 'components/Row';
import Column from 'components/Column';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Radio from 'components/Radio';
import Text from 'components/Text';

import messages from './messages';
import { updateDaysCount, updateRangeSetting } from './actions';

export type TlfbConfigProps = {
  isNarratorTab: boolean;
  statusMetadata: InterventionStatusMetadata;
};

const TlfbConfig = ({ statusMetadata: { isEditable } }: TlfbConfigProps) => {
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

  const handleChange = (numberOfDays: string) =>
    dispatch(updateDaysCount(numberOfDays));

  const handleRadioChange = (value: boolean) => () =>
    dispatch(updateRangeSetting(value));

  return (
    <Column py={32} px={17}>
      <Row>
        <H2>{formatMessage(messages.tlfbTimeframe)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <Row my={24}>
        <Radio
          id="tlfb-config-date-range"
          onChange={handleRadioChange(true)}
          checked={chooseDateRange === true}
          disabled={!isEditable}
        >
          <Text mr={24}>{formatMessage(messages.dateRange)}</Text>
        </Radio>
        <Radio
          id="tlfb-config-number-of-days"
          onChange={handleRadioChange(false)}
          checked={chooseDateRange === false}
          disabled={!isEditable}
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
          disabled={!isEditable}
        />
      )}
    </Column>
  );
};

export default TlfbConfig;
