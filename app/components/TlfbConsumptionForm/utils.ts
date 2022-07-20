import intersectionBy from 'lodash/intersectionBy';
import differenceBy from 'lodash/differenceBy';

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
): NormalizedData<SubstanceConsumption[]> =>
  substanceGroups.reduce<NormalizedData<SubstanceConsumption[]>>(
    (value, { substances }, index) => ({
      ...value,
      [index]: intersectionBy(
        consumptions,
        substances,
        ({ variable }) => variable,
      ),
    }),
    {},
  );

export const generateGroupToVariablesMap = (
  substanceGroups: SubstanceGroup[],
  consumptionsMap: NormalizedData<SubstanceConsumption[]>,
): NormalizedData<string[]> =>
  substanceGroups.reduce<NormalizedData<string[]>>(
    (value, { substances }, index) => ({
      ...value,
      [index]: getAllRemainingVariablesInGroup(
        substances,
        consumptionsMap[index],
      ),
    }),
    {},
  );

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
