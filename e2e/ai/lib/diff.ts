export type FileDiff = { file: string; text: string };

export const splitDiff = (patch: string): FileDiff[] =>
  patch
    .split(/^(?=diff --git )/m)
    .filter((section) => section.startsWith('diff --git '))
    .map((text) => ({
      file: text.match(/^diff --git a\/(.+?) b\//)?.[1] ?? '',
      text,
    }));

export const keepFiles = (
  patch: string,
  keep: (file: string) => boolean,
): { patch: string; omitted: string[] } => {
  const sections = splitDiff(patch);
  return {
    patch: sections
      .filter(({ file }) => keep(file))
      .map(({ text }) => text)
      .join(''),
    omitted: sections.filter(({ file }) => !keep(file)).map(({ file }) => file),
  };
};

export type ChangeSize = { files: number; changedLines: number };

// Expects a patch already filtered to behaviour files.
export const changeSize = (patch: string): ChangeSize => {
  const sections = splitDiff(patch);
  const changedLines = sections.reduce(
    (sum, { text }) =>
      sum +
      text
        .split('\n')
        .filter((line) => /^[+-]/.test(line) && !/^(\+\+\+|---) /.test(line))
        .length,
    0,
  );
  return { files: sections.length, changedLines };
};
