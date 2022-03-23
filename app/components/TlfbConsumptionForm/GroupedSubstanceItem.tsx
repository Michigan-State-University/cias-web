import React, { ChangeEvent, memo, MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import BinIcon from 'assets/svg/bin-no-bg.svg';

import { SubstanceConsumption } from 'models/Tlfb';
import { Substance } from 'models/Question';

import { ImageButton } from 'components/Button';
import Circle from 'components/Circle';
import { Col, Container, Row } from 'components/ReactGridSystem';
import Select from 'components/Select';
import { InputWithAdornment } from 'components/Input/InputWithAdornment';

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
  onRemove: () => void;
  loading: boolean;
};

const Component = ({
  index,
  groupName,
  consumption,
  substances,
  consumptions,
  onChange,
  onRemove,
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

  const onSelect = ({ value }: ArrayElement<typeof options>) => {
    onConsumptionsChange({ variable: value });
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = +event.target.value;

    onConsumptionsChange({
      amount: Number.isNaN(numericValue) ? 0 : +numericValue,
    });
  };

  const handleRemove = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onRemove();
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
      mb="12px !important"
    >
      <Row gutterWidth={2}>
        <Col xs={1} />
        <Col xs={4} id={substanceLabelId}>
          {formatMessage(messages.substanceSelectLabel)}
        </Col>
        <Col xs={6} id={amountLabelId}>
          {formatMessage(messages.amountLabel)}
        </Col>
        <Col xs={1} />
      </Row>

      <Row align="center" gutterWidth={2}>
        <Col xs={1}>
          <Circle
            id={indexId}
            bg={colors.bluewood}
            bgOpacity={0.1}
            size="24px"
            child={index + 1}
          />
        </Col>
        <Col xs={4}>
          <Select
            width="100%"
            selectProps={{
              options,
              value: selectedValue,
              onChange: onSelect,
              'aria-labelledby': `${groupId} ${substanceLabelId} ${indexId}`,
            }}
          />
        </Col>
        <Col xs={6}>
          <InputWithAdornment
            value={`${consumption.amount ?? ''}`}
            type="tel"
            adornment={selectedValue?.unit}
            onChange={onAmountChange}
            placeholder={formatMessage(messages.amountPlaceholder)}
            aria-labelledby={`${groupId} ${amountLabelId} ${indexId}`}
          />
        </Col>
        <Col xs={1}>
          <ImageButton
            src={BinIcon}
            onClick={handleRemove}
            mr={8}
            title={formatMessage(messages.removeItem, { index: index + 1 })}
          />
        </Col>
      </Row>
    </Container>
  );
};

export const GroupedSubstanceItem = memo(Component);
