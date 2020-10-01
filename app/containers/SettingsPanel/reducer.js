export const UPDATE = 'UPDATE';

export const initialState = currentOption => ({
  id: currentOption.id,
  label: currentOption.label,
  sublabel: currentOption.sublabel,
});

export const reducer = (state, action) => {
  const { type, newState } = action;
  switch (type) {
    case UPDATE:
      return newState;
    default:
      return state;
  }
};
