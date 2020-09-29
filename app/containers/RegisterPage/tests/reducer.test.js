import registerPageReducer, { initialState } from '../reducer';

import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_ERROR,
  REGISTER_RESEARCHER_REQUEST,
  REGISTER_RESEARCHER_SUCCESS,
  REGISTER_RESEARCHER_ERROR,
} from '../constants';

describe('registerPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(registerPageReducer(undefined, {})).toEqual(expectedResult);
  });
  it('test REGISTER_PARTICIPANT_REQUEST action', () => {
    const expectedResult = {
      error: null,
      loading: true,
    };

    const action = { type: REGISTER_PARTICIPANT_REQUEST };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_RESEARCHER_REQUEST action', () => {
    const expectedResult = {
      error: null,
      loading: true,
    };

    const action = { type: REGISTER_RESEARCHER_REQUEST };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_PARTICIPANT_SUCCESS action', () => {
    const expectedResult = {
      error: null,
      loading: false,
    };

    const action = { type: REGISTER_PARTICIPANT_SUCCESS };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_RESEARCHER_SUCCESS action', () => {
    const expectedResult = {
      error: null,
      loading: false,
    };

    const action = { type: REGISTER_RESEARCHER_SUCCESS };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_PARTICIPANT_ERROR action', () => {
    const error = 'Error!';
    const expectedResult = {
      error,
      loading: false,
    };

    const action = { type: REGISTER_PARTICIPANT_ERROR, payload: { error } };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_RESEARCHER_ERROR action', () => {
    const error = 'Error!';
    const expectedResult = {
      error,
      loading: false,
    };

    const action = { type: REGISTER_RESEARCHER_ERROR, payload: { error } };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
});
