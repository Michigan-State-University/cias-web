export const UPDATE = 'UPDATE';

export const reducer = (state, action) => {
  const { type, newState } = action;
  switch (type) {
    case UPDATE:
      return newState;
    default:
      return state;
  }
};

export const initialState = {
  currentData: null,
  currentBlockIndex: 0,
};
