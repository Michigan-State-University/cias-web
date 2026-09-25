import fs from 'fs';
import path from 'path';

import type { Scenario } from './scenarios';
import { git } from './shell';

// Deterministic checks of what scenarios.md claims exists (test ids, cited files, page objects).
// Every issue costs a model revision, so only certain misses are issues; uncertain ones are hints.

export type GroundingIssue = {
  scenarioId: string;
  kind: 'test-id' | 'file' | 'lines' | 'page-object';
  ref: string;
  problem: string;
};

export type GroundingReport = {
  checked: {
    testIds: number;
    files: number;
    pageObjects: number;
  };
  issues: GroundingIssue[];
  hints: { scenarioId: string; text: string }[];
};

export type SourceIndex = {
  appText: string;
  templates: RegExp[];
  copyLines: string[];
  files: Map<string, number>;
  byBasename: Map<string, string[]>;
  pages: Map<string, { members: Set<string>; parent?: string }>;
  selectorAttribute: string;
};

const SOURCE = /\.(?:[cm]?[jt]sx?)$/;
const PAIRED_SOURCE = /\.(?:rb|ya?ml|erb|rake)$/;
const SKIP_DIR = /(^|\/)(node_modules|\.git|coverage|build|dist)(\/|$)/;

const normalise = (text: string) => text.toLowerCase().replace(/[’‘]/g, "'");

const lineCount = (text: string) =>
  text.length === 0
    ? 0
    : text.split('\n').length - (text.endsWith('\n') ? 1 : 0);

const walk = (root: string): string[] => {
  const out: string[] = [];
  const visit = (dir: string) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      const rel = path.relative(root, full);
      if (SKIP_DIR.test(rel)) return;
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile()) out.push(rel);
    });
  };
  if (fs.existsSync(root)) visit(root);
  return out;
};

// Tracked files only, so the .env linked into the checkout is never read.
const trackedFiles = (checkout: string): string[] =>
  git(['ls-files'], checkout)
    .split('\n')
    .filter((file) => file && !SKIP_DIR.test(file));

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Templates with almost no fixed text would match anything, so they are left out.
const templatePatterns = (text: string): RegExp[] =>
  [...text.matchAll(/`([^`\n]*\$\{[^`\n]*)`/g)]
    .map(([, body]) => body.split(/\$\{[^}]*\}/))
    .filter((parts) => parts.join('').replace(/[^a-z0-9]/gi, '').length >= 4)
    .map((parts) => new RegExp(`^${parts.map(escape).join('.+')}$`));

const MEMBER =
  /^\s+(?:(?:readonly|private|public|protected|static|async|get|set)\s+)*([a-zA-Z_$][\w$]*)\s*[(=:<!?]/gm;

const indexPages = (
  checkout: string,
  pagesDir: string,
): SourceIndex['pages'] => {
  const pages: SourceIndex['pages'] = new Map();
  const dir = path.join(checkout, pagesDir);
  if (!fs.existsSync(dir)) return pages;
  fs.readdirSync(dir)
    .filter((file) => SOURCE.test(file))
    .forEach((file) => {
      const text = fs.readFileSync(path.join(dir, file), 'utf8');
      [
        ...text.matchAll(/class\s+(\w+)(?:\s+extends\s+(\w+))?[^{]*\{/g),
      ].forEach(([, name, parent]) => {
        pages.set(name, {
          members: new Set([...text.matchAll(MEMBER)].map(([, m]) => m)),
          parent,
        });
      });
    });
  return pages;
};

export const buildSourceIndex = (options: {
  checkout: string;
  pagesDir: string;
  selectorAttribute: string;
  pairedDir?: string;
  otherRoots?: string[];
}): SourceIndex => {
  const files = new Map<string, number>();
  const byBasename = new Map<string, string[]>();
  const add = (rel: string, lines: number) => {
    files.set(rel, Math.max(files.get(rel) ?? 0, lines));
    const base = path.basename(rel);
    byBasename.set(base, [...(byBasename.get(base) ?? []), rel]);
  };

  const appParts: string[] = [];
  trackedFiles(options.checkout).forEach((rel) => {
    const full = path.join(options.checkout, rel);
    if (!fs.existsSync(full)) return;
    const text = fs.readFileSync(full, 'utf8');
    add(rel, lineCount(text));
    if (SOURCE.test(rel)) appParts.push(text);
  });

  const copyParts: string[] = [];
  if (options.pairedDir) {
    // An export, not a repo (checkout.ts → exportPairedSource).
    walk(options.pairedDir).forEach((rel) => {
      const text = fs.readFileSync(path.join(options.pairedDir!, rel), 'utf8');
      add(rel, lineCount(text));
      if (PAIRED_SOURCE.test(rel)) copyParts.push(text);
    });
  }
  (options.otherRoots ?? []).forEach((root) =>
    walk(root).forEach((rel) =>
      add(rel, lineCount(fs.readFileSync(path.join(root, rel), 'utf8'))),
    ),
  );

  const appText = appParts.join('\n');
  return {
    appText,
    templates: templatePatterns(appText),
    copyLines: [appText, ...copyParts]
      .join('\n')
      .split('\n')
      .map(normalise)
      .filter((line) => /[a-z]{3}/.test(line)),
    files,
    byBasename,
    pages: indexPages(options.checkout, options.pagesDir),
    selectorAttribute: options.selectorAttribute,
  };
};

const EXTENSIONS = 'js|jsx|ts|tsx|mjs|cjs|rb|erb|rake|json|md|ya?ml|css|scss';
const CITATION = new RegExp(
  `(?:^|[\\s\`(,;])((?:[\\w@.-]+/)*[\\w@-][\\w@.-]*\\.(?:${EXTENSIONS}))(?::(\\d+)(?:-(\\d+))?)?(?![\\w/])` +
    // or a bare ":700-701", continuing the file cited before it
    `|(?:^|[\\s\`(,;]):(\\d+)(?:-(\\d+))?(?![\\w:])`,
  'g',
);

const checkCitations = (
  scenario: Scenario,
  index: SourceIndex,
  issues: GroundingIssue[],
): number => {
  let checked = 0;
  // Only these must cite existing files; steps and page objects may name files still to be written.
  [scenario.covers, scenario.groundedIn].forEach((field) => {
    let current: string[] | undefined;
    let currentRef = '';
    [...field.matchAll(CITATION)].forEach((match) => {
      const [, file, from, to, contFrom, contTo] = match;
      if (file) {
        checked += 1;
        const candidates = file.includes('/')
          ? [...index.files.keys()].filter(
              (rel) => rel === file || rel.endsWith(`/${file}`),
            )
          : (index.byBasename.get(file) ?? []);
        if (candidates.length === 0) {
          issues.push({
            scenarioId: scenario.id,
            kind: 'file',
            ref: file,
            problem: `cites \`${file}\`, which doesn't exist in the checkout, the paired source or the pills`,
          });
          current = undefined;
          return;
        }
        current = candidates;
        currentRef = file;
      }
      const start = Number(from ?? contFrom);
      const end = Number(to ?? contTo ?? start);
      if (!Number.isFinite(start) || !current) return;
      const longest = Math.max(
        ...current.map((rel) => index.files.get(rel) ?? 0),
      );
      if (end > longest) {
        issues.push({
          scenarioId: scenario.id,
          kind: 'lines',
          ref: `${currentRef}:${start}${end !== start ? `-${end}` : ''}`,
          problem: `cites \`${currentRef}\` lines ${start}–${end}, but the file has ${longest} lines`,
        });
      }
    });
  });
  return checked;
};

const scenarioText = (s: Scenario) =>
  [
    s.title,
    s.covers,
    s.groundedIn,
    s.preconditions,
    ...s.steps,
    s.pageObjects,
  ].join('\n');

const testIdsIn = (text: string, attribute: string) => {
  const attr = new RegExp(
    `${escape(attribute)}([~|^$*]?)=\\\\?["']([^"'\\]]+)["']|getByTestId\\(\\s*["'\`]([^"'\`]+)["'\`]`,
    'g',
  );
  return [...text.matchAll(attr)].map((match) => ({
    value: match[2] ?? match[3],
    before: text.slice(Math.max(0, (match.index ?? 0) - 60), match.index),
  }));
};

const testIdExists = (value: string, index: SourceIndex) =>
  index.appText.includes(value) ||
  index.templates.some((pattern) => pattern.test(value));

const checkTestIds = (
  scenario: Scenario,
  planned: Set<string>,
  index: SourceIndex,
  issues: GroundingIssue[],
): number => {
  const ids = testIdsIn(scenarioText(scenario), index.selectorAttribute);
  const seen = new Set<string>();
  ids.forEach(({ value, before }) => {
    if (seen.has(value)) return;
    seen.add(value);
    if (planned.has(value) || /\b(add|adds|added|adding|new)\b/i.test(before))
      return;
    if (testIdExists(value, index)) return;
    issues.push({
      scenarioId: scenario.id,
      kind: 'test-id',
      ref: `[${index.selectorAttribute}="${value}"]`,
      problem: `uses \`[${index.selectorAttribute}="${value}"]\`, which appears nowhere in the app or suite source`,
    });
  });
  return seen.size;
};

const hasMember = (
  index: SourceIndex,
  className: string,
  member: string,
): boolean => {
  const seen = new Set<string>();
  let current: string | undefined = className;
  while (current && !seen.has(current)) {
    seen.add(current);
    const page = index.pages.get(current);
    if (!page) return true; // extends something outside the pages dir
    if (page.members.has(member)) return true;
    current = page.parent;
  }
  return false;
};

const checkPageObjects = (
  scenario: Scenario,
  index: SourceIndex,
  issues: GroundingIssue[],
): number => {
  let checked = 0;
  scenario.pageObjects.split(/[,;]|\s+—\s+|\s+plus\s+/).forEach((clause) => {
    // "so add SessionPage.addPhoneScreen" names a method codegen will write.
    if (
      /\b(new|add|adds|adding|create|creates|introduce|write)\b/i.test(clause)
    )
      return;
    [...clause.matchAll(/\b([A-Z]\w*)\.([a-zA-Z_$][\w$]*)/g)].forEach(
      ([ref, className, member]) => {
        if (!index.pages.has(className)) return; // not a page object
        checked += 1;
        if (hasMember(index, className, member)) return;
        issues.push({
          scenarioId: scenario.id,
          kind: 'page-object',
          ref,
          problem: `reuses \`${ref}\`, but ${className} has no member \`${member}\``,
        });
      },
    );
  });
  return checked;
};

const QUOTED = /["“]([^"”\n]{3,}?)["”]/g;

const words = (text: string) => normalise(text).match(/[a-z]{3,}/g) ?? [];

// Matching words in order on one line tolerates ICU templates, runtime numbers, "…" and apostrophes.
const copyFound = (text: string, lines: string[]) => {
  const wanted = words(text);
  if (wanted.length === 0) return true;
  const anchor = wanted.reduce((a, b) => (b.length > a.length ? b : a));
  return lines.some((line) => {
    if (!line.includes(anchor)) return false;
    let at = 0;
    return wanted.every((word) => {
      const found = line.indexOf(word, at);
      at = found + word.length;
      return found >= 0;
    });
  });
};

const copyHints = (scenario: Scenario, index: SourceIndex) => {
  const introduced = normalise(
    [
      scenario.preconditions,
      ...scenario.steps.map((step) => step.split('→')[0]),
    ].join('\n'),
  );
  return (
    scenario.steps
      // Code spans are selectors and identifiers, not copy.
      .map((step) =>
        step
          .split('→')
          .slice(1)
          .join('→')
          .replace(/`[^`]*`/g, ' '),
      )
      .flatMap((expected) => [...expected.matchAll(QUOTED)])
      .map(([, text]) => text.trim())
      .filter(
        (text, i, all) =>
          all.indexOf(text) === i &&
          /[a-z]/i.test(text) &&
          !introduced.includes(normalise(text)) &&
          !copyFound(text, index.copyLines),
      )
      .map((text) => ({ scenarioId: scenario.id, text }))
  );
};

// The Decisions section sits before the first scenario, where the scenario parser doesn't look.
const plannedTestIds = (markdown: string, attribute: string): Set<string> => {
  const decisions =
    markdown.split(/^### /m)[0].split(/^## Decisions\s*$/m)[1] ?? '';
  return new Set(testIdsIn(decisions, attribute).map(({ value }) => value));
};

export const checkGrounding = (
  scenarios: Scenario[],
  markdown: string,
  index: SourceIndex,
): GroundingReport => {
  const issues: GroundingIssue[] = [];
  const planned = plannedTestIds(markdown, index.selectorAttribute);
  const checked = { testIds: 0, files: 0, pageObjects: 0 };
  scenarios.forEach((scenario) => {
    checked.testIds += checkTestIds(scenario, planned, index, issues);
    checked.files += checkCitations(scenario, index, issues);
    checked.pageObjects += checkPageObjects(scenario, index, issues);
  });
  return {
    checked,
    issues,
    hints: scenarios.flatMap((scenario) => copyHints(scenario, index)),
  };
};

export const formatIssue = (issue: GroundingIssue): string =>
  `${issue.scenarioId}: ${issue.problem}`;
