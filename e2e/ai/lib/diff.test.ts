import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { changeSize, keepFiles, splitDiff } from './diff';

const section = (file: string, body = '@@ -1 +1 @@\n-a\n+b\n') =>
  `diff --git a/${file} b/${file}\nindex 1..2 100644\n--- a/${file}\n+++ b/${file}\n${body}`;

const PATCH = [
  section('app/containers/X/index.tsx'),
  section('app/translations/en.json', '@@ -1 +1 @@\n-"a"\n+"b"\n'),
  section('app/containers/X/tests/index.test.tsx'),
].join('');

describe('splitDiff', () => {
  it('splits a unified diff into one section per file', () => {
    assert.deepEqual(
      splitDiff(PATCH).map(({ file }) => file),
      [
        'app/containers/X/index.tsx',
        'app/translations/en.json',
        'app/containers/X/tests/index.test.tsx',
      ],
    );
  });

  it('keeps each section intact, headers included', () => {
    assert.equal(
      splitDiff(PATCH)[0].text,
      section('app/containers/X/index.tsx'),
    );
  });

  it('returns nothing for an empty diff', () => {
    assert.deepEqual(splitDiff(''), []);
  });
});

describe('keepFiles', () => {
  it('drops the sections a stage has no use for and names them', () => {
    const { patch, omitted } = keepFiles(PATCH, (file) =>
      file.endsWith('index.tsx'),
    );
    assert.equal(patch, section('app/containers/X/index.tsx'));
    assert.deepEqual(omitted, [
      'app/translations/en.json',
      'app/containers/X/tests/index.test.tsx',
    ]);
  });
});

describe('changeSize', () => {
  it('counts files and changed lines, not headers', () => {
    const patch = [
      section('app/a.tsx', '@@ -1,2 +1,3 @@\n context\n-old\n+new\n+added\n'),
      section('app/b.tsx', '@@ -1 +1 @@\n-x\n+y\n'),
    ].join('');
    assert.deepEqual(changeSize(patch), { files: 2, changedLines: 5 });
  });

  it('is zero for an empty diff', () => {
    assert.deepEqual(changeSize(''), { files: 0, changedLines: 0 });
  });
});
