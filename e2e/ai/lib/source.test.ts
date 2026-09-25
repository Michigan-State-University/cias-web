import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { loadConfig } from './config';
import { buildPillsIndex, renderPillsIndex } from './pills';
import { findTicket } from './source';

const { ticketPattern } = loadConfig();

describe('findTicket', () => {
  it('matches the spellings CIAS branches use', () => {
    assert.deepEqual(
      findTicket(['CIAS30-4188-ra-sessions-minor-enhancements'], ticketPattern),
      { ticket: 'CIAS30-4188', number: '4188' },
    );
    assert.deepEqual(findTicket(['feature/cias-4174-export'], ticketPattern), {
      ticket: 'CIAS-4174',
      number: '4174',
    });
  });

  it('falls back to the next text (e.g. the PR title)', () => {
    assert.equal(
      findTicket(
        ['fix/add-screen-scroll-jank', 'CIAS-4150 fix scroll'],
        ticketPattern,
      )?.number,
      '4150',
    );
  });

  it('returns undefined when there is no ticket', () => {
    assert.equal(
      findTicket(['chore/e2e-stabilize-shards'], ticketPattern),
      undefined,
    );
  });
});

describe('pills index', () => {
  it('reads each pill’s title and When-to-load line, skipping drafts', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pills-'));
    fs.mkdirSync(path.join(dir, 'cias-web'));
    fs.mkdirSync(path.join(dir, '_inbox'));
    fs.writeFileSync(
      path.join(dir, 'cias-web', 'route-guard.md'),
      '# Route RBAC Guard\n\n**When to load:** Working with client-side route access control.\n',
    );
    fs.writeFileSync(path.join(dir, '_inbox', 'draft.md'), '# Draft\n');

    const entries = buildPillsIndex([dir]);
    assert.deepEqual(entries, [
      {
        file: path.join(dir, 'cias-web', 'route-guard.md'),
        title: 'Route RBAC Guard',
        whenToLoad: 'Working with client-side route access control.',
      },
    ]);
    assert.match(
      renderPillsIndex(entries),
      /— \*\*Route RBAC Guard\*\*\. When to load: Working with client-side/,
    );
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
