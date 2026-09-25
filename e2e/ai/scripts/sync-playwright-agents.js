// Refreshes e2e/ai/agents/; re-run after every @playwright/test upgrade.
// init-agents writes into the gitignored .claude/, hence the scratch directory.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../../..');
const playwrightBin = path.join(repoRoot, 'node_modules', '.bin', 'playwright');
const agentsDir = path.resolve(__dirname, '../agents');

// No planner: ours is grounded in the pills and the diff.
const AGENTS = ['playwright-test-healer.md', 'playwright-test-generator.md'];

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'playwright-agents-'));
try {
  execFileSync(playwrightBin, ['init-agents', '--loop=claude'], {
    cwd: workDir,
    stdio: 'inherit',
  });
  fs.mkdirSync(agentsDir, { recursive: true });
  AGENTS.forEach((file) =>
    fs.copyFileSync(
      path.join(workDir, '.claude', 'agents', file),
      path.join(agentsDir, file),
    ),
  );
} finally {
  fs.rmSync(workDir, { recursive: true, force: true });
}
