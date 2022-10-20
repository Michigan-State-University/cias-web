import { OptionType } from './types';

export const UPDATE = 'UPDATE';

export const initialState = (currentOption: OptionType) => ({
  id: currentOption.id,
  label: currentOption.label,
  sublabel: currentOption.sublabel,
});

export const reducer = (
  state: Nullable<OptionType>,
  action: { type: string; newState: Nullable<OptionType> },
) => {
  const { type, newState } = action;
  switch (type) {
    case UPDATE:
      return newState;
    default:
      return state;
  }
};
