import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { healInstructions } from './assets';
import {
  changedFiles,
  linkDependencies,
  overlayTooling,
  toolingPaths,
} from './workspace';

const tempDir = (prefix: string) =>
  fs.mkdtempSync(path.join(os.tmpdir(), prefix));

const write = (root: string, file: string, content: string) => {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), content);
};

describe('overlayTooling', () => {
  it('copies tooling the checkout lacks or has an older copy of, and reports it', () => {
    const source = tempDir('tooling-source-');
    const checkout = tempDir('tooling-checkout-');
    write(source, 'e2e/ai/seed.spec.ts', 'seed v2');
    write(source, 'e2e/tsconfig.json', '{}');
    write(source, 'playwright.config.ts', 'config v2');
    write(checkout, 'e2e/tsconfig.json', '{}');
    write(checkout, 'playwright.config.ts', 'config v1');

    assert.deepEqual(
      overlayTooling(checkout, toolingPaths({ dir: 'e2e' }), source),
      ['e2e/ai', 'playwright.config.ts'],
    );
    assert.equal(
      fs.readFileSync(path.join(checkout, 'e2e/ai/seed.spec.ts'), 'utf8'),
      'seed v2',
    );
    assert.equal(
      fs.readFileSync(path.join(checkout, 'playwright.config.ts'), 'utf8'),
      'config v2',
    );
    assert.deepEqual(
      overlayTooling(checkout, toolingPaths({ dir: 'e2e' }), source),
      [],
      'nothing left to overlay',
    );
  });
});

describe('linkDependencies', () => {
  it('symlinks node_modules and .env when the checkout has none', () => {
    const source = tempDir('deps-source-');
    const checkout = tempDir('deps-checkout-');
    fs.mkdirSync(path.join(source, 'node_modules'));
    write(source, '.env', 'X=1');
    linkDependencies(checkout, source);
    assert.equal(
      fs.readlinkSync(path.join(checkout, 'node_modules')),
      path.join(source, 'node_modules'),
    );
    assert.equal(
      fs.readlinkSync(path.join(checkout, '.env')),
      path.join(source, '.env'),
    );
  });
});

describe('changedFiles', () => {
  it('lists modified and new files — the first one too — minus excluded prefixes', () => {
    const repo = tempDir('changed-');
    const git = (...args: string[]) =>
      execFileSync(
        'git',
        ['-c', 'user.name=t', '-c', 'user.email=t@t', ...args],
        { cwd: repo },
      );
    git('init', '-q');
    write(repo, 'e2e/pages/SessionPage.ts', 'v1');
    write(repo, 'playwright.config.ts', 'v1');
    git('add', '.');
    git('commit', '-q', '-m', 'init');
    write(repo, 'e2e/pages/SessionPage.ts', 'v2');
    write(repo, 'playwright.config.ts', 'v2');
    write(repo, 'e2e/sessions/new.spec.ts', 'new');
    write(repo, 'e2e/ai/seed.spec.ts', 'overlay');

    assert.deepEqual(
      changedFiles(repo, ['e2e/ai', 'playwright.config.ts']).sort(),
      ['e2e/pages/SessionPage.ts', 'e2e/sessions/new.spec.ts'],
    );
  });
});

describe('healInstructions', () => {
  it('uses the stock healer without its front matter, plus this repo’s rules', () => {
    const dir = tempDir('heal-');
    const text = fs.readFileSync(healInstructions(dir, 'webkit'), 'utf8');
    assert.ok(!text.startsWith('---'), 'front matter stripped');
    assert.match(text, /You are the Playwright Test Healer/);
    assert.match(text, /## Rules for this repository/);
    assert.match(text, /projects: \["webkit"\]/);
  });
});
