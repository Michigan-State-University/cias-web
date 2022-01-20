import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { TlfbConfig as TlbfConfigType } from 'models/Question';
import { InterventionStatus } from 'models/Intervention';

import { numericValidator } from 'utils/validators';

import { themeColors } from 'theme';

import H2 from 'components/H2';
import Text from 'components/Text';
import Row from 'components/Row';
import Column from 'components/Column';
import ApprovableInput from 'components/Input/ApprovableInput';

import messages from './messages';
import { UPDATE_DATA } from './constants';

export type TlfbConfigProps = {
  isNarratorTab: boolean;
  interventionStatus: InterventionStatus;
};

const TlfbConfig = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const selectedQuestion: TlbfConfigType = useSelector(
    makeSelectSelectedQuestion()!,
  );

  const handleChange = (days: string) => {
    dispatch(
      updateQuestionData({
        type: UPDATE_DATA,
        data: { value: { payload: days } },
      }),
    );
  };

  return (
    <Column py={32} px={17}>
      <Row>
        <H2 mb={24}>{formatMessage(messages.tlfbTimeframe)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <Text id="number-of-days-label" mb={8}>
        {formatMessage(messages.noOfDaysLabel)}
      </Text>
      <ApprovableInput
        aria-labelledby="number-of-days-label"
        type="singleline"
        keyboard="tel"
        placeholder={formatMessage(messages.noOfDaysPlaceholder)}
        value={selectedQuestion.body.data[0].payload}
        validator={numericValidator}
        onCheck={handleChange}
        height={48}
        transparent={false}
      />
    </Column>
  );
};

export default TlfbConfig;
