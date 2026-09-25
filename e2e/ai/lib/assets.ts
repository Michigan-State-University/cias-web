import fs from 'fs';
import path from 'path';

import { AI_DIR, AI_REL } from './config';

export const readSchema = (name: string): object =>
  JSON.parse(
    fs.readFileSync(path.join(AI_DIR, 'schemas', `${name}.json`), 'utf8'),
  );

export const promptFile = (name: string): string =>
  path.join(AI_DIR, 'prompts', `${name}.md`);

// The stock healer plus this repo's rules, merged since a stage takes one file.
export const healInstructions = (stageDir: string, project: string): string => {
  const healer = fs
    .readFileSync(
      path.join(AI_DIR, 'agents', 'playwright-test-healer.md'),
      'utf8',
    )
    .replace(/^---\n[\s\S]*?\n---\n/, '');
  const file = path.join(stageDir, 'heal-instructions.md');
  fs.mkdirSync(stageDir, { recursive: true });
  fs.writeFileSync(
    file,
    `${healer.trim()}

## Rules for this repository (they override the above where they differ)

- Follow ${AI_REL}/CONVENTIONS.md. Fixes keep the house style: page objects, the fixture's \`test\`, \`waitForApiResponse\` before the action, retrying \`expect\`.
- Run **only** the tests the task names: \`test_run\` with those \`locations\` and \`projects: ["${project}"]\`. Without them it runs the whole suite.
- Never fix a timing problem with a sleep: \`waitForTimeout\`, \`networkidle\` and \`{ force: true }\` are blocked. Wait for the API response or assert with a retrying expectation instead.
- Edit only the generated specs and page-object code. Existing specs, the suite's fixtures and setup, \`${AI_REL}/\` and the scenarios are read-only.
- When you can't fix a test with high confidence, mark it \`test.fixme\` with a comment saying what's wrong, and list it under \`fixme\`.
- Finish with JSON matching the schema.
`,
  );
  return file;
};
