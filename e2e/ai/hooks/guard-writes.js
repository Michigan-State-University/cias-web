// PreToolUse hook for pipeline stages that write files: keeps writes inside
// E2E_AI_WRITE_ROOTS and outside E2E_AI_DENY_ROOTS (deny wins), and keeps fixed
// sleeps, networkidle waits and forced actions out of e2e code.
// Exit code 2 blocks the tool call and feeds stderr back to the model.
const fs = require('fs');
const path = require('path');

const { e2e } = require('../pipeline.config.json');

const repoRoot = process.env.E2E_AI_ROOT
  ? path.resolve(process.env.E2E_AI_ROOT)
  : path.resolve(__dirname, '../../..');

const FORBIDDEN_IN_E2E = [
  { pattern: /\bwaitForTimeout\s*\(/, rule: 'page.waitForTimeout()' },
  { pattern: /networkidle/, rule: "waitForLoadState('networkidle')" },
  { pattern: /\bforce\s*:\s*true\b/, rule: '{ force: true }' },
];

const block = (message) => {
  process.stderr.write(`Blocked by the E2E pipeline guard: ${message}\n`);
  process.exit(2);
};

const writtenText = (toolName, input) => {
  if (toolName === 'Write') return input.content ?? '';
  if (toolName === 'Edit') return input.new_string ?? '';
  if (toolName === 'MultiEdit') {
    return (input.edits ?? []).map((edit) => edit.new_string ?? '').join('\n');
  }
  return '';
};

const isInside = (file, root) =>
  file === root || file.startsWith(`${root}${path.sep}`);

const pathList = (value) =>
  (value ?? '')
    .split(':')
    .filter(Boolean)
    .map((root) => path.resolve(repoRoot, root));

const main = () => {
  const call = JSON.parse(fs.readFileSync(0, 'utf8'));
  const input = call.tool_input ?? {};
  if (!input.file_path) return;

  const file = path.resolve(repoRoot, input.file_path);
  const roots = pathList(process.env.E2E_AI_WRITE_ROOTS);
  const denied = pathList(process.env.E2E_AI_DENY_ROOTS).find((root) =>
    isInside(file, root),
  );

  if (denied) {
    block(
      `${path.relative(repoRoot, file)} is off-limits to this stage (${path.relative(repoRoot, denied)}).`,
    );
  }

  if (!roots.some((root) => isInside(file, root))) {
    const allowed = roots
      .map((root) => path.relative(repoRoot, root))
      .join(', ');
    block(
      `${path.relative(repoRoot, file)} is outside what this stage may write (${allowed || 'nothing'}).`,
    );
  }

  const isE2eCode =
    isInside(file, path.join(repoRoot, e2e.dir)) && /\.[cm]?[jt]s$/.test(file);
  if (!isE2eCode) return;

  const text = writtenText(call.tool_name, input);
  const hit = FORBIDDEN_IN_E2E.find(({ pattern }) => pattern.test(text));
  if (hit) {
    block(
      `${hit.rule} is not allowed in e2e code. Wait for the API call with waitForApiResponse, or assert with a retrying expect (see e2e/ai/CONVENTIONS.md → Waiting).`,
    );
  }
};

main();
