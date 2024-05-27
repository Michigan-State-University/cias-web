export interface SelectOption<T> {
  value: T;
  label: string;
}
export interface SelectOptionTypeExtended<T> {
  value: T;
  label: string;
  type: string;
}

export type GroupedOption<OptionType extends SelectOption<string>> =
  OptionType & {
    highlighted: boolean;
  };

export type Group<OptionType extends SelectOption<string>> = {
  label: string;
  options: GroupedOption<OptionType>[];
};
