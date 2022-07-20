import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import { SubstanceConsumption } from 'models/Tlfb';
import { SubstanceGroup } from 'models/Question';

import Column from 'components/Column';
import BoxCollapse from 'components/BoxCollapse';
import { TextButton } from 'components/Button';

import Row from 'components/Row';
import Text from 'components/Text';
import TlfbYesNoText from 'components/TlfbYesNoText';
import Box from 'components/Box';

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

  const onAddSubstanceInGroup = (index: number, name: string) => () => {
    const remainingVariable = groupToVariablesMap[index][0];

    if (remainingVariable) {
      const newConsumptions: SubstanceConsumption[] = [
        ...consumptions,
        {
          amount: null,
          consumed: null,
          variable: remainingVariable,
          name,
        },
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

  const isAnySubstanceInGroupConsumed = (
    groupConsumptions: SubstanceConsumption[],
  ) => {
    if (groupConsumptions.length === 0) return false;
    return groupConsumptions.some(({ amount }) => amount !== null);
  };

  return (
    <Column gap={16} mb={24}>
      {substanceGroups.map(({ name, substances }, index) => {
        const isAddSubstanceDisabled = !groupToVariablesMap[index][0];

        return (
          <BoxCollapse
            id={generateGroupId(name)}
            key={`substance-group-${index}`}
            label={
              <Row align="center">
                <Text fontSize={16} fontWeight="bold">
                  {name}
                </Text>
                <Box mx={10} width={1} height={15} bg={colors.periwinkleGray} />
                <TlfbYesNoText
                  yes={isAnySubstanceInGroupConsumed(consumptionsMap[index])}
                />
              </Row>
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
                  onRemove={onRemoveSubstanceInGroup(consumption.variable)}
                  loading={loading}
                  mobile={mobile}
                />
              ))}

              <TextButton
                disabled={isAddSubstanceDisabled}
                buttonProps={{ color: themeColors.secondary }}
                onClick={onAddSubstanceInGroup(index, name)}
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
