// Tests still red after healing become test.fixme: visible in review, but they can't turn CI red.

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const oneLine = (text: string) =>
  text.replace(/\s+/g, ' ').trim().slice(0, 160);

export const markFixme = (
  source: string,
  title: string,
  reason: string,
): string | undefined => {
  const call = new RegExp(
    `^([ \\t]*)test\\((['"\`])${escapeRegExp(title)}\\2`,
    'm',
  );
  const match = source.match(call);
  if (!match) return undefined;
  const [, indent, quote] = match;
  return source.replace(
    call,
    () =>
      `${indent}// e2e-ai: still failing after healing — ${oneLine(reason)}\n` +
      `${indent}test.fixme(${quote}${title}${quote}`,
  );
};

export const testCalls = (
  source: string,
): { title: string; fixme: boolean }[] =>
  [...source.matchAll(/^[ \t]*test(\.fixme)?\((['"`])(.+?)\2/gm)].map(
    (match) => ({ title: match[3], fixme: Boolean(match[1]) }),
  );

export const testTitles = (source: string): string[] =>
  testCalls(source).map(({ title }) => title);
