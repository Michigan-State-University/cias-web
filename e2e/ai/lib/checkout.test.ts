import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { exportPairedSource } from './checkout';

const tempDir = (prefix: string) =>
  fs.mkdtempSync(path.join(os.tmpdir(), prefix));

const git = (cwd: string, ...args: string[]) =>
  execFileSync(
    'git',
    ['-c', 'user.name=test', '-c', 'user.email=test@example.com', ...args],
    { cwd, encoding: 'utf8' },
  ).trim();

describe('exportPairedSource', () => {
  it('exports only committed files, never the secrets next to them', () => {
    const repo = tempDir('paired-repo-');
    git(repo, 'init', '-q', '-b', 'dev');
    fs.mkdirSync(path.join(repo, 'app/models'), { recursive: true });
    fs.writeFileSync(path.join(repo, 'app/models/phone.rb'), 'required: true');
    git(repo, 'add', '.');
    git(repo, 'commit', '-q', '-m', 'init');
    fs.writeFileSync(path.join(repo, '.env'), 'SECRET=1');
    fs.mkdirSync(path.join(repo, 'config'));
    fs.writeFileSync(path.join(repo, 'config/master.key'), 'key');
    fs.writeFileSync(path.join(repo, 'app/models/phone.rb'), 'uncommitted');

    const runDir = tempDir('paired-run-');
    const paired = exportPairedSource(repo, runDir, 'dev');

    assert.ok(paired);
    assert.equal(paired.ref, 'HEAD', 'no origin/dev in a repo without remote');
    assert.equal(paired.sha, git(repo, 'rev-parse', 'HEAD'));
    assert.equal(
      fs.readFileSync(path.join(paired.dir, 'app/models/phone.rb'), 'utf8'),
      'required: true',
      'the committed version, not the working tree',
    );
    assert.equal(fs.existsSync(path.join(paired.dir, '.env')), false);
    assert.equal(
      fs.existsSync(path.join(paired.dir, 'config/master.key')),
      false,
    );
    assert.equal(fs.existsSync(path.join(runDir, 'paired.tar')), false);
  });

  it('prefers the remote base branch over whatever is checked out', () => {
    const origin = tempDir('paired-origin-');
    git(origin, 'init', '-q', '-b', 'dev');
    fs.writeFileSync(path.join(origin, 'a.rb'), 'dev');
    git(origin, 'add', '.');
    git(origin, 'commit', '-q', '-m', 'dev');
    const clone = tempDir('paired-clone-');
    git(clone, 'clone', '-q', origin, '.');
    git(clone, 'checkout', '-q', '-b', 'feature');
    fs.writeFileSync(path.join(clone, 'a.rb'), 'feature');
    git(clone, 'commit', '-q', '-am', 'feature');

    const paired = exportPairedSource(clone, tempDir('paired-run-'), 'dev');

    assert.equal(paired?.ref, 'origin/dev');
    assert.equal(
      fs.readFileSync(path.join(paired!.dir, 'a.rb'), 'utf8'),
      'dev',
    );
  });
});
