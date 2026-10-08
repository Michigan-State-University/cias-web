import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { localCodeUnderTest } from './codegen';
import type { SourceChange } from './manifest';

const git = (cwd: string, ...args: string[]) =>
  execFileSync(
    'git',
    ['-c', 'user.name=test', '-c', 'user.email=test@example.com', ...args],
    { cwd, encoding: 'utf8' },
  ).trim();

const commit = (repo: string, file: string) => {
  fs.writeFileSync(path.join(repo, file), file);
  git(repo, 'add', file);
  git(repo, 'commit', '-q', '-m', file);
  return git(repo, 'rev-parse', 'HEAD');
};

// dev → origin/dev, plus feature/x one commit ahead of it.
const repoWithBranch = () => {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-target-'));
  git(repo, 'init', '-q', '-b', 'dev');
  const dev = commit(repo, 'base.txt');
  git(repo, 'update-ref', 'refs/remotes/origin/dev', dev);
  git(repo, 'checkout', '-q', '-b', 'feature/x');
  const feature = commit(repo, 'feature.txt');
  git(repo, 'checkout', '-q', 'dev');
  return { repo, dev, feature };
};

const source = (
  kind: SourceChange['kind'],
  sha: string,
  headRef = 'feature/x',
): SourceChange => ({
  kind,
  title: 'A change',
  headRef,
  baseRef: 'dev',
  sha,
  labels: [],
  changedFiles: [],
});

const config = { baseBranch: 'dev' };

describe('localCodeUnderTest', () => {
  it('tests a merged PR against the base branch, where its change already is', () => {
    const { repo, dev, feature } = repoWithBranch();
    const manifest = { source: { ...source('pr', feature), pr: 1 } };
    assert.equal(localCodeUnderTest(manifest, {}, config, repo), dev);
  });

  it('tests a branch run against the branch, whose change is not on the base yet', () => {
    const { repo, feature } = repoWithBranch();
    const manifest = { source: source('branch', feature) };
    assert.equal(localCodeUnderTest(manifest, {}, config, repo), feature);
  });

  it('follows the branch tip when it moved on after the scenarios were drafted', () => {
    const { repo, feature } = repoWithBranch();
    git(repo, 'checkout', '-q', 'feature/x');
    const newer = commit(repo, 'fix.txt');
    const manifest = { source: source('branch', feature) };
    assert.equal(localCodeUnderTest(manifest, {}, config, repo), newer);
  });

  it('falls back to the drafted commit once the branch is gone', () => {
    const { repo, feature } = repoWithBranch();
    git(repo, 'branch', '-q', '-D', 'feature/x');
    const manifest = { source: source('branch', feature) };
    assert.equal(localCodeUnderTest(manifest, {}, config, repo), feature);
  });

  it('lets --base override either', () => {
    const { repo, dev, feature } = repoWithBranch();
    const manifest = { source: source('branch', feature) };
    assert.equal(
      localCodeUnderTest(manifest, { baseRef: 'origin/dev' }, config, repo),
      dev,
    );
  });
});
