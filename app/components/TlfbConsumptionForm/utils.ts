import differenceBy from 'lodash/differenceBy';
import find from 'lodash/find';

import { Substance, SubstanceGroup } from 'models/Question';
import { SubstanceConsumption } from 'models/Tlfb';

export const normalizeUngroupedConsumptions = (
  consumptions: SubstanceConsumption[],
): NormalizedData<boolean> =>
  consumptions.reduce<NormalizedData<boolean>>(
    (value, { variable, consumed }) => ({
      ...value,
      [variable]: !!consumed,
    }),
    {},
  );

export const denormalizeUngroupedConsumptions = (
  consumptions: NormalizedData<boolean>,
  substanceNameMap: NormalizedData<string>,
): SubstanceConsumption[] =>
  Object.entries(consumptions).map(([variable, consumed]) => ({
    variable,
    consumed,
    amount: null,
    name: substanceNameMap[variable],
  }));

export const normalizeGroupedConsumptions = (
  substanceGroups: SubstanceGroup[],
  consumptions: SubstanceConsumption[],
): NormalizedData<SubstanceConsumption[]> => {
  const allSubstances = substanceGroups.map((group: SubstanceGroup) =>
    group.substances.map((substance: Substance) => {
      const consumption = find(consumptions, { variable: substance.variable });

      return {
        variable: substance.variable,
        consumed: consumption?.consumed ?? null,
        amount: consumption?.amount ?? null,
        name: group.name,
      };
    }),
  );

  const normalizedConsumptions = allSubstances.reduce<
    NormalizedData<SubstanceConsumption[]>
  >(
    (value, substances, index) => ({
      ...value,
      [index]: substances,
    }),
    {},
  );

  return normalizedConsumptions;
};

export const getAllRemainingVariablesInGroup = (
  substancesFromGroup: Substance[],
  consumptionsFromGroup: SubstanceConsumption[],
): string[] => {
  const remainingSubstances = getAllRemainingSubstancesInGroup(
    substancesFromGroup,
    consumptionsFromGroup,
  );

  const variables = remainingSubstances.map(({ variable }) => variable);

  return variables;
};

export const getAllRemainingSubstancesInGroup = (
  substancesFromGroup: Substance[],
  consumptionsFromGroup: SubstanceConsumption[],
): Substance[] => {
  const remainingSubstances = differenceBy(
    substancesFromGroup,
    consumptionsFromGroup,
    ({ variable }) => variable,
  );

  return remainingSubstances;
};
