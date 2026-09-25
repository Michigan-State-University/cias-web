import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatChecks, missingCredentials } from './doctor';

describe('missingCredentials', () => {
  it('accepts credentials from the environment or from .env', () => {
    assert.deepEqual(
      missingCredentials({ E2E_ADMIN_PASSWORD: 'x' }, [
        'E2E_VERIFICATION_CODE',
      ]),
      [],
    );
  });

  it('names what is missing — never a value', () => {
    assert.deepEqual(missingCredentials({ E2E_ADMIN_PASSWORD: '' }, []), [
      'E2E_ADMIN_PASSWORD',
      'E2E_VERIFICATION_CODE',
    ]);
  });
});

describe('formatChecks', () => {
  it('is ready when nothing failed, even with warnings', () => {
    const text = formatChecks([
      { name: 'Node.js', status: 'ok', detail: 'v22.21.1' },
      { name: 'App port', status: 'warn', detail: '4200 is in use' },
    ]);
    assert.match(text, /✅ Node\.js/);
    assert.match(text, /⚠️ {2}App port/);
    assert.match(text, /^Ready\./m);
  });

  it('is not ready when anything failed', () => {
    const text = formatChecks([
      { name: 'Claude Code CLI', status: 'fail', detail: 'lacks --restricted' },
    ]);
    assert.match(text, /❌ Claude Code CLI\s+lacks --restricted/);
    assert.match(text, /^Not ready/m);
  });
});
