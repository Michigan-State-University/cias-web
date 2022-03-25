import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { SubstanceConsumption } from 'models/Tlfb';
import { SubstanceGroup } from 'models/Question';

import Column from 'components/Column';
import BoxCollapse from 'components/BoxCollapse';
import { TextButton } from 'components/Button';

import messages from './messages';
import { GroupedSubstanceItem } from './GroupedSubstanceItem';
import {
  generateGroupToVariablesMap as generateGroupToRemainingVariablesMap,
  normalizeGroupedConsumptions,
} from './utils';
import { generateGroupId } from './constants';

export type GroupedSubstancesFormProps = {
  substanceGroups: SubstanceGroup[];
  consumptions: SubstanceConsumption[];
  onChange: (newConsumptions: SubstanceConsumption[]) => void;
  loading: boolean;
  mobile: boolean;
};

const Component = ({
  substanceGroups,
  consumptions,
  onChange,
  loading,
  mobile,
}: GroupedSubstancesFormProps) => {
  const { formatMessage } = useIntl();

  const consumptionsMap = normalizeGroupedConsumptions(
    substanceGroups,
    consumptions,
  );

  const groupToVariablesMap = generateGroupToRemainingVariablesMap(
    substanceGroups,
    consumptionsMap,
  );

  const onConsumptionsChange =
    (variable: string) => (value: SubstanceConsumption) => {
      const newConsumptions = consumptions.map((consumption) => {
        if (variable !== consumption.variable) return consumption;

        return value;
      });

      onChange(newConsumptions);
    };

  const onAddSubstanceInGroup = (index: number) => () => {
    const remainingVariable = groupToVariablesMap[index][0];

    if (remainingVariable) {
      const newConsumptions: SubstanceConsumption[] = [
        ...consumptions,
        { amount: null, consumed: null, variable: remainingVariable },
      ];

      onChange(newConsumptions);
    }
  };

  const onRemoveSubstanceInGroup = (variable: string) => () => {
    const newConsumptions = consumptions.filter(
      ({ variable: consumptionVariable }) => variable !== consumptionVariable,
    );

    onChange(newConsumptions);
  };

  return (
    <Column gap={16} mb={24}>
      {substanceGroups.map((group, index) => {
        const isAddSubstanceDisabled = !groupToVariablesMap[index][0];

        return (
          <BoxCollapse
            id={generateGroupId(group.name)}
            key={`substance-group-${index}`}
            label={group.name}
            px={12}
          >
            <>
              {consumptionsMap[index].map((consumption, substanceIndex) => (
                <GroupedSubstanceItem
                  key={`substance-group-item-${index}-${substanceIndex}`}
                  index={substanceIndex}
                  groupName={group.name}
                  consumption={consumption}
                  substances={group.substances}
                  consumptions={consumptionsMap[index] ?? []}
                  onChange={onConsumptionsChange(consumption.variable)}
                  onRemove={onRemoveSubstanceInGroup(consumption.variable)}
                  loading={loading}
                  mobile={mobile}
                />
              ))}

              <TextButton
                disabled={isAddSubstanceDisabled}
                buttonProps={{ color: themeColors.secondary }}
                onClick={onAddSubstanceInGroup(index)}
              >
                {formatMessage(messages.addSubstance)}
              </TextButton>
            </>
          </BoxCollapse>
        );
      })}
    </Column>
  );
};

export const GroupedSubstancesForm = memo(Component);
