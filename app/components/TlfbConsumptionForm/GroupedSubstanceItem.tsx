import React, { ChangeEvent, memo } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import { SubstanceConsumption } from 'models/Tlfb';
import { Substance } from 'models/Question';

import { floatCharValidator, floatValidator } from 'utils/validators';

import Text from 'components/Text';
import Circle from 'components/Circle';
import { Col, Container, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';

import {
  AdornmentType,
  InputWithAdornment,
} from 'components/Input/InputWithAdornment';

import messages from './messages';
import {
  generateAmountId,
  generateGroupId,
  generateIndexId,
  generateSubstanceId,
} from './constants';
import { getAllRemainingSubstancesInGroup } from './utils';

export type GroupedSubstanceItemProps = {
  index: number;
  groupName: string;
  consumption: SubstanceConsumption;
  substances: Substance[];
  consumptions: SubstanceConsumption[];
  onChange: (consumption: SubstanceConsumption) => void;
  loading: boolean;
  mobile: boolean;
};

const Component = ({
  index,
  groupName,
  consumption,
  substances,
  consumptions,
  onChange,
  mobile,
}: GroupedSubstanceItemProps) => {
  const { formatMessage } = useIntl();

  const currentSubstance = substances.find(
    ({ variable }) => variable === consumption.variable,
  );

  const remainingSubstances = getAllRemainingSubstancesInGroup(
    substances,
    consumptions,
  );

  const optionSubstances = [
    ...remainingSubstances,
    ...(currentSubstance ? [currentSubstance] : []),
  ];

  const options = optionSubstances.map(({ name, variable, unit }) => ({
    label: name,
    value: variable,
    unit,
  }));

  const selectedValue = options.find(
    (option) => option.value === consumption.variable,
  );

  const onConsumptionsChange = (newValue: Partial<SubstanceConsumption>) =>
    onChange({ ...consumption, ...newValue });

  const onAmountKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '.' && event.currentTarget.value.includes('.')) {
      event.preventDefault();
      return;
    }
    if (!floatCharValidator(event.key)) event.preventDefault();
  };

  const onAmountPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const originalValue = event.target.value;
    const originalValueInt = parseInt(originalValue, 10);
    const isZero = originalValueInt === 0;

    if (floatValidator(originalValue)) {
      onConsumptionsChange({
        amount: originalValue,
        consumed: !isZero,
      });
      return;
    }

    const zeroAppendedValue = `0${originalValue}`;
    if (floatValidator(zeroAppendedValue)) {
      onConsumptionsChange({
        amount: zeroAppendedValue,
        consumed: !isZero,
      });
    }
  };

  const substanceLabelId = generateSubstanceId(groupName, index);
  const amountLabelId = generateAmountId(groupName, index);
  const indexId = generateIndexId(groupName, index);
  const groupId = generateGroupId(groupName);

  return (
    <Container
      fluid
      padding="0 !important"
      margin="0 !important"
      mb="16px !important"
    >
      <Row gutterWidth={8} mb={8}>
        {!mobile && <Col xs={1} />}
        <Col xs={mobile ? 5 : 4} id={substanceLabelId}>
          {formatMessage(messages.substanceSelectLabel)}
        </Col>
        <Col xs={7} id={amountLabelId}>
          {formatMessage(messages.amountLabel)}
        </Col>
      </Row>

      <Row align="center" gutterWidth={8}>
        {!mobile && (
          <Col xs={1}>
            <Circle
              id={indexId}
              bg={colors.bluewood}
              bgOpacity={0.1}
              size="24px"
              child={index + 1}
            />
          </Col>
        )}
        <Col xs={mobile ? 5 : 4}>
          <Box
            width="100%"
            bg={colors.white}
            height={42}
            align="center"
            padding={12}
          >
            <Text>{selectedValue?.label}</Text>
          </Box>
        </Col>
        <Col xs={7}>
          <InputWithAdornment
            value={consumption.amount ?? ''}
            keyboard="number"
            type={AdornmentType.SUFFIX}
            adornment={selectedValue?.unit}
            onKeyPress={onAmountKeyPress}
            onPaste={onAmountPaste}
            onChange={onAmountChange}
            aria-labelledby={`${groupId} ${amountLabelId} ${indexId}`}
            onWheel={(e: any) => e.target.blur()}
          />
        </Col>
      </Row>
    </Container>
  );
};

export const GroupedSubstanceItem = memo(Component);
