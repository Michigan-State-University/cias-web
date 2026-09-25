// Parses and validates scenarios.md; format in README.md → Reading the scenarios.

export type Scenario = {
  id: string;
  title: string;
  automation: 'spec' | 'manual';
  manualReason?: string;
  priority: string;
  covers: string;
  groundedIn: string;
  preconditions: string;
  steps: string[];
  pageObjects: string;
};

export type ParseResult = { scenarios: Scenario[]; errors: string[] };

const HEADER = /^###\s+([A-Z][A-Z0-9]*-[A-Z]*\d+)\s+[—–-]\s+(.+?)\s*$/;
const FIELD = /^-\s+([a-z-]+):\s*(.*)$/;
const STEP = /^\s+\d+\.\s+(.+)$/;
const PRIORITIES = ['P0', 'P1', 'P2'];
const REQUIRED = ['automation', 'priority', 'covers', 'grounded-in', 'steps'];

const parseAutomation = (value: string) => {
  const [kind, ...reason] = value.split(/\s+[—–-]\s+/);
  return { kind: kind.trim(), reason: reason.join(' — ').trim() };
};

const parseBlock = (
  lines: string[],
  errors: string[],
): Scenario | undefined => {
  const header = lines[0].match(HEADER);
  if (!header) {
    errors.push(
      `"${lines[0]}" is not a scenario header ("### ID — title", e.g. "### RA-S03 — …")`,
    );
    return undefined;
  }
  const [, id, title] = header;
  const fields: Record<string, string> = {};
  const steps: string[] = [];
  let inSteps = false;

  lines.slice(1).forEach((line) => {
    const field = line.match(FIELD);
    if (field) {
      fields[field[1]] = field[2].trim();
      inSteps = field[1] === 'steps';
      return;
    }
    const step = line.match(STEP);
    if (inSteps && step) steps.push(step[1].trim());
  });

  REQUIRED.filter((key) => !(key in fields)).forEach((key) =>
    errors.push(`${id}: missing "- ${key}:"`),
  );

  const automation = parseAutomation(fields.automation ?? '');
  if ('automation' in fields && !['spec', 'manual'].includes(automation.kind)) {
    errors.push(
      `${id}: automation must be "spec" or "manual — <reason>", got "${fields.automation}"`,
    );
  }
  if (automation.kind === 'manual' && !automation.reason) {
    errors.push(`${id}: a manual scenario needs a reason ("manual — <why>")`);
  }
  if ('priority' in fields && !PRIORITIES.includes(fields.priority)) {
    errors.push(
      `${id}: priority must be one of ${PRIORITIES.join('/')}, got "${fields.priority}"`,
    );
  }
  if ('steps' in fields && steps.length === 0) {
    errors.push(`${id}: "- steps:" has no numbered steps`);
  }

  return {
    id,
    title,
    automation: automation.kind === 'manual' ? 'manual' : 'spec',
    manualReason: automation.reason || undefined,
    priority: fields.priority ?? '',
    covers: fields.covers ?? '',
    groundedIn: fields['grounded-in'] ?? '',
    preconditions: fields.preconditions ?? '',
    steps,
    pageObjects: fields['page-objects'] ?? '',
  };
};

export const parseScenarios = (markdown: string): ParseResult => {
  const errors: string[] = [];
  const blocks: string[][] = [];
  markdown.split('\n').forEach((line) => {
    if (line.startsWith('### ')) blocks.push([line]);
    else if (blocks.length > 0) blocks[blocks.length - 1].push(line);
  });

  if (blocks.length === 0) {
    return {
      scenarios: [],
      errors: ['no scenarios found (expected "### ID — title" headers)'],
    };
  }

  const scenarios = blocks
    .map((block) => parseBlock(block, errors))
    .filter((scenario): scenario is Scenario => scenario !== undefined);

  const seen = new Set<string>();
  scenarios.forEach(({ id }) => {
    if (seen.has(id)) errors.push(`${id}: duplicate scenario ID`);
    seen.add(id);
  });

  return { scenarios, errors };
};

export const summarize = (scenarios: Scenario[]) => ({
  total: scenarios.length,
  spec: scenarios.filter((s) => s.automation === 'spec').length,
  manual: scenarios.filter((s) => s.automation === 'manual').length,
  ids: scenarios.map((s) => s.id),
});
