import fs from 'fs';
import path from 'path';

export type PillEntry = { file: string; title: string; whenToLoad: string };

// The planner gets an index of "When to load:" lines instead of every pill.
export const readPill = (file: string): PillEntry => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const title =
    lines
      .find((line) => line.startsWith('# '))
      ?.slice(2)
      .trim() ?? path.basename(file, '.md');
  const whenLine = lines.find((line) => /when to load:?/i.test(line)) ?? '';
  const whenToLoad = whenLine
    .replace(/^[>*\s_]*/, '')
    .replace(/^\**when to load:?\**\s*/i, '')
    .replace(/[*_]+$/, '')
    .trim();
  return { file, title, whenToLoad };
};

const listPills = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return entry.name.startsWith('_') ? [] : listPills(full);
      }
      return entry.name.endsWith('.md') && entry.name !== 'README.md'
        ? [full]
        : [];
    })
    .sort();

export const buildPillsIndex = (dirs: string[]): PillEntry[] =>
  dirs.flatMap(listPills).map(readPill);

export const renderPillsIndex = (entries: PillEntry[]): string =>
  [
    '# Knowledge pills index',
    '',
    'Read the pills whose "When to load" matches what the diff touches. Paths are absolute.',
    '',
    ...entries.map(
      (e) =>
        `- \`${e.file}\` — **${e.title}**. When to load: ${e.whenToLoad || '(not stated)'}`,
    ),
    '',
  ].join('\n');
