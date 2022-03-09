import { SubstanceConsumption } from 'models/Tlfb';

export const normalizeUngroupedConsumptions = (
  consumptions: SubstanceConsumption[],
): { [key: string]: boolean } =>
  consumptions.reduce(
    (value, { variable, consumed }) => ({
      ...value,
      [variable]: consumed,
    }),
    {},
  );

export const denormalizeUngroupedConsumptions = (consumptions: {
  [key: string]: boolean;
}): SubstanceConsumption[] =>
  Object.entries(consumptions).map(([variable, consumed]) => ({
    variable,
    consumed,
    amount: null,
  }));
