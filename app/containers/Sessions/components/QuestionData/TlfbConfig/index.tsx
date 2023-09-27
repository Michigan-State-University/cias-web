import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { RootState } from 'global/reducers';
import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { TlfbConfigDTO } from 'models/Question';

import { naturalNumberValidator } from 'utils/validators';

import { themeColors } from 'theme';

import H2 from 'components/H2';
import Row from 'components/Row';
import Column from 'components/Column';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Radio from 'components/Radio';
import Text from 'components/Text';
import TlfbHelpingMaterials from 'components/TlfbHelpingMaterials';
import Checkbox from 'components/Checkbox';
import { DateRangeChooser } from 'components/DateRangeChooser';

import messages from './messages';
import {
  updateDaysCount,
  updateRangeSetting,
  updateDateRange,
  updateDisplayHelpingMaterials,
} from './actions';

export type TlfbConfigProps = {
  isNarratorTab: boolean;
  editingPossible: boolean;
};

const TlfbConfig = ({ editingPossible }: TlfbConfigProps) => {
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
            end_date: endDate,
            start_date: startDate,
            display_helping_materials: displayHelpingMaterials,
          },
        },
      ],
    },
  } = selectedQuestion;

  const handleDaysCountChange = (numberOfDays: string) =>
    dispatch(updateDaysCount(numberOfDays));

  const handleRadioChange = (value: boolean) => () =>
    dispatch(updateRangeSetting(value));

  const handleRangeChange = (
    newStartDate: Nullable<Date>,
    newEndDate: Nullable<Date>,
  ) => {
    dispatch(updateDateRange(newStartDate, newEndDate));
  };

  const handleDisplayHelpingMaterialsChange = (value: boolean) => {
    dispatch(updateDisplayHelpingMaterials(value));
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
          onChange={handleRadioChange(true)}
          checked={chooseDateRange === true}
          disabled={!editingPossible}
        >
          <Text mr={24}>{formatMessage(messages.dateRange)}</Text>
        </Radio>
        <Radio
          id="tlfb-config-number-of-days"
          onChange={handleRadioChange(false)}
          checked={chooseDateRange === false}
          disabled={!editingPossible}
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
          onCheck={handleDaysCountChange}
          height={48}
          transparent={false}
          disabled={!editingPossible}
        />
      )}
      {chooseDateRange && (
        <DateRangeChooser
          onDateRangeUpdate={handleRangeChange}
          disabled={!editingPossible}
          endDate={endDate}
          startDate={startDate}
          inputsStyles={{ width: 150 }}
        />
      )}
      <Row mt={32} mb={24} gap={16} align="center">
        <H2>{formatMessage(messages.standardDrinkChart)}</H2>
        <TlfbHelpingMaterials researcher />
      </Row>
      <Checkbox
        checked={displayHelpingMaterials}
        disabled={!editingPossible}
        onChange={handleDisplayHelpingMaterialsChange}
        id="display-tlfb-helping-materials-checkbox"
      >
        {formatMessage(messages.displayHelpingMaterials)}
      </Checkbox>
    </Column>
  );
};

export default TlfbConfig;
