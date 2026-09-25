import fs from 'fs';
import path from 'path';

import { REPO_ROOT } from './config';
import { git, run } from './shell';

// Stages read a worktree at the commit under test, never the developer's working tree.
export const createCheckout = (
  runDir: string,
  sha: string,
  name = 'checkout',
): string => {
  const dir = path.join(runDir, name);
  removeCheckout(dir);

  const known = (() => {
    try {
      git(['cat-file', '-e', `${sha}^{commit}`], REPO_ROOT);
      return true;
    } catch {
      return false;
    }
  })();
  if (!known) git(['fetch', '--no-tags', 'origin', sha], REPO_ROOT);

  git(['worktree', 'add', '--detach', dir, sha], REPO_ROOT);
  return dir;
};

export const removeCheckout = (dir: string): void => {
  if (!fs.existsSync(dir)) return;
  try {
    git(['worktree', 'remove', '--force', dir], REPO_ROOT);
  } catch {
    // Left over from a crashed run and no longer a registered worktree.
    fs.rmSync(dir, { recursive: true, force: true });
    git(['worktree', 'prune'], REPO_ROOT);
  }
};

// Hides a PR's own specs: reverts files to the first parent, removing ones it added.
export const restoreFromParent = (checkout: string, files: string[]): void => {
  files.forEach((file) => {
    try {
      git(['checkout', 'HEAD^1', '--', file], checkout);
    } catch {
      fs.rmSync(path.join(checkout, file), { force: true });
    }
  });
};

export type PairedSource = { dir: string; ref: string; sha: string };

const resolves = (ref: string, cwd: string): boolean => {
  try {
    git(['rev-parse', '--verify', '-q', `${ref}^{commit}`], cwd);
    return true;
  } catch {
    return false;
  }
};

// Exported rather than read in place: the developer's checkout holds .env files and keys.
export const exportPairedSource = (
  repoDir: string,
  runDir: string,
  branch: string,
): PairedSource | undefined => {
  const ref = [`origin/${branch}`, 'HEAD'].find((candidate) =>
    resolves(candidate, repoDir),
  );
  if (!ref) return undefined;
  const sha = git(['rev-parse', `${ref}^{commit}`], repoDir);
  const dir = path.join(runDir, 'paired');
  const archive = path.join(runDir, 'paired.tar');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  git(['archive', '--format=tar', '-o', archive, sha], repoDir);
  run('tar', ['-xf', archive, '-C', dir]);
  fs.rmSync(archive);
  return { dir, ref, sha };
};
