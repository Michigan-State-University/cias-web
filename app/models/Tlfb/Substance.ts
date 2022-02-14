export type SubstanceBody = {
  substancesConsumed: Nullable<boolean>; // TODO CIAS30-2074 remove Nullable
};
export type SubstanceData = {
  id: number;
  body: SubstanceBody;
};
