import loginPageReducer from '../reducer';

describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      formData: {
        email: '',
        password: '',
      },
      loading: false,
      error: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
