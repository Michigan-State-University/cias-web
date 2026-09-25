import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { buildSourceIndex, checkGrounding } from './grounding';
import { parseScenarios } from './scenarios';

const tempDir = (prefix: string) =>
  fs.mkdtempSync(path.join(os.tmpdir(), prefix));

const write = (root: string, file: string, content: string) => {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), content);
};

const fixture = () => {
  const checkout = tempDir('grounding-checkout-');
  write(
    checkout,
    'app/containers/Answer/index.js',
    [
      'export const Answer = ({ index }) => (',
      '  <>',
      '    <Button data-cy="continue-button" />',
      '    <li data-cy={`question-list-item-${index}`} />',
      '  </>',
      ');',
      '',
    ].join('\n'),
  );
  write(
    checkout,
    'app/containers/Answer/messages.js',
    [
      'export default {',
      "  empty: { defaultMessage: 'There are no {kind, select, PREDEFINED {predefined} other {}} participants yet' },",
      "  other: { defaultMessage: 'If results don’t match any cases then label is' },",
      '};',
      '',
    ].join('\n'),
  );
  write(
    checkout,
    'e2e/pages/BasePage.ts',
    'export class BasePage {\n  async goto(url: string) {}\n}\n',
  );
  write(
    checkout,
    'e2e/pages/SessionPage.ts',
    [
      "import { BasePage } from './BasePage';",
      'export class SessionPage extends BasePage {',
      '  readonly continueButton: Locator;',
      '  async clickAddNewScreen() {}',
      '}',
      '',
    ].join('\n'),
  );
  execFileSync('git', ['init', '-q'], { cwd: checkout });
  execFileSync('git', ['add', '.'], { cwd: checkout });

  const paired = tempDir('grounding-paired-');
  write(
    paired,
    'app/models/question/phone.rb',
    "def x\n  'required' => true\nend\n",
  );
  const pills = tempDir('grounding-pills-');
  write(pills, 'cias-web/answer-flow.md', '# Answer flow\n');

  return buildSourceIndex({
    checkout,
    pagesDir: 'e2e/pages',
    selectorAttribute: 'data-cy',
    pairedDir: paired,
    otherRoots: [pills],
  });
};

const scenario = (fields: {
  id?: string;
  covers?: string;
  groundedIn?: string;
  preconditions?: string;
  steps?: string[];
  pageObjects?: string;
}) =>
  [
    `### ${fields.id ?? 'PH-S01'} — A scenario`,
    '- automation: spec',
    '- priority: P0',
    `- covers: ${fields.covers ?? 'the change'}`,
    `- grounded-in: ${fields.groundedIn ?? 'the pills'}`,
    `- preconditions: ${fields.preconditions ?? 'a fresh intervention'}`,
    '- steps:',
    ...(fields.steps ?? ['Open it → it opens']).map(
      (step, i) => `  ${i + 1}. ${step}`,
    ),
    `- page-objects: ${fields.pageObjects ?? 'none'}`,
    '',
  ].join('\n');

const check = (markdown: string) => {
  const index = fixture();
  return checkGrounding(parseScenarios(markdown).scenarios, markdown, index);
};

describe('checkGrounding — test ids', () => {
  it('accepts ids in the source, built from a template, or matched by prefix', () => {
    const report = check(
      scenario({
        steps: [
          'Click `[data-cy="continue-button"]` → the next screen shows',
          'Count `[data-cy="question-list-item-0"]` → 1',
          'Count `[data-cy^="question-list-item-"]` → 1',
        ],
      }),
    );
    assert.deepEqual(report.issues, []);
    assert.equal(report.checked.testIds, 3);
  });

  it('flags an id that exists nowhere', () => {
    const report = check(
      scenario({ steps: ['Click `[data-cy="continue-btn"]` → nothing'] }),
    );
    assert.deepEqual(
      report.issues.map((i) => [i.kind, i.ref]),
      [['test-id', '[data-cy="continue-btn"]']],
    );
  });

  it('skips ids the scenarios or a decision say codegen adds', () => {
    const markdown = [
      '# E2E scenarios — x',
      '',
      '## Decisions',
      '',
      '- **How to find the input?** → Add `data-cy="phone-input"` to PhoneQuestion.',
      '',
      scenario({
        steps: [
          'Fill `[data-cy="phone-input"]` → filled',
          'Codegen adds `[data-cy="timezone-select"]`; pick one → picked',
        ],
      }),
    ].join('\n');
    assert.deepEqual(check(markdown).issues, []);
  });
});

describe('checkGrounding — citations', () => {
  it('resolves paths, basenames, paired files and pills, and checks line ranges', () => {
    const report = check(
      scenario({
        groundedIn:
          '`app/containers/Answer/index.js:3-4` and `:5`, `messages.js:2`, paired `app/models/question/phone.rb:2`, pill answer-flow.md',
      }),
    );
    assert.deepEqual(report.issues, []);
    assert.equal(report.checked.files, 4);
  });

  it('flags a missing file and a range past the end, including a continued one', () => {
    const report = check(
      scenario({
        groundedIn:
          '`app/utils/doesNotExist.js`, `app/containers/Answer/index.js:3` and `:40-42`',
      }),
    );
    assert.deepEqual(
      report.issues.map((i) => [i.kind, i.ref]),
      [
        ['file', 'app/utils/doesNotExist.js'],
        ['lines', 'app/containers/Answer/index.js:40-42'],
      ],
    );
  });

  it("doesn't check steps, which may name files still to be written", () => {
    const report = check(
      scenario({
        steps: ['Open `e2e/pages/PreviewPage.ts` (new) → it exists'],
      }),
    );
    assert.deepEqual(report.issues, []);
  });
});

describe('checkGrounding — page objects', () => {
  it('accepts own and inherited members, and skips methods to be added', () => {
    const report = check(
      scenario({
        pageObjects:
          '`SessionPage.clickAddNewScreen`, `SessionPage.goto`, `SessionPage.continueButton`; so add `SessionPage.addPhoneScreen()`, plus a new `SessionPage.selectPhone`, `HelperUtil.run`',
      }),
    );
    assert.deepEqual(report.issues, []);
    assert.equal(report.checked.pageObjects, 3);
  });

  it('flags a member the page object lacks', () => {
    const report = check(scenario({ pageObjects: '`SessionPage.gotoo`' }));
    assert.deepEqual(
      report.issues.map((i) => [i.kind, i.ref]),
      [['page-object', 'SessionPage.gotoo']],
    );
  });
});

describe('checkGrounding — copy hints', () => {
  it('finds copy through ICU templates, apostrophes and truncation', () => {
    const report = check(
      scenario({
        steps: [
          'Open the tab → "There are no predefined participants yet" shows',
          'Open the pie → "If results don\'t match any cases then label is…" shows',
        ],
      }),
    );
    assert.deepEqual(report.hints, []);
  });

  it('hints at copy found nowhere, but not at data the test typed', () => {
    const report = check(
      scenario({
        preconditions: 'a screen titled "PH-S01 next screen"',
        steps: [
          'Type "Hello there" into `[data-cy="continue-button"]` → "Hello there" and "PH-S01 next screen" show',
          'Click it → "Your answers were lost forever" shows',
        ],
      }),
    );
    assert.deepEqual(
      report.hints.map((h) => h.text),
      ['Your answers were lost forever'],
    );
    assert.deepEqual(report.issues, [], 'a hint is never an issue');
  });
});
