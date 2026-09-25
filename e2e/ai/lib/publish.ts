import type { PipelineConfig } from './config';
import type { DraftPr } from './github';
import type { RunManifest } from './manifest';
import { run } from './shell';

// Commands are built as a list (unit-tested, printable) and executed only with --publish.

export type Command = { command: string; args: string[]; cwd?: string };

export const pipelineBranch = (
  config: PipelineConfig,
  manifest: RunManifest,
): string => `${config.branchPrefix}${manifest.id}`;

// A merged PR's scenarios go to the base branch; a local pre-merge run targets its feature branch.
export const draftBase = (
  config: PipelineConfig,
  manifest: RunManifest,
): string =>
  manifest.source.kind === 'pr' ? config.baseBranch : manifest.source.headRef;

export const publishPlan = (
  config: PipelineConfig,
  manifest: RunManifest,
  checkout: string,
  bodyFile: string,
): Command[] => {
  const branch = pipelineBranch(config, manifest);
  const scenariosDir = `${config.scenariosDir}/${manifest.id}`;
  const change = manifest.source.pr
    ? `#${manifest.source.pr}`
    : manifest.source.headRef;
  return [
    { command: 'git', args: ['switch', '-c', branch], cwd: checkout },
    { command: 'git', args: ['add', scenariosDir], cwd: checkout },
    {
      command: 'git',
      args: ['commit', '-m', `test(e2e): draft E2E scenarios for ${change}`],
      cwd: checkout,
    },
    {
      command: 'git',
      args: ['push', '--set-upstream', 'origin', branch],
      cwd: checkout,
    },
    {
      command: 'gh',
      args: [
        'pr',
        'create',
        '-R',
        config.repo,
        '--draft',
        '--base',
        draftBase(config, manifest),
        '--head',
        branch,
        '--title',
        `E2E scenarios: ${manifest.source.title}`,
        '--body-file',
        bodyFile,
      ],
      cwd: checkout,
    },
  ];
};

export const executePlan = (commands: Command[]): string[] =>
  commands.map(({ command, args, cwd }) => run(command, args, { cwd }).trim());

// No force push: if someone pushed meanwhile, the push fails and nothing is overwritten.
export const redraftPlan = (
  config: PipelineConfig,
  manifest: RunManifest,
  checkout: string,
  bodyFile: string,
  draft: DraftPr,
): Command[] => [
  {
    command: 'git',
    args: ['add', `${config.scenariosDir}/${manifest.id}`],
    cwd: checkout,
  },
  {
    command: 'git',
    args: [
      'commit',
      '-m',
      `test(e2e): redraft E2E scenarios (#${draft.number})`,
    ],
    cwd: checkout,
  },
  {
    command: 'git',
    args: ['push', 'origin', `HEAD:refs/heads/${draft.headRefName}`],
    cwd: checkout,
  },
  {
    command: 'gh',
    args: [
      'pr',
      'edit',
      String(draft.number),
      '-R',
      config.repo,
      '--body-file',
      bodyFile,
    ],
    cwd: checkout,
  },
];
