import React, { memo } from 'react';
import { findIndex, union } from 'lodash';

import { colors } from 'theme';

import { SubstanceConsumption } from 'models/Tlfb';
import { SubstanceGroup } from 'models/Question';

import Column from 'components/Column';
import BoxCollapse from 'components/BoxCollapse';

import Text from 'components/Text';

import { GroupedSubstanceItem } from './GroupedSubstanceItem';
import { normalizeGroupedConsumptions } from './utils';
import { generateGroupId } from './constants';

export type GroupedSubstancesFormProps = {
  substanceGroups: SubstanceGroup[];
  consumptions: SubstanceConsumption[];
  onChange: (newConsumptions: SubstanceConsumption[]) => void;
  loading: boolean;
  mobile: boolean;
  disabled?: boolean;
};

const Component = ({
  substanceGroups,
  consumptions,
  onChange,
  loading,
  mobile,
  disabled,
}: GroupedSubstancesFormProps) => {
  const consumptionsMap = normalizeGroupedConsumptions(
    substanceGroups,
    consumptions,
  );

  const onConsumptionsChange =
    (variable: string) => (value: SubstanceConsumption) => {
      if (findIndex(consumptions, { variable }) !== -1) {
        const newConsumptions = consumptions.map((consumption) => {
          if (variable !== consumption.variable) return consumption;
          return value;
        });

        onChange(newConsumptions);

        return;
      }

      const newConsumptions = union(consumptions, [value]);

      onChange(newConsumptions);
    };

  return (
    <Column gap={16} mb={24}>
      {substanceGroups.map(({ name, substances }, index) => (
        <BoxCollapse
          id={generateGroupId(name)}
          key={`substance-group-${index}`}
          label={
            <Text fontSize={16} fontWeight="bold" dir="auto" flex={1} mr={8}>
              {name}
            </Text>
          }
          bg={colors.lightStealBlue}
          bgOpacity={0.2}
          labelBgOpacity={0}
          shouldBeOpenOnStart
        >
          <>
            {consumptionsMap[index].map((consumption, substanceIndex) => (
              <GroupedSubstanceItem
                key={`substance-group-item-${index}-${substanceIndex}`}
                index={substanceIndex}
                groupName={name}
                consumption={consumption}
                substances={substances}
                consumptions={consumptionsMap[index] ?? []}
                onChange={onConsumptionsChange(consumption.variable)}
                loading={loading}
                mobile={mobile}
                disabled={disabled}
              />
            ))}
          </>
        </BoxCollapse>
      ))}
    </Column>
  );
};

export const GroupedSubstancesForm = memo(Component);
