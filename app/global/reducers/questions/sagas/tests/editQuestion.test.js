import { singleQuestion, numberQuestion } from 'models/Session/QuestionTypes';

import { validateVariable } from '../editQuestion';

describe('validateVariable — RA session variable requirement', () => {
  const raSingleBlank = {
    type: singleQuestion.id,
    body: { variable: { name: '' } },
  };
  const raSingleNamed = {
    type: singleQuestion.id,
    body: { variable: { name: 'systolic_bp' } },
  };
  const raNumberWhitespace = {
    type: numberQuestion.id,
    body: { variable: { name: '   ' } },
  };

  it('throws when an answerable RA question has a blank variable', () => {
    expect(() => validateVariable(raSingleBlank, [], true)).toThrow();
  });

  it('throws when an answerable RA variable is only whitespace', () => {
    expect(() => validateVariable(raNumberWhitespace, [], true)).toThrow();
  });

  it('does not throw when the RA variable is present', () => {
    expect(() => validateVariable(raSingleNamed, [], true)).not.toThrow();
  });

  it('does not require a variable outside RA sessions', () => {
    expect(() => validateVariable(raSingleBlank, [], false)).not.toThrow();
  });
});
