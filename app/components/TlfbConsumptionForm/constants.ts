export const generateSubstanceId = (group: string, index: number) =>
  `${group}_SUBSTANCE_SELECT_LABEL_ID_${index}`;

export const generateAmountId = (group: string, index: number) =>
  `${group}_AMOUNT_LABEL_ID_${index}`;

export const generateIndexId = (group: string, index: number) =>
  `${group}_INDEX_ID_${index}`;

export const generateGroupId = (group: string) => `${group}_GROUP_ID`;
