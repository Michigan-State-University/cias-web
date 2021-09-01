export interface SelectOption<T> {
  value: string;
  label: T;
}

export type GroupedOption<OptionType extends SelectOption<string>> =
  OptionType & {
    highlighted: boolean;
  };

export type Group<OptionType extends SelectOption<string>> = {
  label: string;
  options: GroupedOption<OptionType>[];
};
