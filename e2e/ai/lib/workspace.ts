import fs from 'fs';
import path from 'path';

import { AI_REL, REPO_ROOT, type E2eConfig } from './config';
import { git, run } from './shell';

// Laid over codegen's checkout, which may predate the tooling; never committed.
export const toolingPaths = (e2e: Pick<E2eConfig, 'dir'>): string[] => [
  AI_REL,
  `${e2e.dir}/tsconfig.json`,
  'playwright.config.ts',
];

const sameFile = (a: string, b: string) =>
  fs.existsSync(b) && fs.readFileSync(a).equals(fs.readFileSync(b));

const filesUnder = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });

const sameTree = (a: string, b: string) => {
  if (!fs.existsSync(b)) return false;
  if (fs.statSync(a).isFile()) return sameFile(a, b);
  const files = filesUnder(a).map((file) => path.relative(a, file));
  return files.every((file) =>
    sameFile(path.join(a, file), path.join(b, file)),
  );
};

export const overlayTooling = (
  checkout: string,
  paths: string[],
  source = REPO_ROOT,
): string[] =>
  paths.filter((relative) => {
    const from = path.join(source, relative);
    const to = path.join(checkout, relative);
    if (!fs.existsSync(from) || sameTree(from, to)) return false;
    fs.cpSync(from, to, { recursive: true, force: true });
    return true;
  });

// Stages still can't read the linked .env: runStage denies it to every tool.
export const linkDependencies = (
  checkout: string,
  source = REPO_ROOT,
): void => {
  ['node_modules', '.env'].forEach((name) => {
    const from = path.join(source, name);
    const to = path.join(checkout, name);
    if (fs.existsSync(from) && !fs.existsSync(to)) fs.symlinkSync(from, to);
  });
};

export const changedFiles = (checkout: string, exclude: string[]): string[] =>
  // Not git(): it trims, and the first line's leading status column matters.
  run('git', ['status', '--porcelain', '--untracked-files=all'], {
    cwd: checkout,
  })
    .split('\n')
    .filter(Boolean)
    .map(
      (line) => line.slice(3).replace(/^"|"$/g, '').split(' -> ').pop() ?? '',
    )
    .filter(
      (file) =>
        !exclude.some(
          (prefix) => file === prefix || file.startsWith(`${prefix}/`),
        ),
    );

export const trackedSpecs = (checkout: string, e2eDir: string): string[] =>
  git(['ls-files', `${e2eDir}/**/*.spec.ts`], checkout)
    .split('\n')
    .filter(Boolean);
