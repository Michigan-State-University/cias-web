import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { SubstanceConsumption } from 'models/Tlfb';
import { Substance } from 'models/Question';
import globalMessages from 'global/i18n/globalMessages';

import Column from 'components/Column';
import Radio from 'components/Radio';
import Text from 'components/Text';
import Row from 'components/Row';

import { OptionContainer } from './styled';
import {
  denormalizeUngroupedConsumptions,
  normalizeUngroupedConsumptions,
} from './utils';

export type UngroupedSubstancesFormProps = {
  substances: Substance[];
  consumptions: SubstanceConsumption[];
  onChange: (newConsumptions: SubstanceConsumption[]) => void;
  loading: boolean;
  disabled?: boolean;
};

const Component = ({
  substances,
  consumptions,
  onChange,
  loading,
  disabled,
}: UngroupedSubstancesFormProps) => {
  const { formatMessage } = useIntl();

  const consumptionsMap = normalizeUngroupedConsumptions(consumptions);

  const substanceNameMap = useMemo<NormalizedData<string>>(
    () =>
      substances.reduce(
        (acc, { name, variable }) => ({ ...acc, [variable]: name }),
        {},
      ),
    [substances],
  );

  const options = substances.map(({ name, variable }) => ({
    name,
    variable,
    consumed: consumptionsMap[variable],
  }));

  const handleConsumptionChange =
    (variable: string, consumed: boolean) => () => {
      const newConsumptions = denormalizeUngroupedConsumptions(
        {
          ...consumptionsMap,
          [variable]: consumed,
        },
        substanceNameMap,
      );
      onChange(newConsumptions);
    };

  return (
    <Column gap={8} mb={24}>
      {options.map(({ name, variable, consumed }) => (
        <OptionContainer key={variable}>
          <Text fontWeight="bold" fontSize={16}>
            {name}
          </Text>
          <Row gap={16}>
            <Radio
              id={`${variable}-yes-option`}
              disabled={loading || disabled}
              onChange={handleConsumptionChange(variable, true)}
              checked={consumed === true}
            >
              <Text>{formatMessage(globalMessages.yes)}</Text>
            </Radio>
            <Radio
              id={`${variable}-no-option`}
              disabled={loading || disabled}
              onChange={handleConsumptionChange(variable, false)}
              checked={consumed === false}
            >
              <Text>{formatMessage(globalMessages.no)}</Text>
            </Radio>
          </Row>
        </OptionContainer>
      ))}
    </Column>
  );
};

export const UngroupedSubstancesForm = memo(Component);
