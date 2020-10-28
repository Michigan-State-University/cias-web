/**
 * Test actionBuilder
 */

import { actionBuilder } from 'utils/actionBuilder';

describe('actionBuilder test', () => {
  const ACTION_TYPE = 'app/TEST';
  const ACTION_PAYLOAD = { property1: 'test', property2: 2 };

  it('should generate action with proper structure', () => {
    const expected = {
      type: ACTION_TYPE,
      payload: { test: ACTION_PAYLOAD },
    };
    const action = actionBuilder(ACTION_TYPE, { test: ACTION_PAYLOAD });

    expect(action).toStrictEqual(expected);
  });
});
