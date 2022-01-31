import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

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

import messages from './messages';
import { UPDATE_DATA } from './constants';

export type TlfbConfigProps = {
  isNarratorTab: boolean;
  interventionStatus: InterventionStatus;
};

const TlfbConfig = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const selectedQuestion = useSelector<unknown, TlfbConfigDTO>(
    makeSelectSelectedQuestion()!,
  );

  const handleChange = (days_count: string) => {
    dispatch(
      updateQuestionData({
        type: UPDATE_DATA,
        data: { value: { payload: { days_count } } },
      }),
    );
  };

  return (
    <Column py={32} px={17}>
      <Row>
        <H2 mb={24}>{formatMessage(messages.tlfbTimeframe)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <LabelledApprovableInput
        id="number-of-days-input"
        label={formatMessage(messages.noOfDaysLabel)}
        type="singleline"
        keyboard="tel"
        placeholder={formatMessage(messages.noOfDaysPlaceholder)}
        value={selectedQuestion.body.data[0].payload.days_count}
        validator={naturalNumberValidator}
        onCheck={handleChange}
        height={48}
        transparent={false}
      />
    </Column>
  );
};

export default TlfbConfig;
