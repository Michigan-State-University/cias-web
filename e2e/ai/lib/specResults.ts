import { testCalls } from './fixme';
import type { SpecTest } from './manifest';
import type { LiveTest } from './verify';

const SCENARIO_ID = /^([A-Z][A-Z0-9]*-[A-Z]*\d+)\b/;

// Every test title starts with its scenario's ID (CONVENTIONS.md → Structure).
export const specResults = (input: {
  specs: { file: string; source: string }[];
  live: LiveTest[];
  liveRan: boolean;
  fixmeNotes: Map<string, string>;
  specScenarioIds: string[];
}): { tests: SpecTest[]; missing: string[] } => {
  const tests = input.specs.flatMap(({ file, source }) =>
    testCalls(source).map(({ title, fixme }): SpecTest => {
      const scenarioId = title.match(SCENARIO_ID)?.[1] ?? '';
      const note = input.fixmeNotes.get(title);
      if (fixme)
        return {
          scenarioId,
          file,
          title,
          status: 'fixme',
          ...(note ? { note } : {}),
        };
      if (!input.liveRan) return { scenarioId, file, title, status: 'not-run' };
      const run = input.live.find((t) => t.file === file && t.title === title);
      return run?.outcome === 'passed'
        ? { scenarioId, file, title, status: 'passed' }
        : {
            scenarioId,
            file,
            title,
            status: 'not-run',
            note: 'no live result',
          };
    }),
  );
  const covered = new Set(tests.map((t) => t.scenarioId));
  return {
    tests,
    missing: input.specScenarioIds.filter((id) => !covered.has(id)),
  };
};
