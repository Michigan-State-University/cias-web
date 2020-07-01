import loginPageReducer from '../reducer';

describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      formData: {
        username: '',
        password: '',
      },
      loading: false,
      error: '',
      newAccountPopup: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
