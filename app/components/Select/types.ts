export interface SelectOption {
  value: string;
  label: string;
}

export type GroupedOption<OptionType extends SelectOption> = OptionType & {
  highlighted: boolean;
};

export type Group<OptionType extends SelectOption> = {
  label: string;
  options: GroupedOption<OptionType>[];
};
